import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { SectionHeading } from "../resume/SectionHeading";
import { ProjectCard } from "../ProjectCard";
import { useCmsProjects } from "../../lib/cms/useCmsProjects";
import { Card, CardContent } from "../ui/card";

export function HomeProjectsSection() {
  const { projects, isLoading, error } = useCmsProjects();

  return (
    <div>
      <AnimatedSection>
        <SectionHeading icon={Briefcase} title="Selected Projects" />
      </AnimatedSection>

      {error ? (
        <p className="text-amber-600 dark:text-amber-500">
          Could not load projects from CMS. Please try again later.
        </p>
      ) : null}

      {isLoading ? (
        <p className="text-stone-500 dark:text-stone-500">Loading projects...</p>
      ) : null}

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <AnimatedSection key={project.slug} delay={0.1 * index}>
              <ProjectCard {...project} />
            </AnimatedSection>
          ))}
        </div>
      ) : null}

      {projects.length > 0 && (
        <AnimatedSection delay={0.3}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors mt-4"
          >
            Explore all projects &rarr;
          </Link>
        </AnimatedSection>
      )}

      {projects.length === 0 && !isLoading ? (
        <AnimatedSection>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-stone-500 dark:text-stone-400">
                Projects coming soon. Stay tuned!
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>
      ) : null}
    </div>
  );
}
