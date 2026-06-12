import { StreakBadge } from "@/components/catalog/StreakBadge";

export function CatalogHero() {
  return (
    <section className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Học TOEIC 45 ngày
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Chọn lộ trình học TOEIC
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Bắt đầu từ giai đoạn phù hợp, theo dõi tiến độ theo chương và quay lại đúng bài đang học.
          </p>
        </div>
        <StreakBadge />
      </div>
    </section>
  );
}
