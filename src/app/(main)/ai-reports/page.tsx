"use client";

import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

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

import { Badge } from "@/components/ui/badge";
import DataTableLoadingSkeleton from "@/components/data-table/data-table-loading-skeleton";
import { getReportVersions } from "@/services/operations/Ai";
import { useAuthContext } from "@/context/auth-provider";
import { parseAsInteger, useQueryState } from "nuqs";
import DataTableFilterHeader from "@/components/data-table/data-table-filter-header";
import { Button } from "@/components/ui/button";
import { DownloadIcon, EllipsisVerticalIcon } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { useSearchParams } from "next/navigation";

export interface ReportResponse {
  success: boolean;
  organization: Organization;
  data: IDocument[];
  pagination: Pagination;
  message: string;
}

export interface Organization {
  id: string;
  name: string;
  code: string;
  slug: string;
  domain: string;
  phone: number;
}

export interface IDocument {
  report_id: string;
  task_id: string;
  version: string;
  description: string;
  author: string;
  status: "completed" | "incomplete";
  generated_at: string;
  download_url: string;
  updated_at: string;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  next_page: any;
  prev_page: any;
}

const RowAction: React.FC<{ report: IDocument }> = ({ report }) => {
  const handleDownload = () => {
    window.open(report.download_url);
  };

  return (
    <Button variant={"transparent"} size={"icon"} disabled={report.status !== "completed"} onClick={handleDownload}>
      <DownloadIcon size={16} />
    </Button>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant={"transparent"} size={"icon"}>
    //       <EllipsisVerticalIcon className="size-5" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuItem
    //       onClick={handleDownload}
    //       disabled={report.status !== "completed"}
    //     >
    //       <DownloadIcon />
    //       Download
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};

const AiReports = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(20)
  );

  const { data: reportVersions, isLoading,refetch } = useQuery<ReportResponse>({
    queryKey: ["report-versions", user?.organization, page, limit],
    queryFn: () =>
      getReportVersions(user?.organization, { page, limit }),
    enabled: !!user?.organization,
    refetchInterval: 120000,
    refetchIntervalInBackground: true, 
  });

  useEffect(() => {
    if (searchParams.get("from") === "assignment") {
      refetch(); 
    }
  }, []);
  

  const columns: ColumnDef<IDocument>[] = useMemo(
    () => [
      {
        id: "select",
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
        id: "organization",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Organization" />
        ),
        cell: () => reportVersions?.organization.name,
      },
      {
        id: "report-id",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Report ID" />
        ),
        cell: ({ row }) => row.original.report_id,
      },
      {
        accessorKey: "version",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Version" />
        ),
      },

      {
        accessorKey: "author",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Author" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Status" />
        ),
        cell: ({ row }) => (
          <Badge className="capitalize">{row.original.status}</Badge>
        ),
      },
      {
        id: "action",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Actions" />
        ),
        cell: ({ row }) => <RowAction report={row.original} />,
        enableHiding: false,
        enableResizing: false,
        enableSorting: false,
      },
    ],
    [reportVersions?.organization.name]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id as string)
  );

  const table = useReactTable({
    data: reportVersions?.data || [],
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      setPage(newPagination.pageIndex);
      setLimit(newPagination.pageSize);
    },
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
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
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const allColumns = table.getAllLeafColumns();
  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;
  const isNoVisibleColumns = visibleColumns.length === 2; // assuming first 2 are control columns
  const filteredRows = table.getFilteredRowModel().rows;

  return (
    <div className="@container w-full overflow-hidden flex flex-col h-full">
      {/* <button
        onClick={() => {
          // console.log(reportVersions);
          console.log(rows);
        }}
      >
        click
      </button> */}
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

export default AiReports;
