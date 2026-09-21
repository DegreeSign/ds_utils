# Agent Rules

## Code style, formatting & patterns
- Always match the style, formatting and patterns of the surrounding code.
- `src/utils/arrays.ts` uses a single comma-chained `const` declaration; keep new
  helpers inside that chain and mirror the existing naming, JSDoc-style comments
  (`/** ... */`), 4-space indentation, arrow functions and `try/catch` +
  `console.log` error handling.
- Do not add comments unless they match the surrounding comment style.

## Versioning
- When bumping the version, update it everywhere it appears, not just
  `package.json`; also update the pinned CDN URL in `README.md`.

## Builds
- Never build this repo (`npm run build`, webpack, etc.).
- You may verify types without building, e.g. `npx tsc --noEmit`.
- `dist/` is committed to the repo. If a build is ever used for testing, always
  revert the build output before finishing: `git restore dist`.
