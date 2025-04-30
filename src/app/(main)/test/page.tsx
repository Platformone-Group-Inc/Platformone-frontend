"use client";

import RadialChart from "@/components/charts/radial-chart";
import { useState, useEffect } from "react";

const TestPage = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * 101));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <RadialChart value={value} />
      <RadialChart value={85} size={120} />
      <RadialChart value={45} size={120} />
      <RadialChart value={15} size={120} />
    </div>
  );
};

export default TestPage;
