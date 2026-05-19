import "@testing-library/jest-dom";
import { createQuestion, deleteQuestion, updateQuestion } from "@/lib/actions/questions";

vi.mock("@/lib/actions/questions", () => ({
  createQuestion: vi.fn(),
  deleteQuestion: vi.fn(),
  updateQuestion: vi.fn(),
}));

vi.mock("@/libs/mongodb", () => ({
  default: vi.fn().mockResolvedValue(undefined),
}));

describe("Questions Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createQuestion", () => {
    it("validates required fields are present", async () => {
      const formData = new FormData();
      formData.append("question", "");
      formData.append("option1", "A");
      formData.append("option2", "B");
      formData.append("option3", "C");
      formData.append("option4", "D");
      formData.append("answer", "0");
      formData.append("quiz_id", "quiz123");

      (createQuestion as vi.Mock).mockRejectedValue(
        new Error("All fields are required")
      );

      await expect(createQuestion(formData)).rejects.toThrow(
        "All fields are required"
      );
    });

    it("validates answer range is between 0 and 3", async () => {
      const formData = new FormData();
      formData.append("question", "What is React?");
      formData.append("option1", "A");
      formData.append("option2", "B");
      formData.append("option3", "C");
      formData.append("option4", "D");
      formData.append("answer", "5");
      formData.append("quiz_id", "quiz123");

      (createQuestion as vi.Mock).mockRejectedValue(
        new Error("Answer must be between 0 and 3")
      );

      await expect(createQuestion(formData)).rejects.toThrow(
        "Answer must be between 0 and 3"
      );
    });

    it("creates question with correct options structure", async () => {
      const formData = new FormData();
      formData.append("question", "What is React?");
      formData.append("option1", "Library");
      formData.append("option2", "Framework");
      formData.append("option3", "Language");
      formData.append("option4", "Tool");
      formData.append("answer", "0");
      formData.append("explanation", "React is a library");
      formData.append("quiz_id", "507f1f77bcf86cd799439011");

      (createQuestion as vi.Mock).mockResolvedValue({
        message: "Question created successfully.",
      });

      const result = await createQuestion(formData);

      expect(result.message).toBe("Question created successfully.");
      expect(createQuestion).toHaveBeenCalledWith(formData);
    });

    it("handles createQuestion error", async () => {
      const formData = new FormData();
      formData.append("question", "Test");
      formData.append("option1", "A");
      formData.append("option2", "B");
      formData.append("option3", "C");
      formData.append("option4", "D");
      formData.append("answer", "0");
      formData.append("quiz_id", "quiz123");

      (createQuestion as vi.Mock).mockRejectedValue(
        new Error("Failed to create question: Database error")
      );

      await expect(createQuestion(formData)).rejects.toThrow(
        "Failed to create question:"
      );
    });
  });

  describe("deleteQuestion", () => {
    it("validates question ID is required", async () => {
      const formData = new FormData();

      (deleteQuestion as vi.Mock).mockRejectedValue(
        new Error("Question ID is required")
      );

      await expect(deleteQuestion(formData)).rejects.toThrow(
        "Question ID is required"
      );
    });

    it("deletes question successfully", async () => {
      const formData = new FormData();
      formData.append("id", "507f1f77bcf86cd799439011");

      (deleteQuestion as vi.Mock).mockResolvedValue({
        message: "Question deleted successfully.",
      });

      const result = await deleteQuestion(formData);

      expect(result.message).toBe("Question deleted successfully.");
    });

    it("throws error for non-existent question", async () => {
      const formData = new FormData();
      formData.append("id", "507f1f77bcf86cd799439012");

      (deleteQuestion as vi.Mock).mockRejectedValue(
        new Error("Question not found")
      );

      await expect(deleteQuestion(formData)).rejects.toThrow(
        "Question not found"
      );
    });

    it("handles deleteQuestion error", async () => {
      const formData = new FormData();
      formData.append("id", "507f1f77bcf86cd799439011");

      (deleteQuestion as vi.Mock).mockRejectedValue(
        new Error("Failed to delete question: Database error")
      );

      await expect(deleteQuestion(formData)).rejects.toThrow(
        "Failed to delete question:"
      );
    });
  });

  describe("updateQuestion", () => {
    it("validates all required fields for update", async () => {
      const formData = new FormData();
      formData.append("id", "507f1f77bcf86cd799439011");
      formData.append("question", "");
      formData.append("option1", "A");
      formData.append("option2", "B");
      formData.append("option3", "C");
      formData.append("option4", "D");
      formData.append("answer", "0");

      (updateQuestion as vi.Mock).mockRejectedValue(
        new Error("All fields are required")
      );

      await expect(updateQuestion(formData)).rejects.toThrow(
        "All fields are required"
      );
    });

    it("updates question successfully", async () => {
      const formData = new FormData();
      formData.append("id", "507f1f77bcf86cd799439011");
      formData.append("question", "Updated question");
      formData.append("option1", "New A");
      formData.append("option2", "New B");
      formData.append("option3", "New C");
      formData.append("option4", "New D");
      formData.append("answer", "1");
      formData.append("explanation", "Updated explanation");

      (updateQuestion as vi.Mock).mockResolvedValue({
        message: "Question updated successfully.",
      });

      const result = await updateQuestion(formData);

      expect(result.message).toBe("Question updated successfully.");
    });

    it("throws error for non-existent question on update", async () => {
      const formData = new FormData();
      formData.append("id", "507f1f77bcf86cd799439012");
      formData.append("question", "Test");
      formData.append("option1", "A");
      formData.append("option2", "B");
      formData.append("option3", "C");
      formData.append("option4", "D");
      formData.append("answer", "0");

      (updateQuestion as vi.Mock).mockRejectedValue(
        new Error("Question not found")
      );

      await expect(updateQuestion(formData)).rejects.toThrow(
        "Question not found"
      );
    });

    it("validates answer range on update", async () => {
      const formData = new FormData();
      formData.append("id", "507f1f77bcf86cd799439011");
      formData.append("question", "Test");
      formData.append("option1", "A");
      formData.append("option2", "B");
      formData.append("option3", "C");
      formData.append("option4", "D");
      formData.append("answer", "4");

      (updateQuestion as vi.Mock).mockRejectedValue(
        new Error("Answer must be between 0 and 3")
      );

      await expect(updateQuestion(formData)).rejects.toThrow(
        "Answer must be between 0 and 3"
      );
    });

    it("handles updateQuestion error", async () => {
      const formData = new FormData();
      formData.append("id", "507f1f77bcf86cd799439011");
      formData.append("question", "Test");
      formData.append("option1", "A");
      formData.append("option2", "B");
      formData.append("option3", "C");
      formData.append("option4", "D");
      formData.append("answer", "0");

      (updateQuestion as vi.Mock).mockRejectedValue(
        new Error("Failed to update question: Database error")
      );

      await expect(updateQuestion(formData)).rejects.toThrow(
        "Failed to update question:"
      );
    });
  });
});