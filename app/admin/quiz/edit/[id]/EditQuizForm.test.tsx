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

  it("does not show history section when no history", async () => {
    await act(async () => {
      render(<EditQuizForm quiz={mockQuiz} />);
    });
    expect(screen.queryByText(/Previous Version/i)).not.toBeInTheDocument();
  });

  it("updates title when user types", async () => {
    await act(async () => {
      render(<EditQuizForm quiz={mockQuiz} />);
    });
    const titleInput = screen.getByDisplayValue("Original Title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    expect(screen.getByDisplayValue("New Title")).toBeInTheDocument();
  });

  it("updates description when user types", async () => {
    await act(async () => {
      render(<EditQuizForm quiz={mockQuiz} />);
    });
    const descInput = screen.getByDisplayValue("Original Description");
    fireEvent.change(descInput, { target: { value: "New Description" } });
    expect(screen.getByDisplayValue("New Description")).toBeInTheDocument();
  });

  it("shows Restore button with history data", async () => {
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
    expect(screen.getByRole("button", { name: /Restore/i })).toBeInTheDocument();
  });

  it("restores title and description when restore is clicked", async () => {
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
    fireEvent.click(screen.getByRole("button", { name: /Restore/i }));
    expect(screen.getByDisplayValue("Old Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old Description")).toBeInTheDocument();
  });

  it("renders hidden id field", async () => {
    await act(async () => {
      render(<EditQuizForm quiz={mockQuiz} />);
    });
    const hiddenInput = document.getElementsByName("id")[0];
    expect(hiddenInput).toHaveValue("123");
  });
});