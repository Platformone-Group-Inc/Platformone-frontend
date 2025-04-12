"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const RadialChart = () => {
  const chartData = [
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-blue)",
    },
  } satisfies ChartConfig;
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <ChartContainer config={chartConfig} className="h-[108px] aspect-square">
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={250}
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

          <RadialBar dataKey="visitors" background cornerRadius={10} />

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
                        {chartData[0].visitors.toLocaleString()}
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
