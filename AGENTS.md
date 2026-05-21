# AGENTS.md — Quiz App

See README.md for project background and features.

## Overview

Next.js 16 app with React 19, TypeScript, and MongoDB (Mongoose).
Single-package repository. Package manager: npm. Node ≥ 18.

## Setup

```bash
npm install
cp .env.example .env.local   # set MONGODB_URI
npm run dev
```

## Commands

```bash
npm run dev                  # Start dev server
npm run build                # Production build
npm run start                # Start production server
npm run lint                 # ESLint (next/core-web-vitals)
npm run typecheck            # TypeScript check (no emit)
npm test                     # Run all Vitest tests (single run)
npm test -- --coverage       # Run tests with coverage
npm run test:watch           # Vitest watch mode
npm run test:e2e             # Playwright E2E tests
npm run test:e2e:ui          # Playwright E2E with UI
```

Default verification before committing: `npm test && npm run lint && npm run typecheck && npm run test:e2e`

## Code Style

- Formatter: ESLint (`next/core-web-vitals`). No Prettier.
- Path aliases: `@/` → project root, `@/lib/` → `lib/`, `@/libs/` → `libs/`
- ES modules only. No CommonJS.
- Do not edit files under `.next/`, `node_modules/`, or `coverage/`.
- Do not modify legacy Jest configs (`jest.config.ts`, `jest.setup.ts`) — project uses Vitest.
- Match existing component patterns in `app/components/`.

## Testing

- **Framework**: Vitest with jsdom. Legacy Jest is unused.
- **Setup**: `vitest.setup.ts` auto-starts MongoDB memory server (180s timeout). Do not manually configure MongoDB in tests.
- **Pattern**: `*.test.ts` / `*.test.tsx` co-located with source.
- **Single test**: `npm test -- <file>` or `npm test -- -t "test name"`
- **Mocking**: Use `vi.mock()` with `vi.hoisted()` for shared mock factories. Do not use top-level variables in mock factories.
- **E2E**: Playwright, tests in `e2e/`. Browser: Edge. Auto-starts dev server.
- **React 19**: "Not implemented: HTMLMediaElement pause()" warnings are safe to ignore.
- Use `act()` for React state updates. Use `findBy*` for async elements.

## PR / Commit Rules

- No direct pushes to `main`. Open a PR.
- Branch naming: use descriptive kebab-case names (e.g., `feat/add-quiz-timer`, `fix/question-validation`).
- CI checks: test with coverage, build, SonarCloud scan.
- SonarCloud project: `prshntshinde_quiz-app`.

## Security & Secrets

- Never commit `.env.local`, `.env`, or any file matching `.gitignore`.
- `MONGODB_URI` required in `.env.local`. Use `.env.example` as template.
- Do not log or echo secrets in scripts or tests.
- Do not run destructive commands (`rm -rf`, `git push --force`) without explicit instruction.

## Architecture Notes

- **App Router**: `app/` — pages, layouts, API routes.
- **Shared components**: `app/components/`
- **Server Actions**: `lib/actions/` (quiz.ts, questions.ts)
- **Utilities**: `lib/` and `libs/` (distinct directories, both aliased as `@/`)
- **Models**: `models/` (Mongoose schemas)
- **Types**: `types/` (TypeScript definitions)
- **E2E tests**: `e2e/` (Playwright)
- New pages go under `app/`. New API routes under `app/api/`. New shared components under `app/components/`.

## General Rules

### Rule 1 — Think Before Coding
State assumptions explicitly. If uncertain, ask rather than guess.
Push back when a simpler approach exists.
Stop when confused. Name what's unclear.

### Rule 2 — Simplicity First
Minimum code that solves the problem. Nothing speculative.
No features beyond what was asked. No abstractions for single-use code.

### Rule 3 — Surgical Changes
Touch only what you must. Clean up only your own mess.
Don't "improve" adjacent code, comments, or formatting.
Don't refactor what isn't broken. Match existing style.

### Rule 4 — Goal-Driven Execution
Define success criteria. Loop until verified.
Don't follow steps. Define success and iterate.

### Rule 5 — Use the model only for judgment calls
Use me for: classification, drafting, summarization, extraction.
Do NOT use me for: routing, retries, deterministic transforms.
If code can answer, code answers.

### Rule 6 — Token budgets are not advisory
Per-task: 4,000 tokens. Per-session: 30,000 tokens.
If approaching budget, summarize and start fresh.

### Rule 7 — Surface conflicts, don't average them
If two patterns contradict, pick one (more recent / more tested).
Explain why. Flag the other for cleanup. Don't blend conflicting patterns.

### Rule 8 — Read before you write
Before adding code, read exports, immediate callers, shared utilities.
If unsure why code is structured a way, ask.

### Rule 9 — Tests verify intent, not just behavior
Tests must encode WHY behavior matters, not just WHAT it does.
A test that can't fail when business logic changes is wrong.

### Rule 10 — Checkpoint after every significant step
Summarize what was done, what's verified, what's left.
If you lose track, stop and restate.

### Rule 11 — Match the codebase's conventions, even if you disagree
Conformance > taste inside the codebase.
If you genuinely think a convention is harmful, surface it. Don't fork silently.

### Rule 12 — Fail loud
"Completed" is wrong if anything was skipped silently.
"Tests pass" is wrong if any were skipped.
Default to surfacing uncertainty, not hiding it.
