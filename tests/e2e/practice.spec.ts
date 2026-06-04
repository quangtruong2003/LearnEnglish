import { test, expect } from "@playwright/test";

test("practice page loads with questions visible", async ({ page }) => {
  await page.goto("/practice/bai-tap-chuyen-sau-100-cau-word-form-toeic");
  await expect(page.getByText(/Câu 1/i)).toBeVisible();
  await expect(page.getByPlaceholder(/Nhập đáp án/i)).toBeVisible();
});
