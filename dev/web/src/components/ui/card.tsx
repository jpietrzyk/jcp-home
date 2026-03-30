import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    className={cn(
      "rounded-lg border-t border-b border-stone-200/50 bg-light-50 text-stone-900 transition-colors duration-300 dark:border-stone-700/30 dark:bg-dark-950 dark:text-stone-200",
      className,
    )}
    ref={ref}
    {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
  />
));

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    ref={ref}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className,
    )}
    ref={ref}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("p-6 pt-0", className)} ref={ref} {...props} />
));

CardContent.displayName = "CardContent";
