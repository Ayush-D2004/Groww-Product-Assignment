import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as ChevronDown, n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { d as clampPercentage, f as cn, g as useGoalState, l as Screen, m as inr, t as Button } from "./goal-state-neUn1kJ_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-Bl4tK_B3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Portfolio() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { portfolio } = useGoalState();
	const concentrated = portfolio.sectors.filter((s) => s.percentage >= portfolio.concentrationThreshold);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted-foreground",
			children: "Portfolio health"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-xl font-semibold leading-tight tracking-normal",
			children: "Understand what you own"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Portfolio value"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num text-[30px] font-semibold leading-tight",
				children: inr(portfolio.totalValue)
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }),
					" ",
					portfolio.healthLabel
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 border-t border-border pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Asset allocation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex h-2 w-full overflow-hidden rounded-sm",
					children: portfolio.allocations.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: a.colorClass,
						style: { width: `${clampPercentage(a.percentage)}%` }
					}, a.category))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "num mt-3 flex justify-between text-sm",
					children: portfolio.allocations.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", a.colorClass) }),
							a.category,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: [clampPercentage(a.percentage), "%"]
							})
						]
					}, a.category))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 border-t border-border pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Sector exposure"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4",
				children: portfolio.sectors.map((s) => {
					const warn = s.percentage >= portfolio.concentrationThreshold;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "num flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("flex items-center gap-1 font-semibold", warn && "text-warning-foreground"),
							children: [
								warn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5" }),
								clampPercentage(s.percentage),
								"%"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 h-1.5 w-full rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full rounded-full", warn ? "bg-warning" : "bg-chart-4"),
							style: { width: `${clampPercentage(s.percentage)}%` }
						})
					})] }, s.name);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-7 border-t border-border pt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-medium text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
						" ",
						concentrated.length ? "High sector concentration" : "Sector diversification"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-[13px] leading-relaxed text-muted-foreground",
					children: concentrated.length ? concentrated.map((s) => `${clampPercentage(s.percentage)}% of this simulated portfolio is exposed to ${s.name.toLowerCase()}.`).join(" ") : "No single sector exceeds the concentration threshold in this simulated portfolio."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: () => setOpen(!open),
					"aria-expanded": open,
					className: "mt-2 flex h-11 items-center gap-1 px-0 text-sm font-medium text-foreground hover:bg-transparent",
					children: ["Why does this matter? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 transition-transform", open && "rotate-180") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("grid transition-all duration-200", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overflow-hidden text-[13px] leading-relaxed text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block pt-2",
							children: "If different investments are exposed to the same sector, they may move together. Diversification can reduce concentration, but it cannot eliminate investment risk."
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 text-[11px] text-muted-foreground",
			children: "Simulated portfolio for illustration only."
		})
	] });
}
//#endregion
export { Portfolio as component };
