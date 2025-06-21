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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import NewActionModal from "./modals/new-action-modal";

function AssessmentRow({ i }: { i: number }) {
  const [v, setV] = useState<"yes" | "no" | "na">("yes");

  return (
    <div
      key={i}
      className="flex flex-col gap-4 border-b pb-4 px-2 sm:flex-row sm:items-start sm:gap-6"
    >
      <div className="flex gap-3 sm:flex-1">
        <Checkbox />
        <p className="text-sm font-medium hover:underline text-info-600 line-clamp-3">
          Q-AST-04.1: Does the organization determine cybersecurity and privacy
          control applicability by identifying, assigning and documenting the
          appropriate asset scope categorization for all systems, applications,
          services and personnel (internal and third-parties)?
        </p>
      </div>

      <RadioGroup
        value={v}
        onValueChange={(v) => setV(v as "yes" | "no" | "na")}
        className="flex flex-wrap items-center gap-4 sm:flex-none"
      >
        <label className="flex items-center gap-2">
          <RadioGroupItem value="yes" id={`yes-${i}`} />
          <Label htmlFor={`yes-${i}`}>Yes</Label>
        </label>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="no" id={`no-${i}`} />
          <Label htmlFor={`no-${i}`}>No</Label>
        </label>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="na" id={`na-${i}`} />
          <Label htmlFor={`na-${i}`}>N/A</Label>
        </label>
      </RadioGroup>

      <p className="text-xs sm:ml-auto">CA.L2‑3.12.3</p>

      <AssessmentTableActions />

      <Button variant="transparent" size="icon">
        <MessageText className="size-5 stroke-secondary" />
      </Button>
    </div>
  );
}

const AssessmentTableActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"transparent"} size={"icon"}>
          <EllipsisVerticalIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuItem asChild>
          <NewActionModal />
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Upload Evidence</DropdownMenuItem>
        <DropdownMenuItem>Change Mappings</DropdownMenuItem>
        <DropdownMenuItem>Past Answers</DropdownMenuItem>
        <DropdownMenuItem>Delete Question</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AssessmentTable = () => {
  return (
    // ma
    <ScrollArea className="h-[calc(100vh-350px)] border-b mt-8">
      <div className="w-full space-y-10">
        {/* <div className="flex flex-col text-xs gap-4 border-b border-t-0 p-4 rounded-t-md bg-primary-100 sm:flex-row sm:items-start sm:gap-6">
          <p className="sm:flex-1">Question</p>
          <p>Answers</p>
          <p>Applied To</p>
          <p>Action Items</p>
          <p>Comments</p>
          <p>Action</p>
        </div> */}
        {Array.from({ length: 10 }).map((_, i) => (
          <AssessmentRow i={i} key={i} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default AssessmentTable;
