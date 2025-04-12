"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface Props {
  number?: number;
}

const RadialChart: React.FC<Props> = ({ number = 0 }) => {
  const fill = "var(--color-safari)";
  const color =
    number < 10
      ? "var(--chart-red)"
      : number < 50
      ? "var(--chart-yellow)"
      : number < 80
      ? "var(--chart-blue)"
      : "var(--chart-green)";

  const chartData = [{ browser: "safari", visitors: number, fill }];

  // change labels
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color,
    },
  } satisfies ChartConfig;
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <ChartContainer config={chartConfig} className="h-[108px] aspect-square">
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={(number / 100) * 360} // Calculate angle based on percentage
          innerRadius={48}
          outerRadius={72}
        >
          <PolarGrid
            gridType="circle"
            radialLines={true}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[50]}
          />

          <RadialBar
            dataKey="visitors"
            // background
            // className="bg-error-500"
            cornerRadius={10}
          />

          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-xl font-medium"
                      >
                        {chartData[0].visitors.toLocaleString()} %
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>

      <p>
        <span className="text-base font-semibold">1</span>
        <span className="text-sm font-medium">/5</span>
      </p>
    </div>
  );
};

export default RadialChart;
