import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";
import DeleteQuestionButton from "./DeleteQuestionButton";
import { ToastProvider } from "@/app/components/Toast";

vi.mock("@/lib/actions/questions", () => ({
  deleteQuestion: vi.fn(),
}));

Object.defineProperty(globalThis, "confirm", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(globalThis, "location", {
  writable: true,
  value: { reload: vi.fn() },
});

import { deleteQuestion } from "@/lib/actions/questions";

function renderWithToast(component: React.ReactElement) {
  return render(<ToastProvider>{component}</ToastProvider>);
}

describe("DeleteQuestionButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(globalThis.confirm).mockReturnValue(true);
  });

  it("should render delete button with text", () => {
    renderWithToast(<DeleteQuestionButton id="123" question="Test question" />);

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("should show confirmation dialog when clicked", async () => {
    const user = userEvent.setup();
    renderWithToast(<DeleteQuestionButton id="123" question="Test question" />);

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(globalThis.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete the question "Test question"? This will move it to the trash.'
    );
  });

  it("should call deleteQuestion when confirmed", async () => {
    (deleteQuestion as ReturnType<typeof vi.fn>).mockResolvedValue({ message: "Deleted" });
    const user = userEvent.setup();
    renderWithToast(<DeleteQuestionButton id="123" question="Test question" />);

    await user.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(deleteQuestion).toHaveBeenCalled();
    });
  });

  it("should not call deleteQuestion when cancelled", async () => {
    vi.mocked(globalThis.confirm).mockReturnValue(false);
    const user = userEvent.setup();
    renderWithToast(<DeleteQuestionButton id="123" question="Test question" />);

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(deleteQuestion).not.toHaveBeenCalled();
  });
});