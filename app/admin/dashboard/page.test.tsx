import { render, screen } from "@testing-library/react";
import Dashboard from "./page";
import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("AdminDashboard", () => {
  it("renders dashboard content", () => {
    render(<Dashboard />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});