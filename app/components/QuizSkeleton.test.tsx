import { render, screen } from "@testing-library/react";
import QuizSkeleton from "./QuizSkeleton";
import "@testing-library/jest-dom";

describe("QuizSkeleton", () => {
  it("renders loading indicator", () => {
    render(<QuizSkeleton />);
    const skeleton = screen.getByText(/Loading quizzes/i);
    expect(skeleton).toBeInTheDocument();
  });

  it("renders multiple skeleton cards", () => {
    const { container } = render(<QuizSkeleton />);
    const skeletonCards = container.querySelectorAll(".animate-pulse");
    expect(skeletonCards.length).toBeGreaterThan(0);
  });
});