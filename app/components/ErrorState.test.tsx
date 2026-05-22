import { render, screen } from "@testing-library/react";
import ErrorState from "./ErrorState";
import "@testing-library/jest-dom";

describe("ErrorState", () => {
  it("renders the default error message", () => {
    render(<ErrorState />);
    expect(
      screen.getByText(/Something went wrong/i)
    ).toBeInTheDocument();
  });

  it("renders a custom error message", () => {
    render(<ErrorState message="Custom error message" />);
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("renders the Try Again button when onRetry is provided", () => {
    render(<ErrorState onRetry={() => {}} retryLabel="Try Again" />);
    expect(screen.getByRole("button", { name: /Try Again/i })).toBeInTheDocument();
  });
});
