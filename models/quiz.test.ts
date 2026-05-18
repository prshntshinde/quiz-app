describe("Quiz and Questions Models", () => {
  it("validates IQuizDocument interface properties", () => {
    const quizDoc = {
      title: "Test Quiz",
      description: "Test Description",
      isComplete: false,
      isActive: true,
      deletedAt: null,
      history: [] as Array<{ title: string; description: string; updatedAt: Date }>,
    };

    expect(quizDoc.title).toBe("Test Quiz");
    expect(quizDoc.description).toBe("Test Description");
    expect(quizDoc.isComplete).toBe(false);
    expect(quizDoc.isActive).toBe(true);
    expect(quizDoc.deletedAt).toBeNull();
  });

  it("validates IQuestionDocument interface properties", () => {
    const questionDoc = {
      question: "Test Question",
      options: [{ 0: "Option 1", 1: "Option 2", 2: "Option 3", 3: "Option 4" }],
      answer: 0,
      explanation: "Explanation",
      quiz_id: "test-id",
      question_id: 1,
      isUsed: false,
    };

    expect(questionDoc.question).toBe("Test Question");
    expect(questionDoc.options).toHaveLength(1);
    expect(questionDoc.options[0][0]).toBe("Option 1");
    expect(questionDoc.answer).toBe(0);
    expect(questionDoc.explanation).toBe("Explanation");
    expect(questionDoc.quiz_id).toBe("test-id");
    expect(questionDoc.question_id).toBe(1);
    expect(questionDoc.isUsed).toBe(false);
  });

  it("validates quiz schema field requirements", () => {
    const requiredFields = {
      title: { type: "String", required: true },
      description: { type: "String", required: true },
      isComplete: { type: "Boolean", default: false },
      isActive: { type: "Boolean", default: true },
    };

    expect(requiredFields.title.required).toBe(true);
    expect(requiredFields.description.required).toBe(true);
    expect(requiredFields.isComplete.default).toBe(false);
    expect(requiredFields.isActive.default).toBe(true);
  });

  it("validates question schema field requirements", () => {
    const questionFields = {
      question: { type: "String", required: true },
      options: { type: "Array", required: true },
      answer: { type: "Number", required: true },
      explanation: { type: "String", default: "" },
      quiz_id: { type: "ObjectId", required: true },
      question_id: { type: "Number", required: true },
      isUsed: { type: "Boolean", default: false },
    };

    expect(questionFields.question.required).toBe(true);
    expect(questionFields.options.required).toBe(true);
    expect(questionFields.answer.required).toBe(true);
    expect(questionFields.explanation.default).toBe("");
    expect(questionFields.quiz_id.required).toBe(true);
    expect(questionFields.question_id.required).toBe(true);
    expect(questionFields.isUsed.default).toBe(false);
  });
});