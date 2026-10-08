# Prompt Archive and Product Engineering Notes

This file documents the prompt sequence used to shape the prototype and makes the intent behind the work explicit.

---

## 1. Project Context and Intent

This project is a mobile-first, Groww-inspired prototype focused on helping first-time investors move from abstract financial products to concrete life goals. The experience is intentionally limited to a mock, educational environment and is designed to be persuasive without suggesting real financial advice or live transactional capability.

### Objective

Build and validate a high-fidelity interaction prototype that helps a first-time investor answer:

- What am I saving for?
- How much do I need?
- How long do I have?
- How much do I need to contribute each month?
- What are the trade-offs and risks of the plan?

### Core product principle

Move from products to outcomes.

The product should not feel like a generic fintech app or a decorative Gen Z redesign. It should feel like a plausible extension of the existing Groww product language, with strong trust signals and clear financial education.

### Constraints

- No real backend, brokerage, authentication, or payment integration
- No real financial or market data
- No misleading guarantees or expected returns
- No redesign beyond the existing app structure and visual language
- No feature bloat or unrelated product concepts
- All calculations must be deterministic and clearly labelled as illustrative

---

## 2. Prompt 1 — Initial Product Definition

### Objective

Create a high-fidelity mobile prototype for a goal-based investing flow inside an existing Groww-like application. The prototype should be designed for Indian first-time investors and should help users translate a personal life goal into a simple savings plan.

### Product hypothesis

First-time investors often understand what they want to achieve, but not how to think in terms of investment products. The product should therefore shift the conversation from product selection to goal outcome.

Example:

> I want to save ₹1.5 lakh for a Japan trip.

Not:

> Which mutual fund or ETF should I buy?

### Required behavior

The main interaction flow should be:

Goal → Time → Monthly Contribution → Understand Outcome → Understand Investment

### Design requirements

Use the existing Groww app as the primary visual reference.

The UI should follow these principles:

- Light neutral backgrounds
- Dark typography
- Restrained green accents
- Strong content hierarchy
- Clean spacing and mobile-first layout
- Clear call-to-action hierarchy
- Subtle cards and separators
- Financial values that are easy to scan
- Minimal visual noise

Avoid:

- gradients
- heavy shadows
- excessive rounding
- glassmorphism
- gaming aesthetics
- superficial Gen Z styling

### Core screens required

1. Home screen
   - Primary message should be: “What are you investing for?”
   - Feature a single prominent goal card as the focal point
   - Keep secondary product discovery content lower priority

2. Goal planner
   - User can edit target amount, timeline, and monthly contribution
   - These inputs must update the outcome immediately
   - Must show simulated value, total contribution, gap, and progress
   - Use clearly labelled illustrative assumptions

3. Investment explorer
   - Explain educational examples such as Nifty 50 fund and ETF
   - Focus on concept and risk understanding, not recommendation

4. Portfolio health
   - Show simple portfolio allocation and sector concentration
   - Emphasize beginner understanding and trust

### Interaction requirements

The prototype should feel alive and functional, not static.

Required interactions:

- Open a goal from Home
- Change the timeline
- Change the monthly contribution
- See all calculations update immediately
- Navigate to an investment explanation
- Expand and collapse explanations
- Open portfolio health
- Preserve navigation and interaction state
- Keep the layout responsive around 390px mobile width

### Safety and trust requirements

- Mock data only
- No live market data or financial account integration
- No financial advice framing
- No implied guarantees
- Any forecast should be explicitly labelled as illustrative

### Product principles

The prototype should:

1. Simplify the decision without hiding important information
2. Avoid jargon before the user has a goal in context
3. Use progressive disclosure
4. Maintain one dominant action per screen
5. Keep the interface calm and readable
6. Prioritize trust over novelty
7. Avoid trading-frequency or gamified behaviour

---

## 3. Prompt 2 — Visual Fidelity and Design Refinement

### Objective

Improve the prototype’s visual fidelity while preserving the original product flow and financial logic. The goal is to make the experience feel like an actual Groww product rather than a generic AI-generated concept.

### Execution constraints

- Do not redesign the product flow
- Do not alter the existing financial logic or product intent
- Do not add new features
- Keep the mobile foundation and interaction model intact

### Visual priorities

- Remove unnecessary decoration
- Remove gradients and noisy effects
- Reduce heavy shadows and over-rounding
- Increase spacing and hierarchy
- Use restrained typography and stronger financial emphasis
- Keep the interface visually mature and product-like
- Use Groww-inspired green sparingly and consistently
- Maintain a minimal navigation pattern

### Acceptance criteria

The UI should feel like a real Groww feature designed by the same product/design team, with a checked and disciplined visual system rather than AI-heavy styling.

---

## 4. Prompt 3 — Product and UX Audit

### Objective

Act as a senior PM and senior product designer and assess the prototype as if reviewing a real internship assignment.

### Audit focus

Evaluate:

- problem clarity
- user flow
- goal-planning interaction
- financial comprehension
- trustworthiness
- visual hierarchy
- Groww consistency
- mobile usability
- cognitive load
- feature discipline

### Questions to answer

1. Does this feel like a credible product experiment inside Groww?
2. Is the core idea understandable in ~10 seconds?
3. Is a Japan goal useful or does it feel gimmicky?
4. Does the interface accidentally imply guaranteed outcomes?
5. Is the user being pushed into a financial decision before enough context is shown?
6. Does Portfolio Health add beginner value?
7. Are there unnecessary features or distracting elements?
8. Does the interface feel AI-generated or too polished in a superficial way?
9. What are the three most impactful improvements?

### Product direction from the audit

The follow-up direction should focus on:

- reducing mismatch between short-term goals and risk-heavy examples
- making uncertainty more visible at the point of projection
- tightening the product around the goal-definition + planning + understanding loop

---

## 5. Prompt 4 — Architecture and State Refactor

### Objective

Refactor the prototype architecture without redesigning the visual experience. The intent is to move away from hardcoded, Japan-specific logic into a general goal-first architecture.

### Required data flow

User Inputs → Central Application State → Derived Calculations → UI

### Architectural requirements

- Maintain a single source of truth for the current goal or selected goal
- Keep business logic out of UI components
- Derive values instead of storing duplicates
- Store only primary inputs and compute the rest
- Preserve navigation and interaction state across screens
- Ensure the system supports multiple goals independently

### Primary input fields

```text
goal = {
  id,
  name,
  icon,
  targetAmount,
  targetDate,
  timelineMonths,
  monthlyContribution,
  initialAmount,
  createdAt
}
```

### Derived calculations that should be computed from primary inputs

- remaining amount
- progress percentage
- total contribution
- illustrative value
- goal gap
- target date
- required monthly contribution

Do not independently store duplicated derived values.

### Simulation requirements

Create reusable calculation functions rather than embedding financial logic inside UI components.

Example functions:

```text
calculateFutureValue(...)
calculateGoalProgress(...)
calculateRemainingGap(...)
calculateRequiredMonthlyContribution(...)
calculateTargetDate(...)
calculateSimulation(...)
```

The simulation must be:

- deterministic
- immediate and reactive to input changes
- clearly labelled as illustrative
- not described as guaranteed, expected, or certain

### State separation

Separate application state from UI state.

Application state includes:

- goal values
- portfolio data
- simulation inputs

UI state includes:

- expanded sections
- selected tabs
- editing state
- explanation visibility
- selected investment

Important: opening or closing accordions or toggling explanatory panels must not reset the user’s goal or simulation values.

### Multiple goals requirement

The architecture must support multiple independent goals such as:

- Japan trip
- MacBook
- Emergency fund
- Goa trip
- Master’s degree
- Wedding
- New bike
- Custom goals

The goal name and icon must not be hardcoded to Japan.

Each goal should maintain its own values and calculations independently.

### Portfolio-data requirement

Represent portfolio data as structured mock data rather than hardcoded values inside screen components.

Example:

```text
portfolio = {
  totalValue,
  allocations: [
    { category, percentage }
  ],
  sectors: [
    { name, percentage }
  ]
}
```

UI components should render from this data structure rather than embed values directly.

---

## 6. Prompt 5 — Reliability, Edge Cases, and Verification Discipline

### Objective

Ensure the implementation remains stable under realistic edge cases and that the prototype behaves correctly under repeated AI-assisted iteration.

### Edge cases to validate

- initial amount = 0
- initial amount >= target
- initial amount > target
- minimum monthly contribution
- maximum monthly contribution
- minimum timeline
- maximum timeline
- large target amounts

### UI safety constraints

The UI must never display:

- NaN
- undefined
- negative progress
- negative remaining amounts
- stale values
- inconsistent values between screens

### Verification expectations

Every AI-assisted iteration should validate:

- app renders without runtime errors
- route navigation preserves state
- calculations remain consistent with the current inputs
- no hardcoded assumptions remain in the active app flow
- no unsupported or duplicate derived values are introduced

This is essential because AI-driven code generation often introduces superficial but real failures: stale state, mismatched totals, duplicated logic, and route-specific hardcoding.

### Quality bar

The implementation should not be considered done merely because it “looks right.” It must pass the product and technical checks: logic continuity, state consistency, and behavior under realistic edge conditions.
