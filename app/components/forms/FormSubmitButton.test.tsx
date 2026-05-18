import { render, screen } from "@testing-library/react";
import FormSubmitButton from "./FormSubmitButton";
import "@testing-library/jest-dom";

describe("FormSubmitButton", () => {
  it("renders children when provided", () => {
    render(<FormSubmitButton>Submit</FormSubmitButton>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("renders value when children not provided", () => {
    render(<FormSubmitButton value="Create Quiz" />);
    expect(screen.getByText("Create Quiz")).toBeInTheDocument();
  });

  it("shows loading text when isLoading is true", () => {
    render(<FormSubmitButton isLoading={true} value="Submit" />);
    expect(screen.getByText("Adding...")).toBeInTheDocument();
  });

  it("disables button when isLoading is true", () => {
    render(<FormSubmitButton isLoading={true} value="Submit" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is not disabled when isLoading is false", () => {
    render(<FormSubmitButton isLoading={false} value="Submit" />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});