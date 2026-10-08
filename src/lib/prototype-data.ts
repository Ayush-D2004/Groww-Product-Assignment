import type { Goal } from "./goal-calculations";

/** Initial demo goal. It behaves exactly like a user-created goal: editable, listed, and selected by id. */
export const DEMO_GOAL: Goal = {
  id: "demo-goal", name: "Japan trip", icon: "plane", targetAmount: 150000,
  initialAmount: 42000, timelineMonths: 24, monthlyContribution: 4000, createdAt: "",
};

export const DEMO_GOALS: Goal[] = [DEMO_GOAL];

export const DEMO_PORTFOLIO = {
  totalValue: 84320,
  healthLabel: "Good",
  concentrationThreshold: 40,
  allocations: [
    { category: "Equity", percentage: 78, colorClass: "bg-chart-1" },
    { category: "Debt / Cash", percentage: 22, colorClass: "bg-chart-2" },
  ],
  sectors: [
    { name: "Financial Services", percentage: 48 },
    { name: "Technology", percentage: 27 },
    { name: "Consumer", percentage: 15 },
    { name: "Other", percentage: 10 },
  ],
};

export const DEMO_WEALTH_PLAN = { name: "Build long-term wealth", monthlyContribution: 5000 };