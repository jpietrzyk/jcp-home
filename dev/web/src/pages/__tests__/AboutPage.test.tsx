import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AboutPage } from "../AboutPage";
import { useCmsPage } from "../../lib/cms/useCmsPage";
import { useResume } from "../../lib/cms/useResume";

vi.mock("../../lib/cms/useCmsPage", () => ({
  useCmsPage: vi.fn(() => ({
    page: {
      title: "About",
      slug: "about",
      subtitle: null,
      eyebrow: "Get to know me",
      body: null,
      bodyPlainText: "Test about content",
    },
    isLoading: false,
    error: null,
  })),
}));

const mockResume = {
  title: "Resume",
  slug: "resume",
  bio: "Test bio text",
  contactData: {
    email: "test@example.com",
    phone: "+48 123 456 789",
    location: "Test City",
    linkedin: "https://linkedin.com/in/test",
    github: "https://github.com/test",
  },
  skills: ["Ruby on Rails", "React"],
  experience: [
    {
      position: "Developer",
      company: "Test Co",
      location: "Remote",
      employmentType: "Full-time",
      startDate: "Jan 2020",
      endDate: null,
      isCurrent: true,
      achievements: ["Did stuff"],
    },
  ],
  education: {
    school: "Test University",
    degree: "BSc",
    field: "Computer Science",
    graduationYear: "2015",
    grade: "4.0",
  },
  volunteerExperience: [
    {
      organization: "Test Org",
      role: "Mentor",
      startDate: "2020",
      endDate: "2021",
      description: "Helped people",
    },
  ],
  projects: [
    {
      name: "Test Project",
      description: "A test project",
      url: "https://example.com",
      technologies: ["React", "TypeScript"],
      startDate: "2021",
      endDate: "2022",
    },
  ],
};

vi.mock("../../lib/cms/useResume", () => ({
  useResume: vi.fn(() => ({
    resume: mockResume,
    isLoading: false,
    error: null,
  })),
}));

vi.mock("../../content/profile", () => ({
  profile: {
    name: "Test User",
    title: "Test Title",
    email: "test@example.com",
    linkedin: "https://linkedin.com/in/test",
    github: "https://github.com/test",
    location: "Test City",
    phone: "+48 123 456 789",
    about: "Test about text",
  },
}));

describe("AboutPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page title", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders eyebrow when present", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Get to know me")).toBeInTheDocument();
  });

  it("does not render eyebrow when null", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "About",
        slug: "about",
        subtitle: null,
        eyebrow: null,
        body: null,
        bodyPlainText: "Fallback text",
      },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Get to know me")).not.toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getAllByText("test@example.com").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("+48 123 456 789")).toBeInTheDocument();
    expect(screen.getAllByText("Test City").length).toBeGreaterThanOrEqual(2);
  });

  it("renders resume bio and skills on happy path", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test bio text")).toBeInTheDocument();
    expect(screen.getByText("Ruby on Rails")).toBeInTheDocument();
    expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(2);
  });

  it("renders resume experience section", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Work Experience")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Test Co")).toBeInTheDocument();
  });

  it("renders resume education section", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Test University")).toBeInTheDocument();
  });

  it("renders volunteer experience section", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Volunteer Experience")).toBeInTheDocument();
    expect(screen.getByText("Test Org")).toBeInTheDocument();
  });

  it("renders projects section", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("shows loading skeleton when resume is loading", () => {
    vi.mocked(useResume).mockReturnValue({
      resume: mockResume,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(screen.queryByText("Test bio text")).not.toBeInTheDocument();
  });

  it("shows error message when resume fails to load", () => {
    vi.mocked(useResume).mockReturnValue({
      resume: mockResume,
      isLoading: false,
      error: new Error("Network error"),
    });

    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Error loading resume: Network error"),
    ).toBeInTheDocument();
  });

  it("hides experience section when resume has no experience", () => {
    vi.mocked(useResume).mockReturnValue({
      resume: { ...mockResume, experience: [] },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Work Experience")).not.toBeInTheDocument();
  });

  it("hides volunteer section when resume has no volunteer data", () => {
    vi.mocked(useResume).mockReturnValue({
      resume: { ...mockResume, volunteerExperience: [] },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Volunteer Experience")).not.toBeInTheDocument();
  });

  it("hides projects section when resume has no projects", () => {
    vi.mocked(useResume).mockReturnValue({
      resume: { ...mockResume, projects: [] },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Projects")).not.toBeInTheDocument();
  });
});
