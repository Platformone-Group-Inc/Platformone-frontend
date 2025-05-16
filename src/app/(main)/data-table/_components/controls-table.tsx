"use client";

import { useDataTable } from "@/hooks/use-data-table";

import { faker } from "@faker-js/faker";

import { ColumnDef } from "@tanstack/react-table";
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
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";

interface Control {
  id: string;
  controlCode: string;
  controlFamily: string;
  controlName: string;
  document: string;
  evidence: string;
  ownerName: string;
  ownerAvatar: string;
  priorities: string;
  status: string;
  actionItems: string | null;
  createdAt: Date;
}
const data: Control[] = Array.from({ length: 30 }).map((_, i) => ({
  id: crypto.randomUUID(),
  controlCode: "AC-" + faker.string.alphanumeric({ length: 5 }),
  controlFamily: `AC-${i + 1}`,
  controlName: faker.commerce.productName(),
  document: faker.system.fileName(),
  evidence: faker.lorem.words(2),
  ownerName: faker.person.fullName(),
  priorities: faker.helpers.arrayElement(["High", "Medium", "Low"]),
  status: faker.helpers.arrayElement(["implanted", "not implemented"]),
  actionItems: faker.lorem.words(2),
  ownerAvatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i + 1}`,
  createdAt: faker.date.past(),
}));

const ControlsTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const columns: ColumnDef<Control>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsSomeRowsSelected()}
          onCheckedChange={(val) => {
            const ids = data.map((u) => u.id);
            setSelectedRows((prev) =>
              val
                ? [...new Set([...prev, ...ids])]
                : prev.filter((id) => !ids.includes(id))
            );
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRows.includes(row.original.id)}
          onCheckedChange={(val) => {
            setSelectedRows((prev) =>
              val
                ? [...prev, row.original.id]
                : prev.filter((id) => id !== row.original.id)
            );
          }}
        />
      ),

      enableSorting: false,
    },

    {
      accessorKey: "controlCode",
      header: "Code",
      meta: {
        label: "Code",
      },
    },
    {
      accessorKey: "controlName",
      header: "Control Name",
      meta: {
        label: "Control Name",
      },
      cell: ({ row }) => (
        <Link
          href="#"
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "px-0"
          )}
        >
          {row.original.controlName}
        </Link>
      ),
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="aspect-square size-10 rounded-full border">
            <AvatarImage src={row.original.ownerAvatar} />
            <AvatarFallback>{row.original.ownerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium truncate text-base">
            {row.original.ownerName}
          </span>
        </div>
      ),
      meta: {
        label: "Owner",
      },
    },
    {
      accessorKey: "status",
      header: "Status",
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
      meta: {
        label: "Status",
      },
    },
    {
      accessorKey: "evidence",
      header: "Evidence",
      meta: {
        label: "Evidence",
      },
      cell: ({ row }) => (
        <div className="flex justify-center ">
          <Badge
            withDot
            variant={Math.random() > 0.5 ? "success" : "error"}
            size={"sm"}
            className="text-center capitalize "
          >
            {row.original.evidence}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "controlFamily",
      header: "Control Family",
      meta: {
        label: "Control Family",
      },
    },
    {
      accessorKey: "actionItems",
      header: "Action Items",
      meta: {
        label: "Actins Items",
      },
    },
    {
      accessorKey: "document",
      header: "Document",
      meta: {
        label: "Document",
      },
    },
    {
      accessorKey: "priorities",
      header: "Priorities",
      meta: {
        label: "Priorities",
      },
      cell: ({ row }) => (
        <div className="flex justify-center ">
          <Badge
            variant={
              (row.original.priorities === "High" && "error") ||
              (row.original.priorities === "Medium" && "warn") ||
              (row.original.priorities === "Low" && "success") ||
              "info"
            }
            size={"sm"}
            className="text-center capitalize "
          >
            {row.original.priorities}
          </Badge>
        </div>
      ),
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

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data,
    columns,

    pageCount: 0,
    // initialState: {
    //   sorting: [{ id: "id", desc: false }],
    //   columnPinning: { right: ["actions"] },
    // },
    // getRowId: (originalRow) => originalRow.id,
    // shallow: false,
    // clearOnDefault: true,
  });

  return (
    <>
      <DataTable
        table={table}
        // actionBar={<TasksTableActionBar table={table} />}
      >
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} align="end" />
        </DataTableToolbar>
      </DataTable>
    </>
  );
};

export default ControlsTable;
