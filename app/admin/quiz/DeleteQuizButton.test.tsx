import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteQuizButton from "./DeleteQuizButton";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockDeleteQuiz = jest.fn();
jest.mock("@/lib/actions/quiz", () => ({
  deleteQuiz: (...args: unknown[]) => mockDeleteQuiz(...args),
}));

describe("DeleteQuizButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn().mockReturnValue(true);
  });

  it("renders Delete button", () => {
    render(<DeleteQuizButton id="123" title="Test Quiz" />);
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  it("shows Deleting... text when pending", async () => {
    render(<DeleteQuizButton id="123" title="Test Quiz" />);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(/Deleting\.\.\./i)).toBeInTheDocument();
    });
  });

  it("calls deleteQuiz on confirm", async () => {
    render(<DeleteQuizButton id="123" title="Test Quiz" />);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockDeleteQuiz).toHaveBeenCalled();
    });
  });

  it("does not call deleteQuiz when not confirmed", async () => {
    (window.confirm as jest.Mock).mockReturnValue(false);
    render(<DeleteQuizButton id="123" title="Test Quiz" />);
    fireEvent.click(screen.getByRole("button"));

    expect(mockDeleteQuiz).not.toHaveBeenCalled();
  });
});