import type { ContentPage, PostDetails, PostSummary } from './types';
import { pageBySlugQuery, postBySlugQuery, postsQuery } from './queries';
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
    .flatMap((block) => (typeof block === 'object' && block && 'children' in block ? (block as any).children : []))
    .map((child) => (typeof child === 'object' && child && 'text' in child ? String((child as any).text) : ''))
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
    return fallback ? { ...fallback, bodyPlainText: 'Sample post body from fallback data.' } : null;
  }

  const post = await sanityClient.fetch<any>(postBySlugQuery, { slug });
  if (!post) return null;

  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt ?? null,
    bodyPlainText: toPlainText(post.body)
  };
}

export async function getPageBySlug(slug: string): Promise<ContentPage | null> {
  if (!sanityClient) {
    return {
      title: slug,
      slug,
      subtitle: null,
      bodyPlainText: `Fallback ${slug} page content. Connect Sanity env vars to fetch real data.`
    };
  }

  const page = await sanityClient.fetch<any>(pageBySlugQuery, { slug });
  if (!page) return null;

  return {
    title: page.title,
    slug: page.slug,
    subtitle: page.subtitle ?? null,
    bodyPlainText: toPlainText(page.body)
  };
}
