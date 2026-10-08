import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, Home, LineChart, PieChart, Briefcase, Search, Bell } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clampPercentage } from "@/lib/goal-calculations";

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-start justify-center sm:items-center sm:py-8">
      <div className="relative w-full sm:w-[406px] sm:rounded-[48px] sm:bg-frame sm:p-2 ">
        <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background sm:h-[820px] sm:rounded-[40px]">
          <div className="hidden h-8 shrink-0 items-center justify-between px-7 pt-2 text-xs font-semibold sm:flex">
            <span className="num">9:41</span>
            <span className="h-5 w-24 rounded-full bg-frame" />
            <span className="num">100%</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
        <circle cx="13" cy="13" r="13" className="fill-primary" />
        <path d="M5 16 L10 11 L14 14 L21 7" className="stroke-primary-foreground" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-lg font-semibold tracking-normal">Groww</span>
    </div>
  );
}

export function TopBar({ back }: { back?: boolean | undefined }) {
  const router = useRouter();
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-5">
      <div className="flex items-center gap-1">
        {back && (
          <Button variant="ghost" size="icon"
            aria-label="Back"
            onClick={() => router.history.back()}
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <Logo />
      </div>
      {!back && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="flex h-10 w-10 items-center justify-center"><Search className="h-5 w-5" /></span>
          <span className="flex h-10 w-10 items-center justify-center"><Bell className="h-5 w-5" /></span>
        </div>
      )}
    </header>
  );
}

export function Screen({ children, back, nav = true }: { children: ReactNode; back?: boolean; nav?: boolean }) {
  return (
    <>
      <TopBar back={back} />
      <main className="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
        <div className="screen-enter px-5 pb-8 pt-6">{children}</div>
      </main>
      {nav && <BottomNav />}
    </>
  );
}

function BottomNav() {
  const item = "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-normal";
  const inactive = "text-muted-foreground";
  const active = "text-foreground";
  return (
    <nav className="flex shrink-0 border-t border-border bg-card pb-2">
      <Link to="/" className={item} activeOptions={{ exact: true }} activeProps={{ className: active }} inactiveProps={{ className: inactive }}>
        <Home className="h-5 w-5" /> Home
      </Link>
      <span className={cn(item, inactive)}><LineChart className="h-5 w-5" /> Stocks</span>
      <span className={cn(item, inactive)}><PieChart className="h-5 w-5" /> Mutual Funds</span>
      <Link to="/portfolio" className={item} activeProps={{ className: active }} inactiveProps={{ className: inactive }}>
        <Briefcase className="h-5 w-5" /> Portfolio
      </Link>
    </nav>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string | undefined }) {
  return <div className={cn("rounded-md border border-border bg-card p-4", className)}>{children}</div>;
}

export function PrimaryButton({ children, className, ...p }: React.ComponentProps<"button">) {
  return (
    <Button {...p} className={cn("h-11 w-full rounded-md text-sm font-medium", className)}>
      {children}
    </Button>
  );
}

export function Progress({ value, className }: { value: number; className?: string | undefined }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${clampPercentage(value)}%` }} />
    </div>
  );
}
