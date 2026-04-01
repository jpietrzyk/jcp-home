import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomeProjectsSection } from "../../components/HomeProjectsSection";
import { useCmsProjects } from "../../lib/cms/useCmsProjects";

vi.mock("../../lib/cms/useCmsProjects", () => ({
  useCmsProjects: vi.fn(),
}));

const defaultMockProjects = {
  projects: [],
  isLoading: false,
  error: null,
};

describe("HomeProjectsSection", () => {
  beforeEach(() => {
    vi.mocked(useCmsProjects).mockReturnValue(defaultMockProjects);
  });

  it("renders Selected Projects section heading", () => {
    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Selected Projects")).toBeInTheDocument();
  });

  it("shows coming soon empty state when no projects", () => {
    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Projects coming soon")).toBeInTheDocument();
    expect(
      screen.getByText("Selected projects will be showcased here."),
    ).toBeInTheDocument();
  });

  it("renders project cards when projects exist", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [
        {
          title: "Project Alpha",
          slug: "project-alpha",
          slogan: "Alpha slogan",
          tags: ["React", "TypeScript"],
          featured: true,
        },
        {
          title: "Project Beta",
          slug: "project-beta",
          slogan: "Beta slogan",
          tags: ["Vue"],
          featured: false,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.getByText("Project Beta")).toBeInTheDocument();
  });

  it("does not show coming soon when projects exist", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [
        {
          title: "Project Alpha",
          slug: "project-alpha",
          slogan: "Alpha slogan",
          tags: [],
          featured: false,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Projects coming soon")).not.toBeInTheDocument();
  });

  it("shows View all projects link when projects exist", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [
        {
          title: "Project Alpha",
          slug: "project-alpha",
          tags: [],
          featured: false,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("View all projects")).toBeInTheDocument();
  });

  it("does not show View all projects when no projects", () => {
    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.queryByText("View all projects")).not.toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [],
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Could not load projects from CMS.")).toBeInTheDocument();
  });

  it("does not show coming soon while loading", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeProjectsSection />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Projects coming soon")).not.toBeInTheDocument();
  });
});
