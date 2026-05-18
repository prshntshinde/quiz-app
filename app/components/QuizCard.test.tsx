import { render, screen } from "@testing-library/react";
import QuizCard from "./QuizCard";
import "@testing-library/jest-dom";

describe("QuizCard", () => {
  const mockQuiz = {
    _id: "123",
    title: "Test Quiz",
    description: "This is a test quiz description",
  };

  it("renders quiz title", () => {
    render(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByText("Test Quiz")).toBeInTheDocument();
  });

  it("renders quiz description", () => {
    render(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByText("This is a test quiz description")).toBeInTheDocument();
  });

  it("renders Start Quiz button", () => {
    render(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByRole("link", { name: /Start Quiz/i })).toBeInTheDocument();
  });

  it("renders Rules button", () => {
    render(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByRole("button", { name: /Rules/i })).toBeInTheDocument();
  });

  it("has correct link href", () => {
    render(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByRole("link", { name: /Start Quiz/i })).toHaveAttribute(
      "href",
      "/quiz/123"
    );
  });

  it("renders without description", () => {
    const quizWithoutDesc = { _id: "456", title: "Quiz Without Description" };
    render(<QuizCard quiz={quizWithoutDesc} />);
    expect(screen.getByText("Quiz Without Description")).toBeInTheDocument();
  });
});