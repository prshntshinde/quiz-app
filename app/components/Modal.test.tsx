import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import Modal from "./Modal";
import "@testing-library/jest-dom";

describe("Modal", () => {
  const MockChild = () => <div data-testid="modal-child">Test Content</div>;

  it("renders children when visible", async () => {
    await act(async () => {
      render(
        <Modal isVisible={true} onClose={() => {}}>
          <MockChild />
        </Modal>
      );
    });
    expect(screen.getByTestId("modal-child")).toBeInTheDocument();
  });

  it("does not render when not visible", async () => {
    await act(async () => {
      render(
        <Modal isVisible={false} onClose={() => {}}>
          <MockChild />
        </Modal>
      );
    });
    expect(screen.queryByTestId("modal-child")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    await act(async () => {
      render(
        <Modal isVisible={true} onClose={onClose}>
          <MockChild />
        </Modal>
      );
    });

    const closeButton = screen.getByLabelText("Close modal");
    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", async () => {
    const onClose = vi.fn();
    await act(async () => {
      render(
        <Modal isVisible={true} onClose={onClose}>
          <MockChild />
        </Modal>
      );
    });

    const dialog = document.querySelector("dialog");
    fireEvent.keyDown(dialog as Element, { key: "Escape" });

    expect(onClose).toHaveBeenCalled();
  });
});
