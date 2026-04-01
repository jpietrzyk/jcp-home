import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomeHeroSection } from "../../components/HomeHeroSection";
import { useCmsPage } from "../../lib/cms/useCmsPage";

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

vi.mock("../../content/profile", () => ({
  profile: {
    location: "Test Location",
    email: "test@example.com",
    linkedin: "https://linkedin.com/test",
    github: "https://github.com/test",
  },
}));

describe("HomeHeroSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page title", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test Home")).toBeInTheDocument();
  });

  it("renders page subtitle", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders eyebrow text", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test eyebrow")).toBeInTheDocument();
  });

  it("renders profile location", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test Location")).toBeInTheDocument();
  });

  it("renders profile email as mailto link", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    const emailLink = screen.getByText("test@example.com").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders LinkedIn link", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    const linkedinLink = screen.getByText("LinkedIn");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/test");
  });

  it("renders GitHub link", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    const githubLink = screen.getByText("GitHub");
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
  });

  it("renders About Me button linking to /about", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    const aboutLink = screen.getByText("About Me").closest("a");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("renders Read Blog button linking to /blog", () => {
    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    const blogLink = screen.getByText("Read Blog").closest("a");
    expect(blogLink).toHaveAttribute("href", "/blog");
  });

  it("does not render eyebrow paragraph when eyebrow is null", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "Test Home",
        slug: "home",
        subtitle: "Test subtitle",
        eyebrow: null,
        bodyPlainText: "Test body content",
      },
      isLoading: false,
      error: null,
    });

    const { container } = render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    const eyebrowParagraph = container.querySelector(
      "p.text-sm.uppercase.tracking-wide",
    );
    expect(eyebrowParagraph).not.toBeInTheDocument();
  });

  it("renders loading state", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "Home",
        slug: "home",
        subtitle: "",
        eyebrow: null,
        bodyPlainText: "",
      },
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading content...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "Home",
        slug: "home",
        subtitle: "",
        eyebrow: null,
        bodyPlainText: "",
      },
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <MemoryRouter>
        <HomeHeroSection />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Could not load CMS content. Showing fallback text."),
    ).toBeInTheDocument();
  });
});
