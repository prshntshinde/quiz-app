import { render, screen } from "@testing-library/react";
import Dashboard, { generateMetadata } from "./page";
import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn().mockReturnValue("/admin/dashboard"),
}));

vi.mock("@/lib/quizzes", () => ({
  getAllQuizzes: vi.fn().mockResolvedValue([
    { _id: "1", title: "Test Quiz", description: "A test quiz" },
  ]),
}));

vi.mock("@/lib/questions", () => ({
  getAllQuestions: vi.fn().mockResolvedValue({
    questions: [{ _id: "1", question: "Test?" }],
    total: 10,
    totalPages: 1,
  }),
}));

describe("AdminDashboard", () => {
  it("renders dashboard heading", async () => {
    render(await Dashboard());
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
  });

  it("renders stat cards with data", async () => {
    render(await Dashboard());
    expect(screen.getByText("Total Quizzes")).toBeInTheDocument();
    expect(screen.getByText("Total Questions")).toBeInTheDocument();
    expect(screen.getByText("Quizzes per Question")).toBeInTheDocument();
  });

  it("generates correct metadata", () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe("Dashboard | Quiz App");
  });
});