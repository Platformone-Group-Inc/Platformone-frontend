// TODO pagination
"use client";

import { useDataTable } from "@/hooks/use-data-table";

import { fa, faker } from "@faker-js/faker";

import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTable } from "@/components/data-table/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

// import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Shell } from "@/components/ui/shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import ReAssignModal from "./reassign-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Work {
  id: string;
  name: string;
  ownerName: string;
  ownerAvatar: string;
  status: string;
  type: string;

  startedAt: Date;
  endAt: Date;
  dueDate: Date;
}

const data: Work[] = Array.from({ length: 300 }).map((_, i) => ({
  id: crypto.randomUUID(),

  name: faker.company.name(),
  ownerName: faker.person.fullName(),
  type: faker.helpers.arrayElement(["Policy"]),
  status: faker.helpers.arrayElement(["implanted", "not implemented"]),

  ownerAvatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i + 1}`,
  startedAt: faker.date.past(),
  endAt: faker.date.future(),
  dueDate: faker.date.future(),
}));

const MyWorkDataTable = () => {
  const columns: ColumnDef<Work>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="w-9">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-9">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        </div>
      ),

      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      meta: {
        label: "Name",
      },
      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
    },
    {
      accessorKey: "ownerAvatar",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Owner" />
      ),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"link"} className="flex items-center gap-2">
              <Avatar className="aspect-square size-10 rounded-full border">
                <AvatarImage src={row.original.ownerAvatar} />
                <AvatarFallback>
                  {row.original.ownerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium truncate text-sm">
                {row.original.ownerName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <ReAssignModal />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),

      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
      meta: {
        label: "Owner",
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div className="flex justify-center ">
          <Badge
            variant={row.original.status === "implanted" ? "success" : "error"}
            size={"sm"}
            className="text-center capitalize "
          >
            {row.original.status}
          </Badge>
        </div>
      ),

      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
      meta: {
        label: "Status",
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Evidence" />
      ),

      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
      meta: {
        label: "Evidence",
      },
      cell: ({ row }) => (
        <div className="flex justify-center ">
          <Badge
            withDot
            variant={"success"}
            size={"sm"}
            className="text-center capitalize "
          >
            {row.original.type}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "startedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stated Dates" />
      ),

      cell: ({ row }) => {
        const d = new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
        }).format(row.original.startedAt);
        const t = new Intl.DateTimeFormat("en-US").format(
          row.original.startedAt
        );
        return (
          <Tooltip>
            <TooltipTrigger>{d}</TooltipTrigger>
            <TooltipContent>
              <p>{t}</p>
            </TooltipContent>
          </Tooltip>
        );
      },
      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
    },
    {
      accessorKey: "endAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="End Dates" />
      ),

      cell: ({ row }) => {
        const d = new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
        }).format(row.original.endAt);
        const t = new Intl.DateTimeFormat("en-US").format(row.original.endAt);
        return (
          <Tooltip>
            <TooltipTrigger>{d}</TooltipTrigger>
            <TooltipContent>
              <p>{t}</p>
            </TooltipContent>
          </Tooltip>
        );
      },
      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due Dates" />
      ),

      cell: ({ row }) => {
        const d = new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
        }).format(row.original.dueDate);
        const t = new Intl.DateTimeFormat("en-US").format(row.original.dueDate);
        return (
          <Tooltip>
            <TooltipTrigger>{d}</TooltipTrigger>
            <TooltipContent>
              <p>{t}</p>
            </TooltipContent>
          </Tooltip>
        );
      },
      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({}) => (
        <Button
          variant="transparent"
          size="icon"
          //   onClick={() => alert(`E÷dit ${row.original.name}`)}
        >
          <EllipsisIcon size={18} />
        </Button>
      ),
      enableSorting: false,
    },
  ];

  const [page, setPage] = useState(1);
  const perPage = 10;

  const paginated = data.slice((page - 1) * perPage, page * perPage);

  const { table } = useDataTable({
    data: paginated,
    columns,
    pageCount: Math.ceil(data.length / perPage),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <Shell className="p-4 gap-2">
      {false ? (
        <DataTableSkeleton
          columnCount={10}
          filterCount={0}
          cellWidths={[
            "10rem",
            "30rem",
            "10rem",
            "10rem",
            "6rem",
            "6rem",
            "6rem",
          ]}
          shrinkZero
        />
      ) : (
        <DataTable table={table}>
          <DataTableToolbar table={table} />
        </DataTable>
      )}
    </Shell>
    // <div className="divide-y">
    //   <div className="px-6 py-4 flex-grow h-full">
    //     <DataTable table={table}>
    //       <DataTableToolbar table={table} />
    //     </DataTable>
    //   </div>
    //   <div className="flex items-center justify-between w-full py-4 px-6">
    //     <Button
    //       //  disabled
    //       variant={"outline"}
    //     >
    //       <ArrowLeftIcon size={16} />
    //       Previous
    //     </Button>
    //     <div className="flex items-center gap-2">
    //       {[1, 2, 3, "...", 50].map((i) => (
    //         <Button
    //           key={i}
    //           size={"icon"}
    //           variant={i === 2 ? "primary" : "outline"}
    //         >
    //           {i}
    //         </Button>
    //       ))}
    //     </div>
    //     <Button variant={"outline"}>
    //       Next
    //       <ArrowRightIcon size={16} />
    //     </Button>
    //   </div>
    // </div>
  );
};

export default MyWorkDataTable;
