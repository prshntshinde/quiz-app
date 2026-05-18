import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ErrorState from "./ErrorState";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({
        refresh: jest.fn(),
    })),
}));

describe("ErrorState", () => {
    let refreshMock;

    beforeEach(() => {
        const mockRouter = { refresh: jest.fn() };
        useRouter.mockReturnValue(mockRouter);
        refreshMock = mockRouter.refresh;
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

    it("should refresh page when refresh button is clicked", () => {
        render(<ErrorState />);
        const refreshButton = screen.getByText("Refresh Page");
        fireEvent.click(refreshButton);
        expect(refreshMock).toHaveBeenCalled();
    });
});
