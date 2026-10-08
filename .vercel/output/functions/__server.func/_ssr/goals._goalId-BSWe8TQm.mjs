import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as Pencil, g as Check, i as Target, s as Plane, t as X, u as Info } from "../_libs/lucide-react.mjs";
import { a as PLAN_SETTINGS, c as Progress, d as clampPercentage, f as cn, g as useGoalState, h as useGoal, l as Screen, m as inr, n as Card, s as PrimaryButton, t as Button } from "./goal-state-Czef-VIJ.mjs";
import { t as Route } from "./goals._goalId-D19yiDx5.mjs";
import { t as Input } from "./input-Cma4XyEs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/goals._goalId-BSWe8TQm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoalDetailsEditor({ goal, onSave }) {
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(() => ({
		name: goal.name,
		target: String(goal.targetAmount),
		initial: String(goal.initialAmount)
	}));
	const target = Number(draft.target);
	const initial = Number(draft.initial);
	const valid = draft.name.trim().length > 0 && draft.target !== "" && draft.initial !== "" && Number.isFinite(target) && target > 0 && target <= PLAN_SETTINGS.maxAmount && Number.isFinite(initial) && initial >= 0 && initial <= PLAN_SETTINGS.maxAmount;
	(0, import_react.useEffect)(() => {
		if (!editing) setDraft({
			name: goal.name,
			target: String(goal.targetAmount),
			initial: String(goal.initialAmount)
		});
	}, [
		editing,
		goal.id,
		goal.name,
		goal.targetAmount,
		goal.initialAmount
	]);
	if (!editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		"aria-label": "Edit goal details",
		title: "Edit goal details",
		className: "h-11 w-11 shrink-0 text-muted-foreground",
		onClick: () => setEditing(true),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 w-full border-t border-border pt-4",
		onSubmit: (event) => {
			event.preventDefault();
			if (!valid) return;
			onSave({
				name: draft.name,
				targetAmount: target,
				initialAmount: initial
			});
			setEditing(false);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Goal details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": "Cancel editing",
					title: "Cancel editing",
					className: "h-11 w-11",
					onClick: () => setEditing(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-muted-foreground",
						children: ["Goal name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"aria-label": "Goal name",
							maxLength: 80,
							className: "mt-1 h-11 text-foreground shadow-none",
							value: draft.name,
							onChange: (e) => setDraft({
								...draft,
								name: e.target.value
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
							value: draft.target,
							onChange: (e) => setDraft({
								...draft,
								target: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-muted-foreground",
						children: ["Already saved (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"aria-label": "Already saved",
							type: "number",
							inputMode: "numeric",
							min: 0,
							max: PLAN_SETTINGS.maxAmount,
							className: "num mt-1 h-11 text-foreground shadow-none",
							value: draft.initial,
							onChange: (e) => setDraft({
								...draft,
								initial: e.target.value
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: !valid,
				className: "mt-4 h-11 w-full",
				children: "Save changes"
			})
		]
	});
}
function Slider({ value, min, max, step, onChange, label }) {
	const pct = max > min ? clampPercentage((value - min) / (max - min) * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "g-slider",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "g-slider-track",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "g-slider-fill",
				style: { width: `${pct}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			"aria-label": label,
			className: "g-range",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value))
		})]
	});
}
function GoalPlanner() {
	const navigate = useNavigate();
	const { goalId } = Route.useParams();
	const { selectGoal } = useGoalState();
	(0, import_react.useEffect)(() => {
		if (goalId) selectGoal(goalId);
	}, [goalId, selectGoal]);
	const selected = useGoal(goalId);
	if (!selected) return null;
	const { goal, updateGoal, removeGoal, simulation } = selected;
	const months = goal.timelineMonths;
	const monthly = goal.monthlyContribution;
	const { totalContributed: contributed, illustrativeValue: value, remainingGap: gap, reached, progressPercentage: pct, increase: bump, extendedMonths: minMonths, canIncrease: canBump, canExtend } = simulation;
	const setMonths = (timelineMonths) => updateGoal({ timelineMonths });
	const setMonthly = (monthlyContribution) => updateGoal({ monthlyContribution });
	const GoalIcon = goal.icon === "plane" ? Plane : Target;
	const rateLabel = `${PLAN_SETTINGS.annualIllustrativeReturn * 100}%`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		back: true,
		nav: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalIcon, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "break-words text-xl font-semibold leading-tight tracking-normal",
							children: goal.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Adjust your plan and see what changes."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalDetailsEditor, {
							goal,
							onSave: updateGoal
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Remove goal",
							title: "Remove goal",
							className: "h-11 w-11 shrink-0 text-muted-foreground",
							onClick: () => {
								removeGoal();
								navigate({ to: "/" });
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-muted-foreground",
					children: "Target amount"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num break-words text-[30px] font-semibold leading-tight",
					children: inr(goal.targetAmount)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Timeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "num text-xl font-semibold",
								children: [months, " months"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							label: "Timeline in months",
							value: months,
							...PLAN_SETTINGS.timeline,
							onChange: setMonths
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "num flex justify-between text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [PLAN_SETTINGS.timeline.min, " months"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [PLAN_SETTINGS.timeline.max, " months"] })]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-baseline justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Monthly contribution"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num mt-1 text-xl font-semibold",
							children: inr(monthly)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							label: "Monthly investment",
							value: monthly,
							...PLAN_SETTINGS.contribution,
							onChange: setMonthly
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "num flex justify-between text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inr(PLAN_SETTINGS.contribution.min) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inr(PLAN_SETTINGS.contribution.max) })]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-7 text-base font-semibold",
				children: "Your plan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "num text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [inr(monthly), " each month"]
							}),
							" for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [months, " months"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Illustrative simulation · ",
								rateLabel,
								" p.a.*"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num text-[30px] font-semibold leading-tight",
							children: inr(value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: pct,
						className: "mt-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "num mt-2 text-xs text-muted-foreground",
						children: [
							Math.round(pct),
							"% of ",
							inr(goal.targetAmount),
							" goal"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "num mt-5 space-y-3 border-t border-border pt-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Already saved",
								v: inr(goal.initialAmount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Total contributed, incl. savings",
								v: inr(contributed)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: `Simulated growth (${rateLabel} p.a.)`,
								v: inr(simulation.simulatedGrowth)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Monthly amount needed*",
								v: inr(simulation.monthlyRequiredToReachGoal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Goal",
								v: inr(goal.targetAmount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: reached ? "Above goal" : "Gap",
								v: inr(Math.abs(simulation.differenceFromTarget)),
								strong: true,
								tone: reached ? "pos" : "warn"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: reached ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 shrink-0 text-primary" }),
						" ",
						simulation.savedGoalReached ? "Your savings have already reached this goal." : `You are on track in this illustration over ${months} months.`
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num text-sm font-medium",
						children: pct >= 90 ? `You're getting close to your target. The illustration leaves a gap of ${inr(gap)}.` : `At this contribution, the illustration leaves a gap of ${inr(gap)}.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-col gap-2",
						children: [canBump && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: () => setMonthly(monthly + bump),
							className: "num flex min-h-11 h-auto w-full items-center justify-between gap-2 whitespace-normal rounded-md px-0 py-2 text-left text-[13px] font-medium text-primary hover:bg-transparent",
							children: [
								"Increase monthly investment by ",
								inr(bump),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})
							]
						}), canExtend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: () => setMonths(minMonths),
							className: "num flex min-h-11 h-auto w-full items-center justify-between gap-2 whitespace-normal rounded-md px-0 py-2 text-left text-[13px] font-medium hover:bg-transparent",
							children: [
								"Extend your timeline to ",
								minMonths,
								" months ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-muted-foreground",
						children: "Simulations only, not financial advice."
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border-t border-border pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-medium text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4" }), " One thing to know"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-[13px] leading-relaxed text-muted-foreground",
					children: "Market-linked investments can rise or fall. For a short-term goal, don't assume a fixed return will be available exactly when you need the money."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
				className: "mt-6",
				onClick: () => navigate({ to: "/explore" }),
				children: "Explore an investment plan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-[11px] leading-relaxed text-muted-foreground",
				children: [
					"*Illustrative simulation only, assuming ",
					rateLabel,
					" annual return compounded monthly, including growth of savings and end-of-month contributions. Actual returns can be higher or lower, including negative returns."
				]
			})
		]
	});
}
function Row({ k, v, strong, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("shrink-0", strong ? "font-semibold" : "font-medium", tone === "pos" && "text-primary", tone === "warn" && "text-warning-foreground"),
			children: v
		})]
	});
}
//#endregion
export { GoalPlanner as component };
