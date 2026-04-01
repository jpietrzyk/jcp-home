import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomeMusicSection } from "../../components/home/HomeMusicSection";

vi.mock("../../content/tracks", () => ({
  tracks: [
    {
      id: "track-1",
      title: "Track One",
      description: "First track description",
      code: "s0",
      bpm: 120,
      tags: ["electronic"],
    },
    {
      id: "track-2",
      title: "Track Two",
      description: "Second track description",
      code: "s1",
      bpm: 140,
      tags: ["ambient"],
    },
    {
      id: "track-3",
      title: "Track Three",
      description: "Third track description",
      code: "s2",
      tags: [],
    },
  ],
}));

describe("HomeMusicSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Music section heading", () => {
    render(
      <MemoryRouter>
        <HomeMusicSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Music")).toBeInTheDocument();
  });

  it("renders up to 2 featured tracks", () => {
    render(
      <MemoryRouter>
        <HomeMusicSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Track One")).toBeInTheDocument();
    expect(screen.getByText("Track Two")).toBeInTheDocument();
    expect(screen.queryByText("Track Three")).not.toBeInTheDocument();
  });

  it("renders track descriptions", () => {
    render(
      <MemoryRouter>
        <HomeMusicSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("First track description")).toBeInTheDocument();
    expect(screen.getByText("Second track description")).toBeInTheDocument();
  });

  it("renders track tags", () => {
    render(
      <MemoryRouter>
        <HomeMusicSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("electronic")).toBeInTheDocument();
    expect(screen.getByText("ambient")).toBeInTheDocument();
  });

  it("renders links to /music for each track card", () => {
    render(
      <MemoryRouter>
        <HomeMusicSection />
      </MemoryRouter>,
    );
    const musicLinks = screen.getAllByRole("link", { name: /Track/ });
    expect(musicLinks.length).toBe(2);
    musicLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/music");
    });
  });

  it("shows Explore all tracks link when tracks exist", () => {
    render(
      <MemoryRouter>
        <HomeMusicSection />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Explore all tracks/)).toBeInTheDocument();
  });
});

describe("HomeMusicSection with empty tracks", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("shows no tracks message when tracks are empty", async () => {
    vi.doMock("../../content/tracks", () => ({
      tracks: [],
    }));

    const { HomeMusicSection: FreshSection } = await import(
      "../../components/home/HomeMusicSection"
    );

    render(
      <MemoryRouter>
        <FreshSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("No tracks yet.")).toBeInTheDocument();
  });
});
