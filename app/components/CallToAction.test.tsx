import { render, screen } from "@testing-library/react";
import CallToAction from "./CallToAction";
import "@testing-library/jest-dom";

describe("CallToAction", () => {
  it("renders the main heading", () => {
    render(<CallToAction />);
    expect(screen.getByText(/Ready to Test Your Knowledge\?/i)).toBeInTheDocument();
  });

  it("renders the Get Started button", () => {
    render(<CallToAction />);
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });

  it("renders the subtext", () => {
    render(<CallToAction />);
    expect(
      screen.getByText(/Join thousands of learners challenging themselves/i)
    ).toBeInTheDocument();
  });

  it("renders the no registration text", () => {
    render(<CallToAction />);
    expect(
      screen.getByText(/No registration required.*Start immediately.*Free to use/i)
    ).toBeInTheDocument();
  });

  it("contains a link to /quiz", () => {
    render(<CallToAction />);
    const link = screen.getByRole("link", { name: /Get Started/i });
    expect(link).toHaveAttribute("href", "/quiz");
  });
});