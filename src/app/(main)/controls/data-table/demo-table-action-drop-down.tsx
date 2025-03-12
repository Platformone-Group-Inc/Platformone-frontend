"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { More } from "iconsax-react";

const DemoTableActionDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="transparent">
          <More size={20} className="stroke-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuGroup className="p-1.5 space-y-1 rounded-lg">
          <DropdownMenuItem asChild>
            <Button
              variant={"transparent"}
              className=" text-base h-auto px-2 py-2.5 rounded-md w-full font-medium transition-all"
            >
              Upload Document
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant={"transparent"}
              className=" text-base h-auto text-error hover:bg-error-100 hover:text-error border-none px-2 py-2.5 rounded-md w-full font-medium transition-all"
            >
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DemoTableActionDropDown;
