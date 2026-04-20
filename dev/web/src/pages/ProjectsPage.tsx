import { FolderOpen } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { PageTransition } from "../components/PageTransition";
import { PageHero } from "../components/PageHero";
import { CmsPageContent } from "../components/CmsPageContent";
import { SectionHeading } from "../components/resume/SectionHeading";
import { ProjectCard } from "../components/ProjectCard";
import { useCmsProjects } from "../lib/cms/useCmsProjects";
import { useCmsPage } from "../lib/cms/useCmsPage";

export function ProjectsPage() {
  const { page, isLoading: isPageLoading, error: pageError } = useCmsPage("projects", {
    fallback: {
      title: "Projects",
      slug: "projects",
      subtitle: "A selection of projects I've worked on.",
      eyebrow: null,
      bodyPlainText: "",
    },
  });
  const { projects, isLoading, error } = useCmsProjects();

  return (
    <PageTransition>
      <section className="space-y-10">
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
              error={pageError}
              isLoading={isPageLoading}
              body={page.body}
              bodyPlainText={page.bodyPlainText}
              richTextClassName="prose prose-stone dark:prose-invert"
              hideFirstHeadingMatching={page.title}
              errorClassName="text-amber-600 dark:text-amber-500"
              loadingClassName="text-stone-500 dark:text-stone-500"
            />
          </PageHero>
        </AnimatedSection>

        <div>
          <AnimatedSection>
            <SectionHeading icon={FolderOpen} title="Showcase" />
          </AnimatedSection>

          {error ? (
            <p className="text-amber-600 dark:text-amber-500">
              Could not load projects from CMS. Showing fallback content.
            </p>
          ) : null}

          {isLoading ? (
            <p className="text-stone-500 dark:text-stone-500">Loading projects...</p>
          ) : null}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <AnimatedSection key={project.slug} delay={0.1 * index}>
                <ProjectCard {...project} />
              </AnimatedSection>
            ))}
          </div>

          {projects.length === 0 && !isLoading ? (
            <p className="text-stone-500 dark:text-stone-500">No projects yet.</p>
          ) : null}
        </div>
      </section>
    </PageTransition>
  );
}
