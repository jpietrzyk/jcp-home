import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { JcpLogo } from "../JcpLogo";

describe("JcpLogo", () => {
  it("renders an img with the logo src", () => {
    const { container } = render(<JcpLogo />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src");
  });

  it("defaults to aria-hidden when no label provided", () => {
    const { container } = render(<JcpLogo />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("aria-hidden", "true");
  });

  it("sets aria-hidden to undefined when aria-label is provided", () => {
    const { container } = render(<JcpLogo aria-label="jcp.home" />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("aria-label", "jcp.home");
    expect(img).not.toHaveAttribute("aria-hidden");
  });

  it("sets aria-hidden to undefined when aria-labelledby is provided", () => {
    const { container } = render(<JcpLogo aria-labelledby="logo-title" />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("aria-labelledby", "logo-title");
    expect(img).not.toHaveAttribute("aria-hidden");
  });

  it("applies custom className", () => {
    const { container } = render(<JcpLogo className="h-8 w-auto" />);
    const img = container.querySelector("img");
    expect(img).toHaveClass("h-8", "w-auto");
  });

  it("has an empty alt attribute by default", () => {
    const { container } = render(<JcpLogo />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
  });

  it("allows overriding the alt attribute", () => {
    const { container } = render(<JcpLogo alt="JCP Home logo" />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "JCP Home logo");
  });
});
