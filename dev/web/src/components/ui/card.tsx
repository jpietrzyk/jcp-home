import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    whileHover={{
      scale: 1.005,
      y: -1,
    }}
    transition={{
      type: "spring",
      stiffness: 150,
      damping: 35,
    }}
    className={cn(
      "rounded-lg border border-stone-200 bg-light-100 text-stone-900 shadow-sm hover:border-stone-300 transition-colors duration-300 dark:border-stone-700/50 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:border-stone-600",
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
