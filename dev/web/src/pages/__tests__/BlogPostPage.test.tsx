import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BlogPostPage } from "../BlogPostPage";
import { useCmsPost } from "../../lib/cms/useCmsPost";

vi.mock("../../lib/cms/useCmsPost", () => ({
  useCmsPost: vi.fn(),
}));

function renderWithSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("BlogPostPage", () => {
  beforeEach(() => {
    vi.mocked(useCmsPost).mockReturnValue({
      post: null,
      isLoading: false,
      error: null,
    });
  });

  it("shows loading state", () => {
    vi.mocked(useCmsPost).mockReturnValue({
      post: null,
      isLoading: true,
      error: null,
    });
    renderWithSlug("test-post");
    expect(screen.getByText("Loading post...")).toBeInTheDocument();
  });

  it("shows not found when post is null with no error", () => {
    renderWithSlug("nonexistent");
    expect(screen.getByText("Post not found")).toBeInTheDocument();
  });

  it("shows could not load when error exists", () => {
    vi.mocked(useCmsPost).mockReturnValue({
      post: null,
      isLoading: false,
      error: new Error("Network error"),
    });
    renderWithSlug("error-post");
    expect(screen.getByText("Could not load post")).toBeInTheDocument();
    expect(
      screen.getByText("Please try again in a moment."),
    ).toBeInTheDocument();
  });

  it("shows back to blog link when post not found", () => {
    renderWithSlug("nonexistent");
    expect(screen.getByText("Back to blog")).toBeInTheDocument();
  });

  it("renders post title when loaded", () => {
    vi.mocked(useCmsPost).mockReturnValue({
      post: {
        title: "Test Post Title",
        slug: "test-post",
        excerpt: "A test post",
        publishedAt: "2024-06-15",
        bodyPlainText: "Post content here",
        body: [],
      },
      isLoading: false,
      error: null,
    });
    renderWithSlug("test-post");
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
  });

  it("renders post excerpt when loaded", () => {
    vi.mocked(useCmsPost).mockReturnValue({
      post: {
        title: "Test Post",
        slug: "test-post",
        excerpt: "This is the excerpt",
        publishedAt: "2024-06-15",
        bodyPlainText: "Content",
        body: [],
      },
      isLoading: false,
      error: null,
    });
    renderWithSlug("test-post");
    expect(screen.getByText("This is the excerpt")).toBeInTheDocument();
  });

  it("renders published date when loaded", () => {
    vi.mocked(useCmsPost).mockReturnValue({
      post: {
        title: "Test Post",
        slug: "test-post",
        excerpt: "Excerpt",
        publishedAt: "2024-06-15",
        bodyPlainText: "Content",
        body: [],
      },
      isLoading: false,
      error: null,
    });
    renderWithSlug("test-post");
    expect(screen.getByText("2024-06-15")).toBeInTheDocument();
  });

  it("renders body as plain text when no rich text body", () => {
    vi.mocked(useCmsPost).mockReturnValue({
      post: {
        title: "Test Post",
        slug: "test-post",
        excerpt: "Excerpt",
        publishedAt: "2024-06-15",
        bodyPlainText: "Plain text body content",
        body: [],
      },
      isLoading: false,
      error: null,
    });
    renderWithSlug("test-post");
    expect(screen.getByText("Plain text body content")).toBeInTheDocument();
  });

  it("passes slug from URL params to useCmsPost", () => {
    renderWithSlug("my-article");
    expect(useCmsPost).toHaveBeenCalledWith("my-article");
  });
});
