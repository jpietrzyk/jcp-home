import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "../input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Input />);
    const el = screen.getByRole("textbox");
    expect(el.className).toContain("flex");
    expect(el.className).toContain("rounded-md");
    expect(el.className).toContain("border");
  });

  it("applies custom className", () => {
    render(<Input className="my-custom" />);
    expect(screen.getByRole("textbox").className).toContain("my-custom");
  });

  it("passes type prop", () => {
    const { container } = render(<Input type="password" />);
    expect(container.querySelector("input")?.getAttribute("type")).toBe("password");
  });

  it("renders as disabled", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("passes through extra props", () => {
    render(<Input placeholder="Enter text" data-testid="my-input" />);
    const el = screen.getByPlaceholderText("Enter text");
    expect(el).toHaveAttribute("data-testid", "my-input");
  });
});
