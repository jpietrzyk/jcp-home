import { Calendar, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResumeEducationProps {
  school: string;
  degree?: string;
  field?: string;
  graduationYear?: string;
  grade?: string;
  className?: string;
}

export function ResumeEducation({
  school,
  degree,
  field,
  graduationYear,
  grade,
  className,
}: ResumeEducationProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-5 md:p-6 space-y-2">
        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
          {school}
        </h3>

        {(degree || field) && (
          <p className="text-stone-700 dark:text-stone-300">
            {[degree, field && `in ${field}`].filter(Boolean).join(" ")}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
          {graduationYear && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Graduated: {graduationYear}
            </span>
          )}
          {grade && (
            <span className="inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Grade: {grade}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
