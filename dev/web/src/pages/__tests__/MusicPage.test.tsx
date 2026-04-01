import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MusicPage } from "../MusicPage";
import { useCmsPage } from "../../lib/cms/useCmsPage";

vi.mock("../../lib/cms/useCmsPage", () => ({
  useCmsPage: vi.fn(() => ({
    page: {
      title: "Music",
      slug: "music",
      subtitle: "Test subtitle",
      eyebrow: "Test eyebrow",
      bodyPlainText: "Test body content",
      body: undefined,
    },
    isLoading: false,
    error: null,
  })),
}));

vi.mock("../../content/tracks", () => ({
  tracks: [
    {
      id: "test-track",
      title: "Test Track",
      description: "Test track description",
      code: "test code",
      bpm: 120,
    },
  ],
  StrudelTrack: {},
}));

describe("MusicPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders eyebrow text when provided", () => {
    render(
      <MemoryRouter>
        <MusicPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test eyebrow")).toBeInTheDocument();
  });

  it("does not render eyebrow paragraph when eyebrow is null", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "Music",
        slug: "music",
        subtitle: "Test subtitle",
        eyebrow: null,
        bodyPlainText: "Test body content",
        body: undefined,
      },
      isLoading: false,
      error: null,
    });

    const { container } = render(
      <MemoryRouter>
        <MusicPage />
      </MemoryRouter>,
    );
    const eyebrowParagraph = container.querySelector(
      "p.text-sm.uppercase.tracking-wide",
    );
    expect(eyebrowParagraph).not.toBeInTheDocument();
  });

  it("renders page title and subtitle via PageHero", () => {
    render(
      <MemoryRouter>
        <MusicPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Music")).toBeInTheDocument();
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders Tracks section heading", () => {
    render(
      <MemoryRouter>
        <MusicPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Tracks")).toBeInTheDocument();
  });

  it("renders Play & Modify section heading", () => {
    render(
      <MemoryRouter>
        <MusicPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Play & Modify")).toBeInTheDocument();
  });

  it("renders track cards from mock data", () => {
    render(
      <MemoryRouter>
        <MusicPage />
      </MemoryRouter>,
    );
    expect(screen.getAllByText("Test Track").length).toBeGreaterThanOrEqual(1);
  });
});
