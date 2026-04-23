import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Textarea } from "../textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Textarea />);
    const el = screen.getByRole("textbox");
    expect(el.className).toContain("flex");
    expect(el.className).toContain("rounded-md");
    expect(el.className).toContain("min-h-[80px]");
  });

  it("applies custom className", () => {
    render(<Textarea className="my-custom" />);
    expect(screen.getByRole("textbox").className).toContain("my-custom");
  });

  it("renders as disabled", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("passes through extra props", () => {
    render(<Textarea placeholder="Type here" data-testid="my-area" />);
    const el = screen.getByPlaceholderText("Type here");
    expect(el).toHaveAttribute("data-testid", "my-area");
  });
});
