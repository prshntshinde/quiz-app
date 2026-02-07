import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
    it("should render empty state message", () => {
        render(<EmptyState />);
        expect(screen.getByText("No Quizzes Available Yet")).toBeInTheDocument();
        expect(screen.getByText("Check back soon for new quizzes to challenge yourself!")).toBeInTheDocument();
        expect(screen.getByText("📝")).toBeInTheDocument();
    });
});
