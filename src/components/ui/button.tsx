import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary/90",
        outline:
          "border border-border text-secondary-400 hover:text-black bg-transparent shadow-sm font-semibold hover:bg-primary-100 shadow-none",
        link: "text-primary underline-offset-4 hover:underline",
        secondary: "bg-primary-100 hover:bg-primary-200 text-primary-600 ",
        primary: "bg-primary text-white shadow hover:bg-primary/90",
        success: "bg-success text-white shadow hover:bg-success/90",
        info: "bg-info text-white shadow hover:bg-info/90",
        error: "bg-error text-white shadow hover:bg-error/90",
        warn: "bg-warn text-white shadow hover:bg-warn/90",
        transparent:
          "bg-transparent text-current shadow-none hover:bg-primary-100 hover:text-primary outline-none  focus-visible:ring-none",
      },
      radius: {
        none: "rounded-none",
        default: "rounded-lg",
        full: "rounded-full",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        default: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-7 text-base",
        "2xl": "h-14 px-8 text-lg",
        icon: "h-10 w-10 aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, radius, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
