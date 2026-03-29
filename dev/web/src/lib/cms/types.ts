import type { TypedObject } from "@portabletext/types";

export type PostSummary = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string | null;
};

export type PostDetails = PostSummary & {
  bodyPlainText: string;
  body?: TypedObject[];
};

export type ContentPage = {
  title: string;
  slug: string;
  subtitle?: string | null;
  eyebrow?: string | null;
  bodyPlainText: string;
  body?: TypedObject[];
};

// Raw Sanity API response types (before transformation)
export type SanityPost = PostSummary & {
  body?: TypedObject[];
};

export type SanityPage = {
  title: string;
  slug: string;
  subtitle?: string | null;
  eyebrow?: string | null;
  body?: TypedObject[];
};
