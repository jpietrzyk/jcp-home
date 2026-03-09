import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-primary text-white hover:bg-accent-secondary",
        secondary:
          "border border-accent-primary/50 bg-transparent text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary",
        ghost:
          "text-zinc-400 hover:text-accent-primary hover:bg-accent-primary/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ComponentPropsWithoutRef<typeof motion.button>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
