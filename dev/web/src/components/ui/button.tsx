import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 dark:focus-visible:ring-stone-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-amber-500 text-stone-950 hover:bg-amber-400 dark:bg-amber-500/90 dark:hover:bg-amber-400 backdrop-blur-sm",
        secondary:
          "border border-stone-300 bg-light-100 text-stone-900 hover:bg-light-200 hover:border-stone-400 dark:border-stone-600 dark:bg-stone-800/50 dark:text-stone-200 dark:hover:bg-stone-700/50 dark:hover:border-stone-500",
        ghost:
          "text-stone-600 hover:text-stone-900 hover:bg-light-200/50 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-stone-800/30",
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
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      />
    );
  },
);

Button.displayName = "Button";
