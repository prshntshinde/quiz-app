import React from "react";
import { render, screen } from "@testing-library/react";
import CallToAction from "./CallToAction";

describe("CallToAction", () => {
    it("should render call to action text", () => {
        render(<CallToAction />);
        expect(screen.getByText("Ready to Test Your Knowledge?")).toBeInTheDocument();
        expect(screen.getByText(/Join thousands of learners challenging themselves every day/)).toBeInTheDocument();
        expect(screen.getByText("Get Started")).toBeInTheDocument();
    });

    it("should have a link to the quiz page", () => {
        render(<CallToAction />);
        const link = screen.getByRole("link", { name: /Get Started/i });
        expect(link).toHaveAttribute("href", "/quiz");
    });
});
