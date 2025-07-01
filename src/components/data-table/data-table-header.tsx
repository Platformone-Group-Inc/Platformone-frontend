"use client";

import { flexRender, type Header } from "@tanstack/react-table";
import { TableHead } from "@/components/ui/table";
import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  FilterIcon,
  FilterXIcon,
  RotateCwIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const DataTableHeader = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  const column = header.column;
  const [showFilter, setShowFilter] = useState(false);

  const toggleSort = () => {
    const current = column.getIsSorted();
    if (current === "asc") column.toggleSorting(true);
    else if (current === "desc") column.clearSorting();
    else column.toggleSorting(false);
  };

  const renderSortIcon = () => {
    const sorted = column.getIsSorted();
    if (sorted === "asc") return <ArrowUpIcon className="h-4 w-4" />;
    if (sorted === "desc") return <ArrowDownIcon className="h-4 w-4" />;
    return <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <TableHead
      key={header.id}
      className="relative group px-3 py-2 text-left align-top"
      style={{ width: `${header.getSize()}px` }}
    >
      {!header.isPlaceholder && (
        <div className="space-y-2">
          {/* Header title and sort/filter controls */}
          <div className="flex items-center justify-between gap-2">
            {/* Header label with sort toggle */}
            <Button
              variant="transparent"
              onClick={toggleSort}
              className="h-auto p-0 font-medium text-sm text-left"
              aria-label={`Sort by ${String(column.id)}`}
              // TODO handle hydration error
            >
              {typeof column.columnDef.header === "string"
                ? column.columnDef.header
                : flexRender(column.columnDef.header, header.getContext())}
              {column.getCanSort() && (
                <span className="ml-1">{renderSortIcon()}</span>
              )}
            </Button>

            {/* Filter toggle & reset sort */}
            <div className="flex items-center gap-1">
              {column.getCanFilter() && column.getCanSort() && (
                <Button
                  variant="transparent"
                  size="sm"
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="h-6 w-6 p-0"
                  aria-label="Toggle column filter"
                >
                  {showFilter ? (
                    <FilterXIcon className="h-3 w-3" />
                  ) : (
                    <FilterIcon className="h-3 w-3" />
                  )}
                </Button>
              )}
              {column.getIsSorted() && column.getCanSort() && (
                <Button
                  variant="transparent"
                  size="sm"
                  onClick={() => column.clearSorting()}
                  className="h-6 w-6 p-0"
                  aria-label="Reset column sort"
                >
                  <RotateCwIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Optional filter input field */}
          {showFilter && column.getCanFilter() && (
            <Input
              type="text"
              placeholder={`Filter ${column.id}...`}
              value={(column.getFilterValue() as string) ?? ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 text-xs"
            />
          )}
        </div>
      )}

      {/* Column resizing handle */}
      {column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-border opacity-0 group-hover:opacity-100 hover:opacity-100 hover:bg-primary transition"
        />
      )}
    </TableHead>
  );
};
export default DataTableHeader;
