import { render, screen } from "@testing-library/react";
import Questions, { generateMetadata } from "./page";
import "@testing-library/jest-dom";

describe("AdminQuestions", () => {
  it("renders questions page content", () => {
    render(<Questions />);
    expect(screen.getByText("QuestionForm")).toBeInTheDocument();
  });

  it("generates correct metadata", () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe("Questions | Quiz App");
  });
});