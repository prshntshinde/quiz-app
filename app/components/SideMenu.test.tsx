import { render, screen } from "@testing-library/react";
import SideMenu from "./SideMenu";
import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  usePathname: vi.fn().mockReturnValue("/admin/dashboard"),
}));

describe("SideMenu", () => {
  it("renders Dashboard link", () => {
    render(<SideMenu />);
    expect(screen.getByRole("link", { name: /Dashboard/i })).toBeInTheDocument();
  });

  it("renders Quiz link", () => {
    render(<SideMenu />);
    expect(screen.getByRole("link", { name: /Quiz/i })).toBeInTheDocument();
  });

  it("renders Questions link", () => {
    render(<SideMenu />);
    expect(screen.getByRole("link", { name: /Questions/i })).toBeInTheDocument();
  });

  it("renders all links with correct hrefs", () => {
    render(<SideMenu />);
    expect(screen.getByRole("link", { name: /Dashboard/i })).toHaveAttribute(
      "href",
      "/admin/dashboard"
    );
    expect(screen.getByRole("link", { name: /Quiz/i })).toHaveAttribute(
      "href",
      "/admin/quiz"
    );
    expect(screen.getByRole("link", { name: /Questions/i })).toHaveAttribute(
      "href",
      "/admin/questions"
    );
  });

  it("renders logout button", () => {
    render(<SideMenu />);
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });
});