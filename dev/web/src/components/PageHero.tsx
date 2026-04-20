import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string | null;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ title, subtitle, children, className }: PageHeroProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-8 md:p-10">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-lg md:text-xl text-amber-700 dark:text-amber-400 font-medium">
                {subtitle}
              </p>
            )}
          </div>
          <div className="text-lg md:text-xl leading-relaxed space-y-8">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
