import { sanitizeData, twMerge } from "./utils";

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

    test("should handle nested ObjectIds in arrays and objects", () => {
        const mockObjectId = {
            toString: () => "507f1f77bcf86cd799439011",
            constructor: function ObjectID() { }
        };

        const input = {
            items: [mockObjectId, { subId: mockObjectId }],
            meta: { id: mockObjectId }
        };

        const expected = {
            items: ["507f1f77bcf86cd799439011", { subId: "507f1f77bcf86cd799439011" }],
            meta: { id: "507f1f77bcf86cd799439011" }
        };

        expect(sanitizeData(input)).toEqual(expected);
    });

    test("should ignore the toString method if it returns [object Object]", () => {
        const mockObj = {
            toString: () => "[object Object]",
            constructor: function SomeClass() { },
            val: 1
        };
        const expected = { val: 1 };
        expect(sanitizeData(mockObj)).toEqual(expected);
    });

    test("should handle objects with null constructors", () => {
        const mockObj = Object.create(null);
        mockObj.val = 1;
        const result = sanitizeData(mockObj);
        expect(result).toEqual({ val: 1 });
    });

    test("should skip functions", () => {
        const input = { a: 1, b: () => { } };
        const expected = { a: 1 };
        expect(sanitizeData(input)).toEqual(expected);
    });
});

describe("twMerge", () => {
    it("should merge tailwind classes correctly", () => {
        expect(twMerge("p-4", "p-2")).toBe("p-2");
        expect(twMerge("p-4", { "m-2": true, "m-4": false })).toBe("p-4 m-2");
    });

    it("should handle nested arrays and conditional classes", () => {
        expect(twMerge(["p-4", "m-2"], "bg-white")).toContain("p-4");
        expect(twMerge(["p-4", "m-2"], "bg-white")).toContain("m-2");
        expect(twMerge(["p-4", "m-2"], "bg-white")).toContain("bg-white");
    });
});
