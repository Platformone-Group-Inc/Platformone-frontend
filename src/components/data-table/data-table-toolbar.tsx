import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Trash, X, FilterX } from "lucide-react";
import { ColumnSettings } from "./data-table-columns-settings";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  onExport?: (format: "csv" | "excel" | "pdf") => void;
}

export const DataTableToolbar = <TData,>({
  table,
  globalFilter,
  onGlobalFilterChange = () => {},
  onExport,
}: DataTableToolbarProps<TData>) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const columnFilters = table.getState().columnFilters;
  const hasFilters = columnFilters.length > 0 || !!globalFilter;

  const clearAllFilters = () => {
    table.resetColumnFilters();
    onGlobalFilterChange("");
  };

  const clearRowSelection = () => {
    table.resetRowSelection();
  };

  const handleConfirmDelete = () => {
    // Perform deletion logic here (API call etc.)
    console.log("Deleting selected rows", selectedRows);
    setDeleteDialogOpen(false);
    table.resetRowSelection();
  };

  return (
    <>
      <div className="space-y-4">
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Global Search */}
            <div className="relative w-[280px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 h-9"
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => onGlobalFilterChange(e.target.value)}
              />
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={clearAllFilters}
              >
                <FilterX className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onExport && (
              <Select
                onValueChange={(value) =>
                  onExport(value as "csv" | "excel" | "pdf")
                }
              >
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Bulk Delete */}
            {selectedRows.length > 0 && (
              <>
                {/* <Button
                  variant="error"
                  size="sm"
                  className="h-9"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete ({selectedRows.length})
                </Button> */}
                <Button
                  variant="transparent"
                  size="sm"
                  className="h-9 text-xs"
                  onClick={clearRowSelection}
                >
                  <X className="mr-1 h-4 w-4" />
                  Clear Selection
                </Button>
              </>
            )}
            <ColumnSettings table={table} />
          </div>
        </div>

        {/* Active Filters */}
        {columnFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {columnFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant="secondary"
                className="flex items-center gap-1 max-w-xs truncate"
              >
                <span className="truncate">
                  {filter.id}: {String(filter.value)}
                </span>
                <button
                  onClick={() =>
                    table.getColumn(filter.id)?.setFilterValue(undefined)
                  }
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Selected Rows</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p>Are you sure you want to delete the following rows?</p>
            <ScrollArea className="h-48 border rounded-md p-2">
              <ul className="space-y-1 list-disc list-inside">
                {selectedRows.map((row, i) => (
                  <li key={i}>{row.getValue("id") ?? `Row #${i + 1}`}</li>
                ))}
              </ul>
            </ScrollArea>
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="transparent"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="error" onClick={handleConfirmDelete}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
