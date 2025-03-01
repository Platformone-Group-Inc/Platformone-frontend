import { cn } from "@/lib/utils";

export type Props = React.SVGProps<SVGSVGElement>;

const Rings: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      width={216}
      height={216}
      viewBox="0 0 216 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "top-0 left-0 translate-x-[-20px] stroke-border translate-y-[-20px] -z-10",
        className
      )}
      {...props}
    >
      <mask
        id="mask0_736_64702"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x={-120}
        y={-120}
        width={336}
        height={336}
      >
        <rect
          width={336}
          height={336}
          transform="translate(-120 -120)"
          fill="url(#paint0_radial_736_64702)"
        />
      </mask>
      <g mask="url(#mask0_736_64702)">
        <circle cx={48} cy={48} r="47.5" />
        <circle cx={48} cy={48} r="47.5" />
        <circle cx={48} cy={48} r="71.5" />
        <circle cx={48} cy={48} r="95.5" />
        <circle cx={48} cy={48} r="119.5" />
        <circle cx={48} cy={48} r="143.5" />
        <circle cx={48} cy={48} r="167.5" />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_736_64702"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(168 168) rotate(90) scale(168 168)"
        >
          <stop />
          <stop offset={1} stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Rings;
