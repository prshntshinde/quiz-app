import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";

vi.mock("next/image", () => ({
  default: function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />;
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("./DarkModeToggle", () => ({
  default: function MockDarkModeToggle() {
    return <button aria-label="Switch to dark mode">Dark Mode</button>;
  },
}));

describe("NavBar", () => {
  beforeEach(() => {
    (usePathname as vi.Mock).mockReturnValue("/");
  });

  it("renders all navigation links", () => {
    render(<NavBar />);
    expect(screen.getAllByRole("link", { name: /Home/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: /Quiz/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Admin/i })).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<NavBar />);
    const homeLinks = screen.getAllByRole("link", { name: /Home/i });
    expect(homeLinks[homeLinks.length - 1]).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Quiz/i })).toHaveAttribute("href", "/quiz");
    expect(screen.getByRole("link", { name: /Admin/i })).toHaveAttribute("href", "/admin");
  });

  it("highlights the current page link", () => {
    (usePathname as vi.Mock).mockReturnValue("/quiz");
    render(<NavBar />);
    const quizLink = screen.getByRole("link", { name: /Quiz/i });
    expect(quizLink).toHaveClass(/bg-purple-100/i);
  });

  it("renders mobile menu button on small screens", () => {
    render(<NavBar />);
    expect(screen.getByRole("button", { name: /Open menu/i })).toBeInTheDocument();
  });

  it("renders dark mode toggle", () => {
    render(<NavBar />);
    expect(screen.getAllByRole("button", { name: /Switch to dark mode/i }).length).toBeGreaterThanOrEqual(1);
  });
});
