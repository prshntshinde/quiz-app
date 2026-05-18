import { render, screen } from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";

vi.mock("./components/Hero", () => ({
  default: function MockHero() {
    return <div data-testid="hero">Hero Component</div>;
  },
}));

vi.mock("./components/Features", () => ({
  default: function MockFeatures() {
    return <div data-testid="features">Features Component</div>;
  },
}));

vi.mock("./components/CallToAction", () => ({
  default: function MockCallToAction() {
    return <div data-testid="cta">Call To Action Component</div>;
  },
}));

describe("Home Page", () => {
  it("renders main element with min-h-screen class", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toHaveClass("min-h-screen");
  });

  it("renders Hero component", () => {
    render(<Home />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders Features component", () => {
    render(<Home />);
    expect(screen.getByTestId("features")).toBeInTheDocument();
  });

  it("renders CallToAction component", () => {
    render(<Home />);
    expect(screen.getByTestId("cta")).toBeInTheDocument();
  });
});
