import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";
import "@testing-library/jest-dom";

describe("EmptyState", () => {
  it("renders the default heading", () => {
    render(<EmptyState />);
    expect(screen.getByText(/No Items Available/i)).toBeInTheDocument();
  });

  it("renders the default description", () => {
    render(<EmptyState />);
    expect(
      screen.getByText(/Check back soon for new content!/i)
    ).toBeInTheDocument();
  });

  it("renders custom message and description", () => {
    render(
      <EmptyState
        message="Custom Message"
        description="Custom description text"
      />
    );
    expect(screen.getByText(/Custom Message/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom description text/i)).toBeInTheDocument();
  });

  it("renders a CTA link when actionLabel and actionHref are provided", () => {
    render(<EmptyState actionLabel="CTA" actionHref="/target" />);
    const link = screen.getByRole("link", { name: /CTA/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/target");
  });

  it("renders the emoji icon", () => {
    render(<EmptyState />);
    expect(screen.getByText("📝")).toBeInTheDocument();
  });
});