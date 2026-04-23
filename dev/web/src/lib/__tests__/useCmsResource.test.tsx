import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCmsResource } from "../cms/useCmsResource";

describe("useCmsResource", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns initialData with loading true on mount", () => {
    const fetcher = vi.fn().mockResolvedValue({ data: "fetched" });
    const { result } = renderHook(() =>
      useCmsResource({
        initialData: "initial",
        fallbackData: "fallback",
        fetcher,
        deps: [],
      }),
    );
    expect(result.current.data).toBe("initial");
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("resolves with fetched data", async () => {
    const fetcher = vi.fn().mockResolvedValue({ data: "fetched" });
    const { result } = renderHook(() =>
      useCmsResource({
        initialData: "initial",
        fallbackData: "fallback",
        fetcher,
        deps: [],
      }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data).toEqual({ data: "fetched" });
    expect(result.current.error).toBeNull();
  });

  it("falls back to fallbackData when fetcher returns null", async () => {
    const fetcher = vi.fn().mockResolvedValue(null);
    const { result } = renderHook(() =>
      useCmsResource({
        initialData: "initial",
        fallbackData: "fallback",
        fetcher,
        deps: [],
      }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data).toBe("fallback");
  });

  it("falls back to fallbackData and sets error on fetch rejection", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("Network fail"));
    const { result } = renderHook(() =>
      useCmsResource({
        initialData: "initial",
        fallbackData: "fallback",
        fetcher,
        deps: [],
      }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data).toBe("fallback");
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Network fail");
  });

  it("wraps non-Error rejection in Error", async () => {
    const fetcher = vi.fn().mockRejectedValue("string error");
    const { result } = renderHook(() =>
      useCmsResource({
        initialData: "initial",
        fallbackData: "fallback",
        fetcher,
        deps: [],
      }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("CMS request failed");
  });

  it("sets fallbackData immediately when enabled is false", () => {
    const fetcher = vi.fn();
    const { result } = renderHook(() =>
      useCmsResource({
        enabled: false,
        initialData: "initial",
        fallbackData: "fallback",
        fetcher,
        deps: [],
      }),
    );
    expect(result.current.data).toBe("fallback");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("refetches when deps change", async () => {
    const fetcher = vi.fn().mockResolvedValue("data");
    const { result, rerender } = renderHook(
      ({ deps }) =>
        useCmsResource({
          initialData: "initial",
          fallbackData: "fallback",
          fetcher,
          deps,
        }),
      { initialProps: { deps: ["a"] } },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    rerender({ deps: ["b"] });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
