import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StrudelPlayer } from "../StrudelPlayer";

describe("StrudelPlayer", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "test");
  });

  it("renders iframe with encoded URL", () => {
    render(<StrudelPlayer code="sound('bd')" />);
    const iframe = screen.getByTitle("Strudel REPL");
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute("src")).toMatch(/^https:\/\/strudel\.cc\/#/);
  });

  it("encodes code as base64 in URL", () => {
    render(<StrudelPlayer code="test code" />);
    const iframe = screen.getByTitle("Strudel REPL");
    const expectedBase64 = btoa("test code");
    expect(iframe.getAttribute("src")).toBe(
      `https://strudel.cc/#${expectedBase64}`,
    );
  });

  it("renders BPM when provided", () => {
    render(<StrudelPlayer code="sound('bd')" bpm={120} />);
    expect(screen.getByText("120 BPM")).toBeInTheDocument();
  });

  it("does not render BPM when not provided", () => {
    render(<StrudelPlayer code="sound('bd')" />);
    expect(screen.queryByText(/BPM/)).not.toBeInTheDocument();
  });

  it("renders external link to Strudel.cc", () => {
    render(<StrudelPlayer code="sound('bd')" />);
    expect(screen.getByText("Open in Strudel.cc →")).toBeInTheDocument();
  });

  it("external link opens in new tab", () => {
    render(<StrudelPlayer code="sound('bd')" />);
    const link = screen.getByText("Open in Strudel.cc →");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("iframe has allow autoplay attribute", () => {
    render(<StrudelPlayer code="sound('bd')" />);
    const iframe = screen.getByTitle("Strudel REPL");
    expect(iframe).toHaveAttribute("allow", "autoplay");
  });

  it("iframe has sandbox attribute", () => {
    render(<StrudelPlayer code="sound('bd')" />);
    const iframe = screen.getByTitle("Strudel REPL");
    expect(iframe).toHaveAttribute("sandbox");
  });
});
