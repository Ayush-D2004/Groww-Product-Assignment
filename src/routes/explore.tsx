import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { Screen, Card } from "@/components/groww/shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGoalState } from "@/components/groww/goal-state";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Understand before you invest — Groww Goals" },
      { name: "description", content: "Understand example investments and their trade-offs for your chosen goal. Simulated, not advice." },
      { property: "og:title", content: "Understand before you invest — Groww Goals" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Explainable example investments for a goal." },
    ],
  }),
  component: Explore,
});

const items = [
  {
    name: "Nifty 50 Index Fund",
    cat: "Equity",
    fit: "Provides exposure to a diversified basket of large Indian companies and is generally intended for long-term investing.",
    know: "Market-linked. Can fall significantly in the short term.",
    why: "An index fund is a mutual fund that simply tracks the Nifty 50 — India's 50 largest listed companies. You invest a fixed amount through a SIP, units are bought at the day's price, and costs are usually low. Because it holds only equity, its value can swing a lot over shorter periods, which matters for a goal with a fixed date.",
  },
  {
    name: "Nifty 50 ETF",
    cat: "Index-based equity",
    fit: "Provides index exposure through an exchange-traded product.",
    know: "Market movements, liquidity and trading price can affect the experience.",
    why: "An ETF tracks the same index but trades on the stock exchange like a share. You need a demat account, buy at the live market price, and the price you get can differ slightly from the index value. It carries the same short-term market risk as the index fund.",
  },
];

function Explore() {
  const [open, setOpen] = useState<number | null>(null);
  const { selectedGoal } = useGoalState();
  const goal = selectedGoal;

  if (!goal) return null;

  return (
    <Screen back nav={false}>
      <p className="break-words text-xs font-medium text-muted-foreground">For your {goal.name} goal</p>
      <h1 className="mt-1 text-xl font-semibold leading-tight tracking-normal">Understand before you invest</h1>
      <p className="mt-1 text-sm text-muted-foreground">These examples show how different investments work.</p>

      <div className="mt-6 border-b border-border pb-5">
        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" /> Your goal is {goal.timelineMonths} months away.
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
          Market-linked investments can fluctuate significantly over shorter periods. Understand the trade-off before choosing an investment.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {items.map((it, i) => (
          <Card key={it.name} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-normal text-muted-foreground">Example</span>
                <p className="mt-2 text-base font-semibold">{it.name}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-6 text-xs">
              <div><p className="text-muted-foreground">Category</p><p className="mt-0.5 font-medium">{it.cat}</p></div>
              <div><p className="text-muted-foreground">Risk</p><p className="mt-0.5 font-medium text-warning-foreground">High</p></div>
            </div>
            <div className="mt-4 space-y-3 border-t border-border pt-4 text-[13px] leading-relaxed">
              <div><p className="font-semibold">Why might this fit?</p><p className="mt-0.5 text-muted-foreground">{it.fit}</p></div>
              <div><p className="font-semibold">What should you know?</p><p className="mt-0.5 text-muted-foreground">{it.know}</p></div>
            </div>
            <Button variant="ghost"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="mt-4 flex h-11 w-full items-center justify-between px-0 text-sm font-medium text-primary hover:bg-transparent"
            >
              Why this? <ChevronDown className={cn("h-4 w-4 transition-transform", open === i && "rotate-180")} />
            </Button>
            <div className={cn("grid transition-all duration-200", open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <p className="overflow-hidden text-[13px] leading-relaxed text-muted-foreground">
                <span className="block pt-2">{it.why}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
        Simulated examples for explanation only. Not a recommendation or personalised financial advice.
      </p>
    </Screen>
  );
}
