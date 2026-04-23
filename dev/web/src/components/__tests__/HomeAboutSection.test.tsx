import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomeAboutSection } from "../home/HomeAboutSection";

vi.mock("../../content/profile", () => ({
  profile: {
    about: "Test about text",
    location: "Test City",
    email: "test@example.com",
    linkedin: "https://linkedin.com/in/test",
    github: "https://github.com/test",
  },
}));

describe("HomeAboutSection", () => {
  it("renders About Me heading", () => {
    render(
      <MemoryRouter>
        <HomeAboutSection />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: "About Me", level: 2 }),
    ).toBeInTheDocument();
  });

  it("renders profile about text", () => {
    render(
      <MemoryRouter>
        <HomeAboutSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test about text")).toBeInTheDocument();
  });

  it("renders location", () => {
    render(
      <MemoryRouter>
        <HomeAboutSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test City")).toBeInTheDocument();
  });

  it("renders email as mailto link", () => {
    render(
      <MemoryRouter>
        <HomeAboutSection />
      </MemoryRouter>,
    );
    const emailLink = screen.getByText("test@example.com").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders LinkedIn external link", () => {
    render(
      <MemoryRouter>
        <HomeAboutSection />
      </MemoryRouter>,
    );
    const linkedinLink = screen.getByText("LinkedIn").closest("a");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/test",
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders GitHub external link", () => {
    render(
      <MemoryRouter>
        <HomeAboutSection />
      </MemoryRouter>,
    );
    const githubLink = screen.getByText("GitHub").closest("a");
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("renders View Resume button linking to /about", () => {
    render(
      <MemoryRouter>
        <HomeAboutSection />
      </MemoryRouter>,
    );
    const resumeLink = screen.getByText("View Resume").closest("a");
    expect(resumeLink).toHaveAttribute("href", "/about");
  });

  it("renders About Me button linking to /about", () => {
    render(
      <MemoryRouter>
        <HomeAboutSection />
      </MemoryRouter>,
    );
    const aboutButton = screen.getByRole("button", { name: "About Me" });
    const aboutLink = aboutButton.closest("a");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });
});
