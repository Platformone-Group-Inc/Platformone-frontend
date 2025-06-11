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
import { itemVariants } from "@/constants/variants";

// TODO implement this
export interface ChartCardProps {
  label: string;
  icon: IconType;
  tooltip: string;
  bars: { label: string; progress: number }[];
  progress: number;
  // numbers: string;
}

const ChartCard: React.FC<ChartCardProps> = (props) => {
  return (
    <motion.div
      layout
      // layoutId={i.toString()}
      variants={itemVariants}
      className="w-full border rounded-xl p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <props.icon size={20} />
          </div>
          <p className="font-semibold text-sm">{props.label}</p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon size={20} className="text-black/30" />
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
                {/* <p className="text-[13px] font-medium">Tooltip</p> */}
                <p className="text-xs text-muted-foreground">{props.tooltip}</p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex gap-6 w-full">
        <div className="flex flex-col items-center gap-2">
          <RadialChart value={props.progress} size={90} arcWidth={9} />
          <p className="text-sm font-medium">
            <b className="text-base font-semibold">137</b> /420
          </p>
        </div>
        <div className="flex flex-col gap-3 flex-grow">
          {props.bars.map((bar, i) => (
            <div key={i}>
              <p className="text-[10px] font-medium">{bar.label}</p>
              <Progress className="h-1.5" value={bar.progress} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChartCard;
