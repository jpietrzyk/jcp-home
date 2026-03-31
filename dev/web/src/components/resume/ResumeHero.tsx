import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResumeHeroProps {
  bio?: string;
  skills?: string[];
  className?: string;
}

export function ResumeHero({ bio, skills, className }: ResumeHeroProps) {
  if (!bio && (!skills || skills.length === 0)) return null;

  return (
    <Card
      className={cn(
        "overflow-hidden border-l-4 border-l-amber-500/50 dark:border-l-amber-600/50",
        className,
      )}
    >
      <CardContent className="p-6 md:p-8 space-y-6">
        {bio && (
          <p className="text-lg md:text-xl leading-relaxed text-stone-700 dark:text-stone-300">
            {bio}
          </p>
        )}

        {skills && skills.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Skills & Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300 transition-colors hover:bg-amber-50 dark:hover:bg-amber-900/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
