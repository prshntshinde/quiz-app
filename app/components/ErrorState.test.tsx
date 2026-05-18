import { render, screen } from "@testing-library/react";
import ErrorState from "./ErrorState";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
  })),
}));

describe("ErrorState", () => {
  it("renders the default error message", () => {
    render(<ErrorState />);
    expect(
      screen.getByText(/We encountered an error while fetching the quizzes/i)
    ).toBeInTheDocument();
  });

  it("renders a custom error message", () => {
    render(<ErrorState message="Custom error message" />);
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("renders the Refresh Page button", () => {
    render(<ErrorState />);
    expect(screen.getByRole("button", { name: /Refresh Page/i })).toBeInTheDocument();
  });
});