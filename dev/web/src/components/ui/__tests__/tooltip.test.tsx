import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../tooltip";

describe("Tooltip", () => {
  it("TooltipProvider renders children", () => {
    render(
      <TooltipProvider>
        <div data-testid="child">content</div>
      </TooltipProvider>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("TooltipTrigger renders as a button", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("TooltipContent applies default classes", () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent data-testid="content">Tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    const el = container.querySelector("[data-testid='content']");
    expect(el?.className).toContain("z-50");
    expect(el?.className).toContain("rounded-md");
  });

  it("TooltipContent applies custom className", () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent className="custom-tip" data-testid="content">
            Tip
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    const el = container.querySelector("[data-testid='content']");
    expect(el?.className).toContain("custom-tip");
  });

  it("renders complete tooltip structure", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Tooltip message</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Trigger")).toBeInTheDocument();
    expect(screen.getAllByText("Tooltip message").length).toBeGreaterThan(0);
  });
});
