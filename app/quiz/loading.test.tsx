import { render, screen } from "@testing-library/react";
import Loading from "./loading";
import "@testing-library/jest-dom";

vi.mock("../components/QuizSkeleton", () => ({
  default: function MockQuizSkeleton() {
    return <div data-testid="quiz-skeleton">Loading...</div>;
  },
}));

describe("Quiz Loading Page", () => {
  it("renders Loading component", () => {
    render(<Loading />);
    expect(screen.getByTestId("quiz-skeleton")).toBeInTheDocument();
  });

  it("renders inside a div", () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});
