# Groww for GenZ Investors

This project is a product prototype: designing Groww for first-time GenZ investors in India. The goal was not to build a full brokerage product, but to create a simple, believable experience that helps a user move from curiosity to action with minimal friction.

## Problem Take

GenZ users are usually approaching investing for the first time. They are balancing small salaries, part-time income, studies, and short-term financial goals. They do not want a complex market terminal. They want a fast answer to a simple question: “What am I investing for, and what should I do next?”

The product direction here is goal-first investing. Instead of starting with instruments, charts, or jargon, the app starts with a goal. That makes the experience easier to understand, more personal, and better suited to users who are new to finance.

## What Was Built

The app now follows a simple flow:

Home -> + New Goal -> Create Goal -> Save -> Home -> Select Goal -> Goal Plan / Simulation

Key behaviors:

- Users can create multiple goals.
- Each goal stores its own target amount, target date, amount already saved, and monthly contribution.
- The home screen shows all goals in a shared state list.
- Tapping a goal opens that goal’s own plan page.
- Editing one goal does not affect the others.
- The old hardcoded Japan-trip behavior was removed from the UI and turned into ordinary demo goal data.

## In Scope

- Goal creation and goal listing
- Goal-specific simulation and edit flow
- Shared app state across navigation
- A clean mobile-first experience for first-time investors
- A lightweight explanation layer that helps users understand investing without overwhelming them

## Out of Scope

- Real brokerage execution
- Bank account linking
- Live market data
- KYC or onboarding flows
- Portfolio recommendations based on real financial profiles
- Backend persistence or user accounts

This is intentionally a frontend prototype with mock data so the interaction model stays focused.

## Why This Solution

For GenZ users, the most important part of the experience is confidence. A goal-led entry point reduces intimidation and makes investing feel like planning instead of speculation. The design also keeps the app lightweight and fast:

- users can add a goal in one simple form,
- see immediate progress feedback,
- and revisit the same goal later without losing state.

That flow is better aligned with a first paycheck or first savings habit than a dense finance dashboard.

## Tools Used

This project was built with help from:

- Lovable, for fast UI scaffolding and iterative product building
- GitHub Copilot, for implementation support, debugging, and code completion

## Tech Stack

- React
- TanStack Start / TanStack Router
- Vite
- TypeScript
- Tailwind CSS

## Build And Run

```sh
npm install
npm run dev
```

## Deployment

The app is configured for Vercel deployment and builds into Vercel output successfully.

## Notes For Reviewers

- The app is a prototype and uses local shared state plus mock data by design.
- The intent was to show product thinking and interaction design for GenZ, not to ship a full finance backend.
- The experience prioritizes clarity, quick action, and goal ownership over feature density.
