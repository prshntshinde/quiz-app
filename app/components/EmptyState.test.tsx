import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";
import "@testing-library/jest-dom";

describe("EmptyState", () => {
  it("renders the heading", () => {
    render(<EmptyState />);
    expect(screen.getByText(/No Quizzes Available Yet/i)).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<EmptyState />);
    expect(
      screen.getByText(/Check back soon for new quizzes to challenge yourself!/i)
    ).toBeInTheDocument();
  });

  it("renders the emoji icon", () => {
    render(<EmptyState />);
    expect(screen.getByText("📝")).toBeInTheDocument();
  });
});