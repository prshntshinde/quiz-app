import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
        document.body.style.overflow = "";
    });

    test("renders children when isVisible is true", () => {
        render(
            <Modal isVisible={true} onClose={mockOnClose}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );

        expect(screen.getByTestId("modal-content")).toBeInTheDocument();
    });

    test("does not render when isVisible is false", () => {
        render(
            <Modal isVisible={false} onClose={mockOnClose}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );

        expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
    });

    test("calls onClose when backdrop is clicked", () => {
        render(
            <Modal isVisible={true} onClose={mockOnClose}>
                <div>Modal Content</div>
            </Modal>
        );

        const backdrop = screen.getByLabelText("Close modal backdrop");
        fireEvent.click(backdrop);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("does not call onClose when modal content is clicked", () => {
        render(
            <Modal isVisible={true} onClose={mockOnClose}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );

        const content = screen.getByTestId("modal-content");
        fireEvent.click(content);

        expect(mockOnClose).not.toHaveBeenCalled();
    });

    test("calls onClose when close button is clicked", () => {
        render(
            <Modal isVisible={true} onClose={mockOnClose}>
                <div>Modal Content</div>
            </Modal>
        );

        const closeButton = screen.getByLabelText("Close modal");
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("calls onClose when Escape key is pressed", () => {
        render(
            <Modal isVisible={true} onClose={mockOnClose}>
                <div>Modal Content</div>
            </Modal>
        );

        fireEvent.keyDown(window, { key: "Escape", code: "Escape", keyCode: 27 });

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("locks body scroll when visible", () => {
        const { rerender } = render(
            <Modal isVisible={false} onClose={mockOnClose}>
                <div>Content</div>
            </Modal>
        );

        expect(document.body.style.overflow).toBe("");

        rerender(
            <Modal isVisible={true} onClose={mockOnClose}>
                <div>Content</div>
            </Modal>
        );

        expect(document.body.style.overflow).toBe("hidden");

        rerender(
            <Modal isVisible={false} onClose={mockOnClose}>
                <div>Content</div>
            </Modal>
        );

        expect(document.body.style.overflow).toBe("");
    });
});
