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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import DataTableHeader from "@/components/data-table/data-table-header";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

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
  answers: Record<string, "yes" | "no" | "n/a">;
  onAnswerChange: (id: string, value: "yes" | "no" | "n/a") => void;
  assignments: any[]; // Add assignments as prop
}

const AssessmentTable = ({
  answers,
  onAnswerChange,
  assignments,
}: AssessmentTableProps) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [size, setSize] = useQueryState("size", parseAsInteger.withDefault(20));

  return (
    <div className="@container w-full overflow-hidden flex flex-col h-full">
      <div className="p-4 flex-1 space-y-4 flex flex-col">
        <ScrollArea className="border rounded-md w-full overflow-auto h-[calc(100vh-350px)]">
          <div className="sticky top-0 left-9 p-4 bg-error z-10">hello</div>
          <div className="h-[300vh]"></div>lorem
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default AssessmentTable;
