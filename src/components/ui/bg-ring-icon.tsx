// needs improvement
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Rings from "@/components/icons/rings";
import { ReactNode } from "react";

const bgRingIconVariants = cva(
  "relative inline-flex items-center justify-center p-3 z-10",
  {
    variants: {
      variant: {
        primary: "bg-primary/20 text-primary stroke-primary",
        success: "bg-success/20 text-success stroke-success",
        error: "bg-error/20 text-error stroke-error",
        info: "bg-info/20 text-info stroke-info",
        warn: "bg-warn/20 text-warn stroke-warn",
      },
      radius: {
        md: "rounded-2xl",
        full: "rounded-full",
      },
      size: {
        sm: "size-10",
        md: "size-14",
        lg: "size-16",
      },
    },
    defaultVariants: {
      variant: "primary",
      radius: "md",
      size: "md",
    },
  }
);

interface BgRingIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bgRingIconVariants> {
  children: ReactNode;
}

export const BgRingIcon = ({
  children,
  variant,
  radius,
  size,
  className,
  ...props
}: BgRingIconProps) => {
  return (
    <div className="relative" {...props}>
      <div
        className={cn(bgRingIconVariants({ variant, radius, size, className }))}
      >
        {children}
      </div>
      <Rings className="absolute inset-0 m-auto scale-125 text-inherit opacity-30" />
    </div>
  );
};
