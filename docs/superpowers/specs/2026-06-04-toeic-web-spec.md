# TOEIC 45-Day Web App — Specification

> **For agentic workers:** Spec for the implementation plan. Approved by user before plan writing.

**Date:** 2026-06-04
**Author:** Brainstorming session
**Status:** Draft (awaiting user review)

---

## 1. Goal

Build a Next.js web app that turns the markdown textbook `GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md` (3086 lines, 12 chapters across 3 stages) into an interactive study tool. The user wants to learn and retain TOEIC Part 5 grammar / tenses / word-form content better by reading, tracking progress, doing practice questions, and reviewing with Leitner-box flashcards.

## 2. User & Success Criteria

**Primary user:** A single Vietnamese learner (the user) preparing for TOEIC 700+, working through the 45-day plan solo on their own machine.

**Success criteria:**
- The user can open any chapter, read the rendered markdown, search across the textbook, mark chapters as "in progress / done", and track study streak.
- The user can do Word-Form multiple-choice quizzes per chapter and see a score.
- The user can review vocabulary from Chapter 9 (100+ word-form groups) with a Leitner flashcard system.
- All progress persists in `localStorage` (no backend, no login, works offline).
- App is keyboard-navigable, dark-mode by default (user supplied dark oklch token set), responsive on phone and desktop.

**Non-goals (out of scope for v1):**
- No multi-user, no cloud sync, no auth.
- No TOEIC listening/reading audio (Part 1-4). Only Part 5 grammar / tenses / word-form is in scope, matching the source textbook.
- No content authoring / CMS. The textbook is the single source of truth and is read-only.
- No mobile app (PWA only if cheap; otherwise responsive web only).

## 3. Source Material

A single markdown file: `GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md` (3086 lines), structured as:

- **Stage 1 — Grammar foundation (lines 10-1037):** 4 chapters covering Parts of Speech, Sentence Structure, Phrases/Clauses, Common Grammar Errors.
- **Stage 2 — Tense system (lines 1038-2288):** 3 chapters covering 12 tenses, comparison table, advanced tenses practice.
- **Stage 3 — Part of Speech TOEIC (lines 2289-3058):** 5 chapters covering position-based word-form rules, the 100+ word-form groups table, the 5 question types (Noun/Verb/Adjective/Adverb/Mixed), high-score strategy, 100 deep-practice questions.

Notable embedded content: many GFM tables, blockquotes for tips, code blocks for examples, and the 100 multiple-choice practice questions in Chapter 12 (each question is a numbered list with 4 lettered options followed by an "**Giải thích**" section).

## 4. Architecture

A single Next.js 15 App Router project. Contentlayer (or its modern successor `@contentlayer2/core`) reads the source markdown at build time and exposes typed `Stage`, `Chapter`, `Section`, and `PracticeQuestion` records. The runtime layer is a set of client components that read those records and let the user interact with them. All user state (progress, quiz results, Leitner deck) lives in a typed `useLocalStore` hook backed by `localStorage`, with a small Zod-validated schema so a corrupted store does not break the app.

Three top-level routes:

- `/` — Home / Dashboard: progress per stage, streak, "Continue where you left off" card.
- `/giai-doan/[stage]/chuong/[chapter]` — Reader: rendered markdown + section navigation + "Mark complete" + "Start practice" button (when the chapter has questions).
- `/flashcards` — Leitner flashcard review for Chapter 9 word-form groups.
- `/practice/[chapter]` — Quiz runner for any chapter that has practice questions (most relevant for Chapter 12's 100 questions, but the same UI works for any chapter that has a `## BÀI TẬP` section).

A small set of utilities under `lib/` owns the data model: `parseTextbook.ts` (build-time), `leitner.ts` (pure SRS logic, fully unit-tested), `progressStore.ts` (localStorage hook), `searchIndex.ts` (client-side MiniSearch over chapter text).

## 5. Tech Stack

- **Framework:** Next.js 15 (App Router, RSC where helpful, client components for interactive parts).
- **UI:** shadcn/ui, scaffolded with `pnpm dlx shadcn@latest init --preset b27GcrRo --template next`. Use the user's supplied oklch tokens verbatim (both light and dark variants already supplied; light is the unused-but-defined variant, dark is the active theme by default).
- **Content:** `@contentlayer2/core` + `contentlayer2-source-files` to type the markdown into `Stage`, `Chapter`, `Section`, `PracticeQuestion` records. (Fallback: `next-mdx-remote` with a hand-rolled parser if Contentlayer proves fragile in the workspace's node version.)
- **Styling:** Tailwind CSS (auto-installed by shadcn preset), `lucide-react` for icons, `next-themes` for the light/dark toggle.
- **Search:** `minisearch` (client-side, ~30 KB gzipped, no server round-trip).
- **SRS:** Hand-rolled Leitner box in `lib/leitner.ts` (5 boxes; pure functions, no deps).
- **Validation:** `zod` for the localStorage schema and the parsed quiz answers.
- **Markdown rendering:** `react-markdown` + `remark-gfm` (Contentlayer emits MDX but we render to plain HTML for the reader, so we keep it simple).
- **Testing:** Vitest (unit) + Playwright (E2E). `pnpm test` runs unit; `pnpm test:e2e` runs Playwright headless.
- **Package manager:** pnpm.
- **Git:** Repo initialized in Task 1; remote `https://github.com/quangtruong2003/LearnEnglish.git` added but not pushed until the final task.

## 6. Data Model

### 6.1 Build-time (Contentlayer)

```ts
type Stage = {
  slug: 'nen-tang' | 'thi' | 'tu-loai';   // giai-doan-1, giai-doan-2, giai-doan-3
  index: 1 | 2 | 3;
  title: string;                          // "GIAI ĐOẠN 1 — NỀN TẢNG NGỮ PHÁP"
  chapters: Chapter[];
};

type Chapter = {
  slug: string;                           // "cac-loai-tu"
  index: number;                          // 1..12
  title: string;                          // "CÁC LOẠI TỪ (PARTS OF SPEECH)"
  stage: 'nen-tang' | 'thi' | 'tu-loai';
  sections: Section[];
  wordFormGroups?: WordFormGroup[];       // populated only for Chapter 9
  practiceQuestions?: PracticeQuestion[]; // populated only when the chapter has them
};

type Section = {
  id: string;                             // slugified heading, used for in-page anchors
  heading: string;
  level: 2 | 3 | 4;
  body: string;                           // raw markdown for this section
};

type WordFormGroup = {
  id: string;                             // stable id derived from the verb
  verb: string;
  noun: string | null;
  adjective: string | null;
  adverb: string | null;
};

type PracticeQuestion = {
  id: string;                             // chapterSlug + ordinal, e.g. "bai-tap-chuyen-sau-1"
  chapterSlug: string;
  ordinal: number;
  prompt: string;                         // the sentence with the blank
  choices: { letter: 'A' | 'B' | 'C' | 'D'; text: string }[];
  answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
};
```

### 6.2 Runtime (localStorage)

```ts
// lib/progressStore.ts

type Progress = {
  schemaVersion: 1;
  chapters: Record<string, ChapterProgress>;     // key = chapterSlug
  quizResults: Record<string, QuizRunResult[]>;  // key = chapterSlug
  leitner: LeitnerState;
  streak: { lastStudyDate: string /* ISO date */; days: number };
  updatedAt: string;                             // ISO timestamp
};

type ChapterProgress = {
  status: 'unread' | 'in_progress' | 'completed';
  updatedAt: string;
  scrollPosition?: number;
};

type QuizRunResult = {
  id: string;                                    // uuid
  chapterSlug: string;
  startedAt: string;
  finishedAt: string;
  answers: { questionId: string; chosen: 'A' | 'B' | 'C' | 'D' | null; correct: boolean }[];
  scorePct: number;
};

type LeitnerState = {
  schemaVersion: 1;
  cards: Record<string, LeitnerCard>;            // key = wordFormGroupId
};

type LeitnerCard = {
  groupId: string;
  box: 1 | 2 | 3 | 4 | 5;                        // box 1 = review daily, box 5 = review weekly+
  nextReviewAt: string;                          // ISO date
  lastResult: 'unknown' | 'forgot' | 'remembered';
};
```

The whole `Progress` object is round-tripped through Zod on every read/write. A failed parse resets to the empty default and logs a warning; we never throw on bad data.

## 7. Components & Files (locked-in decomposition)

```
app/
  layout.tsx                       root layout, theme provider, sidebar
  page.tsx                         dashboard
  giai-doan/[stage]/page.tsx       stage overview (chapter list + progress)
  giai-doan/[stage]/chuong/[chapter]/page.tsx
                                  reader view (RSC, renders <Reader> with serialized chapter)
  practice/[chapter]/page.tsx      quiz runner
  flashcards/page.tsx              Leitner review

components/
  ui/...                           shadcn-generated, untouched
  reader/
    Reader.tsx                     renders Section[] with react-markdown, handles "mark complete" + scroll-save
    ChapterNav.tsx                 in-page TOC (auto-generated from section headings)
    TipBlock.tsx                   styled > blockquotes
    WordFormTable.tsx              renders the 100-row table for Chapter 9
  practice/
    QuizRunner.tsx                 one question at a time, instant feedback
    QuizResults.tsx                score + per-question review
  flashcards/
    FlashcardDeck.tsx              picks due cards, animates flip
    FlashcardStats.tsx             boxes distribution + due-today count
  dashboard/
    ProgressCard.tsx               per-stage ring
    StreakBadge.tsx
  layout/
    Sidebar.tsx
    ThemeToggle.tsx
    SearchBar.tsx                  client-side MiniSearch

lib/
  content/
    parseTextbook.ts               called at build via contentlayer, splits the source md
    types.ts                       Stage/Chapter/... types
  store/
    progressStore.ts               useProgress() hook, Zod-validated localStorage
    leitner.ts                     pure Leitner functions: due(card, now), promote(card, result), demote(card, result)
    quizSession.ts                 pure quiz scoring helpers
  search/
    searchIndex.ts                 builds a MiniSearch index from serialized chapter data
  util/
    cn.ts                          shadcn cn helper
    streak.ts                      pure streak math

content/
  textbook.md                      symlink or copy of the source .md so contentlayer can read it
  textbook.d.ts                    contentlayer generated (gitignored)

tests/
  unit/
    leitner.spec.ts                the SRS algorithm — the highest-leverage unit test
    parseTextbook.spec.ts          golden test on the real textbook
    quizSession.spec.ts            score + per-question correctness
    progressStore.spec.ts          localStorage round-trip + corruption recovery
    streak.spec.ts
  e2e/
    reader.spec.ts                 open chapter, mark complete, see it on dashboard
    practice.spec.ts               answer 5 questions, see score
    flashcards.spec.ts             flip card, mark remembered, card moves to next box
```

**Decomposition principle:** each file owns one concern. `Reader.tsx` does not know about the dashboard; `leitner.ts` has zero React, zero localStorage; `progressStore.ts` is the only file that touches `window.localStorage`. Files that change together live together — `QuizRunner` and `QuizResults` are both in `components/practice/`, not split across folders by technical layer.

## 8. Leitner Algorithm (locked-in spec)

5 boxes. New cards start in **box 1** with `nextReviewAt = today`.

- **Remembered** → promote to `min(box + 1, 5)`. Next review:
  - box 1 → +1 day
  - box 2 → +2 days
  - box 3 → +4 days
  - box 4 → +7 days
  - box 5 → +14 days
- **Forgot** → demote to box 1. Next review: +1 day.
- A card is "due" if `nextReviewAt <= today` (date-only comparison, local timezone).
- "Today" is the user's local date, recomputed on every render — no timers, no intervals.

This is implemented in pure functions in `lib/leitner.ts` and is the **first** unit test written. No business logic in components.

## 9. UX Flows (acceptance-level, not pixel-perfect)

### 9.1 Reader flow
1. User lands on `/`, sees three stage cards. Stage 1 shows "2/4 completed".
2. Clicks a chapter → reader page renders markdown with sticky section nav on the left, "Mark complete" button bottom-right.
3. On click, the chapter status flips to "completed" and a toast confirms.
4. Returning to the chapter opens at the last scroll position (saved on `beforeunload`).

### 9.2 Practice flow
1. From a chapter page (or stage page), click "Start practice" — only visible if the chapter has `practiceQuestions.length > 0`.
2. QuizRunner shows one question at a time, 4 choices. User selects → instant feedback (green/red + explanation). "Next" advances.
3. Final screen shows score, time taken, and a "Review answers" link.

### 9.3 Flashcard flow
1. `/flashcards` shows due-today count and a "Start review" button. If 0 due, shows a friendly "All caught up, come back tomorrow" state.
2. User flips the card (click or Space), then picks "Forgot" (Again) or "Remembered" (Good). Card moves to the next box per §8.
3. After all due cards are reviewed, the empty state appears and a confetti-free success message shows.

## 10. Error Handling

- **Corrupted localStorage:** Zod parse fails → reset to default, log a `console.warn`, surface a one-time toast "Your saved progress was reset."
- **Chapter with no practice questions:** "Start practice" button is hidden, not disabled.
- **Empty flashcard deck (first visit):** `/flashcards` shows "Generate deck" button that derives a `WordFormGroup` for every row in Chapter 9 and seeds box-1 cards.
- **Markdown parse failure (contentlayer):** Build fails loudly with the line number — never silently drops content.
- **Search returns no results:** empty state with a hint to try a shorter query.

## 11. Testing Strategy

- **Unit (Vitest):** all of `lib/**`. The textbook parser has a golden test that runs against the real `textbook.md` and asserts the chapter count, the 100+ word-form groups, and the first 5 practice questions. Coverage target: 80% lines on `lib/**`.
- **Component (Vitest + Testing Library):** `QuizRunner` (correct/incorrect feedback), `FlashcardDeck` (flip + advance), `ProgressCard` (renders ring percent). One spec per non-trivial component.
- **E2E (Playwright):** three critical-path specs as listed in §7. Run headless on `pnpm dev`, expect all green before each commit that lands on `main`.
- **TDD order:** for every task, the failing test is written and confirmed red before the implementation goes in. The plan enforces this with explicit "Step 1: write the failing test" / "Step 2: run it, see it fail" steps.

## 12. Out-of-Scope & Future Work (explicit)

- No auth, no cloud sync, no multi-device.
- No content editing UI. The textbook is the source of truth.
- No Part 1-4 listening/reading content. Only Part 5 grammar/word-form, matching the source.
- No PWA install prompt (responsive web only for v1).
- No i18n of the UI (UI is Vietnamese-first; English terms are kept inline as in the source).
- Future: server-side progress sync, spaced-repetition export to Anki, mock TOEIC test generator from the practice question bank.

## 13. Open Questions

None at the time of writing — all clarifying questions answered during brainstorming (see conversation log):

- Scope: Full (read + progress + practice + SRS).
- Data layer: contentlayer from filesystem.
- Storage: localStorage.
- UI language: Vietnamese-primary with English terms kept.
- Tests: full TDD (unit + integration + E2E).
- Git: init in Task 1, push to `https://github.com/quangtruong2003/LearnEnglish.git` at the end.
- SRS algorithm: Leitner box (5 levels).
