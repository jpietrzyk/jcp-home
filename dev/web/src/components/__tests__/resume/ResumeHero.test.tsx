import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResumeHero } from "../../resume/ResumeHero";

describe("ResumeHero", () => {
  it("renders bio text", () => {
    render(<ResumeHero bio="I am a developer." />);
    expect(screen.getByText("I am a developer.")).toBeInTheDocument();
  });

  it("renders skills badges", () => {
    render(<ResumeHero skills={["React", "TypeScript", "Ruby"]} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Ruby")).toBeInTheDocument();
  });

  it("renders skills section label", () => {
    render(<ResumeHero skills={["React"]} />);
    expect(screen.getByText("Skills & Technologies")).toBeInTheDocument();
  });

  it("renders nothing when bio and skills are undefined", () => {
    const { container } = render(<ResumeHero />);
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing when skills is empty array", () => {
    const { container } = render(<ResumeHero skills={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders both bio and skills together", () => {
    render(<ResumeHero bio="My bio" skills={["Go"]} />);
    expect(screen.getByText("My bio")).toBeInTheDocument();
    expect(screen.getByText("Go")).toBeInTheDocument();
  });
});
