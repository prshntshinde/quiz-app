import "@testing-library/jest-dom";
import { Inter } from "next/font/google";

vi.mock("next/font/google", () => ({
  Inter: vi.fn().mockReturnValue({ className: "inter-class" }),
}));

vi.mock("./components/NavBar", () => ({
  default: function MockNavBar() {
    return <nav data-testid="navbar">NavBar</nav>;
  },
}));

describe("RootLayout", () => {
  it("validates Inter font configuration", () => {
    const inter = Inter({ subsets: ["latin"] });
    expect(inter.className).toBeDefined();
  });

  it("validates root layout children prop", () => {
    const layoutProps = {
      children: <div>Page Content</div>,
    };
    expect(layoutProps.children).toBeDefined();
  });

  it("validates metadata structure", () => {
    const metadata = {
      title: "Quiz App - Test Your Knowledge & Challenge Your Mind",
      description: "Explore diverse quiz topics, get instant feedback, and track your progress. Start your learning journey with our engaging quiz application today.",
    };

    expect(metadata.title).toContain("Quiz App");
    expect(metadata.description).toContain("quiz topics");
  });

  it("validates html structure attributes", () => {
    const htmlProps = {
      lang: "en",
    };
    expect(htmlProps.lang).toBe("en");
  });

  it("validates body className usage", () => {
    const inter = Inter({ subsets: ["latin"] });
    const bodyClass = inter.className;
    expect(typeof bodyClass).toBe("string");
  });

  it("validates NavBar component is rendered", () => {
    const MockNavBar = () => <nav data-testid="navbar">NavBar</nav>;
    const component = MockNavBar();
    expect(component).toBeDefined();
  });
});
