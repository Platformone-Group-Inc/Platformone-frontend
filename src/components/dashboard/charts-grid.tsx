"use client";

import { containerVariants } from "@/constants/variants";
import ChartCard from "./chart-card";
import { motion } from "motion/react";
import { FaShoppingBag } from "react-icons/fa";

import { IoDocumentTextSharp } from "react-icons/io5";
import { HiClipboardDocumentList, HiDocumentText } from "react-icons/hi2";

const ChartsGrid = () => {
  return (
    <div className="p-4 @container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
        className="grid gap-4 grid-cols-1 @[550px]:grid-cols-2 @[800px]:grid-cols-3 @[1200px]:grid-cols-4 "
      >
        <ChartCard
          icon={FaShoppingBag}
          label="Evidence"
          // numbers=""
          progress={65}
          tooltip="Hello"
          bars={[
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
          ]}
        />
        <ChartCard
          icon={IoDocumentTextSharp}
          label="Policies"
          // numbers=""
          progress={25}
          tooltip="Hello"
          bars={[
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
          ]}
        />
        <ChartCard
          icon={HiDocumentText}
          label="Procedures"
          // numbers=""
          progress={1}
          tooltip="Hello"
          bars={[
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
          ]}
        />
        <ChartCard
          icon={HiClipboardDocumentList}
          label="Governance Documents"
          // numbers=""
          progress={86}
          tooltip="Hello"
          bars={[
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
            {
              label: "Completed ( 24 of 32)",
              progress: 50,
            },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default ChartsGrid;
