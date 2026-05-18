import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import EditQuizForm from "./EditQuizForm";
import "@testing-library/jest-dom";

const mockUpdateQuiz = vi.fn();
vi.mock("@/lib/actions/quiz", () => ({
  updateQuiz: (...args: unknown[]) => mockUpdateQuiz(...args),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
  })),
}));

describe("EditQuizForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockQuiz = {
    _id: "123",
    title: "Original Title",
    description: "Original Description",
    history: [],
  };

  it("renders form with quiz title", async () => {
    await act(async () => {
      render(<EditQuizForm quiz={mockQuiz} />);
    });
    expect(screen.getByDisplayValue("Original Title")).toBeInTheDocument();
  });

  it("renders form with quiz description", async () => {
    await act(async () => {
      render(<EditQuizForm quiz={mockQuiz} />);
    });
    expect(screen.getByDisplayValue("Original Description")).toBeInTheDocument();
  });

  it("renders Update Quiz button", async () => {
    await act(async () => {
      render(<EditQuizForm quiz={mockQuiz} />);
    });
    expect(screen.getByRole("button", { name: /Update Quiz/i })).toBeInTheDocument();
  });

  it("renders Cancel button", async () => {
    await act(async () => {
      render(<EditQuizForm quiz={mockQuiz} />);
    });
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("shows history section when history exists", async () => {
    const quizWithHistory = {
      ...mockQuiz,
      history: [
        {
          title: "Old Title",
          description: "Old Description",
          updatedAt: "2024-01-01T00:00:00Z",
        },
      ],
    };
    await act(async () => {
      render(<EditQuizForm quiz={quizWithHistory} />);
    });
    expect(screen.getByText(/Previous Version \(Safety Backup\)/i)).toBeInTheDocument();
  });
});