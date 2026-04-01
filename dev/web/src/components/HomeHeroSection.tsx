import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { PageHero } from "./PageHero";
import { CmsPageContent } from "./CmsPageContent";
import { AnimatedSection } from "./AnimatedSection";
import { profile } from "../content/profile";
import { useCmsPage } from "../lib/cms/useCmsPage";

export function HomeHeroSection() {
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
      {page.eyebrow ? (
        <AnimatedSection>
          <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {page.eyebrow}
          </p>
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={0.1}>
        <PageHero title={page.title} subtitle={page.subtitle}>
          <CmsPageContent
            error={error}
            isLoading={isLoading}
            body={page.body}
            bodyPlainText={page.bodyPlainText}
            richTextClassName="prose max-w-2xl text-stone-600 dark:text-stone-400 dark:prose-invert"
            hideFirstHeadingMatching={page.title}
            errorClassName="max-w-2xl text-amber-600 dark:text-amber-500"
            loadingClassName="max-w-2xl text-stone-500 dark:text-stone-500"
          />

          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600 dark:text-stone-400">
              <span className="hover:text-stone-900 transition-colors duration-300 dark:hover:text-stone-200">
                {profile.location}
              </span>
              <a
                className="hover:text-stone-900 hover:underline transition-all duration-300 dark:hover:text-stone-200"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
              <a
                className="hover:text-stone-900 hover:underline transition-all duration-300 dark:hover:text-stone-200"
                href={profile.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="hover:text-stone-900 hover:underline transition-all duration-300 dark:hover:text-stone-200"
                href={profile.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/about">
                <Button>
                  About Me
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="secondary">
                  Read Blog
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </PageHero>
      </AnimatedSection>
    </section>
  );
}
