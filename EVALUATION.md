# Evaluation

The prototype was evaluated at three levels:

1. Product and UX evaluation
2. Functional and interaction evaluation
3. Engineering and calculation evaluation

The objective was to verify both that the product hypothesis was coherent and that the prototype actually implemented the intended interactions rather than functioning as a static UI mockup.

---

## 1. Product & UX Evaluation

The prototype was reviewed against the following criteria:

| Evaluation | What was checked | Result |
|---|---|---|
| Problem clarity | Whether the goal-first investing concept is understandable | Pass |
| User flow | Whether the journey from goal creation to planning and simulation is coherent | Pass |
| Financial comprehension | Whether contribution, timeline, simulated value and gap are understandable | Pass |
| Trust | Whether simulated returns are clearly labelled and risk context is provided | Pass |
| Cognitive load | Whether the experience remains simpler than a conventional investment dashboard | Pass |
| Feature discipline | Whether the prototype remains focused on the goal-planning hypothesis | Pass |
| Product consistency | Whether the screens work together as one product experiment | Pass |

The core journey implemented in the prototype is:

**Create Goal → Select Goal → Adjust Plan → Understand Simulation → Explore Investment Concepts**

The product was intentionally kept as a prototype rather than a production brokerage application.

---

## 2. Functional Evaluation

The implementation was checked against the core user interactions.

| Evaluation | Result |
|---|---|
| Create a new goal | Pass |
| Set goal name | Pass |
| Set target amount | Pass |
| Set target date | Pass |
| Set amount already saved | Pass |
| Set monthly contribution | Pass |
| Create multiple goals | Pass |
| Keep goals independent | Pass |
| Select a specific goal | Pass |
| Display selected goal in planner | Pass |
| Change timeline | Pass |
| Change monthly contribution | Pass |
| Recalculate simulation dynamically | Pass |
| Preserve state during in-app navigation | Pass |
| Navigate between Home, Goal Planner, Explore and Portfolio | Pass |

Goals are stored in shared application state using a root-level `GoalStateProvider`. Each goal has its own identifier, allowing creation, selection, update and deletion without coupling one goal to another.

The prototype therefore goes beyond a static mockup: changing inputs modifies shared state and causes dependent calculations and UI values to update.

---

## 3. Financial Calculation Evaluation

Financial logic was separated from the UI and centralized in:

`src/lib/goal-calculations.ts`

The implementation includes reusable functions for:

- future-value calculation
- required monthly contribution
- simulation
- target-date calculation
- goal progress
- remaining gap

The simulation uses a deterministic illustrative model with an 8% annual illustrative return assumption and monthly compounding.

The calculation layer also handles:

- zero-return cases
- already-reached goals
- non-negative remaining amounts
- progress clamping
- invalid/non-finite values

The results are explicitly presented as an illustrative simulation rather than a guaranteed or expected investment outcome.

---

## 4. Edge-Case Evaluation

The calculation layer was evaluated against boundary conditions including:

- zero initial savings
- minimum monthly contribution
- maximum monthly contribution
- minimum timeline
- maximum timeline
- initial amount greater than the target
- initial amount equal to the target
- large target amounts

These cases are covered by automated tests in:

`src/test/goal-calculations.test.ts`

The implementation prevents negative remaining amounts and clamps progress values to valid ranges.

---

## 5. Automated Tests

The project uses **Vitest**.

The automated test suite was executed using:

```bash
npm test -- --run