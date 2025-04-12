"use client";

import { DonutPieChart } from "@/components/charts/donut-pie-chart";
import RadialChart from "@/components/charts/radial-chart";
import { useEffect, useState } from "react";

const Page = () => {
  const [number, setNumber] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(Math.floor(Math.random() * 101));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-white">
      <h1>helo</h1>
      <RadialChart number={number} />
      <DonutPieChart />
    </div>
  );
};

export default Page;
