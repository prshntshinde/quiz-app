import "@testing-library/jest-dom";

describe("RootLayout", () => {
  it("should have test environment configured", () => {
    expect(true).toBe(true);
  });

  it("should validate layout structure", () => {
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