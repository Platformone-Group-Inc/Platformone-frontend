import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { InfoIcon } from "lucide-react";
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
    <div className="w-full border rounded-xl py-4 px-6">
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
          <TooltipContent className="bg-white/10 backdrop-blur text-black border rounded-md">
            <p>Chart information</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <RadialChart />
        <div className="flex flex-col gap-3 w-full">
          {[30, 40, 20, 72, 10].map((i) => (
            <div key={i}>
              <p className="text-[10px] font-medium">Completed ( 24 of 32)</p>
              <Progress className="h-1.5" value={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
