import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "../HomePage";
import { useCmsPage } from "../../lib/cms/useCmsPage";

// Mock the useCmsPage hook
vi.mock("../../lib/cms/useCmsPage", () => ({
  useCmsPage: vi.fn(() => ({
    page: {
      title: "Test Home",
      slug: "home",
      subtitle: "Test subtitle",
      eyebrow: "Test eyebrow",
      bodyPlainText: "Test body content",
    },
    isLoading: false,
    error: null,
  })),
}));

// Mock the profile content
vi.mock("../../content/profile", () => ({
  profile: {
    location: "Test Location",
    email: "test@example.com",
    linkedin: "https://linkedin.com/test",
    github: "https://github.com/test",
  },
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page title", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test Home")).toBeInTheDocument();
  });

  it("renders page subtitle", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders eyebrow text", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test eyebrow")).toBeInTheDocument();
  });

  it("renders profile location", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test Location")).toBeInTheDocument();
  });

  it("renders profile email", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders LinkedIn link", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const linkedinLink = screen.getByText("LinkedIn");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/test");
  });

  it("renders GitHub link", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const githubLink = screen.getByText("GitHub");
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
  });

  it("renders navigation buttons", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("View Resume")).toBeInTheDocument();
    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Read Blog")).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const resumeLink = screen.getByText("View Resume").closest("a");
    const aboutLink = screen.getByText("About Me").closest("a");
    const blogLink = screen.getByText("Read Blog").closest("a");

    expect(resumeLink).toHaveAttribute("href", "/resume");
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(blogLink).toHaveAttribute("href", "/blog");
  });

  it("renders loading state", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "Home",
        slug: "home",
        subtitle: "Create home content in Sanity",
        eyebrow: "CMS-driven content",
        bodyPlainText:
          "Add a Page document with slug 'home' in Sanity to manage this section.",
      },
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading content...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "Home",
        slug: "home",
        subtitle: "Create home content in Sanity",
        eyebrow: "CMS-driven content",
        bodyPlainText:
          "Add a Page document with slug 'home' in Sanity to manage this section.",
      },
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Could not load CMS content. Showing fallback text."),
    ).toBeInTheDocument();
  });
});
