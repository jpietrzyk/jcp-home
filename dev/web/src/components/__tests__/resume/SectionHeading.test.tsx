import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "../../resume/SectionHeading";
import { Briefcase } from "lucide-react";

describe("SectionHeading", () => {
  it("renders title text", () => {
    render(<SectionHeading icon={Briefcase} title="Work Experience" />);
    expect(screen.getByText("Work Experience")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    const { container } = render(
      <SectionHeading icon={Briefcase} title="Test" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<SectionHeading icon={Briefcase} title="Test" className="mt-8" />);
    const heading = screen.getByText("Test").closest("div");
    expect(heading).toHaveClass("mt-8");
  });

  it("renders as h2 element", () => {
    render(<SectionHeading icon={Briefcase} title="Section" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Section");
  });
});
