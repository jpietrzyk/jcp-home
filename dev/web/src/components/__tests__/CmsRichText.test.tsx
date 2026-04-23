import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { TypedObject } from "@portabletext/types";
import {
  normalizeText,
  getBlockText,
  getVisibleBody,
  CmsRichText,
} from "../CmsRichText";

describe("normalizeText", () => {
  it("trims whitespace", () => {
    expect(normalizeText("  hello  ")).toBe("hello");
  });

  it("collapses multiple spaces into one", () => {
    expect(normalizeText("hello   world")).toBe("hello world");
  });

  it("converts to lowercase", () => {
    expect(normalizeText("Hello World")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(normalizeText("")).toBe("");
  });

  it("handles string with only whitespace", () => {
    expect(normalizeText("   ")).toBe("");
  });

  it("handles tabs and newlines", () => {
    expect(normalizeText("hello\t\nworld")).toBe("hello world");
  });
});

describe("getBlockText", () => {
  it("extracts text from children", () => {
    const block = {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "Hello " },
        { _type: "span", text: "World" },
      ],
    } as TypedObject;
    expect(getBlockText(block)).toBe("Hello World");
  });

  it("returns empty string when block has no children", () => {
    const block = { _type: "block", style: "normal" } as TypedObject;
    expect(getBlockText(block)).toBe("");
  });

  it("returns empty string when children is not an array", () => {
    const block = {
      _type: "block",
      children: "not array",
    } as TypedObject;
    expect(getBlockText(block)).toBe("");
  });

  it("skips children without text field", () => {
    const block = {
      _type: "block",
      children: [
        { _type: "span" },
        { _type: "span", text: "Only" },
        null,
        42,
      ],
    } as TypedObject;
    expect(getBlockText(block)).toBe("Only");
  });

  it("skips children where text is not a string", () => {
    const block = {
      _type: "block",
      children: [{ _type: "span", text: 123 }, { _type: "span", text: true }],
    } as TypedObject;
    expect(getBlockText(block)).toBe("");
  });
});

describe("getVisibleBody", () => {
  it("returns body as-is when hideFirstHeadingMatching is undefined", () => {
    const body: TypedObject[] = [
      { _type: "block", style: "h2", children: [{ text: "Title" }] },
    ];
    expect(getVisibleBody(body, undefined)).toBe(body);
  });

  it("returns body as-is when body is undefined", () => {
    expect(getVisibleBody(undefined, "Title")).toBe(undefined);
  });

  it("returns body as-is when body is empty", () => {
    expect(getVisibleBody([], "Title")).toEqual([]);
  });

  it("returns body as-is when first block is not a heading", () => {
    const body: TypedObject[] = [
      { _type: "block", style: "normal", children: [{ text: "Paragraph" }] },
    ];
    expect(getVisibleBody(body, "Paragraph")).toBe(body);
  });

  it("removes first heading when it matches hideFirstHeadingMatching", () => {
    const body: TypedObject[] = [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "My Title" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Content" }],
      },
    ];
    const result = getVisibleBody(body, "My Title");
    expect(result).toHaveLength(1);
    expect((result as TypedObject[])[0]).toHaveProperty("style", "normal");
  });

  it("removes first heading ignoring case and whitespace", () => {
    const body: TypedObject[] = [
      {
        _type: "block",
        style: "h1",
        children: [{ _type: "span", text: "  Hello   World  " }],
      },
    ];
    const result = getVisibleBody(body, "hello world");
    expect(result).toHaveLength(0);
  });

  it("returns body when first heading does not match", () => {
    const body: TypedObject[] = [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Different Title" }],
      },
    ];
    expect(getVisibleBody(body, "Expected Title")).toBe(body);
  });

  it("handles h1, h2, h3, h4 styles", () => {
    for (const style of ["h1", "h2", "h3", "h4"]) {
      const body: TypedObject[] = [
        { _type: "block", style, children: [{ text: "Title" }] },
      ];
      const result = getVisibleBody(body, "Title");
      expect(result).toHaveLength(0);
    }
  });

  it("returns body when first block style is not a heading type", () => {
    const body: TypedObject[] = [
      { _type: "block", style: "normal", children: [{ text: "Title" }] },
    ];
    expect(getVisibleBody(body, "Title")).toBe(body);
  });

  it("returns body when first block has no style property", () => {
    const body: TypedObject[] = [{ _type: "block", children: [{ text: "Title" }] }];
    expect(getVisibleBody(body, "Title")).toBe(body);
  });
});

describe("CmsRichText component", () => {
  it("renders plain text when body is empty", () => {
    render(
      <CmsRichText body={[]} bodyPlainText="Fallback text" />,
    );
    expect(screen.getByText("Fallback text")).toBeInTheDocument();
  });

  it("renders plain text when body is undefined", () => {
    render(
      <CmsRichText body={undefined} bodyPlainText="Fallback text" />,
    );
    expect(screen.getByText("Fallback text")).toBeInTheDocument();
  });

  it("renders rich text content when body is provided", () => {
    const body: TypedObject[] = [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Rich text content" }],
        markDefs: [],
      },
    ];
    render(<CmsRichText body={body} bodyPlainText="" />);
    expect(screen.getByText("Rich text content")).toBeInTheDocument();
  });

  it("applies className to container", () => {
    const { container } = render(
      <CmsRichText
        body={[]}
        bodyPlainText="text"
        className="custom-class"
      />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
