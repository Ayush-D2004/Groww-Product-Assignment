import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { Screen, inr } from "@/components/groww/shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGoalState } from "@/components/groww/goal-state";
import { clampPercentage } from "@/lib/goal-calculations";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio health — Groww Goals" },
      { name: "description", content: "Understand what you own: allocation, sector exposure and concentration in a simulated portfolio." },
      { property: "og:title", content: "Portfolio health — Groww Goals" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "A simple portfolio health view for first-time investors." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [open, setOpen] = useState(false);
  const { portfolio } = useGoalState();
  const concentrated = portfolio.sectors.filter(s => s.percentage >= portfolio.concentrationThreshold);
  return (
    <Screen>
      <p className="text-xs font-medium text-muted-foreground">Portfolio health</p>
      <h1 className="mt-1 text-xl font-semibold leading-tight tracking-normal">Understand what you own</h1>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Portfolio value</p>
          <p className="num text-[30px] font-semibold leading-tight">{inr(portfolio.totalValue)}</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" /> {portfolio.healthLabel}
        </span>
      </div>

      <section className="mt-8 border-t border-border pt-6">
        <h2 className="text-sm font-semibold">Asset allocation</h2>
        <div className="mt-3 flex h-2 w-full overflow-hidden rounded-sm">
          {portfolio.allocations.map(a => <div key={a.category} className={a.colorClass} style={{ width: `${clampPercentage(a.percentage)}%` }} />)}
        </div>
        <div className="num mt-3 flex justify-between text-sm">
          {portfolio.allocations.map(a => <span key={a.category} className="flex items-center gap-2"><span className={cn("h-2 w-2 rounded-full", a.colorClass)} />{a.category} <span className="font-semibold">{clampPercentage(a.percentage)}%</span></span>)}
        </div>
      </section>

      <section className="mt-8 border-t border-border pt-6">
        <h2 className="text-sm font-semibold">Sector exposure</h2>
        <div className="mt-4 space-y-4">
          {portfolio.sectors.map((s) => {
            const warn = s.percentage >= portfolio.concentrationThreshold;
            return <div key={s.name}>
              <div className="num flex justify-between text-sm">
                <span>{s.name}</span>
                <span className={cn("flex items-center gap-1 font-semibold", warn && "text-warning-foreground")}>
                  {warn && <AlertTriangle className="h-3.5 w-3.5" />}{clampPercentage(s.percentage)}%
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                <div className={cn("h-full rounded-full", warn ? "bg-warning" : "bg-chart-4")} style={{ width: `${clampPercentage(s.percentage)}%` }} />
              </div>
            </div>;
          })}
        </div>
      </section>

      <div className="mt-7 border-t border-border pt-5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <AlertTriangle className="h-4 w-4" /> {concentrated.length ? "High sector concentration" : "Sector diversification"}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
          {concentrated.length ? concentrated.map(s => `${clampPercentage(s.percentage)}% of this simulated portfolio is exposed to ${s.name.toLowerCase()}.`).join(" ") : "No single sector exceeds the concentration threshold in this simulated portfolio."}
        </p>
        <Button variant="ghost" onClick={() => setOpen(!open)} aria-expanded={open} className="mt-2 flex h-11 items-center gap-1 px-0 text-sm font-medium text-foreground hover:bg-transparent">
          Why does this matter? <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </Button>
        <div className={cn("grid transition-all duration-200", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
          <p className="overflow-hidden text-[13px] leading-relaxed text-muted-foreground">
            <span className="block pt-2">If different investments are exposed to the same sector, they may move together. Diversification can reduce concentration, but it cannot eliminate investment risk.</span>
          </p>
        </div>
      </div>

      <p className="mt-5 text-[11px] text-muted-foreground">Simulated portfolio for illustration only.</p>
    </Screen>
  );
}
