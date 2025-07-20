"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import DataTableFilterHeader from "@/components/data-table/data-table-filter-header";
import { TableHead } from "@/components/ui/table";
import DataTableLoadingSkeleton from "@/components/data-table/data-table-loading-skeleton";
import { faker } from "@faker-js/faker";

interface User {
  id: string;
  name: string;
  avatar?: string;
  team: string;
}

const users: User[] = Array.from({ length: 10 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  team: faker.internet.username(),
  avatar: faker.image.personPortrait(),
}));
const columns: ColumnDef<User>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mx-1"
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
    id: "user",
    accessorKey: "name",
    header: ({ header }) => (
      <DataTableFilterHeader header={header} title="User" />
    ),
    meta: { label: "User" },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          {row.original.avatar && <AvatarImage src={row.original.avatar} />}
          <AvatarFallback>{row.original.name[0]}</AvatarFallback>
        </Avatar>
        <p>{row.original.name}</p>
      </div>
    ),
    enableHiding: false,
  },
  {
    header: ({ header }) => (
      <DataTableFilterHeader header={header} title="Team" />
    ),
    accessorKey: "team",
    enableHiding: false,
  },
];

export default function ReassignUsersModal() {
  const [open, setOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 20,
  });
  const table = useReactTable({
    data: users,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,

    onGlobalFilterChange: setGlobalFilter,

    onPaginationChange: setPagination,
    initialState: {
      pagination,
    },

    state: {
      sorting,
      pagination,
    },
    enableSortingRemoval: false,
    rowCount: 20,
    pageCount: 2, // need to change
    defaultColumn: {
      minSize: 200,
    },
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const allColumns = table.getAllLeafColumns();
  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;
  const isNoVisibleColumns = visibleColumns.length === 1; // assuming first 2 are control columns
  const filteredRows = table.getFilteredRowModel().rows;

  //   TODO change this
  const isLoading = false;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Reassign Users</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Reassign Users</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-4">
          <Input
            placeholder="Search User"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="mb-4"
          />
        </div>

        <ScrollArea className="border rounded-md w-full overflow-auto h-[calc(100vh-400px)]">
          <table className="min-w-full table-auto">
            {/* Sticky Header */}
            <thead className="sticky top-0 z-10 bg-background border-b shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="relative group w-full px-3 py-2 text-left text-sm align-top"
                      style={{ width: `${header.column.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Table Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length}>
                    <DataTableLoadingSkeleton table={table} />
                  </td>
                </tr>
              ) : isNoVisibleColumns ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-[400px] text-center text-gray-500"
                  >
                    No columns are visible.&nbsp;
                    <button
                      className="underline text-blue-600"
                      onClick={() => {
                        const visibility = Object.fromEntries(
                          allColumns.map((col) => [col.id, true])
                        );
                        table.setColumnVisibility(visibility);
                      }}
                    >
                      Reset columns
                    </button>
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr className="h-[300px]">
                  <td
                    colSpan={columns.length}
                    className="h-24 text-sm text-center text-gray-500"
                  >
                    No results found for your filter criteria.{" "}
                    <button
                      className="text-primary-600 font-bold"
                      onClick={() => {
                        console.log("Clear filters clicked");

                        // Reset column filters
                        table.resetColumnFilters();
                      }}
                    >
                      Clear filter
                    </button>
                  </td>
                </tr>
              ) : hasRows && visibleColumns.length > 2 ? (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="truncate flex-shrink-0 px-4 py-2 text-sm text-gray-800"
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="h-[300px]">
                  <td
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    No results available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex items-center justify-end gap-2 px-6 py-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {/* <Button disabled={selected.length === 0}>Reassign</Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
