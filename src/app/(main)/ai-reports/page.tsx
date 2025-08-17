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
  type SortingState,
} from "@tanstack/react-table";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";

import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { useQuery } from "@tanstack/react-query";
import DataTableHeader from "@/components/data-table/data-table-header";

import { Badge } from "@/components/ui/badge";
import DataTableLoadingSkeleton from "@/components/data-table/data-table-loading-skeleton";
import { getReportVersions } from "@/services/operations/Ai";
import { useAuthContext } from "@/context/auth-provider";

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

const AiReports = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { user, isLoading: authLoading } = useAuthContext();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useQuery({
    queryKey: ["my-work"],
    queryFn: async () => {
      const data = await getFakeData();
      return data;
    },
  });

  const { data: reportVersions, isLoading: reportVersionsLoading } =  useQuery({
    queryKey: ["report-versions", user?.organization, page, limit],
    queryFn: () => getReportVersions(user?.organization, { page:1  , limit:10 }),
    enabled: !!user?.organization
  });
console.log(reportVersions, 'reportVersions')

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

  const visibleColumns = table.getVisibleLeafColumns();
  const allColumns = table.getAllLeafColumns();
  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;
  const isNoVisibleColumns = visibleColumns.length === 1; // assuming 2 cols are control columns

  return (
    <div className="@container w-full overflow-hidden flex flex-col h-full">
      <div className="p-4 flex-1 space-y-4 flex flex-col">
        {/* Filter / Search / Actions */}
        <DataTableToolbar
          table={table}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />

        {/* Scrollable Table Container */}
        <ScrollArea className="border rounded-md w-full overflow-auto h-[calc(100vh-420px)]">
          <table className="min-w-full table-auto">
            {/* Sticky Header */}
            {hasRows && visibleColumns.length > 2 && (
              <thead className="sticky top-0 z-10 bg-white shadow-sm">
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
            )}

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
              ) : hasRows && visibleColumns.length > 2 ? (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="truncate px-4 py-2 text-sm text-gray-800"
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
                    No results.
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

export default AiReports;
