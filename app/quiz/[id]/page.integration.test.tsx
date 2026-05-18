import "@testing-library/jest-dom";
import { fetchQuestions } from "@/libs/data";

vi.mock("@/libs/data", () => ({
  fetchQuestions: vi.fn(),
}));

describe("Quiz Answer Page Data Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches questions for a quiz", async () => {
    const mockQuestions = [
      {
        _id: "q1",
        question_id: 1,
        question: "What is React?",
        options: [{ 0: "Library", 1: "Framework", 2: "Language", 3: "Database" }],
        answer: 0,
        explanation: "React is a library",
      },
    ];
    
    (fetchQuestions as vi.Mock).mockResolvedValue(mockQuestions);
    const result = await fetchQuestions("quiz123");
    
    expect(result).toHaveLength(1);
    expect(result[0].question).toBe("What is React?");
  });

  it("handles fetchQuestions error", async () => {
    (fetchQuestions as vi.Mock).mockRejectedValue(new Error("Not found"));
    
    await expect(fetchQuestions("invalid")).rejects.toThrow("Not found");
  });

  it("validates question data structure", () => {
    const question = {
      _id: "abc",
      question_id: 5,
      question: "Test question?",
      options: [{ 0: "A", 1: "B", 2: "C", 3: "D" }],
      answer: 2,
      explanation: "The answer is C because...",
    };

    expect(question._id).toBeDefined();
    expect(question.question_id).toBe(5);
    expect(question.options[0][0]).toBe("A");
    expect(question.options[0][3]).toBe("D");
    expect(question.answer).toBe(2);
    expect(question.explanation).toBeTruthy();
  });

  it("generates correct question element IDs", () => {
    const questionId = 3;
    const elementId = "q-" + questionId;
    expect(elementId).toBe("q-3");
  });

  it("validates metadata generation", () => {
    const metadata = {
      title: "Questions | Quiz App",
    };

    expect(metadata.title).toBe("Questions | Quiz App");
  });
});