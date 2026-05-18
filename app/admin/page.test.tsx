import { render, screen } from "@testing-library/react";
import Admin from "./page";
import "@testing-library/jest-dom";

describe("Admin Login Page", () => {
  it("renders email input field", () => {
    render(<Admin />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it("renders password input field", () => {
    render(<Admin />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders sign in button", () => {
    render(<Admin />);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders email input with correct type", () => {
    render(<Admin />);
    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("renders password input with correct type", () => {
    render(<Admin />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("renders form element", () => {
    render(<Admin />);
    const form = document.querySelector("form");
    expect(form).toHaveAttribute("method", "POST");
  });
});
