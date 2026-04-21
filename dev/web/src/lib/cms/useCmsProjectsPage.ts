import { getProjectsPage } from './api';
import type { ProjectsPageData } from './types';
import { useCmsResource } from './useCmsResource';

type UseCmsProjectsPageOptions = {
  fallback: ProjectsPageData;
};

export function useCmsProjectsPage(options: UseCmsProjectsPageOptions) {
  const { fallback } = options;
  const { data: page, isLoading, error } = useCmsResource<ProjectsPageData>({
    initialData: fallback,
    fallbackData: fallback,
    fetcher: async () => {
      const result = await getProjectsPage();
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
    deps: [],
  });

  return { page, isLoading, error };
}
