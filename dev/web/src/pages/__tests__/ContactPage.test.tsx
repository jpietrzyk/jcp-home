import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ContactPage } from "../ContactPage";
import { useCmsPage } from "../../lib/cms/useCmsPage";

vi.mock("../../lib/cms/useCmsPage", () => ({
  useCmsPage: vi.fn(() => ({
    page: {
      title: "Contact",
      slug: "contact",
      subtitle: "Test subtitle",
      eyebrow: "Test eyebrow",
      bodyPlainText: "Test body content",
      body: undefined,
    },
    isLoading: false,
    error: null,
  })),
}));

describe("ContactPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders eyebrow text when provided", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test eyebrow")).toBeInTheDocument();
  });

  it("does not render eyebrow paragraph when eyebrow is null", () => {
    vi.mocked(useCmsPage).mockReturnValue({
      page: {
        title: "Contact",
        slug: "contact",
        subtitle: "Test subtitle",
        eyebrow: null,
        bodyPlainText: "Test body content",
        body: undefined,
      },
      isLoading: false,
      error: null,
    });

    const { container } = render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    const eyebrowParagraph = container.querySelector(
      "p.text-sm.uppercase.tracking-wide",
    );
    expect(eyebrowParagraph).not.toBeInTheDocument();
  });

  it("renders page title and subtitle via PageHero", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders contact info section", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText("jacpie3k@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("+48 663 534 814")).toBeInTheDocument();
    expect(screen.getByText("Cracow, Poland")).toBeInTheDocument();
  });

  it("renders form with Netlify attributes", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    const form = screen.getByRole("form");
    expect(form).toHaveAttribute("data-netlify", "true");
    expect(form).toHaveAttribute("name", "contact");
    const hiddenInput = form.querySelector('input[name="form-name"]') as HTMLInputElement;
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput.value).toBe("contact");
  });

  it("renders honeypot field hidden from users", () => {
    const { container } = render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    const honeypot = container.querySelector('input[name="bot-field"]') as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    const wrapper = honeypot.closest("div");
    expect(wrapper?.className).toContain("hidden");
    expect(wrapper?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders textarea with correct placeholder", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    const textarea = screen.getByPlaceholderText("...what's on yr mind?");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("name", "message");
    expect(textarea).toHaveAttribute("required");
  });

  it("renders submit button", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });
});
