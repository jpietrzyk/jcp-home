import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "../HomePage";
import { useCmsPage } from "../../lib/cms/useCmsPage";
import { useCmsPosts } from "../../lib/cms/useCmsPosts";
import { useCmsProjects } from "../../lib/cms/useCmsProjects";

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

vi.mock("../../lib/cms/useCmsPosts", () => ({
  useCmsPosts: vi.fn(() => ({
    posts: [],
    isLoading: false,
    error: null,
  })),
}));

vi.mock("../../lib/cms/useCmsProjects", () => ({
  useCmsProjects: vi.fn(() => ({
    projects: [],
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

vi.mock("../../content/tracks", () => ({
  tracks: [],
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the hero section with page title", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test Home")).toBeInTheDocument();
  });

  it("renders the hero section with subtitle", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders the Latest Posts section heading", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Latest Posts")).toBeInTheDocument();
  });

  it("renders the Music section heading", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Music")).toBeInTheDocument();
  });

  it("renders the Selected Projects section heading", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Selected Projects")).toBeInTheDocument();
  });

  it("renders blog posts when available", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [
        {
          title: "Post One",
          slug: "post-one",
          excerpt: "First post",
          publishedAt: "2024-01-01",
          coverImageUrl: undefined,
          tags: [],
          authorName: "Author",
        },
        {
          title: "Post Two",
          slug: "post-two",
          excerpt: "Second post",
          publishedAt: "2024-01-02",
          coverImageUrl: undefined,
          tags: [],
          authorName: "Author",
        },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  it("renders projects when available", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [
        {
          title: "Project A",
          slug: "project-a",
          slogan: "Slogan A",
          tags: [],
          featured: false,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Project A")).toBeInTheDocument();
  });

  it("renders navigation buttons in hero", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Read Blog")).toBeInTheDocument();
  });
});
