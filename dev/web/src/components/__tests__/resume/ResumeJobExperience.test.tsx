import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResumeJobExperience } from "../../resume/ResumeJobExperience";

describe("ResumeJobExperience", () => {
  const defaultProps = {
    position: "Senior Developer",
    company: "Acme Corp",
    startDate: "Jan 2020",
    endDate: "Dec 2023",
    achievements: [
      "Built a new system",
      "Led a team of 5",
    ],
  };

  it("renders position and company", () => {
    render(<ResumeJobExperience {...defaultProps} />);
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  it("renders date range with end date", () => {
    render(<ResumeJobExperience {...defaultProps} />);
    expect(screen.getByText(/Jan 2020 — Dec 2023/)).toBeInTheDocument();
  });

  it("renders date range with isCurrent", () => {
    render(
      <ResumeJobExperience {...defaultProps} endDate={null} isCurrent />,
    );
    expect(screen.getByText(/Jan 2020 — Present/)).toBeInTheDocument();
  });

  it("renders achievements with checkmarks", () => {
    render(<ResumeJobExperience {...defaultProps} />);
    expect(screen.getByText("Built a new system")).toBeInTheDocument();
    expect(screen.getByText("Led a team of 5")).toBeInTheDocument();
  });

  it("renders location when provided", () => {
    render(<ResumeJobExperience {...defaultProps} location="Warsaw, Poland" />);
    expect(screen.getByText("Warsaw, Poland")).toBeInTheDocument();
  });

  it("renders employment type badge when provided", () => {
    render(
      <ResumeJobExperience {...defaultProps} employmentType="Full-time" />,
    );
    expect(screen.getByText("Full-time")).toBeInTheDocument();
  });

  it("renders without optional props", () => {
    render(
      <ResumeJobExperience
        position="Dev"
        company="Co"
        startDate="2020"
      />,
    );
    expect(screen.getByText("Dev")).toBeInTheDocument();
    expect(screen.getByText("Co")).toBeInTheDocument();
  });
});
