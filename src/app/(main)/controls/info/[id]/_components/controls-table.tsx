// TODO pagination
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
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
const data: Control[] = Array.from({ length: 300 }).map((_, i) => ({
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
  const columns: ColumnDef<Control>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),

      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "controlCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      meta: {
        label: "Code",
      },
      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
    },
    {
      accessorKey: "controlName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Control Name" />
      ),
      meta: {
        label: "Control Name",
      },

      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Owner" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="aspect-square size-10 rounded-full border">
            <AvatarImage src={row.original.ownerAvatar} />
            <AvatarFallback>{row.original.ownerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium truncate text-sm">
            {row.original.ownerName}
          </span>
        </div>
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
      accessorKey: "evidence",
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Control Family" />
      ),

      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
      meta: {
        label: "Control Family",
      },
    },
    {
      accessorKey: "actionItems",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action Items" />
      ),

      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
      meta: {
        label: "Actins Items",
      },
    },
    {
      accessorKey: "document",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document" />
      ),

      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
      meta: {
        label: "Document",
      },
    },
    {
      accessorKey: "priorities",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priorities" />
      ),

      enableSorting: true,
      enableColumnFilter: true,
      enableHiding: true,
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
    <>
      <DataTable table={table}>
        <div className="flex items-center justify-between">
          <Breadcrumb className="w-full">
            <BreadcrumbList className="">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/controls">All Controls</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  FedRAMP Moderate (800-53 Rev. 5)
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <DataTableToolbar table={table} />
        </div>
      </DataTable>
    </>
  );
};

export default ControlsTable;
