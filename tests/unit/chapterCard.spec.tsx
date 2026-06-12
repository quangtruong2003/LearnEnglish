import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChapterCard } from "@/components/catalog/ChapterCard";

describe("ChapterCard", () => {
  it("renders chapter index and title", () => {
    render(
      <ChapterCard
        chapter={{
          slug: "cac-loai-tu",
          index: 1,
          title: "Các loại từ",
          stage: "nen-tang",
          sections: [],
        }}
      />
    );
    expect(screen.getByText("Chương 1")).toBeInTheDocument();
    expect(screen.getByText("Các loại từ")).toBeInTheDocument();
  });

  it("renders section count", () => {
    render(
      <ChapterCard
        chapter={{
          slug: "cac-loai-tu-sec",
          index: 1,
          title: "Các loại từ",
          stage: "nen-tang",
          sections: Array.from({ length: 7 }, (_, i) => ({
            id: `sec${i}`,
            heading: `Section ${i}`,
            level: 3 as const,
            body: "body",
          })),
        }}
      />
    );
    expect(screen.getByText("7 mục nội dung")).toBeInTheDocument();
  });

  it("renders open chapter CTA", () => {
    render(
      <ChapterCard
        chapter={{
          slug: "cac-loai-tu-cta",
          index: 1,
          title: "Các loại từ",
          stage: "nen-tang",
          sections: [],
        }}
      />
    );
    expect(screen.getAllByText("Mở chương 1")[0]).toBeInTheDocument();
  });
});
