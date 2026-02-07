import { fetchQuizzes, fetchQuestions } from "./data";
import connectMongoDB from "./mongodb";
import { sanitizeData } from "./utils";

// Mock the dependencies
jest.mock("./mongodb", () => jest.fn());
jest.mock("./utils", () => ({
    sanitizeData: jest.fn((data) => data),
}));

// Mock the models separately to avoid importing the actual model file
// which triggers the bson ESM error in Jest
const mockQuizFind = jest.fn();
const mockQuestionsFind = jest.fn();

jest.mock("@/models/quiz", () => ({
    Quiz: {
        find: (...args) => mockQuizFind(...args),
    },
    Questions: {
        find: (...args) => mockQuestionsFind(...args),
    },
}));

describe("libs/data", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchQuizzes", () => {
        it("should fetch and sanitize quizzes", async () => {
            const mockQuizzes = [{ title: "Quiz 1" }];
            mockQuizFind.mockReturnValue({
                lean: jest.fn().mockResolvedValue(mockQuizzes),
            });

            const result = await fetchQuizzes();

            expect(connectMongoDB).toHaveBeenCalled();
            expect(mockQuizFind).toHaveBeenCalled();
            expect(sanitizeData).toHaveBeenCalledWith(mockQuizzes);
            expect(result).toEqual(mockQuizzes);
        });

        it("should throw an error if fetch fails", async () => {
            mockQuizFind.mockReturnValue({
                lean: jest.fn().mockRejectedValue(new Error("DB Error")),
            });

            await expect(fetchQuizzes()).rejects.toThrow("Failed to fetch Quizzes.");
        });
    });

    describe("fetchQuestions", () => {
        it("should fetch and sanitize questions for a given quiz ID", async () => {
            const mockQuestions = [{ question: "Q1" }];
            const quizId = "quiz123";

            const mockSort = jest.fn().mockReturnValue({
                lean: jest.fn().mockResolvedValue(mockQuestions),
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
                sort: jest.fn().mockReturnValue({
                    lean: jest.fn().mockRejectedValue(new Error("DB Error")),
                }),
            });

            await expect(fetchQuestions("123")).rejects.toThrow("Error while fetching answers");
        });
    });
});
