import { render, screen, act, fireEvent } from "@testing-library/react";
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
});