import { getPostBySlug } from './api';
import type { PostDetails } from './types';
import { useCmsResource } from './useCmsResource';

export function useCmsPost(slug: string) {
  const { data: post, isLoading, error } = useCmsResource<PostDetails | null>({
    enabled: Boolean(slug),
    initialData: null,
    fallbackData: null,
    fetcher: () => getPostBySlug(slug),
    deps: [slug],
  });

  return { post, isLoading, error };
}
