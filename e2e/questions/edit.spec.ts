import {
  test,
  expect,
  EditQuestionPage,
  QuestionsPage,
  createTestQuiz,
  createTestQuestion,
  loginAsAdmin,
} from "../setup/test-data";

test.describe("Edit Question Page", () => {
  let quizId: string;
  let questionId: string;

  test.beforeEach(async ({ page }) => {
    await test.step("Login as admin", async () => {
      await loginAsAdmin(page);
    });
    const result = await test.step("Create test quiz and question", async () => {
      const quizId = await createTestQuiz(page, "EditTest");
      const { questionId } = await createTestQuestion(page, quizId, "EditTarget");
      return { quizId, questionId };
    });

    quizId = result.quizId;
    questionId = result.questionId;
  });

  test("1. Load edit page with pre-populated data", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);

    await expect(editPage.questionTextarea).toBeVisible({ timeout: 10000 });
    const title = await page.locator("h1").textContent();
    expect(title).toContain("Edit");
  });

  test("2. Pre-populated fields show existing values", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);

    await expect(editPage.questionTextarea).toBeVisible({ timeout: 10000 });
    const questionValue = await editPage.questionTextarea.inputValue();
    expect(questionValue.length).toBeGreaterThan(0);
  });

  test("3. Quiz dropdown shows current quiz selected", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);

    await expect(editPage.quizSelect).toBeVisible({ timeout: 10000 });
    const selectedOption = await editPage.quizSelect.locator("option:checked").textContent();
    expect(selectedOption).toBeTruthy();
  });

  test("4. Update question successfully", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);

    const timestamp = Date.now();
    await editPage.questionTextarea.fill(`UpdatedQ${timestamp}`);
    await editPage.option1Input.fill(`UpdatedO1${timestamp}`);
    await editPage.option2Input.fill(`UpdatedO2${timestamp}`);
    await editPage.option3Input.fill(`UpdatedO3${timestamp}`);
    await editPage.option4Input.fill(`UpdatedO4${timestamp}`);
    await editPage.answerSelect.selectOption("1");

    await editPage.submit();
    await page.waitForURL("/admin/questions", { timeout: 15000 });

    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });
  });

  test("5. Navigate back without saving", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);

    const textarea = editPage.questionTextarea;
    await expect(textarea).toBeVisible({ timeout: 10000 });
    const originalQuestion = await textarea.inputValue();

    await textarea.fill("Modified");

    await page.goto(`/admin/questions/${questionId}`);
    await expect(textarea).toBeVisible({ timeout: 10000 });
    const actualValue = await textarea.inputValue();
    expect(actualValue).toEqual(originalQuestion);
  });
});