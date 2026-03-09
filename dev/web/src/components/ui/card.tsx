import * as React from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & MotionProps
>(({ className, ...props }, ref) => (
  <motion.div
    whileHover={{
      scale: 1.02,
      y: -4,
      boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.2)",
    }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
    }}
    className={cn(
      "rounded-lg border border-zinc-800 bg-dark-900 text-zinc-100 shadow-sm hover:border-accent-primary/50 transition-colors duration-300",
      className,
    )}
    ref={ref}
    {...props}
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
