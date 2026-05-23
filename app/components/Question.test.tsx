import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Question from "./Question";

vi.mock("./Modal", () => ({
  __esModule: true,
  default: ({ children, isVisible, onClose }: { children: React.ReactNode; isVisible: boolean; onClose: () => void; title?: string }) =>
    isVisible ? <div data-testid="modal">{children}<button data-testid="close-btn" onClick={onClose}>Close</button></div> : null,
}));

vi.mock("./QuizTimer", () => ({
  __esModule: true,
  default: ({ isPlaying, onComplete }: { isPlaying: boolean; onComplete?: () => void }) => (
    <div data-testid="quiz-timer" aria-label="Quiz timer">
      <span>{isPlaying ? "Running" : "Stopped"}</span>
      <button data-testid="timer-complete" onClick={onComplete}>Complete</button>
    </div>
  ),
}));

vi.mock("./AnswerOption", () => ({
  __esModule: true,
  default: ({ label, text, onSelect, index, disabled }: { label: string; text: string; onSelect: (index: number) => void; index: number; disabled: boolean }) => (
    <button onClick={() => onSelect(index)} disabled={disabled} data-testid={`option-${label}`}>
      {label}. {text}
    </button>
  ),
}));

vi.mock("./QuestionHeader", () => ({
  __esModule: true,
  default: ({ questionId, question }: { questionId: number; question: string }) => (
    <div data-testid="question-header">
      <span data-testid="question-id">{questionId}</span>
      <span data-testid="question-text">{question}</span>
    </div>
  ),
}));

vi.mock("./AnswerStatus", () => ({
  __esModule: true,
  default: ({ status }: { status: string }) => (
    <div data-testid="answer-status">{status}</div>
  ),
}));

vi.mock("./ExplanationPanel", () => ({
  __esModule: true,
  default: ({ explanation, isVisible }: { explanation: string; isVisible: boolean }) =>
    isVisible ? <div data-testid="explanation">{explanation}</div> : null,
}));

vi.mock("./ActionButtons", () => ({
  __esModule: true,
  default: ({ onShowOptions, onFiftyFifty, onSubmit, onClose, showOptions, hasSelectedAnswer, hasSubmitted }: {
    onShowOptions: () => void;
    onFiftyFifty: () => void;
    onSubmit: () => void;
    onClose: () => void;
    showOptions: boolean;
    hasSelectedAnswer: boolean;
    hasSubmitted: boolean;
  }) => (
    <div data-testid="action-buttons">
      {!showOptions && <button onClick={onShowOptions} data-testid="show-options-btn">Show Options</button>}
      {showOptions && !hasSubmitted && (
        <>
          <button onClick={onFiftyFifty} data-testid="fifty-fifty-btn">50-50</button>
          <button onClick={onSubmit} disabled={!hasSelectedAnswer} data-testid="submit-btn">Submit</button>
        </>
      )}
      <button onClick={onClose} data-testid="close-action-btn">Close</button>
    </div>
  ),
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
    expect(screen.getByRole("button", { name: /Open question 1/i })).toBeInTheDocument();
  });

  it("opens modal when question button is clicked", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("displays question text in modal", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    expect(screen.getByTestId("question-text")).toHaveTextContent("What is the capital of France?");
  });

  it("renders Show Options button initially", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    expect(screen.getByTestId("show-options-btn")).toBeInTheDocument();
  });

  it("shows options when Show Options is clicked", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    expect(screen.getByTestId("option-A")).toBeInTheDocument();
    expect(screen.getByTestId("option-B")).toBeInTheDocument();
  });

  it("renders Submit button after showing options", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  });

  it("renders 50-50 button after showing options", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    expect(screen.getByTestId("fifty-fifty-btn")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("close-btn"));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("displays timer component", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    expect(screen.getByTestId("quiz-timer")).toBeInTheDocument();
  });

  it("selects an answer when option is clicked", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    fireEvent.click(screen.getByTestId("option-A"));
    const submitBtn = screen.getByTestId("submit-btn");
    expect(submitBtn).not.toBeDisabled();
  });

  it("shows correct status when right answer is submitted", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    fireEvent.click(screen.getByTestId("option-B"));
    fireEvent.click(screen.getByTestId("submit-btn"));
    expect(screen.getByTestId("answer-status")).toHaveTextContent("Correct");
  });

  it("shows wrong status when wrong answer is submitted", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    fireEvent.click(screen.getByTestId("option-A"));
    fireEvent.click(screen.getByTestId("submit-btn"));
    expect(screen.getByTestId("answer-status")).toHaveTextContent("Wrong");
  });

  it("displays explanation after answer is submitted", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    fireEvent.click(screen.getByTestId("option-B"));
    fireEvent.click(screen.getByTestId("submit-btn"));
    expect(screen.getByTestId("explanation")).toHaveTextContent("Paris is the capital of France.");
  });

  it("shows 50-50 button is clickable", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    const btn = screen.getByTestId("fifty-fifty-btn");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByTestId("fifty-fifty-btn")).toBeInTheDocument();
  });

  it("shows submit button as disabled when no answer selected", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    const submitBtn = screen.getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();
  });

  it("shows explanation and audio element after answering", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    fireEvent.click(screen.getByTestId("option-B"));
    fireEvent.click(screen.getByTestId("submit-btn"));
    expect(screen.getByTestId("explanation")).toHaveTextContent("Paris is the capital of France.");
    expect(screen.getByTestId("clock-audio")).toBeInTheDocument();
  });

  it("renders timer when options are shown", () => {
    render(<Question {...mockQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /Open question 1/i }));
    fireEvent.click(screen.getByTestId("show-options-btn"));
    expect(screen.getByTestId("quiz-timer")).toBeInTheDocument();
  });
});
