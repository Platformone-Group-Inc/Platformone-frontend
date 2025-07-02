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

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 40,
        minSize: 40,
        maxSize: 40,
      },

      {
        id: "question",
        accessorKey: "question",
        header: "Question",
        cell: ({ row }) => (
          <span className="font-medium text-info-600 line-clamp-3 w-[200px]">
            {row.original.question}
          </span>
        ),
        maxSize: 200,
      },
      {
        id: "answer",
        accessorKey: "answer",
        header: "Answer",
        cell: ({ row }) => {
          const value = answers[row.original._id] || "n/a";
          return (
            <RadioGroup
              value={value}
              onValueChange={(newValue) =>
                onAnswerChange(
                  row.original._id,
                  newValue as "yes" | "no" | "n/a"
                )
              }
              className="flex flex-shrink-0 w-[300px] flex-wrap justify-center items-center gap-4"
            >
              <label className="flex items-center gap-2">
                <RadioGroupItem value="yes" id={`yes-${row.original._id}`} />
                <Label htmlFor={`yes-${row.original._id}`}>Yes</Label>
              </label>
              <label className="flex items-center gap-2">
                <RadioGroupItem value="no" id={`no-${row.original._id}`} />
                <Label htmlFor={`no-${row.original._id}`}>No</Label>
              </label>
              <label className="flex items-center gap-2">
                <RadioGroupItem value="n/a" id={`na-${row.original._id}`} />
                <Label htmlFor={`na-${row.original._id}`}>N/A</Label>
              </label>
            </RadioGroup>
          );
        },

        size: 220,
      },
      {
        id: "controls",
        accessorKey: "controlId",
        header: "Controls",
        cell: ({ row }) => (
          <span className="text-xs">
            {(row.original.controlId || [])
              .map((control: any) => control?.identifier)
              .join(", ")}
          </span>
        ),
        minSize: 120,
        size: 160,
      },
      {
        id: "actionsMenu",
        accessorKey: "actionsMenu",
        header: "Menu",
        cell: () => <AssessmentTableActions />,
        enableSorting: false,
        enableHiding: false,
        minSize: 60,
        size: 60,
      },
      {
        id: "comments",
        accessorKey: "comments",
        header: "Comments",
        cell: () => (
          <Button variant="transparent" size="icon">
            <MessageText className="size-5 stroke-secondary" />
          </Button>
        ),
        enableSorting: false,
        enableHiding: false,
        minSize: 60,
        size: 60,
      },

      {
        id: "actions",
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <RowAction row={row} />,
        enableSorting: false,
        enableHiding: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: assignments || [],
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      // updater can be a function or a value
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page, pageSize: size })
          : updater;
      if (next.pageIndex !== undefined) setPage(next.pageIndex);
      if (next.pageSize !== undefined) setSize(next.pageSize);
    },

    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination: { pageIndex: page, pageSize: size },
    },
    enableSortingRemoval: false,
  });

  return (
    <div className="@container w-full overflow-hidden flex flex-col h-full">
      <div className="p-4 flex-1 space-y-4 flex flex-col">
        {/* Scrollable Table Container */}
        <ScrollArea className="border rounded-md w-full overflow-auto h-[calc(100vh-350px)]">
          <table className="min-w-full table-auto">
            {/* Sticky Header */}
            {
              <thead className="sticky top-0 z-10 bg-background shadow-sm">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-2 py-2 text-left text-sm font-medium text-gray-700"
                        style={{ width: `${header.getSize?.()}px` }}
                      >
                        <DataTableHeader header={header} />
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            }

            {/* Table Body */}
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="truncate w-full px-4 py-2 text-sm text-gray-800"
                      style={{ width: `${cell.column.getSize()}px` }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Pagination */}
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default AssessmentTable;
