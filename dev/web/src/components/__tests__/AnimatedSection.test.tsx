import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnimatedSection } from "../AnimatedSection";

describe("AnimatedSection", () => {
  it("renders children correctly", () => {
    render(
      <AnimatedSection>
        <div>Animated content</div>
      </AnimatedSection>,
    );
    expect(screen.getByText("Animated content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <AnimatedSection className="custom-class">
        <div>Content</div>
      </AnimatedSection>,
    );
    const section = screen.getByText("Content").parentElement;
    expect(section).toHaveClass("custom-class");
  });

  it("renders with default delay", () => {
    render(
      <AnimatedSection>
        <div>Content</div>
      </AnimatedSection>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with custom delay", () => {
    render(
      <AnimatedSection delay={0.5}>
        <div>Content</div>
      </AnimatedSection>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <AnimatedSection>
        <div>Child 1</div>
        <div>Child 2</div>
      </AnimatedSection>,
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
