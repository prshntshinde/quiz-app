import {
  test,
  expect,
  EditQuestionPage,
  QuestionsPage,
  createTestQuiz,
  createTestQuestion,
} from "../setup/test-data";

test.describe("Edit Question Page", () => {
  let quizId: string;
  let questionId: string;

  test.beforeEach(async ({ page }) => {
    const result = await test.step("Create test quiz and question", async () => {
      const quizId = await createTestQuiz(page, "EditTest");
      const { questionText } = await createTestQuestion(page, quizId, "EditTarget");
      return { quizId, questionText };
    });

    quizId = result.quizId;

    await test.step("Find the question's edit link by searching from last page", async () => {
      let found = false;
      for (let pageNum = 22; pageNum >= 1 && !found; pageNum--) {
        await page.goto(`/admin/questions?page=${pageNum}`);
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        const rows = page.locator("tbody tr");
        const count = await rows.count();
        for (let i = 0; i < count && !found; i++) {
          const row = rows.nth(i);
          const text = await row.textContent();
          if (text && text.includes(result.questionText.split(" ")[2])) {
            const editLink = row.locator("a").filter({ hasText: /edit/i });
            const href = await editLink.getAttribute("href");
            if (href) {
              questionId = href.split("/").pop() || "";
              found = true;
              console.log(`Found question ID: ${questionId} for: ${result.questionText} on page ${pageNum}`);
            }
          }
        }
      }

      if (!found) {
        throw new Error(`Could not find question: ${result.questionText}`);
      }
    });
  });

  test("1. Load edit page with pre-populated data", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);
    await page.waitForLoadState("networkidle");

    const title = await page.locator("h1").textContent();
    expect(title).toContain("Edit");
    await expect(editPage.questionTextarea).toBeVisible({ timeout: 10000 });
  });

  test("2. Pre-populated fields show existing values", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);
    await page.waitForLoadState("networkidle");

    await expect(editPage.questionTextarea).toBeVisible({ timeout: 10000 });
    const questionValue = await editPage.questionTextarea.inputValue();
    expect(questionValue.length).toBeGreaterThan(0);
  });

  test("3. Quiz dropdown shows current quiz selected", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);
    await page.waitForLoadState("networkidle");

    await expect(editPage.quizSelect).toBeVisible({ timeout: 10000 });
    const selectedOption = await editPage.quizSelect.locator("option:checked").textContent();
    expect(selectedOption).toBeTruthy();
  });

  test("4. Update question successfully", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);
    await page.waitForLoadState("networkidle");

    const timestamp = Date.now();
    await editPage.questionTextarea.fill(`UpdatedQ${timestamp}`);
    await editPage.option1Input.fill(`UpdatedO1${timestamp}`);
    await editPage.option2Input.fill(`UpdatedO2${timestamp}`);
    await editPage.option3Input.fill(`UpdatedO3${timestamp}`);
    await editPage.option4Input.fill(`UpdatedO4${timestamp}`);
    await editPage.answerSelect.selectOption("1");

    await editPage.submit();
    await page.waitForURL("/admin/questions", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });
  });

  test("5. Navigate back without saving", async ({ page }) => {
    const editPage = new EditQuestionPage(page);
    await editPage.goto(questionId);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    const textarea = editPage.questionTextarea;
    await textarea.waitFor({ timeout: 20000 });
    const originalQuestion = await textarea.inputValue();

    await textarea.fill("Modified");
    await page.waitForTimeout(1000);

    await page.goto(`/admin/questions/${questionId}`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    const actualValue = await textarea.inputValue();
    expect(actualValue).toEqual(originalQuestion);
  });
});