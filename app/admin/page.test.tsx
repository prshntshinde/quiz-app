import { render, screen } from "@testing-library/react";
import Admin from "./page";
import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe("Admin Login Page", () => {
  it("renders username input field", () => {
    render(<Admin />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it("renders password input field", () => {
    render(<Admin />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders sign in button", () => {
    render(<Admin />);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders username input with correct type", () => {
    render(<Admin />);
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toHaveAttribute("type", "text");
  });

  it("renders password input with correct type", () => {
    render(<Admin />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("renders form element", () => {
    render(<Admin />);
    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});