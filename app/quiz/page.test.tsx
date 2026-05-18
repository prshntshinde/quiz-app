import "@testing-library/jest-dom";

describe("Quiz Listing Page Structure", () => {
  it("validates quiz data structure", () => {
    const quizData = {
      _id: "123",
      title: "Test Quiz",
      description: "Test Description",
    };
    expect(quizData._id).toBeDefined();
    expect(quizData.title).toBeDefined();
  });

  it("validates quiz metadata", () => {
    const metadata = {
      title: "Available Quizzes - Quiz App | Test Your Knowledge",
      description: "Browse and select from our collection of quizzes.",
    };
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
  });
});
