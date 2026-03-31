import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ShowcaseProject } from "@/lib/cms/types";

interface ProjectCardProps extends ShowcaseProject {
  className?: string;
}

export function ProjectCard({
  title,
  slogan,
  description,
  thumbnailUrl,
  url,
  tags,
  featured,
  className,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden",
        featured && "border-l-4 border-l-amber-400 dark:border-l-amber-500",
        className,
      )}
    >
      {thumbnailUrl && (
        <div className="aspect-[3/2] w-full overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <CardContent className="p-5 md:p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              {title}
            </h3>
            {slogan && (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {slogan}
              </p>
            )}
          </div>
          {featured && (
            <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400 dark:fill-amber-500 dark:text-amber-500" />
          )}
        </div>

        {description && (
          <p className="line-clamp-3 text-sm text-stone-600 dark:text-stone-400">
            {description}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Project
          </a>
        )}
      </CardContent>
    </Card>
  );
}
