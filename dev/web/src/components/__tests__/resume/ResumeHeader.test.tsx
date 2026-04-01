import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResumeHeader } from "../../resume/ResumeHeader";
import type { ContactData } from "@/lib/cms/types";

const contactData: ContactData = {
  email: "test@example.com",
  location: "Cracow, Poland",
  linkedin: "https://linkedin.com/in/test",
  github: "https://github.com/test",
};

describe("ResumeHeader", () => {
  it("renders name and title", () => {
    render(
      <ResumeHeader name="John Doe" title="Software Engineer" />,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders contact data with icons", () => {
    render(
      <ResumeHeader name="John Doe" title="Dev" contactData={contactData} />,
    );
    expect(screen.getByText("Cracow, Poland")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders email as mailto link", () => {
    render(
      <ResumeHeader name="John Doe" title="Dev" contactData={contactData} />,
    );
    const link = screen.getByText("test@example.com").closest("a");
    expect(link).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders CV download links", () => {
    const cvLinks = [
      { label: "CV (EN)", href: "/cv-en.pdf" },
      { label: "CV (PL)", href: "/cv-pl.pdf" },
    ];
    render(
      <ResumeHeader name="John Doe" title="Dev" cvLinks={cvLinks} />,
    );
    expect(screen.getByText("CV (EN)")).toBeInTheDocument();
    expect(screen.getByText("CV (PL)")).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    const cvLink = links.find((l) => l.getAttribute("href") === "/cv-en.pdf");
    expect(cvLink).toHaveAttribute("target", "_blank");
  });

  it("does not render contact section when contactData is undefined", () => {
    render(<ResumeHeader name="John Doe" title="Dev" />);
    expect(screen.queryByText("LinkedIn")).not.toBeInTheDocument();
  });

  it("renders phone as tel link", () => {
    render(
      <ResumeHeader
        name="John Doe"
        title="Dev"
        contactData={{ ...contactData, phone: "+48 123 456 789" }}
      />,
    );
    expect(screen.getByText("+48 123 456 789")).toBeInTheDocument();
    const link = screen.getByText("+48 123 456 789").closest("a");
    expect(link).toHaveAttribute("href", "tel:+48 123 456 789");
  });

  it("does not render phone when not provided", () => {
    render(
      <ResumeHeader name="John Doe" title="Dev" contactData={contactData} />,
    );
    expect(screen.queryByText("+48 123 456 789")).not.toBeInTheDocument();
  });

  it("does not render CV section when cvLinks is empty", () => {
    render(<ResumeHeader name="John Doe" title="Dev" cvLinks={[]} />);
    expect(screen.queryByText("CV")).not.toBeInTheDocument();
  });
});
