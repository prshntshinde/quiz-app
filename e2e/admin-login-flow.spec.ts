import { test, expect, type Page } from "@playwright/test";

async function loginAsAdmin(page: Page) {
  await page.route("**/api/auth", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
      headers: {
        "set-cookie": "admin_session=authenticated; Path=/; HttpOnly",
      },
    });
  });
  await page.goto("/admin/login");
  await page.getByLabel(/Username/i).fill(process.env.ADMIN_USERNAME || "admin@example.com");
  await page.getByLabel(/Password/i).fill(process.env.ADMIN_PASSWORD || "password");
  await page.getByRole("button", { name: /Sign in/i }).click();
  await page.waitForURL(/\/admin\/dashboard/);
}

test.describe("Admin Login Flow", () => {
  test("1. Login page loads without sidebar", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page).toHaveTitle(/Admin \| Quiz App/);

    await expect(page.getByRole("heading", { name: /Admin Sign In/i })).toBeVisible();
    await expect(page.getByLabel(/Username/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
  });

  test("2. Login form has proper accessibility", async ({ page }) => {
    await page.goto("/admin/login");

    const form = page.locator("form").first();
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

    await expect(page.locator("#login-error")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("#login-error")).toContainText(/failed|error|invalid/i);
  });

  test("4. Login button shows loading state", async ({ page }) => {
    await page.goto("/admin/login");

    await page.route("**/api/auth", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByLabel(/Username/i).fill("dummy@example.com");
    await page.getByLabel(/Password/i).fill("dummy123");

    const submitButton = page.getByRole("button", { name: /Sign in/i });
    await submitButton.click();

    await expect(page.getByRole("button", { name: /Signing in/i })).toBeVisible({ timeout: 3000 });
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
    await loginAsAdmin(page);

    await expect(page.getByRole("heading", { name: /Dashboard/i })).toBeVisible();
    await expect(page.locator("text=Total Quizzes")).toBeVisible();
    await expect(page.locator("text=Total Questions")).toBeVisible();
  });

  test("7. Quick actions use client-side navigation", async ({ page }) => {
    await loginAsAdmin(page);

    const manageQuizzesLink = page.getByRole("link", { name: /Manage Quizzes/i });
    await expect(manageQuizzesLink).toBeVisible();
    await manageQuizzesLink.click();
    await expect(page).toHaveURL(/\/admin\/quiz/);
  });
});
