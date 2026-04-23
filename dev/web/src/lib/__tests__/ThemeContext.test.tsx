import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeContext";

const defaultMatchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

beforeAll(() => {
  window.matchMedia = defaultMatchMedia;
});

describe("ThemeProvider", () => {
  let unmountFn: () => void;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
    window.matchMedia = defaultMatchMedia;
  });

  afterEach(() => {
    if (unmountFn) unmountFn();
    document.documentElement.classList.remove("light", "dark");
  });

  it("defaults to dark theme", () => {
    const { result, unmount } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    unmountFn = unmount;
    expect(result.current.theme).toBe("dark");
  });

  it("restores theme from localStorage", () => {
    localStorage.setItem("theme", "light");
    const { result, unmount } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    unmountFn = unmount;
    expect(result.current.theme).toBe("light");
  });

  it("detects system preference for light theme", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-color-scheme: light)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const { result, unmount } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    unmountFn = unmount;
    expect(result.current.theme).toBe("light");
  });

  it("toggles from dark to light", () => {
    const { result, unmount } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    unmountFn = unmount;
    expect(result.current.theme).toBe("dark");
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe("light");
  });

  it("toggles from light to dark", () => {
    localStorage.setItem("theme", "light");
    const { result, unmount } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    unmountFn = unmount;
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe("dark");
  });

  it("persists theme to localStorage on toggle", () => {
    const { result, unmount } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    unmountFn = unmount;
    act(() => {
      result.current.toggleTheme();
    });
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("adds theme class to document root", () => {
    const { unmount } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    unmountFn = unmount;
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("updates document root class on toggle", () => {
    const { result, unmount } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    unmountFn = unmount;
    act(() => {
      result.current.toggleTheme();
    });
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});

describe("useTheme", () => {
  it("throws error when used outside ThemeProvider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within a ThemeProvider");
  });
});
