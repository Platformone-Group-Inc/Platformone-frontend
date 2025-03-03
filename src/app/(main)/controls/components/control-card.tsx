"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { More } from "iconsax-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ControlCard = () => {
  return (
    <div className="border border-primary/20 rounded-xl w-full p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold truncate ">
          Fedramp (Rev5) Moderate Baseline
        </h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <More className="stroke-primary size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className="h-auto py-2.5 px-2 text-sm bg-primary/20 text-primary font-medium rounded-lg ">
              Assist
            </DropdownMenuItem>
            <DropdownMenuItem className="h-auto py-2.5 px-2 text-sm rounded-lg font-medium">
              Delete Control Set
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        {/* <Avatar>
           <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> 
          <AvatarFallback className="bg-black">CN</AvatarFallback>
        </Avatar> */}
        <div className="size-10 font-medium p-2 bg-primary/20 flex items-center justify-center rounded-full">
          <p>LN</p>
        </div>
        <p>Lana Steiner</p>
      </div>
      <div className="mt-6 flex flex-col w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="py-2 border-b last:border-b-0 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="size-2 aspect-square rounded-full bg-primary" />
              <p>In Progress</p>
            </div>
            <p>0</p>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <Button
          variant={"outline"}
          className="h-auto text-xs font-semibold w-full border-primary rounded-full py-1.5"
        >
          18 Controls Families
        </Button>
      </div>
    </div>
  );
};

export default ControlCard;
