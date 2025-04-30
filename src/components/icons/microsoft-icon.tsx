export type Props = React.SVGProps<SVGSVGElement>;

const MicrosoftIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_411_18633)">
        <path d="M12.184 11.9062H0.777832V0.5H12.184V11.9062Z" fill="#F1511B" />
        <path
          d="M24.7779 11.9062H13.3718V0.5H24.7779V11.9062Z"
          fill="#80CC28"
        />
        <path
          d="M12.1837 24.5002H0.777832V13.094H12.1837V24.5002Z"
          fill="#00ADEF"
        />
        <path
          d="M24.7779 24.5002H13.3718V13.094H24.7779V24.5002Z"
          fill="#FBBC09"
        />
      </g>
      <defs>
        <clipPath id="clip0_411_18633">
          <rect
            width={24}
            height={24}
            fill="white"
            transform="translate(0.777832 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MicrosoftIcon;
