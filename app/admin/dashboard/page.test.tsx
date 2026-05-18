import { render, screen } from "@testing-library/react";
import Dashboard from "./page";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AdminDashboard", () => {
  it("renders dashboard content", () => {
    render(<Dashboard />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});