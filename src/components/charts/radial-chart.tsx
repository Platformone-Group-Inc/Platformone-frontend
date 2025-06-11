import { useEffect, useState } from "react";

interface Props {
  value?: number; // Value between 0 and 100
  size?: number; // Diameter of the chart in pixels
  arcWidth?: number; // Width of the progress arc
}

const RadialChart: React.FC<Props> = ({
  value = 0,
  size = 100,
  arcWidth = 10,
}) => {
  const strokeWidth = arcWidth; // Use arcWidth as the stroke width
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Animate the progress
    const timeout = setTimeout(() => {
      setAnimatedProgress((value / 100) * circumference);
    }, 100); // Delay to ensure smooth animation
    return () => clearTimeout(timeout);
  }, [value, circumference]);

  // Determine the color based on the value
  const getColor = () => {
    if (value >= 75) return "#13A300"; // Green
    if (value >= 50) return "#54a6ff"; // Blue
    if (value >= 25) return "#ffc73a"; // Yellow
    return "#ff4423"; // Orange
  };

  const progressColor = getColor();

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // Tailwind gray-200
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - animatedProgress}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out", // Smooth animation
          }}
        />
      </svg>
      {/* Center Value */}
      <span className="absolute text-lg font-semibold text-gray-800">
        {Math.round(value)}%
      </span>
    </div>
  );
};

export default RadialChart;
