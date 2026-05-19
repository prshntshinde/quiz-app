# AGENTS.md — Quiz App

These rules apply to every task in this project unless explicitly overridden.

## Key Commands

```bash
npm run dev        # Start dev server (Next.js)
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm test           # Run all tests (Vitest)
npm test -- --coverage  # Run with coverage
```

## Testing

- **Framework**: Vitest (not Jest), with jsdom environment
- **Setup**: Tests auto-start MongoDB memory server (180s timeout)
- **Pattern**: `*.test.ts` and `*.test.tsx` in same folders as source
- **Mocking**: Use `vi.mock()` for modules; use `vi.hoisted()` for shared mock objects to avoid hoisting issues
- **Common issues**: Use `act()` for React state updates, `findBy*` for async elements

## Path Aliases

- `@/` → project root (e.g., `@/components/Button`)
- `@/lib/` → `lib/` directory
- `@/libs/` → `libs/` directory

## Architecture

- **Stack**: Next.js 16 + React 19 + TypeScript + MongoDB (Mongoose)
- **Testing**: Vitest + Testing Library
- **Components**: `app/components/` (shared), `app/[page]/` (routes)
- **Server Actions**: `lib/actions/` (quiz.ts, etc.)
- **Models**: `models/` (MongoDB schemas)

## Common Pitfalls

1. **vi.mock hoisting**: Don't use top-level variables in mock factories—use `vi.hoisted()`
2. **ESLint `--run` bug**: Don't pass `--run` to npm test, the script already includes it
3. **MongoDB in tests**: Tests connect to in-memory MongoDB automatically via vitest.setup.ts
4. **React 19**: Some tests may hit "Not implemented: HTMLMediaElement pause()" warnings—safe to ignore

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