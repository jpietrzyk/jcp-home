import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "../ProjectCard";

const baseProject = {
  title: "Test Project",
  slug: "test-project",
  slogan: "A test project slogan",
  description: "This is a detailed description of the test project.",
  thumbnailUrl: "https://example.com/thumb.jpg",
  url: "https://example.com",
  tags: ["React", "TypeScript", "Vite"],
  featured: false,
  order: 1,
};

describe("ProjectCard", () => {
  it("renders title and slogan", () => {
    render(<ProjectCard {...baseProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("A test project slogan")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectCard {...baseProject} />);
    expect(screen.getByText(/detailed description/)).toBeInTheDocument();
  });

  it("renders tags as badges", () => {
    render(<ProjectCard {...baseProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();
  });

  it("renders external link when url is provided", () => {
    render(<ProjectCard {...baseProject} />);
    const link = screen.getByText("View Project");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "https://example.com");
  });

  it("renders thumbnail image when thumbnailUrl is provided", () => {
    render(<ProjectCard {...baseProject} />);
    const img = screen.getByAltText("Test Project");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/thumb.jpg");
  });

  it("renders featured star indicator when featured is true", () => {
    const { container } = render(<ProjectCard {...baseProject} featured />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border-l-amber");
  });

  it("does not render featured indicator when featured is false", () => {
    const { container } = render(<ProjectCard {...baseProject} featured={false} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain("border-l-amber");
  });

  it("handles missing optional fields gracefully", () => {
    const minimal = {
      title: "Minimal Project",
      slug: "minimal-project",
    };
    render(<ProjectCard {...minimal} />);
    expect(screen.getByText("Minimal Project")).toBeInTheDocument();
    expect(screen.queryByText("View Project")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectCard {...baseProject} className="custom-class" />,
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });
});
