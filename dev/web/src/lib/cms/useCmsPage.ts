import { getPageBySlug } from './api';
import type { ContentPage } from './types';
import { useCmsResource } from './useCmsResource';

type UseCmsPageOptions = {
  fallback: ContentPage;
};

export function useCmsPage(slug: string, options: UseCmsPageOptions) {
  const { fallback } = options;
  const { data: page, isLoading, error } = useCmsResource<ContentPage>({
    initialData: fallback,
    fallbackData: fallback,
    fetcher: async () => {
      const result = await getPageBySlug(slug);
      if (!result) return null;

      return {
        title: result.title || fallback.title,
        slug: result.slug || fallback.slug,
        subtitle: result.subtitle ?? fallback.subtitle,
        eyebrow: result.eyebrow ?? fallback.eyebrow,
        bodyPlainText: result.bodyPlainText || fallback.bodyPlainText,
        body: result.body ?? fallback.body,
      };
    },
    deps: [slug],
  });

  return { page, isLoading, error };
}
