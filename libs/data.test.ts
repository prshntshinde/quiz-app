import { vi } from "vitest";
import { fetchQuizzes, fetchQuestions } from "./data";
import connectMongoDB from "./mongodb";
import * as utils from "@/lib/utils";

const mockSanitizeData = vi.spyOn(utils, "sanitizeData").mockImplementation((data: unknown) => data);

const mockQuizFind = vi.fn();
const mockQuestionsFind = vi.fn();

vi.mock("@/models/quiz", () => ({
  Quiz: {
    find: (...args: unknown[]) => mockQuizFind(...args),
  },
  Questions: {
    find: (...args: unknown[]) => mockQuestionsFind(...args),
  },
}));

vi.mock("./mongodb", () => ({
  default: vi.fn().mockResolvedValue(undefined),
}));

describe("libs/data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(async () => {
    vi.restoreAllMocks();
  });

  describe("fetchQuizzes", () => {
    it("should fetch and sanitize quizzes", async () => {
      const mockQuizzes = [{ title: "Quiz 1" }];
      mockQuizFind.mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockQuizzes),
      });

      const result = await fetchQuizzes();

      expect(connectMongoDB).toHaveBeenCalled();
      expect(mockQuizFind).toHaveBeenCalledWith(
        expect.objectContaining({
          $or: expect.any(Array),
        })
      );
      expect(mockSanitizeData).toHaveBeenCalledWith(mockQuizzes);
      expect(result).toEqual(mockQuizzes);
    });

    it("should throw an error if fetch fails", async () => {
      mockQuizFind.mockReturnValue({
        lean: vi.fn().mockRejectedValue(new Error("DB Error")),
      });

      await expect(fetchQuizzes()).rejects.toThrow("Failed to fetch Quizzes.");
    });
  });

  describe("fetchQuestions", () => {
    it("should fetch and sanitize questions for a given quiz ID", async () => {
      const mockQuestions = [{ question: "Q1" }];
      const quizId = "quiz123";

      const mockSort = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockQuestions),
      });
      mockQuestionsFind.mockReturnValue({
        sort: mockSort,
      });

      const result = await fetchQuestions(quizId);

      expect(connectMongoDB).toHaveBeenCalled();
      expect(mockQuestionsFind).toHaveBeenCalledWith(
        expect.objectContaining({
          quiz_id: quizId,
          isUsed: false,
          $or: expect.any(Array),
        })
      );
      expect(mockSort).toHaveBeenCalledWith({ question_id: 1 });
      expect(mockSanitizeData).toHaveBeenCalledWith(mockQuestions);
      expect(result).toEqual(mockQuestions);
    });

    it("should throw an error if fetching questions fails", async () => {
      mockQuestionsFind.mockReturnValue({
        sort: vi.fn().mockReturnValue({
          lean: vi.fn().mockRejectedValue(new Error("DB Error")),
        }),
      });

      await expect(fetchQuestions("123")).rejects.toThrow("Error while fetching questions");
    });
  });
});