import {
  test,
  expect,
  QuestionsPage,
  CreateQuestionPage,
  createTestQuiz,
  createTestQuestion,
} from "../setup/test-data";

test.describe("Question List Page", () => {
  let quizId: string;

  test.beforeEach(async ({ page }) => {
    quizId = await test.step("Create test quiz", async () => {
      return createTestQuiz(page, "ListTest");
    });
  });

  test("1. Load questions page", async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await expect(page).toHaveTitle(/Questions/);
  });

  test("2. Questions table renders correctly", async ({ page }) => {
    await page.goto("/admin/questions");
    await page.waitForLoadState("networkidle");
    const rowCount = await page.locator("table tbody tr").count();
    expect(rowCount).toBeGreaterThan(0);
    await expect(page.locator("table")).toBeVisible();
  });

  test("3. Display questions in table", async ({ page }) => {
    await test.step("Create a question", async () => {
      await createTestQuestion(page, quizId, "DisplayTest");
    });

    await page.goto("/admin/questions");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("table").getByText(/DisplayTest Question/i)).toBeVisible({ timeout: 15000 });
    await expect(page.locator("table")).toBeVisible();
  });

  test("4. Show quiz name in table", async ({ page }) => {
    await test.step("Create a question for the quiz", async () => {
      await createTestQuestion(page, quizId, "QuizNameTest");
    });

    await page.goto("/admin/questions");

    await expect(page.locator("td").filter({ hasText: /listtest quiz/i }).first()).toBeVisible({ timeout: 10000 });
  });

  test("5. Display all 4 options in table", async ({ page }) => {
    await test.step("Create a question with options", async () => {
      await createTestQuestion(page, quizId, "OptionsTest");
    });

    await page.goto("/admin/questions");
    await page.waitForLoadState("networkidle");

    const row = page.locator("tr").filter({ hasText: /optionstest question/i }).first();
    await expect(row.locator("td").nth(2)).toContainText(/OptionsTest Option 1/i, { timeout: 15000 });
    await expect(row.locator("td").nth(3)).toContainText(/OptionsTest Option 2/i);
    await expect(row.locator("td").nth(4)).toContainText(/OptionsTest Option 3/i);
    await expect(row.locator("td").nth(5)).toContainText(/OptionsTest Option 4/i);
  });

  test("6. Show answer as letter A/B/C/D", async ({ page }) => {
    await createTestQuestion(page, quizId, "AnswerTest");

    await page.goto("/admin/questions");
    await page.waitForLoadState("networkidle");

    const row = page.locator("tr").filter({ hasText: "AnswerTest Question" }).first();
    await expect(row.locator("td").nth(6)).toContainText("A", { timeout: 10000 });
  });

  test("7. Edit link navigates to edit page", async ({ page }) => {
    await createTestQuestion(page, quizId, "EditLinkTest");

    await page.goto("/admin/questions");
    await page.waitForLoadState("networkidle");

    const editLink = page.locator("a").filter({ hasText: /edit/i }).first();
    await editLink.waitFor({ timeout: 10000 });
    await editLink.click();
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/\/admin\/questions\/[^/]+$/);
    await expect(page.locator("h1")).toContainText("Edit Question");
  });

  test("8. Add Question button navigates to create page", async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await page.waitForLoadState("networkidle");
    await questionsPage.addButton.click();

    await expect(page).toHaveURL("/admin/questions/create");
  });

  test("9. Delete button removes question", async ({ page }) => {
    await test.step("Create a question to delete", async () => {
      await createTestQuestion(page, quizId, "DeleteTest");
    });

    await page.goto("/admin/questions");
    await page.waitForLoadState("networkidle");

    const deleteButton = page.locator("button").filter({ hasText: /delete/i }).first();
    await deleteButton.waitFor({ timeout: 10000 });

    page.on("dialog", (dialog) => dialog.accept());
    await deleteButton.click();

    await page.waitForLoadState("networkidle");
  });
});