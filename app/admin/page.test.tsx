import { render } from "@testing-library/react";
import { vi } from "vitest";

const mockRedirect = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

describe("AdminRedirect", () => {
  it("redirects to /admin/login", async () => {
    mockRedirect.mockImplementation(() => {
      throw new Error("NEXT_REDIRECT");
    });

    try {
      const AdminRedirect = (await import("./page")).default;
      render(<AdminRedirect />);
    } catch {
      // redirect throws in Next.js — expected
    }

    expect(mockRedirect).toHaveBeenCalledWith("/admin/login");
  });
});