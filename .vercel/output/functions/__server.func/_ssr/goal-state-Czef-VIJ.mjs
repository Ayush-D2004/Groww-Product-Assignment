import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as Bell, _ as ChartPie, a as Search, d as House, m as ChevronLeft, v as ChartLine, x as Briefcase } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/goal-state-Czef-VIJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var PLAN_SETTINGS = {
	annualIllustrativeReturn: .08,
	timeline: {
		min: 12,
		max: 36,
		step: 1
	},
	contribution: {
		min: 2e3,
		max: 1e4,
		step: 500
	},
	maxAmount: 1e9
};
var nonNegative = (value) => Number.isFinite(value) ? Math.max(0, value) : 0;
var clampPercentage = (value) => Math.min(100, nonNegative(value));
var calculateGoalProgress = (amount, target) => target > 0 ? clampPercentage(nonNegative(amount) / target * 100) : 0;
var calculateRemainingGap = (target, amount) => nonNegative(target - amount);
function calculateTargetDate(start, months) {
	if (!start) return "";
	const date = /* @__PURE__ */ new Date(`${start}T12:00:00Z`);
	if (!Number.isFinite(date.getTime())) return "";
	const day = date.getUTCDate();
	date.setUTCDate(1);
	date.setUTCMonth(date.getUTCMonth() + Math.floor(nonNegative(months)));
	const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
	date.setUTCDate(Math.min(day, end));
	return date.toISOString().slice(0, 10);
}
function formatTargetDate(date) {
	return date ? new Intl.DateTimeFormat("en-IN", {
		month: "long",
		year: "numeric",
		timeZone: "UTC"
	}).format(/* @__PURE__ */ new Date(`${date}T12:00:00Z`)) : "—";
}
var parseIsoDate = (value) => {
	const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? /* @__PURE__ */ new Date(`${value}T12:00:00Z`) : /* @__PURE__ */ new Date(NaN);
	return Number.isFinite(date.getTime()) ? date : null;
};
/** Whole calendar months from `start` to `end`, ignoring the day of month, so the derived target month matches the chosen one. */
function calculateMonthsBetween(start, end) {
	const from = parseIsoDate(start);
	const to = parseIsoDate(end);
	if (!from || !to) return 0;
	return nonNegative((to.getUTCFullYear() - from.getUTCFullYear()) * 12 + to.getUTCMonth() - from.getUTCMonth());
}
/** Applies edits to one goal, keeping every amount finite and inside the plan's limits. */
function applyGoalChanges(current, changes) {
	const next = {
		...current,
		...changes
	};
	for (const field of [
		"targetAmount",
		"initialAmount",
		"timelineMonths",
		"monthlyContribution"
	]) if (!Number.isFinite(next[field])) next[field] = current[field];
	next.targetAmount = Math.max(1, Math.min(PLAN_SETTINGS.maxAmount, next.targetAmount));
	next.initialAmount = Math.max(0, Math.min(PLAN_SETTINGS.maxAmount, next.initialAmount));
	next.timelineMonths = Math.round(Math.max(PLAN_SETTINGS.timeline.min, Math.min(PLAN_SETTINGS.timeline.max, next.timelineMonths)));
	next.monthlyContribution = Math.max(PLAN_SETTINGS.contribution.min, Math.min(PLAN_SETTINGS.contribution.max, next.monthlyContribution));
	next.name = next.name.trim().slice(0, 80) || current.name;
	if (changes.name !== void 0 && next.name !== current.name) next.icon = "goal";
	return next;
}
function factors(months, annualRate) {
	const n = Math.floor(nonNegative(months));
	const rate = Number.isFinite(annualRate) && annualRate > -1 ? annualRate / 12 : 0;
	const growth = Math.pow(1 + rate, n);
	return {
		growth,
		annuity: rate === 0 ? n : (growth - 1) / rate
	};
}
function calculateFutureValue(initial, monthly, months, annualRate) {
	const { growth, annuity } = factors(months, annualRate);
	return nonNegative(nonNegative(initial) * growth + nonNegative(monthly) * annuity);
}
function calculateRequiredMonthlyContribution(target, initial, months, annualRate) {
	const { growth, annuity } = factors(months, annualRate);
	const remainder = calculateRemainingGap(target, nonNegative(initial) * growth);
	return annuity > 0 ? remainder / annuity : 0;
}
function calculateSimulation(goal, annualRate = PLAN_SETTINGS.annualIllustrativeReturn) {
	const totalContributed = nonNegative(goal.initialAmount) + nonNegative(goal.monthlyContribution) * Math.floor(nonNegative(goal.timelineMonths));
	const illustrativeValue = calculateFutureValue(goal.initialAmount, goal.monthlyContribution, goal.timelineMonths, annualRate);
	const remainingGap = calculateRemainingGap(goal.targetAmount, illustrativeValue);
	const monthlyRequiredToReachGoal = calculateRequiredMonthlyContribution(goal.targetAmount, goal.initialAmount, goal.timelineMonths, annualRate);
	const increase = Math.max(PLAN_SETTINGS.contribution.step, Math.ceil((monthlyRequiredToReachGoal - goal.monthlyContribution) / PLAN_SETTINGS.contribution.step) * PLAN_SETTINGS.contribution.step);
	let extendedMonths = goal.timelineMonths;
	while (extendedMonths <= PLAN_SETTINGS.timeline.max && calculateFutureValue(goal.initialAmount, goal.monthlyContribution, extendedMonths, annualRate) < goal.targetAmount) extendedMonths++;
	return {
		totalContributed,
		illustrativeValue,
		remainingGap,
		monthlyRequiredToReachGoal,
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
		targetDate: calculateTargetDate(goal.createdAt, goal.timelineMonths)
	};
}
var inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
function PhoneFrame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-start justify-center sm:items-center sm:py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-full sm:w-[406px] sm:rounded-[48px] sm:bg-frame sm:p-2 ",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background sm:h-[820px] sm:rounded-[40px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden h-8 shrink-0 items-center justify-between px-7 pt-2 text-xs font-semibold sm:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num",
							children: "9:41"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-24 rounded-full bg-frame" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num",
							children: "100%"
						})
					]
				}), children]
			})
		})
	});
}
function Logo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "26",
			height: "26",
			viewBox: "0 0 26 26",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "13",
				cy: "13",
				r: "13",
				className: "fill-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5 16 L10 11 L14 14 L21 7",
				className: "stroke-primary-foreground",
				strokeWidth: "2.2",
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-lg font-semibold tracking-normal",
			children: "Groww"
		})]
	});
}
function TopBar({ back }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [back && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				"aria-label": "Back",
				onClick: () => router.history.back(),
				className: "-ml-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})]
		}), !back && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-10 w-10 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-10 w-10 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" })
			})]
		})]
	});
}
function Screen({ children, back, nav = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { back }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "no-scrollbar flex-1 overflow-y-auto overflow-x-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "screen-enter px-5 pb-8 pt-6",
				children
			})
		}),
		nav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
	] });
}
function BottomNav() {
	const item = "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-normal";
	const inactive = "text-muted-foreground";
	const active = "text-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex shrink-0 border-t border-border bg-card pb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: item,
				activeOptions: { exact: true },
				activeProps: { className: active },
				inactiveProps: { className: inactive },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-5 w-5" }), " Home"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn(item, inactive),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "h-5 w-5" }), " Stocks"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn(item, inactive),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartPie, { className: "h-5 w-5" }), " Mutual Funds"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/portfolio",
				className: item,
				activeProps: { className: active },
				inactiveProps: { className: inactive },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-5 w-5" }), " Portfolio"]
			})
		]
	});
}
function Card({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-md border border-border bg-card p-4", className),
		children
	});
}
function PrimaryButton({ children, className, ...p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		...p,
		className: cn("h-11 w-full rounded-md text-sm font-medium", className),
		children
	});
}
function Progress({ value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-primary transition-all duration-300",
			style: { width: `${clampPercentage(value)}%` }
		})
	});
}
var DEMO_GOALS = [{
	id: "demo-goal",
	name: "Japan trip",
	icon: "plane",
	targetAmount: 15e4,
	initialAmount: 42e3,
	timelineMonths: 24,
	monthlyContribution: 4e3,
	createdAt: ""
}];
var DEMO_PORTFOLIO = {
	totalValue: 84320,
	healthLabel: "Good",
	concentrationThreshold: 40,
	allocations: [{
		category: "Equity",
		percentage: 78,
		colorClass: "bg-chart-1"
	}, {
		category: "Debt / Cash",
		percentage: 22,
		colorClass: "bg-chart-2"
	}],
	sectors: [
		{
			name: "Financial Services",
			percentage: 48
		},
		{
			name: "Technology",
			percentage: 27
		},
		{
			name: "Consumer",
			percentage: 15
		},
		{
			name: "Other",
			percentage: 10
		}
	]
};
var DEMO_WEALTH_PLAN = {
	name: "Build long-term wealth",
	monthlyContribution: 5e3
};
var StateContext = (0, import_react.createContext)(null);
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var newGoalId = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `goal-${Date.now()}`;
function GoalStateProvider({ children }) {
	const [goals, setGoals] = (0, import_react.useState)(() => DEMO_GOALS.map((goal) => ({ ...goal })));
	const [selectedGoalId, setSelectedGoalId] = (0, import_react.useState)(() => DEMO_GOALS[0]?.id ?? null);
	const [portfolio] = (0, import_react.useState)(() => DEMO_PORTFOLIO);
	(0, import_react.useEffect)(() => {
		setGoals((current) => current.some((goal) => !goal.createdAt) ? current.map((goal) => goal.createdAt ? goal : {
			...goal,
			createdAt: today()
		}) : current);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!goals.length) {
			setSelectedGoalId(null);
			return;
		}
		if (!selectedGoalId || !goals.some((goal) => goal.id === selectedGoalId)) setSelectedGoalId(goals[0].id);
	}, [goals, selectedGoalId]);
	const simulations = (0, import_react.useMemo)(() => new Map(goals.map((goal) => [goal.id, calculateSimulation(goal)])), [goals]);
	const selectedGoal = (0, import_react.useMemo)(() => goals.find((goal) => goal.id === selectedGoalId) ?? null, [goals, selectedGoalId]);
	const selectedSimulation = (0, import_react.useMemo)(() => selectedGoal ? simulations.get(selectedGoal.id) ?? null : null, [selectedGoal, simulations]);
	function createGoal(input) {
		const createdAt = today();
		const goal = applyGoalChanges({
			id: newGoalId(),
			name: input.name,
			icon: "goal",
			targetAmount: input.targetAmount,
			initialAmount: input.initialAmount,
			timelineMonths: Math.max(PLAN_SETTINGS.timeline.min, Math.min(PLAN_SETTINGS.timeline.max, calculateMonthsBetween(createdAt, input.targetDate) || PLAN_SETTINGS.timeline.min)),
			monthlyContribution: input.monthlyContribution,
			createdAt
		}, input);
		setGoals((current) => [...current, goal]);
		setSelectedGoalId(goal.id);
		return goal.id;
	}
	function updateGoal(id, changes) {
		setGoals((current) => current.map((goal) => goal.id === id ? applyGoalChanges(goal, changes) : goal));
	}
	function deleteGoal(id) {
		setGoals((current) => {
			const remaining = current.filter((goal) => goal.id !== id);
			if (selectedGoalId === id) setSelectedGoalId(remaining[0]?.id ?? null);
			return remaining;
		});
	}
	function selectGoal(id) {
		setSelectedGoalId(id && goals.some((goal) => goal.id === id) ? id : goals[0]?.id ?? null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateContext.Provider, {
		value: {
			goals,
			simulations,
			selectedGoalId,
			selectedGoal,
			selectedSimulation,
			createGoal,
			updateGoal,
			deleteGoal,
			selectGoal,
			portfolio
		},
		children
	});
}
function useGoalState() {
	const state = (0, import_react.useContext)(StateContext);
	if (!state) throw new Error("Goal state must be used inside GoalStateProvider");
	return state;
}
/** One goal with its simulation and a bound updater; `null` when the id is unknown. */
function useGoal(id) {
	const { goals, simulations, updateGoal, deleteGoal } = useGoalState();
	const goal = id ? goals.find((item) => item.id === id) : void 0;
	const simulation = goal ? simulations.get(goal.id) : void 0;
	if (!goal || !simulation) return null;
	return {
		goal,
		simulation,
		updateGoal: (changes) => updateGoal(goal.id, changes),
		removeGoal: () => deleteGoal(goal.id)
	};
}
//#endregion
export { PLAN_SETTINGS as a, Progress as c, clampPercentage as d, cn as f, useGoalState as g, useGoal as h, GoalStateProvider as i, Screen as l, inr as m, Card as n, PhoneFrame as o, formatTargetDate as p, DEMO_WEALTH_PLAN as r, PrimaryButton as s, Button as t, calculateTargetDate as u };
