import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface RingsProps extends HTMLAttributes<SVGSVGElement> {
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
  circleCount?: number;
  circleGap?: number;
  opacity?: number;
  blur?: boolean;
}

const Rings = ({
  size = 480,
  strokeColor = "#EAECF0",
  strokeWidth = 1,
  circleCount = 8,
  circleGap = 32,

  className,
  ...props
}: RingsProps) => {
  const circles = Array.from({ length: circleCount }, (_, i) => (
    <circle
      key={i}
      cx={size / 2}
      cy={size / 2}
      r={circleGap * (i + 1) - circleGap / 2}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
  ));

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      {...props}
    >
      <mask
        id="mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={size}
        height={size}
      >
        <rect width={size} height={size} fill="url(#gradient)" />
      </mask>
      <g mask="url(#mask)">{circles}</g>
      <defs>
        <radialGradient
          id="gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${size / 2} ${
            size / 2
          }) rotate(90) scale(${size / 2})`}
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Rings;
