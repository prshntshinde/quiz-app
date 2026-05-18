import { render, screen } from "@testing-library/react";
import HomeImage from "./HomeImage";
import "@testing-library/jest-dom";

describe("HomeImage", () => {
  it("renders the image", () => {
    render(<HomeImage />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("has correct alt text", () => {
    render(<HomeImage />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Church Picture");
  });
});