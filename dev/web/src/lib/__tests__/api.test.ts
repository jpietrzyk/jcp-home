import { describe, it, expect } from "vitest";
import { toPlainText } from "../cms/api";

describe("toPlainText", () => {
  it("returns empty string for undefined input", () => {
    expect(toPlainText(undefined)).toBe("");
  });

  it("returns empty string for null input", () => {
    expect(toPlainText(null)).toBe("");
  });

  it("returns empty string for non-array input", () => {
    expect(toPlainText("not an array")).toBe("");
    expect(toPlainText(42)).toBe("");
    expect(toPlainText({})).toBe("");
  });

  it("returns empty string for empty array", () => {
    expect(toPlainText([])).toBe("");
  });

  it("extracts text from blocks with children", () => {
    const blocks = [
      {
        _type: "block",
        children: [
          { _type: "span", text: "Hello" },
          { _type: "span", text: "World" },
        ],
      },
    ];
    expect(toPlainText(blocks)).toBe("Hello World");
  });

  it("handles blocks without children", () => {
    const blocks = [
      { _type: "block" },
      { _type: "block", children: [{ _type: "span", text: "Text" }] },
    ];
    expect(toPlainText(blocks)).toBe("Text");
  });

  it("handles children without text field", () => {
    const blocks = [
      {
        _type: "block",
        children: [{ _type: "span" }, { _type: "span", text: "Only" }],
      },
    ];
    expect(toPlainText(blocks)).toBe("Only");
  });

  it("trims leading and trailing whitespace", () => {
    const blocks = [
      {
        _type: "block",
        children: [{ _type: "span", text: "  Hello  " }],
      },
    ];
    expect(toPlainText(blocks)).toBe("Hello");
  });

  it("joins text from multiple blocks with space", () => {
    const blocks = [
      {
        _type: "block",
        children: [{ _type: "span", text: "First" }],
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "Second" }],
      },
    ];
    expect(toPlainText(blocks)).toBe("First Second");
  });

  it("handles non-object block entries", () => {
    const blocks = [
      "string entry",
      42,
      null,
      {
        _type: "block",
        children: [{ _type: "span", text: "Valid" }],
      },
    ];
    expect(toPlainText(blocks)).toBe("Valid");
  });

  it("converts text to string", () => {
    const blocks = [
      {
        _type: "block",
        children: [{ _type: "span", text: 123 }],
      },
    ];
    expect(toPlainText(blocks)).toBe("123");
  });
});
