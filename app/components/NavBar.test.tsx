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

describe("NavBar", () => {
  beforeEach(() => {
    (usePathname as vi.Mock).mockReturnValue("/");
  });

  it("renders all navigation links", () => {
    render(<NavBar />);
    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Quiz/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Admin/i })).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<NavBar />);
    expect(screen.getByRole("link", { name: /Home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Quiz/i })).toHaveAttribute("href", "/quiz");
    expect(screen.getByRole("link", { name: /Admin/i })).toHaveAttribute("href", "/admin");
  });

  it("highlights the current page link", () => {
    (usePathname as vi.Mock).mockReturnValue("/quiz");
    render(<NavBar />);
    const quizLink = screen.getByRole("link", { name: /Quiz/i });
    expect(quizLink.closest("a")).toHaveClass(/bg-purple-100/i);
  });
});
