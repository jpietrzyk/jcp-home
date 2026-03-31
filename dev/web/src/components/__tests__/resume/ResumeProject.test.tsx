import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResumeProject } from "../../resume/ResumeProject";

describe("ResumeProject", () => {
  it("renders project name", () => {
    render(<ResumeProject name="My App" />);
    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ResumeProject name="My App" description="A cool project" />);
    expect(screen.getByText("A cool project")).toBeInTheDocument();
  });

  it("renders date range", () => {
    render(
      <ResumeProject name="My App" startDate="2021" endDate="2023" />,
    );
    expect(screen.getByText(/2021 — 2023/)).toBeInTheDocument();
  });

  it("shows Present when no end date", () => {
    render(<ResumeProject name="My App" startDate="2021" />);
    expect(screen.getByText(/2021 — Present/)).toBeInTheDocument();
  });

  it("renders technology tags", () => {
    render(
      <ResumeProject name="My App" technologies={["React", "Node"]} />,
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node")).toBeInTheDocument();
  });

  it("renders external link", () => {
    render(<ResumeProject name="My App" url="https://example.com" />);
    const link = screen.getByText("View Project").closest("a");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render date range when no dates provided", () => {
    const { container } = render(<ResumeProject name="My App" />);
    expect(container.querySelector("svg.lucide-calendar")).not.toBeInTheDocument();
    expect(screen.queryByText(/Present/)).not.toBeInTheDocument();
  });

  it("does not render link when url is undefined", () => {
    render(<ResumeProject name="My App" />);
    expect(screen.queryByText("View Project")).not.toBeInTheDocument();
  });
});
