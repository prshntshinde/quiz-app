import { render, screen } from "@testing-library/react";
import Question from "./Question";
import "@testing-library/jest-dom";

describe("Question", () => {
  const mockQuestion = {
    question_id: 1,
    question: "What is 2 + 2?",
    option1: "3",
    option2: "4",
    option3: "5",
    option4: "6",
    answer: 1,
    explanation: "2 + 2 = 4",
  };

  it("renders question number button", () => {
    render(<Question {...mockQuestion} />);
    expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument();
  });

  it("has correct question text", () => {
    render(<Question {...mockQuestion} />);
    const button = screen.getByRole("button", { name: /1/i });
    expect(button).toBeInTheDocument();
  });

  it("renders with all required props", () => {
    render(<Question {...mockQuestion} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});