import { AnimatedSection } from "../AnimatedSection";
import { PageHero } from "../PageHero";
import { CmsPageContent } from "../CmsPageContent";
import { useCmsPage } from "../../lib/cms/useCmsPage";

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
    <>
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
            richTextClassName="prose prose-stone dark:prose-invert"
            hideFirstHeadingMatching={page.title}
            errorClassName="text-amber-600 dark:text-amber-500"
            loadingClassName="text-stone-500 dark:text-stone-500"
          />
        </PageHero>
      </AnimatedSection>
    </>
  );
}
