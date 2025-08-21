"use client";

import { parseAsInteger, useQueryState } from "nuqs";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import NewActionModal from "./modals/new-action-modal";
import { Row } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";

interface AssessmentRowProps {
  i: any;
  value: "yes" | "no" | "n/a" | "";
  onAnswerChange: (id: string, value: "yes" | "no" | "n/a") => void;
  isSelected: boolean;
  onSelectRow: (id: string) => void;
}

function AssessmentRow({
  i,
  value,
  onAnswerChange,
  isSelected,
  onSelectRow,
}: AssessmentRowProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-start sm:gap-6">
      <div className="flex gap-3 sm:flex-1">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelectRow(i._id)}
        />
        <p className="text-sm font-medium hover:underline text-info-600 line-clamp-2 flex-1">
          {i?.question}
        </p>
      </div>

      <div className="sm:w-48 flex justify-center">
        <RadioGroup
          value={value}
          onValueChange={(newValue) =>
            onAnswerChange(i._id, newValue as "yes" | "no" | "n/a")
          }
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
      </div>

      <div className="sm:w-24 text-center">
        <p className="text-xs">
          {i?.controlId?.map((control: any) => control?.identifier).join(", ")}
        </p>
      </div>

      <div className="sm:w-20 flex justify-center">
        <AssessmentTableActions />
      </div>

      <div className="sm:w-16 flex justify-center">
        <Button variant="transparent" size="icon">
          <MessageText className="size-5 stroke-secondary" />
        </Button>
      </div>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const RowAction = ({ row }: { row: Row<any> }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="transparent" size="icon" aria-label="Row actions">
        <EllipsisVerticalIcon size={16} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        onClick={() => {
          console.log(row.original);
        }}
      >
        View Details
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

interface AssessmentTableProps {
  frameworkId: any;
  isLoading?: boolean;
  answers: Record<string, "yes" | "no" | "n/a" | undefined>;
  onAnswerChange: (id: string, value: "yes" | "no" | "n/a") => void;
  assignments: any[];
  selectedRows: Set<string>;
  onSelectRow: (id: string) => void;
  selectAll: boolean;
  onSelectAll: () => void;
}

const AssessmentTable = ({
  answers,
  isLoading,
  onAnswerChange,
  assignments,
  selectedRows,
  onSelectRow,
  onSelectAll,
  selectAll,
}: AssessmentTableProps) => {
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < assignments.length;

  return (
    <div className="@container w-full overflow-hidden flex flex-col h-full">
      <div className="p-4 flex-1 space-y-4 flex flex-col">
        <ScrollArea className="border rounded-md w-full overflow-auto h-[calc(100vh-370px)]">
          {/* Header Row */}
          <div className="sticky top-0 left-0 z-10 flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:gap-6 bg-background">
            <div className="flex gap-3 sm:flex-1">
              <Checkbox
                checked={selectAll}
                onCheckedChange={onSelectAll}
                // ref={(ref) => {
                //   if (ref) {
                //     ref?.indeterminate = isIndeterminate;
                //   }
                // }}
              />
              <p className="text-sm font-medium flex-1">Question</p>
            </div>

            <div className="sm:w-48 text-center">
              <p className="text-sm font-medium">Answer</p>
            </div>

            <div className="sm:w-24 text-center">
              <p className="text-sm font-medium">Control ID</p>
            </div>

            <div className="sm:w-20 text-center">
              <p className="text-sm font-medium">Actions</p>
            </div>

            <div className="sm:w-16 text-center">
              <p className="text-sm font-medium">Comment</p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-3 space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          )}

          {/* Data Rows */}
          {!isLoading &&
            assignments?.map((assignment: any) => (
              <AssessmentRow
                key={assignment?._id}
                i={assignment}
                value={answers[assignment._id] || ""}
                onAnswerChange={onAnswerChange}
                isSelected={selectedRows.has(assignment._id)}
                onSelectRow={onSelectRow}
              />
            ))}

          {/* Empty State */}
          {!isLoading && assignments?.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No assignments found</p>
            </div>
          )}

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default AssessmentTable;
