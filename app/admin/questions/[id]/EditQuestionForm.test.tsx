import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";
import EditQuestionForm from "./EditQuestionForm";
import { ToastProvider } from "@/app/components/Toast";

vi.mock("@/lib/actions/questions", () => ({
  updateQuestion: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import { updateQuestion } from "@/lib/actions/questions";

const mockQuizzes = [
  { _id: "1", title: "Quiz 1" },
  { _id: "2", title: "Quiz 2" },
];

const mockQuestion = {
  _id: "123",
  question: "What is 2+2?",
  optionA: "3",
  optionB: "4",
  optionC: "5",
  optionD: "6",
  answer: 1,
  explanation: "Simple math",
  quiz_id: "1",
};

function renderWithToast(component: React.ReactElement) {
  return render(<ToastProvider>{component}</ToastProvider>);
}

describe("EditQuestionForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should pre-populate form with question data", () => {
    renderWithToast(<EditQuestionForm question={mockQuestion} quizzes={mockQuizzes} />);

    expect(screen.getByLabelText(/question/i)).toHaveValue("What is 2+2?");
    expect(screen.getByLabelText(/option a/i)).toHaveValue("3");
    expect(screen.getByLabelText(/option b/i)).toHaveValue("4");
    expect(screen.getByLabelText(/option c/i)).toHaveValue("5");
    expect(screen.getByLabelText(/option d/i)).toHaveValue("6");
  });

  it("should show correct answer selection", () => {
    renderWithToast(<EditQuestionForm question={mockQuestion} quizzes={mockQuizzes} />);

    const answerSelect = screen.getByLabelText(/correct answer/i) as HTMLSelectElement;
    expect(answerSelect.value).toBe("1");
  });

  it("should show quiz dropdown with correct selection", () => {
    renderWithToast(<EditQuestionForm question={mockQuestion} quizzes={mockQuizzes} />);

    const quizSelect = screen.getByLabelText(/select quiz/i) as HTMLSelectElement;
    expect(quizSelect.value).toBe("1");
  });

  it("should update state when typing in fields", async () => {
    const user = userEvent.setup();
    renderWithToast(<EditQuestionForm question={mockQuestion} quizzes={mockQuizzes} />);

    const questionInput = screen.getByLabelText(/question/i);
    await user.clear(questionInput);
    await user.type(questionInput, "Updated question?");
    expect(questionInput).toHaveValue("Updated question?");
  });

  it("should have update button", () => {
    renderWithToast(<EditQuestionForm question={mockQuestion} quizzes={mockQuizzes} />);

    expect(screen.getByRole("button", { name: /update question/i })).toBeInTheDocument();
  });

  it("should call updateQuestion on submit", async () => {
    (updateQuestion as ReturnType<typeof vi.fn>).mockResolvedValue({ message: "Updated" });
    const user = userEvent.setup();
    renderWithToast(<EditQuestionForm question={mockQuestion} quizzes={mockQuizzes} />);

    await user.click(screen.getByRole("button", { name: /update question/i }));

    await waitFor(() => {
      expect(updateQuestion).toHaveBeenCalled();
    });
  });
});