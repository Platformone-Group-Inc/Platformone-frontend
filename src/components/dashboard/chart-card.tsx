"use client";

import { motion } from "motion/react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Globe, InfoIcon } from "lucide-react";
import RadialChart from "../charts/radial-chart";
import { Progress } from "../ui/progress";
import { FaShoppingBag } from "react-icons/fa";
import { IconType } from "react-icons/lib";

// TODO implement this
export interface ChartCardProps {
  label: string;
  cardIcon: IconType;
  color: "chart-blue" | "chart-yellow" | "chart-orange" | "chart-green";
  tooltip: string;
  bars: { label: string; progress: number }[];
  progress: number;
  numbers: string;
}

const ChartCard = () => {
  return (
    <motion.div layout className="w-full border rounded-xl py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <FaShoppingBag size={20} />
          </div>
          <p className="font-semibold text-sm">Evidence</p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon size={20} className="text-gray-400" />
          </TooltipTrigger>

          <TooltipContent className=" py-3">
            <div className="flex gap-3">
              <Globe
                className="mt-0.5 shrink-0 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <div className="space-y-1">
                <p className="text-[13px] font-medium">Tooltip</p>
                <p className="text-xs text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam eligendi cupiditate, libero totam iure fuga
                  perspiciatis nemo placeat, esse porro dolores! Enim nostrum
                  itaque quibusdam! Sequi aspernatur ipsam esse ipsum.
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <RadialChart value={65} size={110} arcWidth={12} />
          <p className="text-sm font-medium">
            <b className="text-base font-semibold">137</b> /420
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          {[30, 40, 20, 72, 10].map((i) => (
            <div key={i}>
              <p className="text-[10px] font-medium">Completed ( 24 of 32)</p>
              <Progress className="h-1.5" value={i} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChartCard;
