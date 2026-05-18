import { render, screen, act } from "@testing-library/react";
import Quiz from "./page";
import "@testing-library/jest-dom";

jest.mock("@/lib/quizzes", () => ({
  getAllQuizzes: jest.fn(),
  getQuizById: jest.fn(),
}));

describe("QuizPage", () => {
  it("renders loading state initially", async () => {
    render(
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });
});