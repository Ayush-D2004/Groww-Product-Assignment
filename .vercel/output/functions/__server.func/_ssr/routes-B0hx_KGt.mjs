import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as ChartPie, b as ChartCandlestick, i as Target, l as Layers, o as Plus, p as ChevronRight, r as TrendingUp, s as Plane, y as ChartColumn } from "../_libs/lucide-react.mjs";
import { a as PLAN_SETTINGS, c as Progress, g as useGoalState, l as Screen, m as inr, n as Card, p as formatTargetDate, r as DEMO_WEALTH_PLAN, t as Button, u as calculateTargetDate } from "./goal-state-neUn1kJ_.mjs";
import { t as Input } from "./input-DrOE9DxY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B0hx_KGt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { goals, simulations, createGoal, portfolio } = useGoalState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Hi Aarav"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-xl font-semibold leading-tight tracking-normal",
			children: "What are you investing for?"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Turn a goal into a simple investment plan."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewGoalCreator, { onCreate: createGoal }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "Your goals"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-3",
			children: goals.map((goal) => {
				const simulation = simulations.get(goal.id);
				if (!simulation) return null;
				const GoalIcon = goal.icon === "plane" ? Plane : Target;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/goals/$goalId",
					params: { goalId: goal.id },
					className: "block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5 transition-colors hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalIcon, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "break-words text-base font-semibold",
											children: goal.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: ["Target date · ", formatTargetDate(simulation.targetDate)]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 text-xs font-medium text-muted-foreground",
									children: [Math.round(simulation.savedProgress), "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Target"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "num break-words text-[28px] font-semibold leading-tight",
									children: inr(goal.targetAmount)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: simulation.savedProgress,
								className: "mt-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "num mt-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: inr(goal.initialAmount)
									}),
									" / ",
									inr(goal.targetAmount),
									" saved",
									simulation.savedGoalReached && " · Goal reached"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 flex h-11 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground",
								children: "View plan"
							})
						]
					})
				}, goal.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-2 flex items-center justify-between rounded-none border-0 border-b px-0 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: DEMO_WEALTH_PLAN.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "num text-xs text-muted-foreground",
					children: [inr(DEMO_WEALTH_PLAN.monthlyContribution), "/month"]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "Your portfolio"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Current value"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num text-[28px] font-semibold",
					children: inr(portfolio.totalValue)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }),
						" Portfolio health: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: portfolio.healthLabel
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/portfolio",
				className: "mt-4 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary",
				children: ["View portfolio ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-base font-semibold",
			children: "Explore"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid grid-cols-4 gap-2",
			children: [
				{
					l: "Stocks",
					I: ChartCandlestick
				},
				{
					l: "Mutual Funds",
					I: ChartPie
				},
				{
					l: "ETFs",
					I: Layers
				},
				{
					l: "IPO",
					I: ChartColumn
				}
			].map(({ l, I }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-3 px-1 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-center text-[11px] font-medium leading-tight",
					children: l
				})]
			}, l))
		})
	] });
}
function NewGoalCreator({ onCreate }) {
	const defaultTargetDate = (0, import_react.useMemo)(() => calculateTargetDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10), 24), []);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(() => ({
		name: "",
		targetAmount: "",
		targetDate: defaultTargetDate,
		initialAmount: "0",
		monthlyContribution: String(PLAN_SETTINGS.contribution.min)
	}));
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const minDate = calculateTargetDate(today, PLAN_SETTINGS.timeline.min);
	const maxDate = calculateTargetDate(today, PLAN_SETTINGS.timeline.max);
	const targetAmount = Number(draft.targetAmount);
	const initialAmount = Number(draft.initialAmount);
	const monthlyContribution = Number(draft.monthlyContribution);
	const valid = draft.name.trim().length > 0 && draft.targetAmount !== "" && draft.targetDate !== "" && draft.targetDate >= minDate && draft.targetDate <= maxDate && Number.isFinite(targetAmount) && targetAmount > 0 && targetAmount <= PLAN_SETTINGS.maxAmount && Number.isFinite(initialAmount) && initialAmount >= 0 && initialAmount <= PLAN_SETTINGS.maxAmount && Number.isFinite(monthlyContribution) && monthlyContribution >= PLAN_SETTINGS.contribution.min && monthlyContribution <= PLAN_SETTINGS.contribution.max;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6",
		children: !open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "ghost",
			className: "flex h-11 w-full items-center justify-start gap-2 rounded-md border border-dashed border-border px-4 text-sm font-medium text-primary hover:bg-transparent",
			onClick: () => setOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " + New Goal"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "space-y-4 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Create goal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					className: "px-2 text-muted-foreground hover:bg-transparent",
					onClick: () => setOpen(false),
					children: "Cancel"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					if (!valid) return;
					onCreate({
						name: draft.name.trim(),
						targetAmount,
						targetDate: draft.targetDate,
						initialAmount,
						monthlyContribution
					});
					setDraft({
						name: "",
						targetAmount: "",
						targetDate: defaultTargetDate,
						initialAmount: "0",
						monthlyContribution: String(PLAN_SETTINGS.contribution.min)
					});
					setOpen(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-muted-foreground",
						children: ["Goal name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"aria-label": "Goal name",
							maxLength: 80,
							className: "mt-1 h-11 text-foreground shadow-none",
							value: draft.name,
							onChange: (event) => setDraft({
								...draft,
								name: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-muted-foreground",
						children: ["Target amount (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"aria-label": "Target amount",
							type: "number",
							inputMode: "numeric",
							min: 1,
							max: PLAN_SETTINGS.maxAmount,
							className: "num mt-1 h-11 text-foreground shadow-none",
							value: draft.targetAmount,
							onChange: (event) => setDraft({
								...draft,
								targetAmount: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-muted-foreground",
						children: ["Target date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"aria-label": "Target date",
							type: "date",
							min: minDate,
							max: maxDate,
							className: "mt-1 h-11 text-foreground shadow-none",
							value: draft.targetDate,
							onChange: (event) => setDraft({
								...draft,
								targetDate: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-muted-foreground",
						children: ["Amount already saved (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"aria-label": "Amount already saved",
							type: "number",
							inputMode: "numeric",
							min: 0,
							max: PLAN_SETTINGS.maxAmount,
							className: "num mt-1 h-11 text-foreground shadow-none",
							value: draft.initialAmount,
							onChange: (event) => setDraft({
								...draft,
								initialAmount: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-muted-foreground",
						children: ["Monthly contribution (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"aria-label": "Monthly contribution",
							type: "number",
							inputMode: "numeric",
							min: PLAN_SETTINGS.contribution.min,
							max: PLAN_SETTINGS.contribution.max,
							className: "num mt-1 h-11 text-foreground shadow-none",
							value: draft.monthlyContribution,
							onChange: (event) => setDraft({
								...draft,
								monthlyContribution: event.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !valid,
						className: "h-11 w-full",
						children: "Create Goal"
					})
				]
			})]
		})
	});
}
//#endregion
export { Home as component };
