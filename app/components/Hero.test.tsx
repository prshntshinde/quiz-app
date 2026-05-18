import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import "@testing-library/jest-dom";
import { Suspense } from "react";

vi.mock("next/link", () => ({
  default: function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  },
}));

describe("Hero Component", () => {
  it("renders main heading", () => {
    render(<Hero />);
    expect(screen.getByText(/Test Your Knowledge/i)).toBeInTheDocument();
  });

  it("renders subtitle text", () => {
    render(<Hero />);
    expect(screen.getByText(/Challenge Your Mind/i)).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<Hero />);
    expect(screen.getByText(/Explore diverse quiz topics/i)).toBeInTheDocument();
  });

  it("renders Start Quiz Now button", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /Start Quiz Now/i })).toBeInTheDocument();
  });

  it("renders Browse Quizzes button", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /Browse Quizzes/i })).toBeInTheDocument();
  });

  it("renders feature badges", () => {
    render(<Hero />);
    expect(screen.getByText(/Multiple Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/Instant Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Track Progress/i)).toBeInTheDocument();
  });

  it("links to /quiz page", () => {
    render(<Hero />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/quiz");
  });
});
