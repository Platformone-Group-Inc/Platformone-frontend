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
import { Badge } from "@/components/ui/badge";
import DataTableLoadingSkeleton from "@/components/data-table/data-table-loading-skeleton";
import DataTableFilterHeader from "@/components/data-table/data-table-filter-header";
import { TableHead } from "@/components/ui/table";
import DataTableChipFilterHeader from "@/components/data-table/data-table-chip-filter-header";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

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

const getFakeData = async (): Promise<IDocument[]> => {
  return Array.from({ length: 100 }).map(() => ({
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

const ResignUserModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownMenuItem>Reassign User</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resign User?</DialogTitle>
          <DialogDescription>
            Are you sure you want to resign this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          {/* <DialogClose asChild> */}
          <Button variant="secondary">Cancel</Button>
          {/* </DialogClose> */}
          <Button variant="error">Confirm Resignation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ReassignUser: React.FC<{ user: string }> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <Avatar className="">
            <AvatarFallback>{user[0]}</AvatarFallback>
          </Avatar>
          <p className="font-semibold underline ">{user}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <ResignUserModal /> */}
        <DropdownMenuItem>Reassign User</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TeamWorkTable = () => {
  const [globalFilter, setGlobalFilter] = useQueryState(
    "globalFilter",
    parseAsString.withDefault("")
  );
  const { data, isLoading } = useQuery({
    queryKey: ["team-work"],
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
        id: "name",
        accessorKey: "name",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Name" />
        ),
        meta: { label: "Name" },
      },
      {
        id: "assignee",
        accessorKey: "assignee",

        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Assignee" />
        ),
        cell: ({ row }) => <ReassignUser user={row.original.assignee} />,
        meta: { label: "Assignee" },
        enableSorting: true,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ header }) => (
          <DataTableChipFilterHeader
            header={header}
            title="Status"
            options={["Draft", "Published"]}
          />
        ),
        meta: { label: "Status" },
        cell: ({ row }) => (
          <Badge className="capitalize">{row.original.status}</Badge>
        ),
      },
      {
        id: "type",
        accessorKey: "type",
        header: ({ header }) => (
          <DataTableChipFilterHeader
            header={header}
            title="Type"
            options={["Draft", "Published"]}
          />
        ),
        meta: {
          label: "Type",
        },
        cell: ({ row }) => (
          <Badge className="capitalize">{row.original.type}</Badge>
        ),
      },
      {
        id: "startDate",
        accessorKey: "startDate",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Start Date" />
        ),
        meta: { label: "Start Date" },
        enableColumnFilter: false,
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
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="End Date" />
        ),
        meta: { label: "End Date" },
        enableColumnFilter: false,
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
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Due Date" />
        ),
        meta: { label: "Due Date" },
        enableColumnFilter: false,
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

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(20)
  );

  const table = useReactTable({
    data: data || [],
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,

    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      setPage(newPagination.pageIndex);
      setLimit(newPagination.pageSize);
    },
    initialState: {
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
    },

    state: {
      globalFilter,
      sorting,
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
      columnOrder,
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
  const isNoVisibleColumns = visibleColumns.length === 2; // assuming first 2 are control columns
  const filteredRows = table.getFilteredRowModel().rows;

  return (
    <div className="@container w-full overflow-hidden flex flex-col h-full">
      {/* Page Header */}
      <div className="border-b p-4">
        <h1 className="font-semibold inline-flex items-center gap-2 text-xl">
          Team Work
        </h1>
      </div>

      <div className="p-4 flex-1 space-y-4 flex flex-col">
        {/* Filter / Search / Actions */}
        <DataTableToolbar
          table={table}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />

        {/* Scrollable Table Container */}
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

        {/* Pagination */}
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default TeamWorkTable;
