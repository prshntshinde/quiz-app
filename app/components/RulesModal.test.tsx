import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import RulesModal from "./RulesModal";
import "@testing-library/jest-dom";

describe("RulesModal", () => {
  it("renders the Rules button", async () => {
    await act(async () => {
      render(<RulesModal />);
    });
    expect(screen.getByRole("button", { name: /Rules/i })).toBeInTheDocument();
  });

  it("opens modal when Rules button is clicked", async () => {
    await act(async () => {
      render(<RulesModal />);
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Rules/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/प्रश्नमंजुषाचे नियम/i)).toBeInTheDocument();
    });
  });

  it("renders rules when modal is open", async () => {
    await act(async () => {
      render(<RulesModal />);
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Rules/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/प्रश्नमंजुषा तीन फेऱ्यांमध्ये घेतली जाईल/i)).toBeInTheDocument();
    });
  });
});