import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Info, Plane, Target, Check, X } from "lucide-react";
import { Screen, Card, PrimaryButton, Progress, inr } from "@/components/groww/shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGoal } from "@/components/groww/goal-state";
import { GoalDetailsEditor } from "@/components/groww/goal-details-editor";
import { PLAN_SETTINGS, clampPercentage } from "@/lib/goal-calculations";

export const Route = createFileRoute("/goals/$goalId")({
  head: () => ({
    meta: [
      { title: "Your goal plan — Groww Goals" },
      { name: "description", content: "Adjust your goal, savings, timeline and monthly investment to see an illustrative outcome." },
      { property: "og:title", content: "Your goal plan — Groww Goals" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Interactive goal planner with an illustrative simulation." },
    ],
  }),
  component: GoalPlanner,
});

function Slider({ value, min, max, step, onChange, label }: { value: number; min: number; max: number; step: number; onChange: (v: number) => void; label: string }) {
  const pct = max > min ? clampPercentage(((value - min) / (max - min)) * 100) : 0;
  return (
    <div className="g-slider">
      <div className="g-slider-track" aria-hidden="true"><span className="g-slider-fill" style={{ width: `${pct}%` }} /></div>
    <input
      type="range"
      aria-label={label}
      className="g-range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    </div>
  );
}

function GoalPlanner() {
  const navigate = useNavigate();
  const { goalId } = Route.useParams();
  const selected = useGoal(goalId);
  if (!selected) return null;
  const { goal, updateGoal, removeGoal, simulation } = selected;
  const months = goal.timelineMonths;
  const monthly = goal.monthlyContribution;
  const { totalContributed: contributed, illustrativeValue: value, remainingGap: gap, reached, progressPercentage: pct, increase: bump, extendedMonths: minMonths, canIncrease: canBump, canExtend } = simulation;
  const setMonths = (timelineMonths: number) => updateGoal({ timelineMonths });
  const setMonthly = (monthlyContribution: number) => updateGoal({ monthlyContribution });
  const GoalIcon = goal.icon === "plane" ? Plane : Target;
  const rateLabel = `${PLAN_SETTINGS.annualIllustrativeReturn * 100}%`;

  return (
    <Screen back nav={false}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <GoalIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="break-words text-xl font-semibold leading-tight tracking-normal">{goal.name}</h1>
          <p className="text-sm text-muted-foreground">Adjust your plan and see what changes.</p>
        </div>
        <div className="flex items-start gap-1">
          <GoalDetailsEditor goal={goal} onSave={updateGoal} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove goal"
            title="Remove goal"
            className="h-11 w-11 shrink-0 text-muted-foreground"
            onClick={() => {
              removeGoal();
              navigate({ to: "/" });
            }}
          >
            <X />
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium text-muted-foreground">Target amount</p>
        <p className="num break-words text-[30px] font-semibold leading-tight">{inr(goal.targetAmount)}</p>
      </div>

      <div className="mt-7 space-y-6">
        <section>
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium">Timeline</p>
            <p className="num text-xl font-semibold">{months} months</p>
          </div>
          <Slider label="Timeline in months" value={months} {...PLAN_SETTINGS.timeline} onChange={setMonths} />
          <div className="num flex justify-between text-[11px] text-muted-foreground"><span>{PLAN_SETTINGS.timeline.min} months</span><span>{PLAN_SETTINGS.timeline.max} months</span></div>
        </section>
        <div className="border-t border-border" />
        <section>
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium">Monthly contribution</p>
          </div>
          <p className="num mt-1 text-xl font-semibold">{inr(monthly)}</p>
          <Slider label="Monthly investment" value={monthly} {...PLAN_SETTINGS.contribution} onChange={setMonthly} />
          <div className="num flex justify-between text-[11px] text-muted-foreground"><span>{inr(PLAN_SETTINGS.contribution.min)}</span><span>{inr(PLAN_SETTINGS.contribution.max)}</span></div>
        </section>
      </div>

      <h2 className="mt-7 text-base font-semibold">Your plan</h2>
      <Card className="mt-4 p-4">
        <p className="num text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{inr(monthly)} each month</span> for <span className="font-semibold text-foreground">{months} months</span>
        </p>
        <div className="mt-4">
          <p className="text-xs text-muted-foreground">Illustrative simulation · {rateLabel} p.a.*</p>
          <p className="num text-[30px] font-semibold leading-tight">{inr(value)}</p>
        </div>
        <Progress value={pct} className="mt-3" />
        <p className="num mt-2 text-xs text-muted-foreground">{Math.round(pct)}% of {inr(goal.targetAmount)} goal</p>

        <dl className="num mt-5 space-y-3 border-t border-border pt-4 text-sm">
          <Row k="Already saved" v={inr(goal.initialAmount)} />
          <Row k="Total contributed, incl. savings" v={inr(contributed)} />
          <Row k={`Simulated growth (${rateLabel} p.a.)`} v={inr(simulation.simulatedGrowth)} />
          <Row k="Monthly amount needed*" v={inr(simulation.monthlyRequiredToReachGoal)} />
          <Row k="Goal" v={inr(goal.targetAmount)} />
          <Row k={reached ? "Above goal" : "Gap"} v={inr(Math.abs(simulation.differenceFromTarget))} strong tone={reached ? "pos" : "warn"} />
        </dl>
      </Card>

      <div className="mt-5">
        {reached ? (
          <p className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4 shrink-0 text-primary" /> {simulation.savedGoalReached ? "Your savings have already reached this goal." : `You are on track in this illustration over ${months} months.`}
          </p>
        ) : (
          <>
            <p className="num text-sm font-medium">{pct >= 90 ? `You're getting close to your target. The illustration leaves a gap of ${inr(gap)}.` : `At this contribution, the illustration leaves a gap of ${inr(gap)}.`}</p>
            <div className="mt-3 flex flex-col gap-2">
              {canBump && (
                <Button variant="ghost" onClick={() => setMonthly(monthly + bump)} className="num flex min-h-11 h-auto w-full items-center justify-between gap-2 whitespace-normal rounded-md px-0 py-2 text-left text-[13px] font-medium text-primary hover:bg-transparent">
                  Increase monthly investment by {inr(bump)} <span aria-hidden>→</span>
                </Button>
              )}
              {canExtend && (
                <Button variant="ghost" onClick={() => setMonths(minMonths)} className="num flex min-h-11 h-auto w-full items-center justify-between gap-2 whitespace-normal rounded-md px-0 py-2 text-left text-[13px] font-medium hover:bg-transparent">
                  Extend your timeline to {minMonths} months <span aria-hidden>→</span>
                </Button>
              )}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Simulations only, not financial advice.</p>
          </>
        )}
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Info className="h-4 w-4" /> One thing to know
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
          Market-linked investments can rise or fall. For a short-term goal, don't assume a fixed return will be available exactly when you need the money.
        </p>
      </div>

      <PrimaryButton className="mt-6" onClick={() => navigate({ to: "/explore" })}>
        Explore an investment plan
      </PrimaryButton>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        *Illustrative simulation only, assuming {rateLabel} annual return compounded monthly, including growth of savings and end-of-month contributions. Actual returns can be higher or lower, including negative returns.
      </p>
    </Screen>
  );
}

function Row({ k, v, strong, tone }: { k: string; v: string; strong?: boolean; tone?: "pos" | "warn" }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className={cn("shrink-0", strong ? "font-semibold" : "font-medium", tone === "pos" && "text-primary", tone === "warn" && "text-warning-foreground")}>{v}</dd>
    </div>
  );
}
