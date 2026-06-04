import { test, expect } from "@playwright/test";

test("open chapter, mark complete, see it on dashboard", async ({ page }) => {
  await page.goto("/giai-doan/nen-tang/chuong/cac-loai-tu-parts-of-speech");
  await expect(page.getByRole("heading", { name: /CÁC LOẠI TỪ/i })).toBeVisible();
  await page.getByRole("button", { name: /Đánh dấu hoàn thành/i }).click();
  await page.goto("/");
  await expect(page.getByText(/CÁC LOẠI TỪ/i)).toBeVisible();
});
