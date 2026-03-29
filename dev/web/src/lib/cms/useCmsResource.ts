import { useEffect, useState } from 'react';

type UseCmsResourceOptions<T> = {
  enabled?: boolean;
  initialData: T;
  fallbackData: T;
  fetcher: () => Promise<T | null>;
  deps: readonly unknown[];
};

export function useCmsResource<T>(options: UseCmsResourceOptions<T>) {
  const {
    enabled = true,
    initialData,
    fallbackData,
    fetcher,
    deps,
  } = options;

  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!isCancelled) {
          setData(result ?? fallbackData);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          setData(fallbackData);
          setError(err instanceof Error ? err : new Error('CMS request failed'));
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, fetcher, fallbackData, ...deps]);

  return { data, isLoading, error };
}
