import { describe, it, expect } from "vitest";
import {
  parseFrontmatter,
  parseTrackFile,
  getTrackById,
  getTracksByTag,
} from "../loader";

describe("parseFrontmatter", () => {
  it("parses basic key:value pairs", () => {
    const result = parseFrontmatter("---\ntitle: Hello\n---\ncode here");
    expect(result.data.title).toBe("Hello");
    expect(result.content).toBe("code here");
  });

  it("parses boolean values", () => {
    const result = parseFrontmatter("---\nactive: true\ndisabled: false\n---\n");
    expect(result.data.active).toBe(true);
    expect(result.data.disabled).toBe(false);
  });

  it("parses numeric values", () => {
    const result = parseFrontmatter("---\nbpm: 120\ncount: 0\n---\n");
    expect(result.data.bpm).toBe(120);
    expect(result.data.count).toBe(0);
  });

  it("parses string values with quotes", () => {
    const result = parseFrontmatter('---\ntitle: "Hello World"\n---\n');
    expect(result.data.title).toBe("Hello World");
  });

  it("parses string values with single quotes", () => {
    const result = parseFrontmatter("---\ntitle: 'Hello World'\n---\n");
    expect(result.data.title).toBe("Hello World");
  });

  it("parses array values", () => {
    const result = parseFrontmatter(
      "---\ntags:\n  - electronic\n  - ambient\n---\n",
    );
    expect(result.data.tags).toEqual(["electronic", "ambient"]);
  });

  it("parses array values with quoted items", () => {
    const result = parseFrontmatter(
      '---\ntags:\n  - "tag one"\n  - \'tag two\'\n---\n',
    );
    expect(result.data.tags).toEqual(["tag one", "tag two"]);
  });

  it("returns empty data when no frontmatter", () => {
    const result = parseFrontmatter("just code\nno frontmatter");
    expect(result.data).toEqual({});
    expect(result.content).toBe("just code\nno frontmatter");
  });

  it("handles empty frontmatter", () => {
    const result = parseFrontmatter("---\n---\ncode here");
    expect(result.data).toEqual({});
    expect(result.content).toBe("code here");
  });

  it("handles empty content after frontmatter", () => {
    const result = parseFrontmatter("---\ntitle: Test\n---\n");
    expect(result.data.title).toBe("Test");
    expect(result.content).toBe("");
  });

  it("handles multiple array fields", () => {
    const result = parseFrontmatter(
      "---\ntags:\n  - a\n  - b\nkeywords:\n  - x\n  - y\n---\n",
    );
    expect(result.data.tags).toEqual(["a", "b"]);
    expect(result.data.keywords).toEqual(["x", "y"]);
  });

  it("handles key with underscore", () => {
    const result = parseFrontmatter("---\nmy_key: value\n---\n");
    expect(result.data.my_key).toBe("value");
  });
});

describe("parseTrackFile", () => {
  it("parses a complete track file", () => {
    const content =
      "---\nid: my-track\ntitle: My Track\ndescription: A test track\nbpm: 120\ntags:\n  - electronic\n---\nsound(\"bd\")";
    const track = parseTrackFile(content, "my-track.str");

    expect(track.id).toBe("my-track");
    expect(track.title).toBe("My Track");
    expect(track.description).toBe("A test track");
    expect(track.code).toBe('sound("bd")');
    expect(track.bpm).toBe(120);
    expect(track.tags).toEqual(["electronic"]);
  });

  it("uses filename as fallback id", () => {
    const content = "---\ntitle: Test\n---\ncode";
    const track = parseTrackFile(content, "fancy-track.str");
    expect(track.id).toBe("fancy-track");
  });

  it("defaults title to Untitled when missing", () => {
    const content = "---\n---\ncode";
    const track = parseTrackFile(content, "test.str");
    expect(track.title).toBe("Untitled");
  });

  it("defaults description to empty string when missing", () => {
    const content = "---\ntitle: Test\n---\ncode";
    const track = parseTrackFile(content, "test.str");
    expect(track.description).toBe("");
  });

  it("defaults tags to empty array when missing", () => {
    const content = "---\ntitle: Test\n---\ncode";
    const track = parseTrackFile(content, "test.str");
    expect(track.tags).toEqual([]);
  });

  it("handles track with no frontmatter", () => {
    const track = parseTrackFile("sound(\"bd\")", "minimal.str");
    expect(track.id).toBe("minimal");
    expect(track.title).toBe("Untitled");
    expect(track.code).toBe('sound("bd")');
  });
});

describe("getTrackById", () => {
  it("returns undefined for non-existent id", () => {
    const result = getTrackById("non-existent-track-id-xyz");
    expect(result).toBeUndefined();
  });
});

describe("getTracksByTag", () => {
  it("returns empty array for non-existent tag", () => {
    const result = getTracksByTag("non-existent-tag-xyz");
    expect(result).toEqual([]);
  });
});
