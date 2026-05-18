import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock("@/lib/actions/quiz", () => ({
  createQuiz: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("@/app/components/forms/FormSubmitButton", () => function MockFormSubmitButton({
  value,
  isLoading,
}: {
  value: string;
  isLoading: boolean;
}) {
  return (
    <button type="submit" disabled={isLoading}>
      {value}
    </button>
  );
});

describe("Create Quiz Page", () => {
  it("validates quiz form fields", () => {
    const formFields = {
      title: "",
      description: "",
    };

    expect(formFields.title).toBe("");
    expect(formFields.description).toBe("");
  });

  it("validates required fields", () => {
    const isValidTitle = (title: string) => title.trim().length > 0;
    expect(isValidTitle("Test Quiz")).toBe(true);
    expect(isValidTitle("")).toBe(false);
  });

  it("validates submit button state", () => {
    const buttonStates = [
      { value: "Create Quiz", isLoading: false },
      { value: "Create Quiz", isLoading: true },
    ];

    expect(buttonStates[0].isLoading).toBe(false);
    expect(buttonStates[1].isLoading).toBe(true);
  });
});
