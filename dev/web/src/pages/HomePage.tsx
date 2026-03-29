import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CmsPageContent } from "../components/CmsPageContent";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AnimatedSection } from "../components/AnimatedSection";
import { profile } from "../content/profile";
import { useCmsPage } from "../lib/cms/useCmsPage";

export function HomePage() {
  const { page, isLoading, error } = useCmsPage("home", {
    fallback: {
      title: "Home",
      slug: "home",
      subtitle: "Create home content in Sanity",
      eyebrow: "CMS-driven content",
      bodyPlainText:
        "Add a Page document with slug 'home' in Sanity to manage this section.",
    },
  });

  return (
    <section className="space-y-4">
      <AnimatedSection delay={0.1}>
        <p className="text-sm uppercase tracking-wide text-stone-500">
          {page.eyebrow ?? "Personal site"}
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{page.title}</CardTitle>
            <p className="text-stone-400">{page.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatedSection delay={0.3}>
              <CmsPageContent
                error={error}
                isLoading={isLoading}
                body={page.body}
                bodyPlainText={page.bodyPlainText}
                richTextClassName="prose-invert max-w-2xl text-stone-400"
                hideFirstHeadingMatching={page.title}
                errorClassName="max-w-2xl text-amber-500"
                loadingClassName="max-w-2xl text-stone-500"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-400">
                <span className="hover:text-stone-200 transition-colors duration-300">
                  {profile.location}
                </span>
                <a
                  className="hover:text-stone-200 hover:underline transition-all duration-300"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
                <a
                  className="hover:text-stone-200 hover:underline transition-all duration-300"
                  href={profile.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="hover:text-stone-200 hover:underline transition-all duration-300"
                  href={profile.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <div className="flex flex-wrap gap-3">
                <Link to="/resume">
                  <Button>View Resume</Button>
                </Link>
                <Link to="/about">
                  <Button variant="secondary">About Me</Button>
                </Link>
                <Link to="/blog">
                  <Button variant="ghost">Read Blog</Button>
                </Link>
              </div>
            </AnimatedSection>
          </CardContent>
        </Card>
      </AnimatedSection>
    </section>
  );
}
