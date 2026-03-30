import type { ContentPage, PostDetails, PostSummary, Resume, SanityPost, SanityPage, SanityResume } from './types';
import { pageBySlugQuery, postBySlugQuery, postsQuery, resumeQuery } from './queries';
import { sanityClient } from './sanity.client';

const fallbackPosts: PostSummary[] = [
  {
    title: 'Welcome to the Blog',
    slug: 'welcome-to-the-blog',
    excerpt: 'First sample post. Replace this with CMS content.',
    publishedAt: '2026-03-09'
  }
];

function toPlainText(value: unknown): string {
  if (!Array.isArray(value)) return '';
  return value
    .flatMap((block) => (typeof block === 'object' && block && 'children' in block ? (block as { children: unknown[] }).children : []))
    .map((child) => (typeof child === 'object' && child && 'text' in child ? String((child as { text: unknown }).text) : ''))
    .join(' ')
    .trim();
}

export async function getPosts(): Promise<PostSummary[]> {
  if (!sanityClient) return fallbackPosts;
  const posts = await sanityClient.fetch<PostSummary[]>(postsQuery);
  return posts ?? [];
}

export async function getPostBySlug(slug: string): Promise<PostDetails | null> {
  if (!sanityClient) {
    const fallback = fallbackPosts.find((post) => post.slug === slug);
    return fallback
      ? { ...fallback, bodyPlainText: 'Sample post body from fallback data.', body: [] }
      : null;
  }

  const post = await sanityClient.fetch<SanityPost | null>(postBySlugQuery, { slug });
  if (!post) return null;

  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt ?? null,
    bodyPlainText: toPlainText(post.body),
    body: Array.isArray(post.body) ? post.body : []
  };
}

export async function getPageBySlug(slug: string): Promise<ContentPage | null> {
  if (!sanityClient) {
    return null;
  }

  const page = await sanityClient.fetch<SanityPage | null>(pageBySlugQuery, { slug });
  if (!page) return null;

  return {
    title: page.title,
    slug: page.slug,
    subtitle: page.subtitle ?? null,
    eyebrow: page.eyebrow ?? null,
    bodyPlainText: toPlainText(page.body),
    body: Array.isArray(page.body) ? page.body : []
  };
}

export async function getResume(): Promise<Resume | null> {
  if (!sanityClient) {
    return null;
  }

  const resume = await sanityClient.fetch<SanityResume | null>(resumeQuery);
  if (!resume) return null;

  const title = typeof resume.title === 'string' && resume.title.trim() ? resume.title : 'Resume';
  const slug = typeof resume.slug === 'string' && resume.slug.trim() ? resume.slug : 'resume';

  return {
    title,
    slug,
    bio: resume.bio ?? undefined,
    contactData: resume.contactData ?? undefined,
    skills: resume.skills ?? [],
    experience: resume.experience ?? [],
    education: resume.education ?? undefined,
    volunteerExperience: resume.volunteerExperience ?? [],
    projects: resume.projects ?? []
  };
}
