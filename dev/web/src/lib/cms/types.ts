export type PostSummary = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string | null;
};

export type PostDetails = PostSummary & {
  bodyPlainText: string;
};

export type ContentPage = {
  title: string;
  slug: string;
  subtitle?: string | null;
  bodyPlainText: string;
};
