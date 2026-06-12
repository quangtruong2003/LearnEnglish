"use client";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { ContinueCard } from "@/components/catalog/ContinueCard";
import { StageCard } from "@/components/catalog/StageCard";
import { textbook } from "@/content/textbook";
import { useProgress } from "@/lib/store/useProgress";

function StageCardList() {
  const { progress, hydrated } = useProgress();
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {textbook.stages.map((stage) => {
        const completed = hydrated
          ? stage.chapters.filter((c) => progress.chapters[c.slug]?.status === "completed").length
          : 0;
        return <StageCard key={stage.slug} stage={stage} completedChapters={completed} />;
      })}
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <CatalogHero />
      <ContinueCard />
      <StageCardList />
    </div>
  );
}
