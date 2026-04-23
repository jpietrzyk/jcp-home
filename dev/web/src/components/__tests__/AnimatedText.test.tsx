import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AnimatedText } from "../AnimatedText";

describe("AnimatedText", () => {
  it("renders the provided text", () => {
    const { container } = render(<AnimatedText text="Hello" />);
    const spans = container.querySelectorAll("span");
    const chars = Array.from(spans).map((s) => s.textContent);
    expect(chars).toEqual(["H", "e", "l", "l", "o"]);
  });

  it("converts spaces to non-breaking spaces", () => {
    const { container } = render(<AnimatedText text="A B" />);
    const spans = container.querySelectorAll("span");
    const hasNbsp = Array.from(spans).some(
      (span) => span.textContent === "\u00A0",
    );
    expect(hasNbsp).toBe(true);
  });

  it("applies className to container", () => {
    const { container } = render(
      <AnimatedText text="Test" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders each character as a separate span", () => {
    const { container } = render(<AnimatedText text="abc" />);
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBe(3);
  });

  it("renders empty text with no spans", () => {
    const { container } = render(<AnimatedText text="" />);
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBe(0);
  });
});
