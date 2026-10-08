import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plane, Target, TrendingUp, ChevronRight, CandlestickChart, PieChart, Layers, BarChart3, Plus } from "lucide-react";
import { Screen, Card, Progress, inr } from "@/components/groww/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGoalState } from "@/components/groww/goal-state";
import { PLAN_SETTINGS, calculateTargetDate, formatTargetDate } from "@/lib/goal-calculations";
import { DEMO_WEALTH_PLAN } from "@/lib/prototype-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Groww Goals — What are you investing for?" },
      { name: "description", content: "Track multiple goals and turn each one into a simple investment plan inside Groww." },
      { property: "og:title", content: "Groww Goals — What are you investing for?" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "A goal-first investing prototype for first-time investors." },
    ],
  }),
  component: Home,
});

function Home() {
  const { goals, simulations, createGoal, portfolio, selectGoal } = useGoalState();
  return (
    <Screen>
      <p className="text-sm text-muted-foreground">Hi Aarav</p>
      <h1 className="mt-1 text-xl font-semibold leading-tight tracking-normal">What are you investing for?</h1>
      <p className="mt-1 text-sm text-muted-foreground">Turn a goal into a simple investment plan.</p>

      <NewGoalCreator onCreate={createGoal} />

      <h2 className="mt-8 text-base font-semibold">Your goals</h2>
      <div className="mt-4 space-y-3">
        {goals.map(goal => {
          const simulation = simulations.get(goal.id);
          if (!simulation) return null;
          const GoalIcon = goal.icon === "plane" ? Plane : Target;
          return (
            <Link key={goal.id} to="/goals/$goalId" params={{ goalId: goal.id }} onClick={() => selectGoal(goal.id)} className="block">
              <Card className="p-5 transition-colors hover:border-primary/40">
                <div className="flex items-start justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <GoalIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="break-words text-base font-semibold">{goal.name}</p>
                      <p className="text-xs text-muted-foreground">Target date · {formatTargetDate(simulation.targetDate)}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">{Math.round(simulation.savedProgress)}%</span>
                </div>
                <div className="mt-5">
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="num break-words text-[28px] font-semibold leading-tight">{inr(goal.targetAmount)}</p>
                </div>
                <Progress value={simulation.savedProgress} className="mt-4" />
                <p className="num mt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{inr(goal.initialAmount)}</span> / {inr(goal.targetAmount)} saved{simulation.savedGoalReached && " · Goal reached"}
                </p>
                <div className="mt-5 flex h-11 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                  View plan
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="mt-2 flex items-center justify-between rounded-none border-0 border-b px-0 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium">{DEMO_WEALTH_PLAN.name}</p>
            <p className="num text-xs text-muted-foreground">{inr(DEMO_WEALTH_PLAN.monthlyContribution)}/month</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Card>

      <h2 className="mt-8 text-base font-semibold">Your portfolio</h2>
      <div className="mt-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Current value</p>
            <p className="num text-[28px] font-semibold">{inr(portfolio.totalValue)}</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" /> Portfolio health: <span className="font-semibold text-foreground">{portfolio.healthLabel}</span>
          </span>
        </div>
        <Link to="/portfolio" className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary">
          View portfolio <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <h2 className="mt-8 text-base font-semibold">Explore</h2>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {[
          { l: "Stocks", I: CandlestickChart },
          { l: "Mutual Funds", I: PieChart },
          { l: "ETFs", I: Layers },
          { l: "IPO", I: BarChart3 },
        ].map(({ l, I }) => (
          <div key={l} className="flex flex-col items-center gap-3 px-1 py-3">
            <I className="h-5 w-5 text-muted-foreground" />
            <span className="text-center text-[11px] font-medium leading-tight">{l}</span>
          </div>
        ))}
      </div>
    </Screen>
  );
}

function NewGoalCreator({ onCreate }: { onCreate: (input: { name: string; targetAmount: number; targetDate: string; initialAmount: number; monthlyContribution: number; }) => string }) {
  const defaultTargetDate = useMemo(() => calculateTargetDate(new Date().toISOString().slice(0, 10), 24), []);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => ({
    name: "",
    targetAmount: "",
    targetDate: defaultTargetDate,
    initialAmount: "0",
    monthlyContribution: String(PLAN_SETTINGS.contribution.min),
  }));

  const today = new Date().toISOString().slice(0, 10);
  const minDate = calculateTargetDate(today, PLAN_SETTINGS.timeline.min);
  const maxDate = calculateTargetDate(today, PLAN_SETTINGS.timeline.max);
  const targetAmount = Number(draft.targetAmount);
  const initialAmount = Number(draft.initialAmount);
  const monthlyContribution = Number(draft.monthlyContribution);
  const valid = draft.name.trim().length > 0
    && draft.targetAmount !== ""
    && draft.targetDate !== ""
    && draft.targetDate >= minDate
    && draft.targetDate <= maxDate
    && Number.isFinite(targetAmount)
    && targetAmount > 0
    && targetAmount <= PLAN_SETTINGS.maxAmount
    && Number.isFinite(initialAmount)
    && initialAmount >= 0
    && initialAmount <= PLAN_SETTINGS.maxAmount
    && Number.isFinite(monthlyContribution)
    && monthlyContribution >= PLAN_SETTINGS.contribution.min
    && monthlyContribution <= PLAN_SETTINGS.contribution.max;

  return (
    <div className="mt-6">
      {!open ? (
        <Button
          type="button"
          variant="ghost"
          className="flex h-11 w-full items-center justify-start gap-2 rounded-md border border-dashed border-border px-4 text-sm font-medium text-primary hover:bg-transparent"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-4 w-4" /> + New Goal
        </Button>
      ) : (
        <Card className="space-y-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Create goal</h2>
            <Button type="button" variant="ghost" size="sm" className="px-2 text-muted-foreground hover:bg-transparent" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
          <form
            className="space-y-3"
            onSubmit={event => {
              event.preventDefault();
              if (!valid) return;
              onCreate({
                name: draft.name.trim(),
                targetAmount,
                targetDate: draft.targetDate,
                initialAmount,
                monthlyContribution,
              });
              setDraft({
                name: "",
                targetAmount: "",
                targetDate: defaultTargetDate,
                initialAmount: "0",
                monthlyContribution: String(PLAN_SETTINGS.contribution.min),
              });
              setOpen(false);
            }}
          >
            <label className="block text-xs text-muted-foreground">
              Goal name
              <Input aria-label="Goal name" maxLength={80} className="mt-1 h-11 text-foreground shadow-none" value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} />
            </label>
            <label className="block text-xs text-muted-foreground">
              Target amount (₹)
              <Input aria-label="Target amount" type="number" inputMode="numeric" min={1} max={PLAN_SETTINGS.maxAmount} className="num mt-1 h-11 text-foreground shadow-none" value={draft.targetAmount} onChange={event => setDraft({ ...draft, targetAmount: event.target.value })} />
            </label>
            <label className="block text-xs text-muted-foreground">
              Target date
              <Input aria-label="Target date" type="date" min={minDate} max={maxDate} className="mt-1 h-11 text-foreground shadow-none" value={draft.targetDate} onChange={event => setDraft({ ...draft, targetDate: event.target.value })} />
            </label>
            <label className="block text-xs text-muted-foreground">
              Amount already saved (₹)
              <Input aria-label="Amount already saved" type="number" inputMode="numeric" min={0} max={PLAN_SETTINGS.maxAmount} className="num mt-1 h-11 text-foreground shadow-none" value={draft.initialAmount} onChange={event => setDraft({ ...draft, initialAmount: event.target.value })} />
            </label>
            <label className="block text-xs text-muted-foreground">
              Monthly contribution (₹)
              <Input aria-label="Monthly contribution" type="number" inputMode="numeric" min={PLAN_SETTINGS.contribution.min} max={PLAN_SETTINGS.contribution.max} className="num mt-1 h-11 text-foreground shadow-none" value={draft.monthlyContribution} onChange={event => setDraft({ ...draft, monthlyContribution: event.target.value })} />
            </label>
            <Button type="submit" disabled={!valid} className="h-11 w-full">
              Create Goal
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
