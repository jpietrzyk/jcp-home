import { Heart, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResumeVolunteerProps {
  organization: string;
  role: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  className?: string;
}

export function ResumeVolunteer({
  organization,
  role,
  startDate,
  endDate,
  description,
  className,
}: ResumeVolunteerProps) {
  const hasDate = !!(startDate || endDate);
  const dateRange = hasDate
    ? [startDate, endDate || "Present"].filter(Boolean).join(" — ")
    : null;

  return (
    <Card
      className={cn(
        "overflow-hidden border-l-4 border-l-rose-300 dark:border-l-rose-700",
        className,
      )}
    >
      <CardContent className="p-5 md:p-6 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            {role}
          </h3>
          {dateRange && (
            <span className="inline-flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
              {dateRange}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400">
          <Heart className="w-3.5 h-3.5 text-rose-400 dark:text-rose-500" />
          {organization}
        </span>

        {description && (
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
