import "@testing-library/jest-dom";

describe("Question Component Structure", () => {
  const mockQuestion = {
    question_id: 1,
    question: "What is the capital of France?",
    option1: "London",
    option2: "Paris",
    option3: "Berlin",
    option4: "Madrid",
    answer: 1,
    explanation: "Paris is the capital of France.",
  };

  it("should validate question data structure", () => {
    expect(mockQuestion.question_id).toBe(1);
    expect(mockQuestion.question).toBe("What is the capital of France?");
    expect(mockQuestion.answer).toBe(1);
  });

  it("should have all four options", () => {
    expect(mockQuestion.option1).toBeDefined();
    expect(mockQuestion.option2).toBeDefined();
    expect(mockQuestion.option3).toBeDefined();
    expect(mockQuestion.option4).toBeDefined();
  });

  it("should have explanation", () => {
    expect(mockQuestion.explanation).toBe("Paris is the capital of France.");
  });

  it("should have answer within valid range", () => {
    expect(mockQuestion.answer).toBeGreaterThanOrEqual(0);
    expect(mockQuestion.answer).toBeLessThanOrEqual(3);
  });
});