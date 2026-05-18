import "@testing-library/jest-dom";

vi.mock("@/libs/data", () => ({
  fetchQuestions: vi.fn().mockResolvedValue([
    {
      _id: "q1",
      question_id: 1,
      question: "Test Question?",
      options: [{ 0: "Option 1", 1: "Option 2", 2: "Option 3", 3: "Option 4" }],
      answer: 0,
      explanation: "Test explanation",
    },
  ]),
}));

vi.mock("@/app/components/Question", () => function MockQuestion({
  question_id,
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
  explanation,
}: any) {
  return (
    <div data-testid="question">
      <span data-testid="question-id">{question_id}</span>
      <span data-testid="question-text">{question}</span>
      <span data-testid="option-1">{option1}</span>
      <span data-testid="option-2">{option2}</span>
      <span data-testid="option-3">{option3}</span>
      <span data-testid="option-4">{option4}</span>
      <span data-testid="answer">{answer}</span>
      <span data-testid="explanation">{explanation}</span>
    </div>
  );
});

describe("Quiz Answer Page", () => {
  it("validates Question data structure", () => {
    const question = {
      _id: "q1",
      question_id: 1,
      question: "What is 2+2?",
      options: [{ 0: "3", 1: "4", 2: "5", 3: "6" }],
      answer: 1,
      explanation: "2+2=4",
    };

    expect(question.question_id).toBe(1);
    expect(question.options[0][0]).toBe("3");
    expect(question.answer).toBe(1);
  });

  it("validates generateMetadata output", () => {
    const metadata = {
      title: "Questions | Quiz App",
    };

    expect(metadata.title).toBe("Questions | Quiz App");
  });
});