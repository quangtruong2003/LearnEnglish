import { test, expect } from "@playwright/test";

test("shell exposes catalog navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /Trang chủ/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Flashcards/i })).toBeVisible();
  await expect(page.getByText(/Học TOEIC 45 ngày/i).first()).toBeVisible();
});
