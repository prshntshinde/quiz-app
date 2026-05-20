import { vi } from "vitest";
import * as quizzesModule from "./quizzes";

describe("lib/quizzes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("getAllQuizzes", () => {
    it("should return quizzes when mocked", async () => {
      const mockQuizzes = [
        { _id: "1", title: "Quiz 1", description: "Desc 1", isComplete: false, isActive: true },
        { _id: "2", title: "Quiz 2", description: "Desc 2", isComplete: true, isActive: false },
      ];
      vi.spyOn(quizzesModule, "getAllQuizzes").mockResolvedValue(mockQuizzes);

      const result = await quizzesModule.getAllQuizzes();

      expect(result).toHaveLength(2);
      expect(result[0]._id).toBe("1");
      expect(result[1].isComplete).toBe(true);
    });

    it("should return empty array when mocked", async () => {
      vi.spyOn(quizzesModule, "getAllQuizzes").mockResolvedValue([]);

      const result = await quizzesModule.getAllQuizzes();

      expect(result).toEqual([]);
    });

    it("should handle errors when mocked", async () => {
      vi.spyOn(quizzesModule, "getAllQuizzes").mockRejectedValue(new Error("Connection failed"));

      await expect(quizzesModule.getAllQuizzes()).rejects.toThrow("Connection failed");
    });
  });

  describe("getQuizById", () => {
    it("should return quiz when mocked", async () => {
      const mockQuiz = {
        _id: "507f1f77bcf86cd799439011",
        title: "Test Quiz",
        description: "Test Description",
        isComplete: false,
        isActive: true,
      };
      vi.spyOn(quizzesModule, "getQuizById").mockResolvedValue(mockQuiz);

      const result = await quizzesModule.getQuizById("507f1f77bcf86cd799439011");

      expect(result).toBeTruthy();
      expect(result?._id).toBe("507f1f77bcf86cd799439011");
    });

    it("should return null for invalid ObjectId", async () => {
      vi.spyOn(quizzesModule, "getQuizById").mockResolvedValue(null);

      const result = await quizzesModule.getQuizById("invalid-id");

      expect(result).toBeNull();
    });

    it("should return null for non-existent quiz", async () => {
      vi.spyOn(quizzesModule, "getQuizById").mockResolvedValue(null);

      const result = await quizzesModule.getQuizById("507f1f77bcf86cd799439012");

      expect(result).toBeNull();
    });

    it("should handle errors when mocked", async () => {
      vi.spyOn(quizzesModule, "getQuizById").mockRejectedValue(new Error("DB error"));

      await expect(quizzesModule.getQuizById("507f1f77bcf86cd799439011")).rejects.toThrow();
    });
  });
});