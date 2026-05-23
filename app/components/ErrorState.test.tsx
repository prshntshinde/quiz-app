import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
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

  it("calls onRetry when the Try Again button is clicked", () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} retryLabel="Try Again" />);
    fireEvent.click(screen.getByRole("button", { name: /Try Again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
