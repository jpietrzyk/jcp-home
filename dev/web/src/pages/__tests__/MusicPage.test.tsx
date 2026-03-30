import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MusicPage } from "../MusicPage";
import { useCmsPage } from "../../lib/cms/useCmsPage";

// Mock the useCmsPage hook
vi.mock("../../lib/cms/useCmsPage", () => ({
  useCmsPage: vi.fn(() => ({
    page: {
      title: "Music",
      slug: "music",
      subtitle: "Test subtitle",
      eyebrow: "Test eyebrow",
      bodyPlainText: "Test body content",
    },
    isLoading: false,
    error: null,
  })),
}));

// Mock the tracks content
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
      },
      isLoading: false,
      error: null,
    });

    const { container } = render(
      <MemoryRouter>
        <MusicPage />
      </MemoryRouter>,
    );
    // The eyebrow paragraph should NOT be in the document when eyebrow is null
    const eyebrowParagraph = container.querySelector(
      "p.text-sm.uppercase.tracking-wide",
    );
    expect(eyebrowParagraph).not.toBeInTheDocument();
  });

  it("renders about strudel section", () => {
    render(
      <MemoryRouter>
        <MusicPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("About Strudel")).toBeInTheDocument();
  });
});
