import { test as base, Page, Locator } from "@playwright/test";

export interface QuestionData {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
  explanation?: string;
  quizId?: string;
}

export interface QuizData {
  title: string;
  description: string;
}

const COMMON_SELECTORS = {
  quizSelect: "select[name='quiz_id']",
  questionTextarea: "textarea[name='question']",
  option1: "input[name='option1']",
  option2: "input[name='option2']",
  option3: "input[name='option3']",
  option4: "input[name='option4']",
  answerSelect: "select[name='answer']",
  explanationTextarea: "textarea[name='explanation']",
} as const;

class BaseQuestionPage {
  readonly page: Page;
  readonly quizSelect: Locator;
  readonly questionTextarea: Locator;
  readonly option1Input: Locator;
  readonly option2Input: Locator;
  readonly option3Input: Locator;
  readonly option4Input: Locator;
  readonly answerSelect: Locator;
  readonly explanationTextarea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quizSelect = page.locator(COMMON_SELECTORS.quizSelect);
    this.questionTextarea = page.locator(COMMON_SELECTORS.questionTextarea);
    this.option1Input = page.locator(COMMON_SELECTORS.option1);
    this.option2Input = page.locator(COMMON_SELECTORS.option2);
    this.option3Input = page.locator(COMMON_SELECTORS.option3);
    this.option4Input = page.locator(COMMON_SELECTORS.option4);
    this.answerSelect = page.locator(COMMON_SELECTORS.answerSelect);
    this.explanationTextarea = page.locator(COMMON_SELECTORS.explanationTextarea);
  }

  protected async submitForm(button: Locator) {
    await button.click();
  }
}

export class QuestionsPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly questionsTable: Locator;
  readonly emptyMessage: Locator;
  readonly paginationInfo: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole("link", { name: /add question/i });
    this.questionsTable = page.locator("table");
    this.emptyMessage = page.getByText(/no questions found/i);
    this.paginationInfo = page.locator("p").filter({ hasText: /page \d+ of \d+/i });
    this.previousButton = page.getByRole("link", { name: /previous/i });
    this.nextButton = page.getByRole("link", { name: /next/i });
  }

  async goto() {
    await this.page.goto("/admin/questions");
  }

  async getQuestionRow(questionText: string): Promise<Locator> {
    return this.questionsTable.locator("tr").filter({ hasText: questionText }).first();
  }

  async clickEditForQuestion(questionText: string) {
    const row = await this.getQuestionRow(questionText);
    await row.getByRole("link", { name: /edit/i }).click();
  }

  async clickDeleteForQuestion(questionText: string) {
    const row = await this.getQuestionRow(questionText);
    await row.getByRole("button", { name: /delete/i }).click();
  }

  async getQuestionCount(): Promise<number> {
    return this.questionsTable.locator("tbody tr").count();
  }

  async hasPagination(): Promise<boolean> {
    return this.paginationInfo.isVisible();
  }
}

export class CreateQuestionPage extends BaseQuestionPage {
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.getByRole("button", { name: /create question/i });
  }

  async goto() {
    await this.page.goto("/admin/questions/create");
  }

  async fillForm(data: QuestionData) {
    if (data.quizId) {
      await this.quizSelect.selectOption(data.quizId);
    }
    await this.questionTextarea.fill(data.question);
    await this.option1Input.fill(data.option1);
    await this.option2Input.fill(data.option2);
    await this.option3Input.fill(data.option3);
    await this.option4Input.fill(data.option4);
    await this.answerSelect.selectOption(data.answer.toString());
    if (data.explanation) {
      await this.explanationTextarea.fill(data.explanation);
    }
  }

  async submit() {
    await this.submitForm(this.submitButton);
  }
}

export class EditQuestionPage extends BaseQuestionPage {
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.getByRole("button", { name: /update question/i });
  }

  async goto(questionId: string) {
    await this.page.goto(`/admin/questions/${questionId}`);
  }

  async getCurrentValues(): Promise<{
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: number;
    explanation: string;
  }> {
    return {
      question: await this.questionTextarea.inputValue(),
      option1: await this.option1Input.inputValue(),
      option2: await this.option2Input.inputValue(),
      option3: await this.option3Input.inputValue(),
      option4: await this.option4Input.inputValue(),
      answer: parseInt(await this.answerSelect.inputValue(), 10),
      explanation: await this.explanationTextarea.inputValue(),
    };
  }

  async submit() {
    await this.submitForm(this.submitButton);
  }
}

export class QuizPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly quizzesTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole("link", { name: /add quiz/i });
    this.quizzesTable = page.locator("table");
  }

  async goto() {
    await this.page.goto("/admin/quiz");
  }

  async getQuizIdByTitle(title: string): Promise<string | null> {
    const row = this.quizzesTable.locator("tr").filter({ hasText: title }).first();
    if (await row.isVisible()) {
      const editLink = row.getByRole("link", { name: /edit/i });
      const href = await editLink.getAttribute("href");
      return href?.split("/").pop() || null;
    }
    return null;
  }

  async createQuiz(data: QuizData): Promise<string> {
    await this.goto();
    await this.addButton.click();
    await this.page.waitForURL("/admin/quiz/create");

    await this.page.locator("input[name='title']").fill(data.title);
    await this.page.locator("textarea[name='description']").fill(data.description);
    await this.page.getByRole("button", { name: /create quiz/i }).click();

    await this.page.waitForURL("/admin/quiz");

    return (await this.getQuizIdByTitle(data.title)) || "";
  }

  async cleanupQuiz(title: string) {
    await this.goto();
    const row = this.quizzesTable.locator("tr").filter({ hasText: title }).first();
    if (await row.isVisible()) {
      const deleteButton = row.getByRole("button", { name: /delete/i });
      await deleteButton.click();
      this.page.on("dialog", (dialog) => dialog.accept());
    }
  }
}

export async function loginAsAdmin(page: Page) {
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

export async function createTestQuiz(page: Page, prefix = "Test"): Promise<string> {
  const quizPage = new QuizPage(page);
  const timestamp = Date.now();
  return quizPage.createQuiz({
    title: `${prefix} Quiz ${timestamp}`,
    description: `Description for ${prefix} Quiz ${timestamp}`,
  });
}

export async function createTestQuestion(
  page: Page,
  quizId: string,
  prefix = "Test"
): Promise<{ questionText: string; questionId: string }> {
  const createPage = new CreateQuestionPage(page);
  const timestamp = Date.now();
  const questionText = `${prefix} Question ${timestamp}`;

  await createPage.goto();
  await createPage.fillForm({
    quizId,
    question: questionText,
    option1: `${prefix} Option 1 ${timestamp}`,
    option2: `${prefix} Option 2 ${timestamp}`,
    option3: `${prefix} Option 3 ${timestamp}`,
    option4: `${prefix} Option 4 ${timestamp}`,
    answer: 0,
    explanation: `${prefix} Explanation ${timestamp}`,
  });
  await createPage.submit();

  await page.waitForURL(/\/admin\/questions/, { timeout: 15000 });

  // Extract question ID from the edit link in the table
  const row = page.locator("tr").filter({ hasText: questionText }).first();
  const editLink = row.locator("a").filter({ hasText: /edit/i });
  const href = await editLink.getAttribute("href");
  const questionId = href?.split("/").pop() || "";

  if (!questionId) {
    throw new Error(`Could not find edit link for question: ${questionText}`);
  }

  return { questionText, questionId };
}

export const test = base.extend<{
  questionsPage: QuestionsPage;
  createQuestionPage: CreateQuestionPage;
  editQuestionPage: EditQuestionPage;
  quizPage: QuizPage;
}>({
  questionsPage: async ({ page }, use) => {
    await use(new QuestionsPage(page));
  },
  createQuestionPage: async ({ page }, use) => {
    await use(new CreateQuestionPage(page));
  },
  editQuestionPage: async ({ page }, use) => {
    await use(new EditQuestionPage(page));
  },
  quizPage: async ({ page }, use) => {
    await use(new QuizPage(page));
  },
});

export { expect } from "@playwright/test";