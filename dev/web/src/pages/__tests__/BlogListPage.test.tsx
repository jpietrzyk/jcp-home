import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BlogListPage } from "../BlogListPage";
import { useCmsPage } from "../../lib/cms/useCmsPage";
import { useCmsPosts } from "../../lib/cms/useCmsPosts";

vi.mock("../../lib/cms/useCmsPage", () => ({
  useCmsPage: vi.fn(),
}));

vi.mock("../../lib/cms/useCmsPosts", () => ({
  useCmsPosts: vi.fn(),
}));

const defaultPage = {
  page: {
    title: "Blog",
    slug: "blog",
    subtitle: "My thoughts",
    eyebrow: "Writing",
    bodyPlainText: "Read my posts",
    body: undefined as any,
  },
  isLoading: false,
  error: null,
};

const defaultPosts = {
  posts: [],
  isLoading: false,
  error: null,
};

describe("BlogListPage", () => {
  beforeEach(() => {
    vi.mocked(useCmsPage).mockReturnValue(defaultPage);
    vi.mocked(useCmsPosts).mockReturnValue(defaultPosts);
  });

  it("renders eyebrow text when present", () => {
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Writing")).toBeInTheDocument();
  });

  it("does not render eyebrow when null", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      ...defaultPage,
      page: { ...defaultPage.page, eyebrow: null },
    });
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Writing")).not.toBeInTheDocument();
  });

  it("renders page title and subtitle", () => {
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("My thoughts")).toBeInTheDocument();
  });

  it("renders Posts section heading", () => {
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });

  it("renders blog posts when available", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [
        {
          title: "Post One",
          slug: "post-one",
          excerpt: "First",
          publishedAt: "2024-01-01",
          coverImageUrl: undefined,
          tags: [],
          authorName: "Author",
        },
        {
          title: "Post Two",
          slug: "post-two",
          excerpt: "Second",
          publishedAt: "2024-01-02",
          coverImageUrl: undefined,
          tags: [],
          authorName: "Author",
        },
      ],
      isLoading: false,
      error: null,
    });
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  it("shows loading message for posts", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [],
      isLoading: true,
      error: null,
    });
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();
  });

  it("shows error message for posts", () => {
    vi.mocked(useCmsPosts).mockReturnValue({
      posts: [],
      isLoading: false,
      error: new Error("fail"),
    });
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/Could not load posts from CMS/),
    ).toBeInTheDocument();
  });

  it("shows empty state when no posts", () => {
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("No posts yet.")).toBeInTheDocument();
  });

  it("shows page loading message", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      ...defaultPage,
      isLoading: true,
    });
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading content...")).toBeInTheDocument();
  });
});
