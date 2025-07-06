"use client";

import { useEffect, useState } from "react";
import type { Table as ITable } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: ITable<TData>;
  totalCount?: number;
}

export const DataTablePagination = <TData,>({
  table,
  totalCount = 0,
}: DataTablePaginationProps<TData>) => {
  const [jumpToPage, setJumpToPage] = useState("");

  // Sync pagination state with URL
  const [pageParam, setPageParam] = useQueryState("page", {
    history: "push",
    parse: Number,
    serialize: (v) => v.toString(),
  });
  const [pageSizeParam, setPageSizeParam] = useQueryState("pageSize", {
    history: "push",
    parse: Number,
    serialize: (v) => v.toString(),
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const currentPage = pageIndex + 1;
  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);

  // Sync state with table when query changes
  useEffect(() => {
    if (
      typeof pageParam === "number" &&
      pageParam >= 1 &&
      pageParam <= totalPages
    ) {
      table.setPageIndex(pageParam - 1);
    }
  }, [pageParam]);

  useEffect(() => {
    if (typeof pageSizeParam === "number") {
      table.setPageSize(pageSizeParam);
    }
  }, [pageSizeParam]);

  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalCount);

  const handleJumpToPage = () => {
    const targetPage = parseInt(jumpToPage);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      table.setPageIndex(targetPage - 1);
      setPageParam(targetPage);
      setJumpToPage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleJumpToPage();
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-2 py-4 gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const newSize = Number(value);
              table.setPageSize(newSize);
              setPageSizeParam(newSize);
              setPageParam(1); // Reset to first page
              table.setPageIndex(0);
            }}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="text-sm font-medium whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </div>

        {/* Jump to page */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">
            Jump to:
          </span>
          <Input
            type="number"
            value={jumpToPage}
            placeholder="Page #"
            min={1}
            max={totalPages}
            onChange={(e) => setJumpToPage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-8 w-20"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleJumpToPage}
            disabled={
              !jumpToPage ||
              isNaN(Number(jumpToPage)) ||
              Number(jumpToPage) < 1 ||
              Number(jumpToPage) > totalPages
            }
          >
            Go
          </Button>
        </div>

        {/* Row info */}
        <div className="hidden sm:flex text-sm text-muted-foreground whitespace-nowrap">
          Showing {startRow} to {endRow} of {totalCount} entries
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2 self-end lg:self-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.setPageIndex(0);
            setPageParam(1);
          }}
          disabled={!table.getCanPreviousPage()}
          aria-label="First Page"
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
            setPageParam(currentPage - 1);
          }}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            setPageParam(currentPage + 1);
          }}
          disabled={!table.getCanNextPage()}
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.setPageIndex(totalPages - 1);
            setPageParam(totalPages);
          }}
          disabled={!table.getCanNextPage()}
          aria-label="Last Page"
        >
          Last
        </Button>
      </div>
    </div>
  );
};
