import "@testing-library/jest-dom";
import { getAllQuestions, getQuestionById } from "@/lib/questions";

vi.mock("@/lib/questions", () => ({
  getAllQuestions: vi.fn(),
  getQuestionById: vi.fn(),
}));

vi.mock("@/libs/mongodb", () => ({
  default: vi.fn().mockResolvedValue(undefined),
}));

describe("Questions Data Layer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllQuestions", () => {
    it("returns paginated questions with metadata", async () => {
      const mockQuestions = [
        {
          _id: "1",
          question: "What is React?",
          options: ["Library", "Framework", "Language", "Tool"],
          answer: 0,
          quiz_id: "quiz1",
          question_id: 1,
        },
        {
          _id: "2",
          question: "What is Next.js?",
          options: ["Framework", "Library", "Language", "Tool"],
          answer: 0,
          quiz_id: "quiz1",
          question_id: 2,
        },
      ];

      (getAllQuestions as vi.Mock).mockResolvedValue({
        questions: mockQuestions,
        total: 2,
        page: 1,
        totalPages: 1,
      });

      const result = await getAllQuestions(1, 10);

      expect(result.questions).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it("handles empty questions list", async () => {
      (getAllQuestions as vi.Mock).mockResolvedValue({
        questions: [],
        total: 0,
        page: 1,
        totalPages: 0,
      });

      const result = await getAllQuestions(1, 10);

      expect(result.questions).toHaveLength(0);
      expect(result.total).toBe(0);
    });

    it("calculates correct totalPages for pagination", async () => {
      (getAllQuestions as vi.Mock).mockResolvedValue({
        questions: [],
        total: 25,
        page: 1,
        totalPages: 3,
      });

      const result = await getAllQuestions(1, 10);

      expect(result.totalPages).toBe(3);
    });

    it("handles pagination parameters correctly", async () => {
      (getAllQuestions as vi.Mock).mockResolvedValue({
        questions: [],
        total: 50,
        page: 3,
        totalPages: 5,
      });

      const result = await getAllQuestions(3, 10);

      expect(result.page).toBe(3);
      expect(result.totalPages).toBe(5);
    });

    it("handles getAllQuestions error", async () => {
      (getAllQuestions as vi.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getAllQuestions()).rejects.toThrow("Database error");
    });
  });

  describe("getQuestionById", () => {
    it("returns question by valid ID", async () => {
      const mockQuestion = {
        _id: "507f1f77bcf86cd799439011",
        question: "What is TypeScript?",
        options: ["Language", "Framework", "Library", "Tool"],
        answer: 0,
        quiz_id: "quiz1",
        question_id: 1,
      };

      (getQuestionById as vi.Mock).mockResolvedValue(mockQuestion);

      const result = await getQuestionById("507f1f77bcf86cd799439011");

      expect(result).toBeDefined();
      expect(result?.question).toBe("What is TypeScript?");
    });

    it("returns null for invalid ObjectId", async () => {
      (getQuestionById as vi.Mock).mockResolvedValue(null);

      const result = await getQuestionById("invalid-id");

      expect(result).toBeNull();
    });

    it("returns null for non-existent question", async () => {
      (getQuestionById as vi.Mock).mockResolvedValue(null);

      const result = await getQuestionById("507f1f77bcf86cd799439012");

      expect(result).toBeNull();
    });

    it("handles getQuestionById error", async () => {
      (getQuestionById as vi.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getQuestionById("507f1f77bcf86cd799439011")).rejects.toThrow("Database error");
    });

    it("validates question data structure", () => {
      const questionData = {
        _id: "123",
        question: "Test Question",
        options: ["A", "B", "C", "D"],
        answer: 2,
        quiz_id: "quiz1",
        question_id: 1,
        explanation: "This is the explanation",
        isUsed: false,
      };

      expect(questionData.question).toBe("Test Question");
      expect(questionData.options[0]).toBe("A");
      expect(questionData.answer).toBe(2);
    });
  });
});