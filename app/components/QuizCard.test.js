import React from "react";
import { render, screen } from "@testing-library/react";
import QuizCard from "./QuizCard";

// Mock next/link
jest.mock("next/link", () => {
    return ({ children, href }) => {
        return <a href={href}>{children}</a>;
    };
});

// Mock RulesModal
jest.mock("./RulesModal", () => {
    return function MockRulesModal() {
        return <div data-testid="rules-modal">Rules Modal</div>;
    };
});

describe("QuizCard", () => {
    const mockQuiz = {
        _id: "123",
        title: "Test Quiz",
        description: "Test Description"
    };

    test("renders quiz title and description", () => {
        render(<QuizCard quiz={mockQuiz} />);

        expect(screen.getByText("Test Quiz")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    test("renders start button with correct link", () => {
        render(<QuizCard quiz={mockQuiz} />);

        const startButton = screen.getByRole("link", { name: /start quiz/i });
        expect(startButton).toBeInTheDocument();
        expect(startButton).toHaveAttribute("href", "/quiz/123");
    });

    test("renders RulesModal", () => {
        render(<QuizCard quiz={mockQuiz} />);

        expect(screen.getByTestId("rules-modal")).toBeInTheDocument();
    });

    test("handles missing description gracefully", () => {
        const quizWithoutDesc = { _id: "456", title: "No Desc Quiz" };
        render(<QuizCard quiz={quizWithoutDesc} />);

        expect(screen.getByText("No Desc Quiz")).toBeInTheDocument();
        expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
    });
});
