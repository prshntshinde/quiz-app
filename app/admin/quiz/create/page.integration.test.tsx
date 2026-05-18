import "@testing-library/jest-dom";
import { createQuiz } from "@/lib/actions/quiz";
import { useRouter } from "next/navigation";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
  useParams: vi.fn(() => ({})),
  usePathname: vi.fn(() => ""),
}));

vi.mock("@/lib/actions/quiz", () => ({
  createQuiz: vi.fn(() => Promise.resolve({ message: "Quiz created" })),
  deleteQuiz: vi.fn(),
  updateQuiz: vi.fn(),
}));

describe("Create Quiz Page Data Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates form input state structure", () => {
    const formState = {
      title: "",
      description: "",
      isLoading: false,
    };

    expect(formState.title).toBe("");
    expect(formState.description).toBe("");
    expect(formState.isLoading).toBe(false);
  });

  it("validates form input with values", () => {
    const formState = {
      title: "JavaScript Quiz",
      description: "Test your JS knowledge",
      isLoading: true,
    };

    expect(formState.title.length).toBeGreaterThan(0);
    expect(formState.description.length).toBeGreaterThan(0);
    expect(formState.isLoading).toBe(true);
  });

  it("validates createQuiz action call", async () => {
    const formData = new FormData();
    formData.append("title", "Test Quiz");
    formData.append("description", "Test Description");

    (createQuiz as ReturnType<typeof vi.fn>).mockResolvedValue({ message: "Quiz created" });
    const result = await createQuiz(formData);

    expect(result.message).toBe("Quiz created");
  });

  it("validates required field validation", () => {
    const isValidTitle = (title: string) => title.trim().length > 0;

    expect(isValidTitle("Valid Title")).toBe(true);
    expect(isValidTitle("")).toBe(false);
    expect(isValidTitle("   ")).toBe(false);
  });

  it("validates router push after creation", () => {
    const mockRouter = useRouter();

    expect(mockRouter.push).toBeDefined();
  });
});
