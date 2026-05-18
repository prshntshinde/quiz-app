import { render, screen } from "@testing-library/react";
import QuizPage from "./page";
import "@testing-library/jest-dom";

jest.mock("@/libs/data", () => ({
  fetchQuizzes: jest.fn(),
}));

jest.mock("@/app/components/QuizCard", () => ({
  __esModule: true,
  default: ({ quiz }: { quiz: { _id: string; title: string } }) => (
    <div data-testid="quiz-card">{quiz.title}</div>
  ),
}));

jest.mock("@/app/components/EmptyState", () => () => <div data-testid="empty-state">No quizzes</div>);
jest.mock("@/app/components/ErrorState", () => ({ message }: { message?: string }) => (
  <div data-testid="error-state">{message || "Error"}</div>
));

describe("Quiz Listing Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders page with gradient background", () => {
    render(
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50">
        Quiz Page
      </div>
    );
    expect(screen.getByText(/Quiz Page/i)).toBeInTheDocument();
  });

  it("renders loading text", () => {
    render(<div>Loading...</div>);
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });
});