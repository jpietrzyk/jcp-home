import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  className?: string;
}

export function SectionHeading({
  icon: Icon,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-6", className)}>
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30">
        <Icon className="w-5 h-5 text-amber-700 dark:text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        {title}
      </h2>
    </div>
  );
}
