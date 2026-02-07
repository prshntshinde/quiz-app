import { sanitizeData } from "./utils";

describe("sanitizeData", () => {
    test("should handle null and primitives", () => {
        expect(sanitizeData(null)).toBe(null);
        expect(sanitizeData(undefined)).toBe(undefined);
        expect(sanitizeData(123)).toBe(123);
        expect(sanitizeData("hello")).toBe("hello");
        expect(sanitizeData(true)).toBe(true);
    });

    test("should convert Date to ISO string", () => {
        const date = new Date("2024-01-01T00:00:00Z");
        expect(sanitizeData(date)).toBe("2024-01-01T00:00:00.000Z");
    });

    test("should handle arrays recursively", () => {
        const date = new Date("2024-01-01T00:00:00Z");
        const input = [1, { d: date }, "str"];
        const expected = [1, { d: "2024-01-01T00:00:00.000Z" }, "str"];
        expect(sanitizeData(input)).toEqual(expected);
    });

    test("should handle plain objects recursively", () => {
        const date = new Date("2024-01-01T00:00:00Z");
        const input = { a: 1, b: { c: date } };
        const expected = { a: 1, b: { c: "2024-01-01T00:00:00.000Z" } };
        expect(sanitizeData(input)).toEqual(expected);
    });

    test("should convert Mongoose-like ObjectIds to strings", () => {
        // Mock an ObjectId-like object
        const mockObjectId = {
            toString: () => "507f1f77bcf86cd799439011",
            constructor: function ObjectID() { }
        };

        const input = { _id: mockObjectId };
        const expected = { _id: "507f1f77bcf86cd799439011" };
        expect(sanitizeData(input)).toEqual(expected);
    });

    test("should ignore the toString method if it returns [object Object]", () => {
        const mockObj = {
            toString: () => "[object Object]",
            constructor: { name: "SomeClass" },
            val: 1
        };
        const expected = { val: 1 };
        expect(sanitizeData(mockObj)).toEqual(expected);
    });
});
