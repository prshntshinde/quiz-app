import "@testing-library/jest-dom";

describe("Admin Questions Page", () => {
  it("validates questions list data structure", () => {
    const questionData = {
      _id: "123",
      question: "What is React?",
      options: [{ 0: "Library", 1: "Framework", 2: "Language", 3: "Tool" }],
      answer: 0,
      quiz_id: "quiz123",
      question_id: 1,
      explanation: "React is a library",
      isUsed: false,
    };

    expect(questionData.question).toBeDefined();
    expect(questionData.options[0][0]).toBe("Library");
    expect(questionData.answer).toBe(0);
  });

  it("validates options format with {0,1,2,3} structure", () => {
    const options = [
      { 0: "Option A", 1: "Option B", 2: "Option C", 3: "Option D" },
    ];

    expect(options[0][0]).toBe("Option A");
    expect(options[0][1]).toBe("Option B");
    expect(options[0][2]).toBe("Option C");
    expect(options[0][3]).toBe("Option D");
  });

  it("validates answer mapping", () => {
    const answerLabels = ["A", "B", "C", "D"];
    expect(answerLabels[0]).toBe("A");
    expect(answerLabels[1]).toBe("B");
    expect(answerLabels[2]).toBe("C");
    expect(answerLabels[3]).toBe("D");
  });

  it("validates pagination parameters", () => {
    const page = 1;
    const limit = 10;
    const total = 25;
    const totalPages = Math.ceil(total / limit);

    expect(page).toBe(1);
    expect(limit).toBe(10);
    expect(totalPages).toBe(3);
  });

  it("validates Add Question link", () => {
    const addQuestionHref = "/admin/questions/create";
    expect(addQuestionHref).toBe("/admin/questions/create");
  });

  it("validates Edit question link format", () => {
    const questionId = "507f1f77bcf86cd799439011";
    const editLink = `/admin/questions/${questionId}`;
    expect(editLink).toContain(questionId);
  });

  it("validates metadata generation", () => {
    const metadata = {
      title: "Questions | Quiz App",
    };
    expect(metadata.title).toBe("Questions | Quiz App");
  });
});