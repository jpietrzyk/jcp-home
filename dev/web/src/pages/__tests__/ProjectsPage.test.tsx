import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectsPage } from "../ProjectsPage";
import { useCmsProjectsPage } from "../../lib/cms/useCmsProjectsPage";
import { useCmsProjects } from "../../lib/cms/useCmsProjects";

vi.mock("../../lib/cms/useCmsProjectsPage", () => ({
  useCmsProjectsPage: vi.fn(),
}));

vi.mock("../../lib/cms/useCmsProjects", () => ({
  useCmsProjects: vi.fn(),
}));

const defaultPage = {
  page: {
    title: "Projects",
    slug: "projects",
    subtitle: "A selection of projects.",
    eyebrow: "My Work",
    bodyPlainText: "",
  },
  isLoading: false,
  error: null,
};

describe("ProjectsPage", () => {
  beforeEach(() => {
    vi.mocked(useCmsProjectsPage).mockReturnValue(defaultPage);
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [],
      isLoading: false,
      error: null,
    });
  });

  it("renders page header with eyebrow and title", () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("My Work")).toBeInTheDocument();
  });

  it("renders page subtitle", () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("A selection of projects.")).toBeInTheDocument();
  });

  it("renders project cards from mock data", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [
        {
          title: "Project A",
          slug: "project-a",
          slogan: "First project",
          tags: ["React"],
          featured: true,
        },
        {
          title: "Project B",
          slug: "project-b",
          slogan: "Second project",
          tags: ["Vue"],
          featured: false,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Project B")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });

  it("shows empty state when no projects", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("No projects yet.")).toBeInTheDocument();
  });

  it("shows error state", () => {
    vi.mocked(useCmsProjects).mockReturnValue({
      projects: [],
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Could not load projects/)).toBeInTheDocument();
  });

  it("does not show eyebrow when null", () => {
    vi.mocked(useCmsProjectsPage).mockReturnValue({
      ...defaultPage,
      page: {
        ...defaultPage.page,
        subtitle: null,
        eyebrow: null,
      },
    });

    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.queryByText("My Work")).not.toBeInTheDocument();
  });
});
