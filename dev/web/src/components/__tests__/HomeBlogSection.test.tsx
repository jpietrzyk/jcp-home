import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomeBlogSection } from "../../components/HomeBlogSection";
import { useCmsPosts } from "../../lib/cms/useCmsPosts";

vi.mock("../../lib/cms/useCmsPosts", () => ({
  useCmsPosts: vi.fn(),
}));

const defaultMockPosts = {
  posts: [],
  isLoading: false,
  error: null,
};

describe("HomeBlogSection", () => {
  beforeEach(() => {
    vi.mocked(useCmsPosts).mockReturnValue(defaultMockPosts);
  });

  it("renders Latest Posts section heading", () => {
    render(
      <MemoryRouter>
        <HomeBlogSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Latest Posts")).toBeInTheDocument();
  });

  it("renders up to 2 blog posts", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [
        {
          title: "Post One",
          slug: "post-one",
          excerpt: "First post",
          publishedAt: "2024-01-01",
          coverImageUrl: null,
          tags: ["React"],
          authorName: "Author",
        },
        {
          title: "Post Two",
          slug: "post-two",
          excerpt: "Second post",
          publishedAt: "2024-01-02",
          coverImageUrl: null,
          tags: [],
          authorName: "Author",
        },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeBlogSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  it("shows only first 2 posts when more than 2 available", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [
        { title: "Post One", slug: "post-one", excerpt: "", publishedAt: "2024-01-01", coverImageUrl: null, tags: [], authorName: null },
        { title: "Post Two", slug: "post-two", excerpt: "", publishedAt: "2024-01-02", coverImageUrl: null, tags: [], authorName: null },
        { title: "Post Three", slug: "post-three", excerpt: "", publishedAt: "2024-01-03", coverImageUrl: null, tags: [], authorName: null },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeBlogSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
    expect(screen.queryByText("Post Three")).not.toBeInTheDocument();
  });

  it("shows View all posts link when more than 2 posts exist", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [
        { title: "P1", slug: "p1", excerpt: "", publishedAt: "2024-01-01", coverImageUrl: null, tags: [], authorName: null },
        { title: "P2", slug: "p2", excerpt: "", publishedAt: "2024-01-02", coverImageUrl: null, tags: [], authorName: null },
        { title: "P3", slug: "p3", excerpt: "", publishedAt: "2024-01-03", coverImageUrl: null, tags: [], authorName: null },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeBlogSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("View all posts")).toBeInTheDocument();
  });

  it("does not show View all posts link when 2 or fewer posts", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [
        { title: "P1", slug: "p1", excerpt: "", publishedAt: "2024-01-01", coverImageUrl: null, tags: [], authorName: null },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeBlogSection />
      </MemoryRouter>,
    );
    expect(screen.queryByText("View all posts")).not.toBeInTheDocument();
  });

  it("shows empty state when no posts", () => {
    render(
      <MemoryRouter>
        <HomeBlogSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("No posts yet.")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeBlogSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [],
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <MemoryRouter>
        <HomeBlogSection />
      </MemoryRouter>,
    );
    expect(screen.getByText("Could not load posts from CMS.")).toBeInTheDocument();
  });
});
