import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("renders a div element", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("applies default animation classes", () => {
    const { container } = render(<Skeleton />);
    const el = container.querySelector("div")!;
    expect(el.className).toContain("animate-pulse");
    expect(el.className).toContain("rounded-md");
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    const el = container.querySelector("div")!;
    expect(el.className).toContain("h-4");
    expect(el.className).toContain("w-32");
  });

  it("passes through extra props", () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" aria-hidden="true" />,
    );
    const el = container.querySelector("div")!;
    expect(el.getAttribute("data-testid")).toBe("skeleton");
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });
});
