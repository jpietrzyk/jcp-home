import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TrackSelector } from "../TrackSelector";
import type { StrudelTrack } from "../../content/tracks";

const mockTracks: StrudelTrack[] = [
  {
    id: "track-1",
    title: "First Track",
    description: "Description one",
    code: "sound('bd')",
    bpm: 120,
    tags: ["electronic", "ambient"],
  },
  {
    id: "track-2",
    title: "Second Track",
    description: "Description two",
    code: "sound('hh')",
    tags: ["minimal"],
  },
];

describe("TrackSelector", () => {
  it("renders track titles", () => {
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("First Track")).toBeInTheDocument();
    expect(screen.getByText("Second Track")).toBeInTheDocument();
  });

  it("renders track descriptions", () => {
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("Description one")).toBeInTheDocument();
    expect(screen.getByText("Description two")).toBeInTheDocument();
  });

  it("renders track tags", () => {
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("electronic")).toBeInTheDocument();
    expect(screen.getByText("ambient")).toBeInTheDocument();
    expect(screen.getByText("minimal")).toBeInTheDocument();
  });

  it("renders BPM when present", () => {
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("120 BPM")).toBeInTheDocument();
  });

  it("does not render BPM for track without bpm", () => {
    const noBpmTracks: StrudelTrack[] = [
      {
        id: "no-bpm",
        title: "No BPM Track",
        description: "No bpm here",
        code: "sound('bd')",
        tags: [],
      },
    ];
    render(
      <TrackSelector
        tracks={noBpmTracks}
        selectedTrackId="no-bpm"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.queryByText(/^\d+ BPM$/)).not.toBeInTheDocument();
  });

  it("marks selected track with aria-pressed", () => {
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={vi.fn()}
      />,
    );
    const cards = screen.getAllByRole("button", { name: undefined });
    const firstCard = cards.find((card) =>
      card.querySelector(".truncate")?.textContent === "First Track",
    );
    expect(firstCard).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onSelect when card is clicked", () => {
    const onSelect = vi.fn();
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("First Track").closest("[role=button]")!);
    expect(onSelect).toHaveBeenCalledWith(mockTracks[0]);
  });

  it("calls onSelect on Enter key", () => {
    const onSelect = vi.fn();
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={onSelect}
      />,
    );
    const card = screen.getByText("First Track").closest("[role=button]")!;
    fireEvent.keyDown(card, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith(mockTracks[0]);
  });

  it("calls onSelect on Space key up", () => {
    const onSelect = vi.fn();
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={onSelect}
      />,
    );
    const card = screen.getByText("First Track").closest("[role=button]")!;
    fireEvent.keyUp(card, { key: " " });
    expect(onSelect).toHaveBeenCalledWith(mockTracks[0]);
  });

  it("renders play buttons with aria-labels", () => {
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={vi.fn()}
      />,
    );
    expect(
      screen.getByLabelText(`Play ${mockTracks[0].title}`),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Play ${mockTracks[1].title}`),
    ).toBeInTheDocument();
  });

  it("calls onPlay when play button is clicked", () => {
    const onPlay = vi.fn();
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={vi.fn()}
        onPlay={onPlay}
      />,
    );
    fireEvent.click(screen.getByLabelText(`Play ${mockTracks[0].title}`));
    expect(onPlay).toHaveBeenCalledWith(mockTracks[0]);
  });

  it("does not call onSelect when play button is clicked (stopPropagation)", () => {
    const onSelect = vi.fn();
    render(
      <TrackSelector
        tracks={mockTracks}
        selectedTrackId="track-1"
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByLabelText(`Play ${mockTracks[0].title}`));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
