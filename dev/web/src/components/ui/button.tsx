import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-amber-400/80 text-stone-900 hover:bg-amber-400/90 dark:bg-amber-500/70 dark:hover:bg-amber-500/80",
        secondary:
          "bg-stone-100 text-stone-800 hover:bg-stone-200 dark:bg-dark-800/50 dark:text-stone-200 dark:hover:bg-dark-700/50",
        ghost:
          "text-stone-600 hover:text-stone-800 hover:bg-stone-100/50 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-dark-800/30",
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
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
      }>;
      // Exclude children from props to avoid nesting
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children: _, ...restProps } = props;
      return React.cloneElement(child, {
        className: cn(
          buttonVariants({ variant, size, className }),
          child.props.className,
        ),
        ...restProps,
      });
    }
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
