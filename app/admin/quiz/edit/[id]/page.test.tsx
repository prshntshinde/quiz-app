import { render, screen, waitFor, act } from "@testing-library/react";
import EditQuizPage from "./page";
import "@testing-library/jest-dom";

jest.mock("@/lib/quizzes", () => ({
  getQuizById: jest.fn(),
}));

jest.mock("./EditQuizForm", () => ({
  __esModule: true,
  default: ({ quiz }: { quiz: { _id: string; title?: string } }) => (
    <div data-testid="edit-form">Edit Form: {quiz.title}</div>
  ),
}));

describe("EditQuizPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders EditQuizForm when quiz exists", async () => {
    const mockQuiz = {
      _id: { toString: () => "123" },
      title: "Test Quiz",
      description: "Test Description",
    };

    const { getQuizById } = require("@/lib/quizzes");
    getQuizById.mockResolvedValue(mockQuiz);

    const params = Promise.resolve({ id: "123" });
    
    await act(async () => {
      render(await EditQuizPage({ params }));
    });

    await waitFor(() => {
      expect(screen.getByTestId("edit-form")).toBeInTheDocument();
    });
  });

  it("converts quiz data to plain object", () => {
    const mockQuiz = {
      _id: { toString: () => "123" },
      title: "Test Quiz",
    };

    const plainQuiz = {
      _id: mockQuiz._id.toString(),
      title: mockQuiz.title,
    };

    expect(plainQuiz._id).toBe("123");
    expect(plainQuiz.title).toBe("Test Quiz");
  });
});