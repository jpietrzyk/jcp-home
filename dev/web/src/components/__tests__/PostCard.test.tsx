import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactElement } from "react";
import { PostCard } from "../PostCard";

const basePost = {
  title: "Test Post",
  slug: "test-post",
  excerpt: "This is a test excerpt for the blog post.",
  publishedAt: "2026-03-15T10:00:00Z",
  coverImageUrl: "https://example.com/cover.jpg",
  authorName: "Jane Doe",
  tags: ["React", "TypeScript"],
};

function renderWithRouter(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("PostCard", () => {
  it("renders title", () => {
    renderWithRouter(<PostCard {...basePost} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("renders excerpt", () => {
    renderWithRouter(<PostCard {...basePost} />);
    expect(screen.getByText(/test excerpt/)).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    renderWithRouter(<PostCard {...basePost} />);
    expect(screen.getByText("March 15, 2026")).toBeInTheDocument();
  });

  it("renders author name", () => {
    renderWithRouter(<PostCard {...basePost} />);
    expect(screen.getByText("by Jane Doe")).toBeInTheDocument();
  });

  it("renders cover image when coverImageUrl is provided", () => {
    renderWithRouter(<PostCard {...basePost} />);
    const img = screen.getByAltText("Test Post");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/cover.jpg");
  });

  it("does not render cover image when coverImageUrl is undefined", () => {
    renderWithRouter(<PostCard {...basePost} coverImageUrl={undefined} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders tags as badges", () => {
    renderWithRouter(<PostCard {...basePost} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("does not render tags section when tags is empty", () => {
    const { container } = renderWithRouter(
      <PostCard {...basePost} tags={[]} />,
    );
    expect(container.querySelector(".rounded-md")).not.toBeInTheDocument();
  });

  it("does not render tags section when tags is undefined", () => {
    const { container } = renderWithRouter(
      <PostCard {...basePost} tags={undefined} />,
    );
    expect(container.querySelector(".rounded-md")).not.toBeInTheDocument();
  });

  it("links to blog post page", () => {
    renderWithRouter(<PostCard {...basePost} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/test-post");
  });

  it("handles missing optional fields gracefully", () => {
    renderWithRouter(
      <PostCard
        title="Minimal Post"
        slug="minimal-post"
        excerpt=""
        publishedAt={null}
      />,
    );
    expect(screen.getByText("Minimal Post")).toBeInTheDocument();
    expect(screen.queryByText("by")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/March/)).not.toBeInTheDocument();
  });

  it("does not render date when publishedAt is null", () => {
    renderWithRouter(<PostCard {...basePost} publishedAt={null} />);
    expect(screen.queryByText(/2026/)).not.toBeInTheDocument();
  });

  it("does not render author when authorName is null", () => {
    renderWithRouter(<PostCard {...basePost} authorName={null} />);
    expect(screen.queryByText(/by /)).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = renderWithRouter(
      <PostCard {...basePost} className="custom-class" />,
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });
});
