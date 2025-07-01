import { useState } from "react";
import type { Table as ITable } from "@tanstack/react-table";
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
  const pagination = table.getState().pagination;
  const currentPage = pagination.pageIndex + 1;
  const pageSize = pagination.pageSize;
  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);

  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalCount);

  const handleJumpToPage = () => {
    const pageNumber = parseInt(jumpToPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      table.setPageIndex(pageNumber - 1);
      setJumpToPage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJumpToPage();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-2 py-4 gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Page size selection */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
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
              isNaN(parseInt(jumpToPage)) ||
              parseInt(jumpToPage) < 1 ||
              parseInt(jumpToPage) > totalPages
            }
          >
            Go
          </Button>
        </div>

        {/* Row range info */}
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          Showing {startRow} to {endRow} of {totalCount} entries
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-2 self-end lg:self-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="First Page"
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(totalPages - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Last Page"
        >
          Last
        </Button>
      </div>
    </div>
  );
};
