import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
    const originalLocation = window.location;

    beforeAll(() => {
        delete window.location;
        window.location = { reload: jest.fn() };
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    it("should render default error message", () => {
        render(<ErrorState />);
        expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
        expect(screen.getByText("We encountered an error while fetching the quizzes. Please try again later.")).toBeInTheDocument();
    });

    it("should render custom error message", () => {
        const customMessage = "Failed to connect to server";
        render(<ErrorState message={customMessage} />);
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it("should reload page when refresh button is clicked", () => {
        render(<ErrorState />);
        const refreshButton = screen.getByText("Refresh Page");
        fireEvent.click(refreshButton);
        expect(window.location.reload).toHaveBeenCalled();
    });
});
