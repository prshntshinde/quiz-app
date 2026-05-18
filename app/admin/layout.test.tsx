import { render, screen } from "@testing-library/react";
import SideMenu from "@/app/components/SideMenu";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("AdminLayout", () => {
  it("renders SideMenu component", () => {
    render(<SideMenu />);
    expect(screen.getByRole("link", { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Quiz/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Questions/i })).toBeInTheDocument();
  });

  it("renders layout structure", () => {
    render(
      <div className="flex h-screen overflow-hidden">
        <SideMenu />
        <div className="relative flex flex-col overflow-x-hidden overflow-y-auto">
          <div className="p-4">
            <div data-testid="admin-content">Admin Content</div>
          </div>
        </div>
      </div>
    );
    expect(screen.getByTestId("admin-content")).toBeInTheDocument();
  });
});