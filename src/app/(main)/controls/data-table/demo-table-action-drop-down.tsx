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
      <DropdownMenuContent>
        <DropdownMenuGroup className="p-1.5 space-y-1 rounded-lg">
          <DropdownMenuItem asChild>
            <button className="bg-primary-100 text-primary rounded-lg text-base font-medium px-2.5 py-2 shadow-none">
              Upload Document
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button className="w-full inline-flex items-center justify-center bg-transparent text-error hover:bg-error-100 rounded-full text-base font-medium px-2.5 py-2 shadow-none">
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DemoTableActionDropDown;
