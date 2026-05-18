import { render, screen } from "@testing-library/react";
import Features from "./Features";
import "@testing-library/jest-dom";

describe("Features", () => {
  it("renders the section heading", () => {
    render(<Features />);
    expect(screen.getByText(/Why Choose Our Quiz App\?/i)).toBeInTheDocument();
  });

  it("renders all three feature cards", () => {
    render(<Features />);
    expect(screen.getByText(/Diverse Topics/i)).toBeInTheDocument();
    expect(screen.getByText(/Instant Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Track Progress/i)).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    render(<Features />);
    expect(
      screen.getByText(/Explore a wide range of quiz categories/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Get immediate feedback on your answers/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Monitor your performance over time/i)
    ).toBeInTheDocument();
  });

  it("renders feature icons", () => {
    render(<Features />);
    expect(screen.getByText("🎯")).toBeInTheDocument();
    expect(screen.getByText("⚡")).toBeInTheDocument();
    expect(screen.getByText("📊")).toBeInTheDocument();
  });
});