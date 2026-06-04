# TOEIC 45-Day Web App

Web app học TOEIC theo lộ trình 45 ngày (3 giai đoạn). Next.js 15 + shadcn/ui.

## Stack
- Next.js 15 (App Router) + React 19
- shadcn/ui (preset `b27GcrRo`), Tailwind, dark mode (oklch)
- contentlayer-style custom parser (build-time) → typed records
- Zod-validated `localStorage` for progress
- Leitner box 5-level SRS for vocabulary
- Vitest (unit) + Playwright (E2E)

## Scripts
- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm build:content` — regenerate `content/textbook.ts` from the source markdown
- `pnpm test` — unit tests
- `pnpm test:cov` — unit tests with coverage
- `pnpm test:e2e` — Playwright E2E

## Data
Source: `GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md` (read-only).

## License
Private learning project.
