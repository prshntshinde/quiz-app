import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";
import QuestionForm from "./QuestionForm";
import { ToastProvider } from "@/app/components/Toast";

const mockPush = vi.fn();
vi.mock("@/lib/actions/questions", () => ({
  createQuestion: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

import { createQuestion } from "@/lib/actions/questions";

const mockQuizzes = [
  { _id: "1", title: "Quiz 1" },
  { _id: "2", title: "Quiz 2" },
];

function renderWithToast(component: React.ReactElement) {
  return render(<ToastProvider>{component}</ToastProvider>);
}

describe("QuestionForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all form fields", () => {
    renderWithToast(<QuestionForm quizzes={mockQuizzes} />);

    expect(screen.getByLabelText(/select quiz/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/question/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/option 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/option 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/option 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/option 4/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correct answer/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create question/i })).toBeInTheDocument();
  });

  it("should show quiz options in dropdown", () => {
    renderWithToast(<QuestionForm quizzes={mockQuizzes} />);

    const select = screen.getByLabelText(/select quiz/i) as HTMLSelectElement;
    expect(select.options.length).toBe(3);
    expect(select.options[1].text).toBe("Quiz 1");
    expect(select.options[2].text).toBe("Quiz 2");
  });

  it("should update state when typing in fields", async () => {
    const user = userEvent.setup();
    renderWithToast(<QuestionForm quizzes={mockQuizzes} />);

    const questionInput = screen.getByLabelText(/question/i);
    await user.type(questionInput, "Test question?");
    expect(questionInput).toHaveValue("Test question?");

    const option1Input = screen.getByLabelText(/option 1/i);
    await user.type(option1Input, "Option A");
    expect(option1Input).toHaveValue("Option A");
  });

  it("should have required attributes on mandatory fields", () => {
    renderWithToast(<QuestionForm quizzes={mockQuizzes} />);

    expect(screen.getByLabelText(/select quiz/i)).toBeRequired();
    expect(screen.getByLabelText(/question/i)).toBeRequired();
    expect(screen.getByLabelText(/option 1/i)).toBeRequired();
    expect(screen.getByLabelText(/option 2/i)).toBeRequired();
    expect(screen.getByLabelText(/option 3/i)).toBeRequired();
    expect(screen.getByLabelText(/option 4/i)).toBeRequired();
    expect(screen.getByLabelText(/correct answer/i)).toBeRequired();
  });
});