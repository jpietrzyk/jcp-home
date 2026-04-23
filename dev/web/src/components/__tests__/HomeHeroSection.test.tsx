import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomeHeroSection } from "../../components/home/HomeHeroSection";
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

describe("HomeHeroSection", () => {
  beforeEach(() => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "Test Home",
        slug: "home",
        subtitle: "Test subtitle",
        eyebrow: "Test eyebrow",
        bodyPlainText: "Test body content",
      },
      isLoading: false,
      error: null,
    });
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
