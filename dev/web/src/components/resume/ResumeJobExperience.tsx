import { MapPin, Building2, CheckCircle2, CalendarCheck, CalendarClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResumeJobExperienceProps {
  position: string;
  company: string;
  location?: string;
  employmentType?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent?: boolean;
  achievements?: string[];
  className?: string;
}

export function ResumeJobExperience({
  position,
  company,
  location,
  employmentType,
  startDate,
  endDate,
  isCurrent,
  achievements,
  className,
}: ResumeJobExperienceProps) {
  const endLabel = isCurrent ? "Present" : endDate || null;

  return (
    <div>
      <p className="text-base font-medium text-stone-600 dark:text-stone-300 mb-2 flex items-center gap-1.5">
        <CalendarCheck className="w-4 h-4 text-amber-600 dark:text-amber-500" />
        {startDate}
      </p>

      <Card
        className={cn(
          "overflow-hidden border-l-4 border-l-stone-300 dark:border-l-stone-600 hover:border-l-amber-500 dark:hover:border-l-amber-600 transition-colors",
          className,
        )}
      >
        <CardContent className="p-5 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1">
            <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 shrink-0">
              {position}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-600 dark:text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                {company}
              </span>
              {location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                  {location}
                </span>
              )}
              {employmentType && (
                <span className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                  {employmentType}
                </span>
              )}
            </div>
          </div>

          {achievements && achievements.length > 0 && (
            <ul className="space-y-4 pt-2">
              {achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-base text-stone-600 dark:text-stone-400"
                >
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {endLabel && (
        <p className="text-base font-medium text-stone-600 dark:text-stone-300 mt-2 flex items-center gap-1.5">
          <CalendarClock className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          {endLabel}
        </p>
      )}
    </div>
  );
}
