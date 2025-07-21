import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center group rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border border-transparent bg-primary-100 text-primary-600",
        secondary:
          "border-transparent bg-background text-secondary-400 hover:bg-background/20 hover:border-border",
        error:
          "border border-transparent bg-error-100 text-error-600 hover:bg-error hover:text-white",
        success:
          "border border-transparent bg-success-100 text-success-600 hover:bg-success hover:text-white",
        warn: "border border-transparent bg-warn-100 text-warn-600 hover:bg-warn hover:text-white",
        info: "border border-transparent bg-info-100 text-info-600 hover:bg-info hover:text-white",
      },
      size: {
        default: "px-2.5 py-0.5 text-sm font-medium",
        sm: "px-2 py-0.5 text-xs font-medium",
        lg: "px-3 py-1 text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean;
}

/**
 * Badge component that supports variant and size customizations.
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, withDot, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "truncate cursor-pointer",
          badgeVariants({ variant, size }),
          withDot && "gap-1.5",
          className
        )}
        {...props}
      >
        {withDot && (
          // TODO better logic i guess?
          <span
            className={cn(
              "h-1.5 w-1.5 aspect-square rounded-full",
              (variant === "default" || variant === undefined) &&
                "bg-primary group-hover:bg-white",
              variant === "secondary" && "bg-secondary",
              variant === "success" && "bg-success group-hover:bg-white",
              variant === "info" && "bg-info group-hover:bg-white",
              variant === "error" && "bg-error group-hover:bg-white",
              variant === "warn" && "bg-warn group-hover:bg-white"
            )}
          />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
