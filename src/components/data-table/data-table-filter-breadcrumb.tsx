import type { Table } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, FilterX } from "lucide-react";

interface FilterBreadcrumbsProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
}

export const FilterBreadcrumbs = <TData,>({
  table,
  globalFilter,
  onGlobalFilterChange,
}: FilterBreadcrumbsProps<TData>) => {
  const columnFilters = table.getState().columnFilters;
  const hasGlobalFilter = globalFilter.length > 0;
  const hasFilters = columnFilters.length > 0 || hasGlobalFilter;

  const clearAllFilters = () => {
    table.resetColumnFilters();
    onGlobalFilterChange("");
  };

  const clearColumnFilter = (columnId: string) => {
    table.getColumn(columnId)?.setFilterValue(undefined);
  };

  const clearGlobalFilter = () => {
    onGlobalFilterChange("");
  };

  if (!hasFilters) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap p-3 bg-muted/30 rounded-md border">
      <span className="text-sm font-medium text-muted-foreground">
        Active filters:
      </span>

      {hasGlobalFilter && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span className="text-xs">Search: &quot;{globalFilter}&quot;</span>
          <button
            onClick={clearGlobalFilter}
            className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-sm p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {columnFilters.map((filter) => (
        <Badge
          key={filter.id}
          variant="secondary"
          className="flex items-center gap-1"
        >
          <span className="text-xs">
            {filter.id}:{" "}
            {Array.isArray(filter.value)
              ? filter.value.join(", ")
              : String(filter.value)}
          </span>
          <button
            onClick={() => clearColumnFilter(filter.id)}
            className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-sm p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={clearAllFilters}
        className="h-6 text-xs"
      >
        <FilterX className="mr-1 h-3 w-3" />
        Clear all
      </Button>
    </div>
  );
};
