import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { applyGoalChanges, calculateMonthsBetween, calculateSimulation, PLAN_SETTINGS, type Goal, type GoalChanges } from "@/lib/goal-calculations";
import { DEMO_GOALS, DEMO_PORTFOLIO } from "@/lib/prototype-data";

export type Simulation = ReturnType<typeof calculateSimulation>;
export type NewGoalInput = {
  name: string;
  targetAmount: number;
  targetDate: string;
  initialAmount: number;
  monthlyContribution: number;
};

type PrototypeState = {
  goals: Goal[];
  simulations: Map<string, Simulation>;
  createGoal: (input: NewGoalInput) => string;
  updateGoal: (id: string, changes: GoalChanges) => void;
  deleteGoal: (id: string) => void;
  portfolio: typeof DEMO_PORTFOLIO;
};

const StateContext = createContext<PrototypeState | null>(null);

const today = () => new Date().toISOString().slice(0, 10);
const newGoalId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `goal-${Date.now()}`);

export function GoalStateProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(() => DEMO_GOALS.map(goal => ({ ...goal })));
  const [portfolio] = useState(() => DEMO_PORTFOLIO);
  useEffect(() => {
    // Demo goals ship without a creation date so server and client render the same markup; stamp it after hydration.
    setGoals(current => current.some(goal => !goal.createdAt) ? current.map(goal => goal.createdAt ? goal : { ...goal, createdAt: today() }) : current);
  }, []);
  const simulations = useMemo(() => new Map(goals.map(goal => [goal.id, calculateSimulation(goal)])), [goals]);

  function createGoal(input: NewGoalInput) {
    const createdAt = today();
    const base: Goal = {
      id: newGoalId(),
      name: input.name,
      icon: "goal",
      targetAmount: input.targetAmount,
      initialAmount: input.initialAmount,
      timelineMonths: Math.max(PLAN_SETTINGS.timeline.min, Math.min(PLAN_SETTINGS.timeline.max, calculateMonthsBetween(createdAt, input.targetDate) || PLAN_SETTINGS.timeline.min)),
      monthlyContribution: input.monthlyContribution,
      createdAt,
    };
    const goal = applyGoalChanges(base, input);
    setGoals(current => [...current, goal]);
    return goal.id;
  }

  function updateGoal(id: string, changes: GoalChanges) {
    setGoals(current => current.map(goal => goal.id === id ? applyGoalChanges(goal, changes) : goal));
  }

  function deleteGoal(id: string) {
    setGoals(current => current.filter(goal => goal.id !== id));
  }

  return <StateContext.Provider value={{ goals, simulations, createGoal, updateGoal, deleteGoal, portfolio }}>{children}</StateContext.Provider>;
}

export function useGoalState() {
  const state = useContext(StateContext);
  if (!state) throw new Error("Goal state must be used inside GoalStateProvider");
  return state;
}

/** One goal with its simulation and a bound updater; `null` when the id is unknown. */
export function useGoal(id: string | undefined) {
  const { goals, simulations, updateGoal, deleteGoal } = useGoalState();
  const goal = id ? goals.find(item => item.id === id) : undefined;
  const simulation = goal ? simulations.get(goal.id) : undefined;
  if (!goal || !simulation) return null;
  return { goal, simulation, updateGoal: (changes: GoalChanges) => updateGoal(goal.id, changes), removeGoal: () => deleteGoal(goal.id) };
}
