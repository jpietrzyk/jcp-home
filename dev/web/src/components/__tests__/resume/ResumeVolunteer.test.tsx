import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResumeVolunteer } from "../../resume/ResumeVolunteer";

describe("ResumeVolunteer", () => {
  it("renders role and organization", () => {
    render(
      <ResumeVolunteer organization="Red Cross" role="Coordinator" />,
    );
    expect(screen.getByText("Coordinator")).toBeInTheDocument();
    expect(screen.getByText("Red Cross")).toBeInTheDocument();
  });

  it("renders date range", () => {
    render(
      <ResumeVolunteer
        organization="Red Cross"
        role="Coordinator"
        startDate="2020"
        endDate="2022"
      />,
    );
    expect(screen.getByText(/2020 — 2022/)).toBeInTheDocument();
  });

  it("shows Present when no end date", () => {
    render(
      <ResumeVolunteer
        organization="Red Cross"
        role="Coordinator"
        startDate="2020"
      />,
    );
    expect(screen.getByText(/2020 — Present/)).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <ResumeVolunteer
        organization="Red Cross"
        role="Coordinator"
        description="Organized events"
      />,
    );
    expect(screen.getByText("Organized events")).toBeInTheDocument();
  });

  it("does not render date range when no dates provided", () => {
    const { container } = render(
      <ResumeVolunteer organization="Org" role="Role" />,
    );
    expect(container.querySelector("svg.lucide-calendar")).not.toBeInTheDocument();
    expect(screen.queryByText(/Present/)).not.toBeInTheDocument();
  });

  it("renders without optional props", () => {
    render(<ResumeVolunteer organization="Org" role="Role" />);
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Org")).toBeInTheDocument();
  });
});
