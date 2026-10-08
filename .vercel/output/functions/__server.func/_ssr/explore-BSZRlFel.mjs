import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as Clock, h as ChevronDown } from "../_libs/lucide-react.mjs";
import { f as cn, g as useGoalState, l as Screen, n as Card, t as Button } from "./goal-state-Czef-VIJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-BSZRlFel.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var items = [{
	name: "Nifty 50 Index Fund",
	cat: "Equity",
	fit: "Provides exposure to a diversified basket of large Indian companies and is generally intended for long-term investing.",
	know: "Market-linked. Can fall significantly in the short term.",
	why: "An index fund is a mutual fund that simply tracks the Nifty 50 — India's 50 largest listed companies. You invest a fixed amount through a SIP, units are bought at the day's price, and costs are usually low. Because it holds only equity, its value can swing a lot over shorter periods, which matters for a goal with a fixed date."
}, {
	name: "Nifty 50 ETF",
	cat: "Index-based equity",
	fit: "Provides index exposure through an exchange-traded product.",
	know: "Market movements, liquidity and trading price can affect the experience.",
	why: "An ETF tracks the same index but trades on the stock exchange like a share. You need a demat account, buy at the live market price, and the price you get can differ slightly from the index value. It carries the same short-term market risk as the index fund."
}];
function Explore() {
	const [open, setOpen] = (0, import_react.useState)(null);
	const { selectedGoal } = useGoalState();
	const goal = selectedGoal;
	if (!goal) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		back: true,
		nav: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "break-words text-xs font-medium text-muted-foreground",
				children: [
					"For your ",
					goal.name,
					" goal"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-xl font-semibold leading-tight tracking-normal",
				children: "Understand before you invest"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "These examples show how different investments work."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border-b border-border pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-medium text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 shrink-0" }),
						" Your goal is ",
						goal.timelineMonths,
						" months away."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-[13px] leading-relaxed text-muted-foreground",
					children: "Market-linked investments can fluctuate significantly over shorter periods. Understand the trade-off before choosing an investment."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-5",
				children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-start justify-between gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-normal text-muted-foreground",
								children: "Example"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-base font-semibold",
								children: it.name
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-6 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-medium",
								children: it.cat
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Risk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-medium text-warning-foreground",
								children: "High"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3 border-t border-border pt-4 text-[13px] leading-relaxed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "Why might this fit?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-muted-foreground",
								children: it.fit
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "What should you know?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-muted-foreground",
								children: it.know
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: () => setOpen(open === i ? null : i),
							"aria-expanded": open === i,
							className: "mt-4 flex h-11 w-full items-center justify-between px-0 text-sm font-medium text-primary hover:bg-transparent",
							children: ["Why this? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 transition-transform", open === i && "rotate-180") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("grid transition-all duration-200", open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "overflow-hidden text-[13px] leading-relaxed text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block pt-2",
									children: it.why
								})
							})
						})
					]
				}, it.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-[11px] leading-relaxed text-muted-foreground",
				children: "Simulated examples for explanation only. Not a recommendation or personalised financial advice."
			})
		]
	});
}
//#endregion
export { Explore as component };
