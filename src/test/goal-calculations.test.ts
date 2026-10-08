import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GoalStateProvider, useGoalState } from "@/components/groww/goal-state";
import { calculateSimulation, calculateFutureValue, calculateRequiredMonthlyContribution, calculateTargetDate, clampPercentage } from "@/lib/goal-calculations";
import { DEMO_GOAL } from "@/lib/prototype-data";

describe("Goal calculations", () => {
  it.each([
    [50000, 0, 2000, 12], [150000, 42000, 4000, 24],
    [200000, 150000, 10000, 12], [50000, 60000, 2000, 12],
    [150000, 42000, 2000, 36], [150000, 42000, 10000, 36],
    [1_000_000_000, 0, 2000, 12],
  ])("keeps outputs finite and clamped for target %s", (targetAmount, initialAmount, monthlyContribution, timelineMonths) => {
    const result = calculateSimulation({ ...DEMO_GOAL, targetAmount, initialAmount, monthlyContribution, timelineMonths });
    expect(result.totalContributed).toBe(initialAmount + monthlyContribution * timelineMonths);
    expect(result.remainingGap).toBeGreaterThanOrEqual(0);
    expect(result.remainingAmount).toBeGreaterThanOrEqual(0);
    expect(result.progressPercentage).toBeGreaterThanOrEqual(0);
    expect(result.progressPercentage).toBeLessThanOrEqual(100);
    for (const value of Object.values(result)) if (typeof value === "number") expect(Number.isFinite(value)).toBe(true);
  });
  it("includes savings growth and end-of-month contributions", () => {
    let balance = 42000;
    for (let month = 0; month < 24; month++) balance = balance * (1 + .08 / 12) + 4000;
    expect(calculateFutureValue(42000, 4000, 24, .08)).toBeCloseTo(balance, 8);
  });
  it("supports zero returns without dividing by zero", () => {
    expect(calculateFutureValue(42000, 4000, 24, 0)).toBe(138000);
    expect(calculateRequiredMonthlyContribution(150000, 42000, 24, 0)).toBe(4500);
  });
  it("required contribution reaches the target", () => {
    const monthly = calculateRequiredMonthlyContribution(200000, 50000, 18, .08);
    expect(calculateFutureValue(50000, monthly, 18, .08)).toBeCloseTo(200000);
  });
  it("responds to changed inputs and already reached goals", () => {
    const initial = calculateSimulation(DEMO_GOAL);
    expect(calculateSimulation({ ...DEMO_GOAL, monthlyContribution: 6000 }).illustrativeValue).toBeGreaterThan(initial.illustrativeValue);
    expect(calculateSimulation({ ...DEMO_GOAL, timelineMonths: 36 }).monthlyRequiredToReachGoal).toBeLessThan(initial.monthlyRequiredToReachGoal);
    const reached = calculateSimulation({ ...DEMO_GOAL, initialAmount: 200000 });
    expect(reached.savedGoalReached).toBe(true);
    expect(reached.remainingAmount).toBe(0);
    expect(reached.monthlyRequiredToReachGoal).toBe(0);
  });
  it("derives UTC target dates and handles end-of-month", () => {
    expect(calculateTargetDate("2026-10-07", 24)).toBe("2028-10-07");
    expect(calculateTargetDate("2026-01-31", 1)).toBe("2026-02-28");
    expect(calculateTargetDate("", 24)).toBe("");
    expect(clampPercentage(NaN)).toBe(0);
    expect(clampPercentage(-5)).toBe(0);
  });

  it("keeps one selected goal in state for navigation and exploration", async () => {
    function GoalStateProbe() {
      const { goals, selectedGoalId, selectedGoal, createGoal, selectGoal } = useGoalState();

      return (
        React.createElement(
          React.Fragment,
          null,
          React.createElement("div", { "data-testid": "count" }, String(goals.length)),
          React.createElement("div", { "data-testid": "selected-id" }, selectedGoalId ?? "none"),
          React.createElement("div", { "data-testid": "selected-name" }, selectedGoal?.name ?? "none"),
          React.createElement(
            "button",
            { type: "button", onClick: () => createGoal({ name: "MacBook", targetAmount: 120000, targetDate: "2027-12-31", initialAmount: 20000, monthlyContribution: 3000 }) },
            "Add goal"
          ),
          React.createElement(
            "button",
            { type: "button", onClick: () => selectGoal(goals[0]?.id ?? null) },
            "Select first"
          )
        )
      );
    }

    render(
      React.createElement(
        GoalStateProvider,
        null,
        React.createElement(GoalStateProbe)
      )
    );

    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("selected-id")).toHaveTextContent("demo-goal");
    expect(screen.getByTestId("selected-name")).toHaveTextContent("Japan trip");

    fireEvent.click(screen.getByRole("button", { name: "Add goal" }));
    await waitFor(() => expect(screen.getByTestId("selected-name")).toHaveTextContent("MacBook"));

    fireEvent.click(screen.getByRole("button", { name: "Select first" }));
    await waitFor(() => expect(screen.getByTestId("selected-name")).toHaveTextContent("Japan trip"));
  });
});