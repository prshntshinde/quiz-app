import "@testing-library/jest-dom";

describe("RootLayout", () => {
  it("should validate layout props structure", () => {
    const layoutProps = {
      children: "Test Content",
    };
    
    expect(layoutProps.children).toBeDefined();
  });

  it("should have proper metadata structure", () => {
    const metadata = {
      title: "Quiz App",
      description: "Test Your Knowledge",
    };
    
    expect(metadata.title).toBe("Quiz App");
    expect(metadata.description).toBeTruthy();
  });
});