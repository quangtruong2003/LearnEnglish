import { slugify } from "./slugify";
import type {
  Chapter, PracticeQuestion, Section, Stage, StageSlug, Textbook, WordFormGroup,
} from "./types";

function splitRow(line: string): string[] {
  return line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((s) => s.trim()).filter(Boolean);
}

function parseWordFormGroup(rows: string[][]): WordFormGroup[] {
  const dataRows = rows.slice(1);
  return dataRows.map((row) => {
    const verbRaw = row[1]?.toLowerCase().trim() ?? "";
    if (!verbRaw || verbRaw === "---" || !/^[a-z]/.test(verbRaw)) return null;
    return {
      id: slugify(verbRaw),
      verb: verbRaw,
      noun: row[2]?.trim() || null,
      adjective: row[3]?.trim() || null,
      adverb: row[4]?.trim() || null,
    };
  }).filter((g): g is WordFormGroup => g !== null);
}

function detectStageSlug(line: string): StageSlug | null {
  // Check longest first and skip extension sections
  if (/\bPHẦN\s+III\b/.test(line) && !/MỞ RỘNG/.test(line)) return "tu-loai";
  if (/\bPHẦN\s+II\b/.test(line) && !/MỞ RỘNG/.test(line)) return "thi";
  if (/\bPHẦN\s+I\b/.test(line) && !/MỞ RỘNG/.test(line)) return "nen-tang";
  return null;
}

export function parseTextbook(md: string): Textbook {
  const lines = md.split(/\r?\n/);
  const stages: Stage[] = [];
  let currentStage: Stage | null = null;
  let currentChapter: Chapter | null = null;
  let currentSection: Section | null = null;
  let sectionBuffer: string[] = [];
  let tableBuffer: string[][] = [];

  const flushSection = () => {
    if (currentSection) currentSection.body = sectionBuffer.join("\n").trim();
    sectionBuffer = [];
  };

  const flushTable = () => {
    if (tableBuffer.length === 0) return;
    if (!currentChapter) { tableBuffer = []; return; }
    const header = tableBuffer[0];
    const headerLower = header.map((h) => h.toLowerCase());
    if (headerLower.includes("stt") && headerLower.includes("verb")) {
      const groups = parseWordFormGroup(tableBuffer);
      if (currentChapter.wordFormGroups) {
        currentChapter.wordFormGroups.push(...groups);
      } else {
        currentChapter.wordFormGroups = groups;
      }
    } else {
      const mdTable = tableBuffer.map((row) => `| ${row.join(" | ")} |`).join("\n");
      sectionBuffer.push(mdTable);
    }
    tableBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("# ") && /^#\s+PHẦN\s+[I123]/.test(line)) {
      let hasDivider = false;
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].trim() === "---") { hasDivider = true; break; }
      }
      if (!hasDivider) continue;

      const slug = detectStageSlug(line);
      if (!slug) continue;

      const index = slug === "nen-tang" ? 1 : slug === "thi" ? 2 : 3;
      flushSection();
      flushTable();
      currentStage = { slug, index: index as 1 | 2 | 3, title: line, chapters: [] };
      stages.push(currentStage);
      currentChapter = null;
      currentSection = null;
      continue;
    }

    if (line.startsWith("# ")) {
      flushSection();
      flushTable();
      currentChapter = null;
      currentSection = null;
      continue;
    }

    if (line.startsWith("## ") && /^##\s+CHƯƠNG/.test(line) && !/PHẦN MỞ RỘNG/.test(line)) {
      flushSection();
      flushTable();
      if (currentStage) {
        currentChapter = makeChapter(line, currentStage.slug, currentStage.chapters.length + 1);
        currentStage.chapters.push(currentChapter);
      }
      currentSection = null;
      continue;
    }

    if (line.startsWith("## ") && !line.startsWith("## CHƯƠNG")) {
      flushSection();
      flushTable();
      if (currentChapter) {
        currentSection = {
          id: slugify(line.slice(3).trim()),
          heading: line.slice(3).trim(),
          level: 2,
          body: "",
        };
        currentChapter.sections.push(currentSection);
      }
      continue;
    }

    if (line.startsWith("### ") || line.startsWith("#### ")) {
      flushSection();
      flushTable();
      if (currentChapter) {
        const level = line.startsWith("#### ") ? 4 : 3;
        const heading = line.slice(level + 1).trim();
        currentSection = {
          id: `${currentChapter.slug}-${slugify(heading)}`,
          heading,
          level: level as 3 | 4,
          body: "",
        };
        currentChapter.sections.push(currentSection);
      }
      continue;
    }

    if (line.startsWith("|")) {
      tableBuffer.push(splitRow(line));
      continue;
    } else {
      flushTable();
    }

    if (!currentStage) continue;

    sectionBuffer.push(line);
  }
  flushSection();
  flushTable();

  return { stages, allChapters: stages.flatMap((s) => s.chapters) };
}

function makeChapter(line: string, stage: StageSlug, chapterIndex: number): Chapter {
  const title = line.replace(/^##\s*/, "").replace(/^CHƯƠNG\s+\d+:\s*/, "").trim();
  const slug = slugify(title);
  return {
    slug,
    index: chapterIndex,
    title,
    stage,
    sections: [],
    wordFormGroups: [],
    practiceQuestions: [],
  };
}
