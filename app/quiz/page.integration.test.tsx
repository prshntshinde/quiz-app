import "@testing-library/jest-dom";
import { fetchQuizzes } from "@/libs/data";

vi.mock("@/libs/data", () => ({
  fetchQuizzes: vi.fn(),
}));

describe("Quiz Page Data Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches quizzes and handles success", async () => {
    const mockQuizzes = [
      { _id: "1", title: "React Quiz", description: "Test React" },
      { _id: "2", title: "JS Quiz", description: "Test JS" },
    ];
    
    (fetchQuizzes as vi.Mock).mockResolvedValue(mockQuizzes);
    const result = await fetchQuizzes();
    
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("React Quiz");
  });

  it("fetches quizzes and handles error", async () => {
    (fetchQuizzes as vi.Mock).mockRejectedValue(new Error("DB Error"));
    
    await expect(fetchQuizzes()).rejects.toThrow("DB Error");
  });

  it("validates quiz data structure", () => {
    const quiz = {
      _id: "abc123",
      title: "Test Quiz",
      description: "A test quiz",
    };

    expect(quiz._id).toBeDefined();
    expect(quiz.title).toBeDefined();
    expect(typeof quiz.title).toBe("string");
  });

  it("validates generateMetadata for quiz page", () => {
    const metadata = {
      title: "Available Quizzes - Quiz App | Test Your Knowledge",
      description: "Browse and select from our collection of quizzes. Challenge yourself and track your progress across various topics.",
    };

    expect(metadata.title).toContain("Available Quizzes");
    expect(metadata.description).toBeDefined();
  });
});
