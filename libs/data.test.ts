import { fetchQuizzes, fetchQuestions } from "./data";
import connectMongoDB from "./mongodb";
import { sanitizeData } from "./utils";

vi.mock("./mongodb", () => ({
  default: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./utils", () => ({
    sanitizeData: vi.fn((data: unknown) => data),
}));

const mockQuizFind = vi.fn();
const mockQuestionsFind = vi.fn();

vi.mock("@/models/quiz", () => ({
    Quiz: {
        find: (...args: unknown[]) => mockQuizFind(...args),
    },
    Questions: {
        find: (...args: unknown[]) => mockQuestionsFind(...args),
    },
}));

describe("libs/data", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("fetchQuizzes", () => {
        it("should fetch and sanitize quizzes", async () => {
            const mockQuizzes = [{ title: "Quiz 1" }];
            mockQuizFind.mockReturnValue({
                lean: vi.fn().mockResolvedValue(mockQuizzes),
            });

            const result = await fetchQuizzes();

            expect(connectMongoDB).toHaveBeenCalled();
            expect(mockQuizFind).toHaveBeenCalled();
            expect(sanitizeData).toHaveBeenCalledWith(mockQuizzes);
            expect(result).toEqual(mockQuizzes);
        });

        it("should throw an error if fetch fails", async () => {
            mockQuizFind.mockReturnValue({
                lean: vi.fn().mockRejectedValue(new Error("DB Error")),
            });

            await expect(fetchQuizzes()).rejects.toThrow("Failed to fetch Quizzes.");
        });
    });

    describe("fetchQuestions", () => {
        it("should fetch and sanitize questions for a given quiz ID", async () => {
            const mockQuestions = [{ question: "Q1" }];
            const quizId = "quiz123";

            const mockSort = vi.fn().mockReturnValue({
                lean: vi.fn().mockResolvedValue(mockQuestions),
            });
            mockQuestionsFind.mockReturnValue({
                sort: mockSort,
            });

            const result = await fetchQuestions(quizId);

            expect(connectMongoDB).toHaveBeenCalled();
            expect(mockQuestionsFind).toHaveBeenCalledWith({
                quiz_id: quizId,
                isUsed: false,
            });
            expect(mockSort).toHaveBeenCalledWith({ question_id: 1 });
            expect(sanitizeData).toHaveBeenCalledWith(mockQuestions);
            expect(result).toEqual(mockQuestions);
        });

        it("should throw an error if fetching questions fails", async () => {
            mockQuestionsFind.mockReturnValue({
                sort: vi.fn().mockReturnValue({
                    lean: vi.fn().mockRejectedValue(new Error("DB Error")),
                }),
            });

            await expect(fetchQuestions("123")).rejects.toThrow("Error while fetching questions");
        });
    });
});