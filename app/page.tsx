import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { StreakBadge } from "@/components/dashboard/StreakBadge";
import { ContinueCard } from "@/components/dashboard/ContinueCard";

export default function Home() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lộ trình 45 ngày</h1>
        <StreakBadge />
      </header>
      <ContinueCard />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCard stageIndex={1} />
        <ProgressCard stageIndex={2} />
        <ProgressCard stageIndex={3} />
      </div>
    </div>
  );
}
