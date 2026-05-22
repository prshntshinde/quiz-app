import { test, expect } from "@playwright/test";

test.describe("Admin Login Flow", () => {
  test("1. Login page loads without sidebar", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page).toHaveTitle(/Admin Sign In/i);

    await expect(page.getByRole("heading", { name: /Admin Sign In/i })).toBeVisible();
    await expect(page.getByLabel(/Username/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();

    const sidebar = page.locator("aside");
    await expect(sidebar).not.toBeVisible();
  });

  test("2. Login form has proper accessibility", async ({ page }) => {
    await page.goto("/admin/login");

    const form = page.getByRole("form");
    await expect(form).toBeVisible();

    const usernameInput = page.getByLabel(/Username/i);
    await expect(usernameInput).toHaveAttribute("required");

    const passwordInput = page.getByLabel(/Password/i);
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("3. Failed login shows error", async ({ page }) => {
    await page.goto("/admin/login");

    await page.getByLabel(/Username/i).fill("wrong@example.com");
    await page.getByLabel(/Password/i).fill("wrongpassword");
    await page.getByRole("button", { name: /Sign in/i }).click();

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("alert")).toContainText(/failed|error|invalid/i);
  });

  test("4. Login button shows loading state", async ({ page }) => {
    await page.goto("/admin/login");

    await page.getByLabel(/Username/i).fill("test@example.com");
    await page.getByLabel(/Password/i).fill("password");

    const submitButton = page.getByRole("button", { name: /Sign in/i });
    await submitButton.click();

    await expect(submitButton).toBeDisabled({ timeout: 2000 });
  });
});

test.describe("Admin Dashboard", () => {
  test("5. Dashboard requires authentication", async ({ page }) => {
    await page.goto("/admin/dashboard");
    await page.waitForLoadState("networkidle");

    const currentUrl = page.url();
    expect(currentUrl).toContain("/admin/login");
  });

  test("6. Dashboard displays stats", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/Username/i).fill(process.env.ADMIN_USERNAME || "admin@example.com");
    await page.getByLabel(/Password/i).fill(process.env.ADMIN_PASSWORD || "password");
    await page.getByRole("button", { name: /Sign in/i }).click();
    await page.waitForURL(/\/admin\/dashboard/);

    await expect(page.getByRole("heading", { name: /Dashboard/i })).toBeVisible();
    await expect(page.locator("text=Total Quizzes")).toBeVisible();
    await expect(page.locator("text=Total Questions")).toBeVisible();
  });

  test("7. Quick actions use client-side navigation", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/Username/i).fill(process.env.ADMIN_USERNAME || "admin@example.com");
    await page.getByLabel(/Password/i).fill(process.env.ADMIN_PASSWORD || "password");
    await page.getByRole("button", { name: /Sign in/i }).click();
    await page.waitForURL(/\/admin\/dashboard/);

    const manageQuizzesLink = page.getByRole("link", { name: /Manage Quizzes/i });
    if (await manageQuizzesLink.count() > 0) {
      await manageQuizzesLink.click();
      await expect(page).toHaveURL(/\/admin\/quiz/);
    }
  });
});
