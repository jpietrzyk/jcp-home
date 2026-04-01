import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "../PageHero";

describe("PageHero", () => {
  it("renders title", () => {
    render(<PageHero title="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<PageHero title="Title" subtitle="The Subtitle" />);
    expect(screen.getByText("The Subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when null", () => {
    const { container } = render(<PageHero title="Title" subtitle={null} />);
    expect(container.querySelector("p.text-amber-700")).not.toBeInTheDocument();
  });

  it("does not render subtitle when undefined", () => {
    const { container } = render(<PageHero title="Title" subtitle={undefined} />);
    expect(container.querySelector("p.text-amber-700")).not.toBeInTheDocument();
  });

  it("renders children slot", () => {
    render(
      <PageHero title="Title">
        <div data-testid="child-content">Child content</div>
      </PageHero>,
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });
});
