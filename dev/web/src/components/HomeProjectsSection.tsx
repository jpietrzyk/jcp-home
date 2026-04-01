import { Link } from "react-router-dom";
import { FolderOpen, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./resume/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { useCmsProjects } from "../lib/cms/useCmsProjects";

export function HomeProjectsSection() {
  const { projects, isLoading, error } = useCmsProjects();

  return (
    <section className="space-y-6">
      <AnimatedSection>
        <SectionHeading icon={FolderOpen} title="Selected Projects" />
      </AnimatedSection>

      {error ? (
        <p className="text-amber-600 dark:text-amber-500">
          Could not load projects from CMS.
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
      ) : !isLoading ? (
        <AnimatedSection>
          <div className="rounded-lg border border-dashed border-stone-300 dark:border-stone-700 p-8 text-center">
            <FolderOpen className="mx-auto h-8 w-8 text-stone-400 dark:text-stone-500 mb-3" />
            <p className="text-stone-600 dark:text-stone-400 font-medium">
              Projects coming soon
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
              Selected projects will be showcased here.
            </p>
          </div>
        </AnimatedSection>
      ) : null}

      {projects.length > 0 ? (
        <AnimatedSection delay={0.2}>
          <Link to="/projects">
            <Button variant="ghost" className="group">
              View all projects
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedSection>
      ) : null}
    </section>
  );
}
