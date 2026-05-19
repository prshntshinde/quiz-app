# AGENTS.md — Quiz App

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