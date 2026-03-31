import { getShowcaseProjects } from './api';
import type { ShowcaseProject } from './types';
import { useCmsResource } from './useCmsResource';

export function useCmsProjects() {
  const { data: projects, isLoading, error } = useCmsResource<ShowcaseProject[]>({
    initialData: [],
    fetcher: getShowcaseProjects,
    deps: [],
  });

  return { projects, isLoading, error };
}
