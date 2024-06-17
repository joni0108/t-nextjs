import { describe, it, expect } from "vitest";
import { DataValidation } from "@/libs/DataValidator";

describe("DataValidation", () => {
    it("should validate email => failing scenario", () => {
        expect(DataValidation.validateEmail("codixfy@next")).toBe(false);
    });

    it("should validate email => passing scenario", () => {
        expect(DataValidation.validateEmail("sales@codixfy.com")).toBe(true);
    });

    it("should validate password => failing scenario", () => {
        expect(DataValidation.validatePassword("password")).toBe(false);
    });

    it("should validate password => passing scenario", () => {
        expect(DataValidation.validatePassword("Password1%")).toBe(true);
    });

    it("should validate object => failing scenario", () => {
        const obj = {
            name: "John Doe",
            email: "example@gmail.com",
        };

        const schema = {
            name: "string",
            email: "string",
            age: "number",
        };

        expect(DataValidation.validateObject(obj, schema)).toBe(false);
    });

    it("should validate object => passing scenario", () => {
        const obj = {
            name: "John Doe",
            email: "example@gmail.com",
        };

        const schema = {
            name: "string",
            email: "string",
        };

        expect(DataValidation.validateObject(obj, schema)).toBe(true);
    });

    it("should validate object with nested schema => failing scenario", () => {
        const obj = {
            user: {
                name: "John Doe",
                email: "example@gmail.com",
            },
        };

        const schema = {
            user: {
                name: "string",
                email: "string",
                age: "number",
            },
        };

        expect(DataValidation.validateObject(obj, schema)).toBe(false);
    });

    it("should validate object with nested schema => passing scenario", () => {
        const obj = {
            user: {
                name: "John Doe",
                email: "example@gmail.com",
            },
        };

        const schema = {
            user: {
                name: "string",
                email: "string",
            },
        };

        expect(DataValidation.validateObject(obj, schema)).toBe(true);
    });

    it("should validate object with unknown type => failing scenario", () => {
        const obj = {
            name: "John Doe",
            email: "example@gmail.com",
        };

        const schema = {
            name: "string",
            email: "string",
            age: "unknownType",
        };

        expect(DataValidation.validateObject(obj, schema)).toBe(false);
    });

    it("should validate isValidType for existing types", () => {
        expect(DataValidation["isValidType"]("test", "string")).toBe(true);
        expect(DataValidation["isValidType"](123, "number")).toBe(true);
        expect(DataValidation["isValidType"](true, "boolean")).toBe(true);
    });

    it("should validate isValidType for non-existing types", () => {
        expect(DataValidation["isValidType"]("test", "unknownType")).toBe(false);
    });
});
