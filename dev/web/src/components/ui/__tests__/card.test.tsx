import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardContent } from "../card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>,
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Card className="custom-class">
        <div>Content</div>
      </Card>,
    );
    const card = screen.getByText("Content").parentElement;
    expect(card).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Card ref={ref}>
        <div>Content</div>
      </Card>,
    );
    expect(ref.current).not.toBeNull();
  });
});

describe("CardHeader", () => {
  it("renders children correctly", () => {
    render(
      <CardHeader>
        <div>Header content</div>
      </CardHeader>,
    );
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <CardHeader className="custom-header">
        <div>Content</div>
      </CardHeader>,
    );
    const header = screen.getByText("Content").parentElement;
    expect(header).toHaveClass("custom-header");
  });
});

describe("CardTitle", () => {
  it("renders as h3 element", () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText("Title");
    expect(title.tagName).toBe("H3");
  });

  it("applies custom className", () => {
    render(<CardTitle className="custom-title">Title</CardTitle>);
    const title = screen.getByText("Title");
    expect(title).toHaveClass("custom-title");
  });
});

describe("CardContent", () => {
  it("renders children correctly", () => {
    render(
      <CardContent>
        <div>Content</div>
      </CardContent>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <CardContent className="custom-content">
        <div>Content</div>
      </CardContent>,
    );
    const content = screen.getByText("Content").parentElement;
    expect(content).toHaveClass("custom-content");
  });
});
