import {
  test,
  expect,
  CreateQuestionPage,
  QuestionsPage,
  createTestQuiz,
} from "../setup/test-data";

test.describe("Create Question Page", () => {
  let quizId: string;

  test.beforeEach(async ({ page }) => {
    quizId = await test.step("Create test quiz", async () => {
      return createTestQuiz(page, "CreateTest");
    });
  });

  test("1. Load create page", async ({ page }) => {
    const createPage = new CreateQuestionPage(page);
    await createPage.goto();

    await expect(createPage.questionTextarea).toBeVisible();
    await expect(createPage.submitButton).toBeVisible();
  });

  test("2. Quiz dropdown populated with quizzes", async ({ page }) => {
    const createPage = new CreateQuestionPage(page);
    await createPage.goto();

    const optionCount = await createPage.quizSelect.locator("option").count();
    expect(optionCount).toBeGreaterThan(1);
    const hasQuizzes = optionCount > 1;
    expect(hasQuizzes).toBe(true);
  });

  test("3. Empty form submission shows browser validation", async ({ page }) => {
    const createPage = new CreateQuestionPage(page);
    await createPage.goto();

    await expect(createPage.questionTextarea).toHaveAttribute("required", "");

    const form = page.locator("form");
    await form.evaluate((el) => (el as HTMLFormElement).checkValidity());
  });

  test("4. Create question with all fields successfully", async ({ page }) => {
    const createPage = new CreateQuestionPage(page);
    await createPage.goto();

    const timestamp = Date.now();
    await createPage.fillForm({
      quizId,
      question: `FullTestQ${timestamp}`,
      option1: `FullTestO1${timestamp}`,
      option2: `FullTestO2${timestamp}`,
      option3: `FullTestO3${timestamp}`,
      option4: `FullTestO4${timestamp}`,
      answer: 2,
      explanation: `FullTestExp${timestamp}`,
    });

    await createPage.submit();
    await page.waitForURL("/admin/questions", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });
    const questionCount = await page.locator("tbody tr").count();
    expect(questionCount).toBeGreaterThan(0);
  });

  test("5. Partial fields - missing quiz shows validation", async ({ page }) => {
    const createPage = new CreateQuestionPage(page);
    await createPage.goto();

    await createPage.questionTextarea.fill("Test question without quiz");
    await createPage.option1Input.fill("Option 1");
    await createPage.option2Input.fill("Option 2");
    await createPage.option3Input.fill("Option 3");
    await createPage.option4Input.fill("Option 4");

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toContain("All fields are required");
    });

    await createPage.submit();
  });

  test("6. Answer select shows option text after filling inputs", async ({ page }) => {
    const createPage = new CreateQuestionPage(page);
    await createPage.goto();

    await createPage.option1Input.fill("Alpha");
    await createPage.option2Input.fill("Beta");
    await createPage.option3Input.fill("Gamma");
    await createPage.option4Input.fill("Delta");

    await expect(createPage.answerSelect.locator("option").nth(0)).toContainText("Alpha");
    await expect(createPage.answerSelect.locator("option").nth(1)).toContainText("Beta");
    await expect(createPage.answerSelect.locator("option").nth(2)).toContainText("Gamma");
    await expect(createPage.answerSelect.locator("option").nth(3)).toContainText("Delta");
  });
});