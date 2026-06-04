export type StageSlug = "nen-tang" | "thi" | "tu-loai";

export type Stage = {
  slug: StageSlug;
  index: 1 | 2 | 3;
  title: string;
  chapters: Chapter[];
};

export type Chapter = {
  slug: string;
  index: number;
  title: string;
  stage: StageSlug;
  sections: Section[];
  wordFormGroups?: WordFormGroup[];
  practiceQuestions?: PracticeQuestion[];
};

export type Section = {
  id: string;
  heading: string;
  level: 2 | 3 | 4;
  body: string;
};

export type WordFormGroup = {
  id: string;
  verb: string;
  noun: string | null;
  adjective: string | null;
  adverb: string | null;
};

export type PracticeChoice = { letter: "A" | "B" | "C" | "D"; text: string };

export type PracticeQuestion = {
  id: string;
  chapterSlug: string;
  ordinal: number;
  prompt: string;
  kind: "multiple_choice" | "fill_in_blank";
  choices?: PracticeChoice[];
  answer: string;
  answerWord: string;
  partOfSpeech: "Danh từ" | "Động từ" | "Tính từ" | "Trạng từ" | "Khác";
  explanation: string;
};

export type Textbook = {
  stages: Stage[];
  allChapters: Chapter[];
};
