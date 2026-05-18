import { render, screen } from "@testing-library/react";
import Questions from "./page";
import "@testing-library/jest-dom";

describe("AdminQuestions", () => {
  it("renders questions page content", () => {
    render(<Questions />);
    expect(screen.getByText("QuestionForm")).toBeInTheDocument();
  });
});