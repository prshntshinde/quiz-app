import { vi } from "vitest";
import connectMongoDB from "./mongodb";
import mongoose from "mongoose";

const { mockConnection, mockConnect } = vi.hoisted(() => ({
  mockConnection: { readyState: 0 },
  mockConnect: vi.fn(() => Promise.resolve()),
}));

vi.mock("mongoose", () => {
  return {
    __esModule: true,
    default: {
      connection: mockConnection,
      connect: mockConnect,
      models: {},
      model: vi.fn(),
    },
    connection: mockConnection,
    connect: mockConnect,
    models: {},
    model: vi.fn(),
  };
});

describe("connectMongoDB", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (mockConnection as unknown as { readyState: number }).readyState = 0;
    mockConnect.mockResolvedValue(undefined);
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should return early if already connected (readyState = 1)", async () => {
    (mockConnection as unknown as { readyState: number }).readyState = 1;

    await connectMongoDB();

    expect(mockConnect).not.toHaveBeenCalled();
  });

  it("should connect when not connected (readyState = 0)", async () => {
    (mockConnection as unknown as { readyState: number }).readyState = 0;

    await connectMongoDB();

    expect(mockConnect).toHaveBeenCalledWith(process.env.MONGODB_URI);
  });

  it("should handle connection errors by throwing", async () => {
    (mockConnection as unknown as { readyState: number }).readyState = 0;
    mockConnect.mockRejectedValue(new Error("Connection failed"));

    await expect(connectMongoDB()).rejects.toThrow("Failed to connect to MongoDB");
  });
});