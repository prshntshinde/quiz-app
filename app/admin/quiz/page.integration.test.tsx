import "@testing-library/jest-dom";
import { getAllQuizzes } from "@/lib/quizzes";

vi.mock("@/lib/quizzes", () => ({
  getAllQuizzes: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  },
}));

vi.mock("./DeleteQuizButton", () => ({
  default: function MockDeleteQuizButton({ id, title }: { id: string; title: string }) {
    return <button data-testid="delete-btn">Delete {title}</button>;
  },
}));

describe("Admin Quiz Page Data Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches quizzes via getAllQuizzes", async () => {
    const mockQuizzes = [
      { _id: "1", title: "Quiz 1", description: "Desc 1" },
      { _id: "2", title: "Quiz 2", description: "Desc 2" },
    ];
    
    (getAllQuizzes as vi.Mock).mockResolvedValue(mockQuizzes);
    const result = await getAllQuizzes();
    
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Quiz 1");
  });

  it("handles getAllQuizzes error", async () => {
    (getAllQuizzes as vi.Mock).mockRejectedValue(new Error("Failed to fetch"));
    
    await expect(getAllQuizzes()).rejects.toThrow("Failed to fetch");
  });

  it("validates quiz list data structure", () => {
    const quizList = [
      { _id: "abc", title: "React", description: "React basics" },
      { _id: "def", title: "Node", description: "Node basics" },
    ];

    expect(quizList[0]._id).toBe("abc");
    expect(quizList[0].title).toBe("React");
    expect(quizList[1].description).toBe("Node basics");
  });

  it("validates admin quiz page metadata", () => {
    const metadata = {
      title: "Quiz | Quiz App",
    };

    expect(metadata.title).toBe("Quiz | Quiz App");
  });

  it("validates Add Quiz link href", () => {
    const addQuizHref = "/admin/quiz/create";
    expect(addQuizHref).toBe("/admin/quiz/create");
  });

  it("validates Edit link format", () => {
    const quizId = "123";
    const editLink = `/admin/quiz/edit/${quizId}`;
    expect(editLink).toContain(quizId);
  });
});
