/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircle } from "iconsax-react";

// TODO: add framework props
const FrameworkCard = () => {
  return (
    <div className="w-full border rounded-xl p-5">
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-1.5">
          {/* TODO */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJSRyd-WENuShraJJsJ22fdVvoKTztuuZ4A&s"
            alt=""
            className="size-10 rounded-lg"
          />

          <p className="font-semibold text-sm">
            Fedramp (Rev5) Moderate Baseline
          </p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <InfoCircle size={20} className="stroke-gray-400" />
          </TooltipTrigger>
          <TooltipContent className="bg-white/10 backdrop-blur text-black border rounded-lg">
            <p>Chart information</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-xs text-gray-700 py-6 w-full">
        330 requirements in 13 families to be implemented
      </p>
      <hr className="mb-4" />
      <Button
        variant={"outline"}
        radius={"full"}
        className="rounded-full w-full text-xs"
      >
        Import Content
      </Button>
    </div>
  );
};

export default FrameworkCard;
