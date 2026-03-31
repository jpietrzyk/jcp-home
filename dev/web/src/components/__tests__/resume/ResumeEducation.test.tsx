import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResumeEducation } from "../../resume/ResumeEducation";

describe("ResumeEducation", () => {
  it("renders school name", () => {
    render(<ResumeEducation school="MIT" />);
    expect(screen.getByText("MIT")).toBeInTheDocument();
  });

  it("renders degree and field", () => {
    render(
      <ResumeEducation
        school="MIT"
        degree="BSc"
        field="Computer Science"
      />,
    );
    expect(screen.getByText("BSc in Computer Science")).toBeInTheDocument();
  });

  it("renders graduation year with label", () => {
    render(<ResumeEducation school="MIT" graduationYear="2020" />);
    expect(screen.getByText(/Graduated: 2020/)).toBeInTheDocument();
  });

  it("renders grade with label", () => {
    render(<ResumeEducation school="MIT" grade="3.5" />);
    expect(screen.getByText(/Grade: 3.5/)).toBeInTheDocument();
  });

  it("renders degree without field", () => {
    render(<ResumeEducation school="MIT" degree="BSc" />);
    expect(screen.getByText("BSc")).toBeInTheDocument();
  });

  it("renders all props together", () => {
    render(
      <ResumeEducation
        school="Stanford"
        degree="MSc"
        field="AI"
        graduationYear="2022"
        grade="4.0"
      />,
    );
    expect(screen.getByText("Stanford")).toBeInTheDocument();
    expect(screen.getByText("MSc in AI")).toBeInTheDocument();
    expect(screen.getByText(/Graduated: 2022/)).toBeInTheDocument();
    expect(screen.getByText(/Grade: 4.0/)).toBeInTheDocument();
  });
});
