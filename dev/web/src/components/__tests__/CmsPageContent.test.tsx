import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CmsPageContent } from "../CmsPageContent";

describe("CmsPageContent", () => {
  it("shows error message when error is present", () => {
    render(
      <CmsPageContent
        error={new Error("fail")}
        isLoading={false}
        bodyPlainText="content"
      />,
    );
    expect(
      screen.getByText("Could not load CMS content. Showing fallback text."),
    ).toBeInTheDocument();
  });

  it("shows custom error message", () => {
    render(
      <CmsPageContent
        error={new Error("fail")}
        isLoading={false}
        bodyPlainText="content"
        errorMessage="Custom error"
      />,
    );
    expect(screen.getByText("Custom error")).toBeInTheDocument();
  });

  it("applies error className", () => {
    render(
      <CmsPageContent
        error={new Error("fail")}
        isLoading={false}
        bodyPlainText="content"
        errorClassName="text-red-500"
      />,
    );
    expect(screen.getByText(/Could not load/)).toHaveClass("text-red-500");
  });

  it("shows loading message when isLoading is true", () => {
    render(
      <CmsPageContent
        error={null}
        isLoading={true}
        bodyPlainText="content"
      />,
    );
    expect(screen.getByText("Loading content...")).toBeInTheDocument();
  });

  it("shows custom loading message", () => {
    render(
      <CmsPageContent
        error={null}
        isLoading={true}
        bodyPlainText="content"
        loadingMessage="Please wait..."
      />,
    );
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  it("applies loading className", () => {
    render(
      <CmsPageContent
        error={null}
        isLoading={true}
        bodyPlainText="content"
        loadingClassName="text-blue-500"
      />,
    );
    expect(screen.getByText(/Loading/)).toHaveClass("text-blue-500");
  });

  it("renders CmsRichText when not loading and no error", () => {
    render(
      <CmsPageContent
        error={null}
        isLoading={false}
        bodyPlainText="Plain text content"
      />,
    );
    expect(screen.getByText("Plain text content")).toBeInTheDocument();
  });

  it("does not show error message when error is null", () => {
    render(
      <CmsPageContent
        error={null}
        isLoading={false}
        bodyPlainText="content"
      />,
    );
    expect(
      screen.queryByText(/Could not load CMS content/),
    ).not.toBeInTheDocument();
  });

  it("does not show loading message when not loading", () => {
    render(
      <CmsPageContent
        error={null}
        isLoading={false}
        bodyPlainText="content"
      />,
    );
    expect(screen.queryByText(/Loading content/)).not.toBeInTheDocument();
  });

  it("shows both error and loading when both are present", () => {
    render(
      <CmsPageContent
        error={new Error("fail")}
        isLoading={true}
        bodyPlainText="content"
      />,
    );
    expect(screen.getByText(/Could not load CMS content/)).toBeInTheDocument();
    expect(screen.getByText(/Loading content/)).toBeInTheDocument();
  });
});
