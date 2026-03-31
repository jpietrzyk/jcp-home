import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { JcpLogo } from "../JcpLogo";

describe("JcpLogo", () => {
  it("renders an SVG with role img", () => {
    const { container } = render(<JcpLogo />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("role", "img");
  });

  it("has aria-label for accessibility", () => {
    const { container } = render(<JcpLogo />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-label", "jcp.home");
  });

  it("applies custom className", () => {
    const { container } = render(<JcpLogo className="h-8 w-auto" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("h-8", "w-auto");
  });

  it("renders text elements with correct content", () => {
    const { container } = render(<JcpLogo />);
    const texts = container.querySelectorAll("text");
    expect(texts).toHaveLength(3);
    expect(texts[0].textContent).toBe("jcp");
    expect(texts[1].textContent).toBe("-");
    expect(texts[2].textContent).toBe("haven");
  });

  it("renders decorative elements (path and circle)", () => {
    const { container } = render(<JcpLogo />);
    expect(container.querySelector("path")).toBeInTheDocument();
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  it("applies light and dark fill classes to text elements", () => {
    const { container } = render(<JcpLogo />);
    const texts = container.querySelectorAll("text");
    expect(texts[0].className.baseVal).toContain("fill-[#3d3833]");
    expect(texts[0].className.baseVal).toContain("dark:fill-[#dde4ee]");
    expect(texts[1].className.baseVal).toContain("fill-[#a67c52]");
    expect(texts[1].className.baseVal).toContain("dark:fill-[#c4956a]");
  });
});
