import { test, expect } from "@playwright/test";

test.describe("Public Quiz Flow", () => {
  test("1. Home page loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Quiz App/);
    await expect(page.getByRole("heading", { name: /Test Your Knowledge/i })).toBeVisible();
  });

  test("2. Navigate to quiz listing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Start Quiz Now/i }).click();
    await expect(page).toHaveURL("/quiz");
    await expect(page.getByRole("heading", { name: /Choose Your Challenge/i })).toBeVisible();
  });

  test("3. Search functionality works", async ({ page }) => {
    await page.goto("/quiz");
    const searchInput = page.getByRole("searchbox", { name: /Search quizzes/i });
    await expect(searchInput).toBeVisible();

    await searchInput.fill("NonExistentQuiz123");
    await expect(page.getByText(/No Quizzes Found/i)).toBeVisible({ timeout: 5000 });

    await searchInput.clear();
    await expect(page.getByText(/No Quizzes Found/i)).not.toBeVisible();
  });

  test("4. Quiz questions page loads with header", async ({ page }) => {
    await page.goto("/quiz");
    await page.waitForLoadState("networkidle");

    const firstQuizLink = page.locator('a[href^="/quiz/"]').first();
    if (await firstQuizLink.count() > 0) {
      await firstQuizLink.click();
      await expect(page).toHaveURL(/\/quiz\/[^/]+$/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("link", { name: /Back to Quizzes/i })).toBeVisible();
    }
  });

  test("5. Question modal opens and displays content", async ({ page }) => {
    await page.goto("/quiz");
    await page.waitForLoadState("networkidle");

    const firstQuizLink = page.locator('a[href^="/quiz/"]').first();
    if (await firstQuizLink.count() > 0) {
      await firstQuizLink.click();
      await page.waitForLoadState("networkidle");

      const questionButton = page.getByRole("button", { name: /Open question 1/i }).first();
      if (await questionButton.count() > 0) {
        await questionButton.click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await expect(page.getByRole("heading", { name: /Question 1/i })).toBeVisible();
      }
    }
  });

  test("6. Skip navigation link works", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /Skip to main content/i });
    await expect(skipLink).toBeVisible();

    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
  });

  test("7. Dark mode toggle exists and works", async ({ page }) => {
    await page.goto("/");
    const darkModeToggle = page.getByRole("button", { name: /Switch to dark mode/i });
    await expect(darkModeToggle).toBeVisible();

    await darkModeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    const lightModeToggle = page.getByRole("button", { name: /Switch to light mode/i });
    await expect(lightModeToggle).toBeVisible();
  });

  test("8. Mobile menu works on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /Open menu/i });
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    await expect(page.getByRole("link", { name: /Home/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Quiz/i })).toBeVisible();
  });

  test("9. Pagination works on quiz listing", async ({ page }) => {
    await page.goto("/quiz");
    await page.waitForLoadState("networkidle");

    const pagination = page.getByRole("navigation", { name: /Pagination/i });
    const isVisible = await pagination.isVisible();

    if (isVisible) {
      const pageButtons = pagination.getByRole("button");
      const count = await pageButtons.count();

      if (count > 1) {
        await pageButtons.nth(1).click();
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveURL(/page=2/);
      }
    }
  });

  test("10. Progress indicator displays on quiz page", async ({ page }) => {
    await page.goto("/quiz");
    await page.waitForLoadState("networkidle");

    const firstQuizLink = page.locator('a[href^="/quiz/"]').first();
    if (await firstQuizLink.count() > 0) {
      await firstQuizLink.click();
      await page.waitForLoadState("networkidle");

      await expect(page.getByText(/Progress/i)).toBeVisible();
      await expect(page.getByText(/0 \/ \d+/)).toBeVisible();
    }
  });
});
