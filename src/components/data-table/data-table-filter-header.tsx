import React, { useState } from "react";
import { Header } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  EyeClosedIcon,
  FilterIcon,
  FilterXIcon,
  RotateCwIcon,
} from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props<T> {
  header: Header<T, unknown>;
  title: string;
}

const DataTableFilterHeader = <T,>({ header, title }: Props<T>) => {
  const [showFilter, setShowFilter] = useState(false);
  const { column } = header;

  const isSorted = column.getIsSorted(); // 'asc' | 'desc' | false
  const canSort = column.getCanSort();
  const canFilter = column.getCanFilter();

  const handleSort = (direction: "asc" | "desc") => {
    column.toggleSorting(direction === "desc");
  };

  const handleResetSort = () => {
    column.clearSorting();
  };

  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleHideColumn = () => {
    column.toggleVisibility(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center w-full justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={!canSort}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="truncate">{title}</span>
            {isSorted === "asc" ? (
              <ArrowUpIcon className="ml-2 size-4" />
            ) : isSorted === "desc" ? (
              <ArrowDownIcon className="ml-2 size-4" />
            ) : (
              <ArrowUpDownIcon className="ml-2 size-4 text-muted-foreground" />
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40 p-0 divide-y">
            <DropdownMenuItem
              onClick={handleResetSort}
              className={!isSorted ? "bg-primary/10 font-semibold" : ""}
            >
              <ArrowUpDownIcon
                className={`size-3 mr-2 ${!isSorted ? "text-primary" : ""}`}
              />
              Reset Sort
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleSort("asc")}
              className={
                isSorted === "asc" ? "bg-primary/10 font-semibold" : ""
              }
            >
              <ArrowUpIcon
                className={`size-3 mr-2 ${
                  isSorted === "asc" ? "text-primary" : ""
                }`}
              />
              Ascending
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleSort("desc")}
              className={
                isSorted === "desc" ? "bg-primary/10 font-semibold" : ""
              }
            >
              <ArrowDownIcon
                className={`size-3 mr-2 ${
                  isSorted === "desc" ? "text-primary" : ""
                }`}
              />
              Descending
            </DropdownMenuItem>

            {column.getCanHide() && (
              <DropdownMenuItem onClick={handleHideColumn}>
                <EyeClosedIcon className="size-3 mr-2" />
                Hide
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1">
          {canSort && isSorted && (
            <Button
              variant="transparent"
              size="icon"
              onClick={handleResetSort}
              className="h-6 w-6"
              aria-label="Reset sort"
            >
              <RotateCwIcon className="size-3" />
            </Button>
          )}

          {canFilter && (
            <Button
              variant="transparent"
              size="icon"
              onClick={handleToggleFilter}
              className="h-6 w-6"
              aria-label={
                showFilter ? "Hide filter input" : "Show filter input"
              }
            >
              {showFilter ? (
                <FilterXIcon className="h-3 w-3" />
              ) : (
                <FilterIcon className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </div>

      {showFilter && canFilter && (
        <Input
          type="text"
          placeholder={`Filter ${column.id}...`}
          value={(column.getFilterValue() as string) ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="h-8 text-xs"
        />
      )}
    </div>
  );
};

export default DataTableFilterHeader;
