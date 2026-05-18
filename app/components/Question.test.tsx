import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Question from "./Question";

vi.mock("./Modal", () => ({
  __esModule: true,
  default: ({ children, isVisible, onClose }: { children: React.ReactNode; isVisible: boolean; onClose: () => void }) =>
    isVisible ? <div data-testid="modal">{children}<button data-testid="close-btn" onClick={onClose}>Close</button></div> : null,
}));

vi.mock("react-countdown-circle-timer", () => ({
  CountdownCircleTimer: ({ children }: { children: (props: { remainingTime: number }) => JSX.Element }) => children({ remainingTime: 30 }),
}));

vi.mock("react-icons/rx", () => ({
  RxCheckCircled: () => <span data-testid="check-icon" />,
  RxCrossCircled: () => <span data-testid="cross-icon" />,
}));

const mockQuestion = {
  question_id: 1,
  question: "What is the capital of France?",
  option1: "London",
  option2: "Paris",
  option3: "Berlin",
  option4: "Madrid",
  answer: 1,
  explanation: "Paris is the capital of France.",
};

describe("Question Component", () => {
  it("renders question button with question_id", () => {
    render(<Question {...mockQuestion} />);
    expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument();
  });

  it("opens modal when question button is clicked", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("displays question text in modal", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    expect(screen.getByText(/What is the capital of France?/i)).toBeInTheDocument();
  });

  it("displays four answer options", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    expect(screen.getByText(/A\./)).toBeInTheDocument();
    expect(screen.getByText(/B\./)).toBeInTheDocument();
    expect(screen.getByText(/C\./)).toBeInTheDocument();
    expect(screen.getByText(/D\./)).toBeInTheDocument();
  });

  it("renders Show Options button", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    expect(screen.getByRole("button", { name: /Show Options/i })).toBeInTheDocument();
  });

  it("renders Submit button", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("renders 50-50 button", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    expect(screen.getByRole("button", { name: /50-50/i })).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("close-btn"));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("displays timer component", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /1/i }));
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});
