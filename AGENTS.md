# AGENTS.md

## Project
Next.js 16 (App Router) + TypeScript frontend for a flower shop. Single package, no monorepo. Yarn 4.18.0 via `.yarnrc.yml` (`nodeLinker: node-modules`). No tests and no CI configured.

## Commands
- Install: `yarn install`
- Dev server: `yarn dev` (port 3000)
- Production build (also typechecks): `yarn build`
- Start built app: `yarn start`
- Typecheck only: `yarn exec tsc --noEmit`
- `yarn lint` is currently broken: `next lint` was removed in Next.js 16 and ESLint is not installed. There is no working lint step.

## Environment
- `.env` is gitignored but required. Variables: `SERVER_URL`, `APP_URL`, `DADATA_ACCESS_KEY`, `DADATA_SECRET_KEY`. `next.config.js` forwards them to `process.env`.
- Backend currently `http://83.220.168.220:4200/api`; `APP_URL` drives `metadataBase` and a missing value breaks root layout metadata.

## Architecture
- Path alias `@/*` -> `src/*`.
- `src/app` uses the App Router; server components fetch through `src/services` (axios). `src/app/page.tsx` revalidates every 3600s.
- `src/api/api.interceptor.ts`: `axiosClassic` for public calls, `instance` for authenticated calls (Bearer access token from cookie, auto-refresh on 401).
- Auth: tokens in cookies (`accessToken`/`refreshToken`), user in `localStorage`; redux-persist persists only `cart`.
- Protected routes: `/dashboard` (`src/providers/auth-provider/protected-routes.data.ts`). Root layout detects them via the `x-invoke-path` header.
- Tailwind v4 via `@tailwindcss/postcss`; theme variables in `src/app/theme.css`; shadcn `base-nova` with aliases in `components.json`.
- SCSS modules are used alongside Tailwind. `.next/` and `next-env.d.ts` are generated; do not edit.

## Conventions
- Prettier: tabs, single quotes, no semicolons, no trailing commas, import order in `.prettierrc`. No format script; run Prettier manually.
- Strict TS (`strict`, `forceConsistentCasingInFileNames`); filenames are case-sensitive on Linux even though dev is on Windows.
- If the user mentions manual edits to a file, re-read its current contents before editing and prefer targeted `edit` over full-file `write`.
- Styling: prefer existing Tailwind scale and shared UI components (`src/components/ui`, `src/lib/utils.ts` `cn`) over arbitrary values like `text-[11px]`; check `src/app/theme.css` and neighboring components for established patterns before inventing new classes.

## Next.js 16
- This is not the Next.js you know; APIs and conventions changed. Read `node_modules/next/dist/docs` (and `node_modules/next/AGENTS.md`) before non-trivial changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
