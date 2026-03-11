import { getPosts } from './api';
import type { PostSummary } from './types';
import { useCmsResource } from './useCmsResource';

export function useCmsPosts() {
  const { data: posts, isLoading, error } = useCmsResource<PostSummary[]>({
    initialData: [],
    fallbackData: [],
    fetcher: getPosts,
    deps: [],
  });

  return { posts, isLoading, error };
}
