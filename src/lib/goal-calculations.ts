export interface Goal {
  id: string;
  name: string;
  icon: "plane" | "goal";
  targetAmount: number;
  timelineMonths: number;
  monthlyContribution: number;
  initialAmount: number;
  createdAt: string;
}

export const PLAN_SETTINGS = {
  annualIllustrativeReturn: 0.08,
  timeline: { min: 12, max: 36, step: 1 },
  contribution: { min: 2000, max: 10000, step: 500 },
  maxAmount: 1_000_000_000,
};

export const nonNegative = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;
export const clampPercentage = (value: number) => Math.min(100, nonNegative(value));
export const calculateGoalProgress = (amount: number, target: number) => target > 0 ? clampPercentage(nonNegative(amount) / target * 100) : 0;
export const calculateRemainingGap = (target: number, amount: number) => nonNegative(target - amount);

export function calculateTargetDate(start: string, months: number) {
  if (!start) return "";
  const date = new Date(`${start}T12:00:00Z`);
  if (!Number.isFinite(date.getTime())) return "";
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + Math.floor(nonNegative(months)));
  const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, end));
  return date.toISOString().slice(0, 10);
}

export function formatTargetDate(date: string) {
  return date ? new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`)) : "—";
}

const parseIsoDate = (value: string) => {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00Z`) : new Date(NaN);
  return Number.isFinite(date.getTime()) ? date : null;
};

/** Whole calendar months from `start` to `end`, ignoring the day of month, so the derived target month matches the chosen one. */
export function calculateMonthsBetween(start: string, end: string) {
  const from = parseIsoDate(start);
  const to = parseIsoDate(end);
  if (!from || !to) return 0;
  return nonNegative((to.getUTCFullYear() - from.getUTCFullYear()) * 12 + to.getUTCMonth() - from.getUTCMonth());
}

/** First selectable day and last selectable day for a target date, given the plan's timeline range. */
export function calculateTargetDateBounds(start: string) {
  const min = calculateTargetDate(start, PLAN_SETTINGS.timeline.min);
  const max = calculateTargetDate(start, PLAN_SETTINGS.timeline.max);
  if (!min || !max) return { min: "", max: "" };
  const last = new Date(`${max}T12:00:00Z`);
  return { min: `${min.slice(0, 7)}-01`, max: new Date(Date.UTC(last.getUTCFullYear(), last.getUTCMonth() + 1, 0, 12)).toISOString().slice(0, 10) };
}

export type GoalChanges = Partial<Pick<Goal, "name" | "targetAmount" | "initialAmount" | "timelineMonths" | "monthlyContribution">>;

/** Applies edits to one goal, keeping every amount finite and inside the plan's limits. */
export function applyGoalChanges(current: Goal, changes: GoalChanges): Goal {
  const next = { ...current, ...changes };
  for (const field of ["targetAmount", "initialAmount", "timelineMonths", "monthlyContribution"] as const) {
    if (!Number.isFinite(next[field])) next[field] = current[field];
  }
  next.targetAmount = Math.max(1, Math.min(PLAN_SETTINGS.maxAmount, next.targetAmount));
  next.initialAmount = Math.max(0, Math.min(PLAN_SETTINGS.maxAmount, next.initialAmount));
  next.timelineMonths = Math.round(Math.max(PLAN_SETTINGS.timeline.min, Math.min(PLAN_SETTINGS.timeline.max, next.timelineMonths)));
  next.monthlyContribution = Math.max(PLAN_SETTINGS.contribution.min, Math.min(PLAN_SETTINGS.contribution.max, next.monthlyContribution));
  next.name = next.name.trim().slice(0, 80) || current.name;
  if (changes.name !== undefined && next.name !== current.name) next.icon = "goal";
  return next;
}

function factors(months: number, annualRate: number) {
  const n = Math.floor(nonNegative(months));
  const rate = Number.isFinite(annualRate) && annualRate > -1 ? annualRate / 12 : 0;
  const growth = Math.pow(1 + rate, n);
  return { growth, annuity: rate === 0 ? n : (growth - 1) / rate };
}

export function calculateFutureValue(initial: number, monthly: number, months: number, annualRate: number) {
  const { growth, annuity } = factors(months, annualRate);
  return nonNegative(nonNegative(initial) * growth + nonNegative(monthly) * annuity);
}

export function calculateRequiredMonthlyContribution(target: number, initial: number, months: number, annualRate: number) {
  const { growth, annuity } = factors(months, annualRate);
  const remainder = calculateRemainingGap(target, nonNegative(initial) * growth);
  return annuity > 0 ? remainder / annuity : 0;
}

export function calculateSimulation(goal: Goal, annualRate = PLAN_SETTINGS.annualIllustrativeReturn) {
  const totalContributed = nonNegative(goal.initialAmount) + nonNegative(goal.monthlyContribution) * Math.floor(nonNegative(goal.timelineMonths));
  const illustrativeValue = calculateFutureValue(goal.initialAmount, goal.monthlyContribution, goal.timelineMonths, annualRate);
  const remainingGap = calculateRemainingGap(goal.targetAmount, illustrativeValue);
  const monthlyRequiredToReachGoal = calculateRequiredMonthlyContribution(goal.targetAmount, goal.initialAmount, goal.timelineMonths, annualRate);
  const increase = Math.max(PLAN_SETTINGS.contribution.step, Math.ceil((monthlyRequiredToReachGoal - goal.monthlyContribution) / PLAN_SETTINGS.contribution.step) * PLAN_SETTINGS.contribution.step);
  let extendedMonths = goal.timelineMonths;
  while (extendedMonths <= PLAN_SETTINGS.timeline.max && calculateFutureValue(goal.initialAmount, goal.monthlyContribution, extendedMonths, annualRate) < goal.targetAmount) extendedMonths++;
  return {
    totalContributed, illustrativeValue, remainingGap, monthlyRequiredToReachGoal,
    simulatedGrowth: illustrativeValue - totalContributed,
    differenceFromTarget: illustrativeValue - goal.targetAmount,
    progressPercentage: calculateGoalProgress(illustrativeValue, goal.targetAmount),
    savedProgress: calculateGoalProgress(goal.initialAmount, goal.targetAmount),
    remainingAmount: calculateRemainingGap(goal.targetAmount, goal.initialAmount),
    savedGoalReached: goal.initialAmount >= goal.targetAmount,
    reached: remainingGap === 0,
    increase,
    canIncrease: goal.monthlyContribution + increase <= PLAN_SETTINGS.contribution.max,
    extendedMonths,
    canExtend: extendedMonths <= PLAN_SETTINGS.timeline.max,
    targetDate: calculateTargetDate(goal.createdAt, goal.timelineMonths),
  };
}