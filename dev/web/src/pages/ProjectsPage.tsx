import { AnimatedSection } from "../components/AnimatedSection";
import { ProjectCard } from "../components/ProjectCard";
import { useCmsPage } from "../lib/cms/useCmsPage";
import { useCmsProjects } from "../lib/cms/useCmsProjects";

export function ProjectsPage() {
  const { page } = useCmsPage("projects", {
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
    <section className="space-y-6">
      {page.eyebrow ? (
        <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
          {page.eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-bold">{page.title}</h1>
      {page.subtitle ? (
        <p className="text-stone-600 dark:text-stone-300">{page.subtitle}</p>
      ) : null}
      {error ? (
        <p className="text-amber-600">
          Could not load projects from CMS. Please try again later.
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
    </section>
  );
}
