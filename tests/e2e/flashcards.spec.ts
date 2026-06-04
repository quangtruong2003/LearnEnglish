import { test, expect } from "@playwright/test";

test("seed deck, flip a card, mark remembered, card leaves the queue", async ({ page }) => {
  await page.goto("/flashcards");
  await page.getByRole("button", { name: /Tạo bộ thẻ/i }).click();
  await expect(page.getByText(/Bấm để lật/i)).toBeVisible();
  await page.getByText(/Bấm để lật/i).click();
  await expect(page.getByText(/Đáp án/i)).toBeVisible();
  await page.getByRole("button", { name: /^Nhớ$/ }).click();
  await expect(page.getByText(/Bấm để lật/i)).toBeVisible();
});
