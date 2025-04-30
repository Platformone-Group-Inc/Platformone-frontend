"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MessageText } from "iconsax-react";
import { EllipsisVerticalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AssessmentTableActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"transparent"} size={"icon"}>
          <EllipsisVerticalIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuItem>Add Action Item</DropdownMenuItem>
        <DropdownMenuItem>Upload Evidence</DropdownMenuItem>
        <DropdownMenuItem>Change Mappings</DropdownMenuItem>
        <DropdownMenuItem>Past Answers</DropdownMenuItem>
        <DropdownMenuItem>Delete Question</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AssessmentTable = () => {
  return (
    <div className="w-full space-y-10 mt-8">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center border-b pb-4 gap-4 ">
          <Checkbox />
          <div className="text-sm font-medium hover:underline text-info-600 px-4 flex-grow">
            Q-AST-04.1: Does the organization determine cybersecurity and
            privacy control applicability by identifying, assigning and
            documenting the appropriate asset scope categorization for all
            systems, applications, services and personnel (internal and
            third-parties)?
          </div>
          <div className="flex items-center flex-shrink-0 gap-4">
            <div className="flex items-center gap-2">
              <Checkbox defaultChecked />
              <Label>Yes</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label>No</Label>
            </div>
            {/* <div className="flex items-center gap-2">
                <Checkbox />
                <Label>Partially</Label>
              </div> */}
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label>N/A</Label>
            </div>
          </div>
          <div className="text-xs flex-shrink-0">
            <p>CA.L2-3.12.3</p>
          </div>
          <AssessmentTableActions />
          <Button variant={"transparent"} size={"icon"}>
            <MessageText className="stroke-secondary size-5" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AssessmentTable;
