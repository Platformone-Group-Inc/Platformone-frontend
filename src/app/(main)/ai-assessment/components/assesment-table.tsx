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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import NewActionModal from "./modals/new-action-modal";

interface AssessmentRowProps {
  i: any;
  value: "yes" | "no" | "n/a";
  onAnswerChange: (id: string, value: "yes" | "no" | "n/a") => void;
}

function AssessmentRow({ i, value, onAnswerChange }: AssessmentRowProps) {
  return (
    <div className="flex flex-col gap-4 border-b pb-4 px-2 sm:flex-row sm:items-start sm:gap-6">
      <div className="flex gap-3 sm:flex-1">
        <Checkbox />
        <p className="text-sm font-medium hover:underline text-info-600 line-clamp-3">
         {i?.question}
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(newValue) => onAnswerChange(i._id, newValue as "yes" | "no" | "n/a")}
        className="flex flex-wrap items-center gap-4 sm:flex-none"
      >
        <label className="flex items-center gap-2">
          <RadioGroupItem value="yes" id={`yes-${i._id}`} />
          <Label htmlFor={`yes-${i._id}`}>Yes</Label>
        </label>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="no" id={`no-${i._id}`} />
          <Label htmlFor={`no-${i._id}`}>No</Label>
        </label>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="n/a" id={`na-${i._id}`} />
          <Label htmlFor={`na-${i._id}`}>N/A</Label>
        </label>
      </RadioGroup>

      <p className="text-xs sm:ml-auto">
        {i?.controlId?.map((control: any) => control?.identifier).join(", ")}
      </p>

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

interface AssessmentTableProps {
  frameworkId: any;
  answers: Record<string, "yes" | "no" | "n/a">;
  onAnswerChange: (id: string, value: "yes" | "no" | "n/a") => void;
  assignments: any[]; // Add assignments as prop
}

const AssessmentTable = ({ frameworkId, answers, onAnswerChange, assignments }: AssessmentTableProps) => {
  return (
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
        {assignments?.map((assignment: any) => (
          <AssessmentRow 
            key={assignment?._id}
            i={assignment} 
            value={answers[assignment._id] || "n/a"}
            onAnswerChange={onAnswerChange}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default AssessmentTable;