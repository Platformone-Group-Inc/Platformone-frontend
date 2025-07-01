"use client";

import { useMemo, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Checkbox } from "@/components/ui/checkbox";

import { faker } from "@faker-js/faker";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
  type SortingState,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";

import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { useQuery } from "@tanstack/react-query";
import DataTableHeader from "@/components/data-table/data-table-header";

import { Badge } from "@/components/ui/badge";
import DataTableLoadingSkeleton from "@/components/data-table/data-table-loading-skeleton";

interface IDocument {
  id: string;
  name: string;
  assignee: string;
  status: "draft" | "published";
  type: "policy";
  startDate: Date;
  endDate: Date;
  dueDate: Date;
}

// const enumSortStates = ["asc", "desc", "none"] as const;
const getFakeData = async (): Promise<IDocument[]> => {
  return Array.from({ length: 100 }).map((_, i) => ({
    id: crypto.randomUUID(),
    name: faker.person.fullName(),
    assignee: faker.person.fullName(),
    status: "draft",
    type: "policy",
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    dueDate: faker.date.soon(),
  }));
};

const RowAction = ({ row }: { row: Row<IDocument> }) => (
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

const MyWorkTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["my-work"],
    queryFn: async () => {
      const data = await getFakeData();
      return data;
    },
  });

  const columns: ColumnDef<IDocument>[] = useMemo(
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
        id: "name",
        accessorKey: "name",
        header: "Name",
        meta: { label: "Name" },
      },
      {
        id: "assignee",
        accessorKey: "assignee",
        header: "Assignee",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="">
              <AvatarFallback>{row.original.assignee[0]}</AvatarFallback>
            </Avatar>
            <p>{row.original.assignee}</p>
          </div>
        ),
        meta: { label: "Assignee" },
        enableSorting: true,
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        meta: { label: "Status" },
        cell: ({ row }) => (
          <Badge className="capitalize">{row.original.status}</Badge>
        ),
      },
      {
        id: "type",
        accessorKey: "type",
        header: "Type",
        meta: { label: "Type" },
        cell: ({ row }) => (
          <Badge className="capitalize">{row.original.type}</Badge>
        ),
      },
      {
        id: "startDate",
        accessorKey: "startDate",
        header: "Start Date",
        meta: { label: "Start Date" },
        cell: ({ row }) => {
          return new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(row.original.startDate);
        },
      },
      {
        id: "endDate",
        accessorKey: "endDate",
        header: "End Date",
        meta: { label: "End Date" },
        cell: ({ row }) => {
          return new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(row.original.endDate);
        },
      },
      {
        id: "dueDate",
        accessorKey: "dueDate",
        header: "Due Date",
        meta: { label: "Due Date" },
        cell: ({ row }) => {
          return new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(row.original.dueDate);
        },
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

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id as string)
  );
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data: data || [],
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter, sorting, pagination, columnOrder },
    enableSortingRemoval: false,
  });

  return (
    <div className="@container w-full overflow-hidden flex flex-col">
      <div className="border-b p-4">
        <h1 className="font-semibold inline-flex items-center gap-2 text-xl">
          My Work
        </h1>
      </div>

      <div className="p-4 flex-1 space-y-4">
        <DataTableToolbar
          table={table}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />

        <ScrollArea className="border rounded-md w-full overflow-auto h-[calc(100vh-432px)] ">
          <Table className="block w-full full">
            <thead className="sticky left-0 top-0 z-20 bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <DataTableHeader key={header.id} header={header} />
                  ))}
                </TableRow>
              ))}
            </thead>

            <TableBody>
              {isLoading && <DataTableLoadingSkeleton table={table} />}

              {!isLoading && table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="truncate"
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default MyWorkTable;
