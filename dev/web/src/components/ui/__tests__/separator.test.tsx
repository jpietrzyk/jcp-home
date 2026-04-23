import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Separator } from "../separator";

describe("Separator", () => {
  it("renders with horizontal orientation by default", () => {
    const { container } = render(<Separator />);
    const el = container.firstElementChild!;
    expect(el.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("renders with vertical orientation", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.firstElementChild!;
    expect(el.getAttribute("data-orientation")).toBe("vertical");
  });

  it("applies default classes", () => {
    const { container } = render(<Separator />);
    const el = container.firstElementChild!;
    expect(el.className).toContain("bg-border");
    expect(el.className).toContain("shrink-0");
  });

  it("applies horizontal-specific classes", () => {
    const { container } = render(<Separator orientation="horizontal" />);
    const el = container.firstElementChild!;
    expect(el.className).toContain("h-[1px]");
    expect(el.className).toContain("w-full");
  });

  it("applies vertical-specific classes", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.firstElementChild!;
    expect(el.className).toContain("h-full");
    expect(el.className).toContain("w-[1px]");
  });

  it("applies custom className", () => {
    const { container } = render(<Separator className="my-sep" />);
    expect(container.firstElementChild!.className).toContain("my-sep");
  });

  it("passes orientation prop to radix component", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.firstElementChild!;
    expect(el.getAttribute("data-orientation")).toBe("vertical");
  });
});
