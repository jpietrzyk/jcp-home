import { ExternalLink, Calendar, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResumeProjectProps {
  name: string;
  description?: string;
  url?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  className?: string;
}

export function ResumeProject({
  name,
  description,
  url,
  technologies,
  startDate,
  endDate,
  className,
}: ResumeProjectProps) {
  const dateRange = [startDate, endDate || "Present"]
    .filter(Boolean)
    .join(" — ");

  return (
    <Card
      className={cn(
        "overflow-hidden border-l-4 border-l-blue-300 dark:border-l-blue-700",
        className,
      )}
    >
      <CardContent className="p-5 md:p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            {name}
          </h3>
          {dateRange && (
            <span className="inline-flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
              {dateRange}
            </span>
          )}
        </div>

        {description && (
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {description}
          </p>
        )}

        {technologies && technologies.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Code className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Project
          </a>
        )}
      </CardContent>
    </Card>
  );
}
