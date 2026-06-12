import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StageCard } from "@/components/catalog/StageCard";

describe("StageCard", () => {
  it("renders stage title and CTA", () => {
    render(
      <StageCard
        stage={{
          slug: "nen-tang",
          index: 1,
          title: "# Phần I — Nền tảng ngữ pháp",
          chapters: [],
        }}
        completedChapters={0}
      />
    );
    expect(screen.getByText("Giai đoạn 1")).toBeInTheDocument();
    expect(screen.getAllByText(/Mở giai đoạn 1/i)[0]).toBeInTheDocument();
  });

  it("shows progress fraction", () => {
    render(
      <StageCard
        stage={{
          slug: "nen-tang",
          index: 1,
          title: "Nền tảng",
          chapters: Array.from({ length: 4 }, (_, i) => ({
            slug: `ch${i}`,
            index: i + 1,
            title: `Chương ${i + 1}`,
            stage: "nen-tang" as const,
            sections: [],
          })),
        }}
        completedChapters={2}
      />
    );
    expect(screen.getByText("2/4 chương")).toBeInTheDocument();
  });

  it("shows 'Hoàn thành' when all chapters done", () => {
    render(
      <StageCard
        stage={{
          slug: "tu-loai",
          index: 3,
          title: "Bứt tốc",
          chapters: Array.from({ length: 5 }, (_, i) => ({
            slug: `ch${i}`,
            index: i + 1,
            title: `Chương ${i + 1}`,
            stage: "tu-loai" as const,
            sections: [],
          })),
        }}
        completedChapters={5}
      />
    );
    expect(screen.getAllByText("Hoàn thành")[0]).toBeInTheDocument();
  });
});
