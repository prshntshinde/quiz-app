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
    mockConnection.readyState = 0;
    mockConnect.mockResolvedValue(undefined);
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should return early if already connected (readyState = 1)", async () => {
    mongoose.connection.readyState = 1;

    await connectMongoDB();

    expect(mockConnect).not.toHaveBeenCalled();
  });

  it("should return early if connecting (readyState = 2)", async () => {
    mongoose.connection.readyState = 2;

    await connectMongoDB();

    expect(mockConnect).not.toHaveBeenCalled();
  });

  it("should connect when not connected (readyState = 0)", async () => {
    mongoose.connection.readyState = 0;

    await connectMongoDB();

    expect(mockConnect).toHaveBeenCalledWith(process.env.MONGODB_URI);
  });

  it("should handle connection errors", async () => {
    mongoose.connection.readyState = 0;
    mockConnect.mockRejectedValue(new Error("Connection failed"));

    await connectMongoDB();

    expect(console.error).toHaveBeenCalledWith(expect.any(Error));
  });
});