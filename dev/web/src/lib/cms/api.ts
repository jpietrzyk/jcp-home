import type { ContentPage, PostDetails, PostSummary, Resume, SanityPost, SanityPage, SanityResume, ShowcaseProject, SanityShowcaseProject } from './types';
import { pageBySlugQuery, postBySlugQuery, postsQuery, resumeQuery, showcaseProjectsQuery } from './queries';
import { sanityClient } from './sanity.client';
import { sanityImageUrl } from './sanityImage';

const fallbackPosts: PostSummary[] = [
  {
    title: 'Welcome to the Blog',
    slug: 'welcome-to-the-blog',
    excerpt: 'First sample post. Replace this with CMS content.',
    publishedAt: '2026-03-09',
    coverImageUrl: undefined,
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
  try {
    const posts = await sanityClient.fetch<SanityPost[]>(postsQuery);
    if (!posts) return [];
    return posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      publishedAt: p.publishedAt ?? null,
      coverImageUrl: p.coverImage
        ? sanityImageUrl(p.coverImage)?.width(600).height(400).fit('crop').url()
        : undefined,
      tags: p.tags?.filter((t): t is string => typeof t === 'string'),
      authorName: p.author ?? null,
    }));
  } catch {
    return fallbackPosts;
  }
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

const fallbackProjects: ShowcaseProject[] = [
  {
    title: 'Sample Project',
    slug: 'sample-project',
    slogan: 'A sample showcase project',
    description: 'This is fallback content. Add showcase projects in Sanity Studio to replace this.',
    url: 'https://example.com',
    tags: ['React', 'TypeScript'],
    featured: true,
    order: 0,
  },
];

export async function getShowcaseProjects(): Promise<ShowcaseProject[]> {
  if (!sanityClient) return fallbackProjects;

  try {
    const projects = await sanityClient.fetch<SanityShowcaseProject[]>(showcaseProjectsQuery);
    if (!projects) return [];

    return projects.map((p) => ({
      title: p.title,
      slug: p.slug,
      slogan: p.slogan,
      description: p.description,
      thumbnailUrl: p.thumbnail
        ? sanityImageUrl(p.thumbnail)?.width(600).height(400).fit('crop').url()
        : undefined,
      url: p.url,
      tags: p.tags,
      featured: p.featured,
      order: p.order,
    }));
  } catch {
    // On fetch/network/CMS errors, return sample fallback projects so the UI
    // actually shows fallback content instead of an empty list.
    return fallbackProjects;
  }
}
