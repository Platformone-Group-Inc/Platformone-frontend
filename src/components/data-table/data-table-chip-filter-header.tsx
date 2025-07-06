import React, { useState, useCallback } from "react";
import { Header } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon } from "lucide-react";

interface Props<T> {
  header: Header<T, unknown>;
  title: string;
  options?: string[];
}

const DataTableChipFilterHeader = <T,>({
  header,
  title,
  options = [],
}: Props<T>) => {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    undefined
  );
  const [isFilterMenuVisible, setFilterMenuVisible] = useState(false);

  const { column } = header;
  const canFilter = column.getCanFilter();

  // Toggle filter menu visibility
  const handleToggleFilterMenu = () => setFilterMenuVisible((prev) => !prev);

  // Handle filter change
  const handleFilterChange = useCallback(
    (option: string) => {
      const newFilterValue = activeFilter === option ? undefined : option; // Toggle filter value
      setActiveFilter(newFilterValue);
      column.setFilterValue(newFilterValue);
    },
    [activeFilter, column]
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={!canFilter}
            className="flex items-center justify-between w-full text-left"
            aria-expanded={isFilterMenuVisible ? "true" : "false"}
            onClick={handleToggleFilterMenu} // Added toggle on click
          >
            <span className="truncate">{title}</span>
            <ChevronDownIcon className="ml-2 size-4" />
          </DropdownMenuTrigger>

          {canFilter && (
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Apply Filter</DropdownMenuLabel>
              <div className="flex gap-2 flex-wrap">
                {options.map((option) => (
                  <Badge
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    variant={activeFilter === option ? "default" : "secondary"}
                    className="cursor-pointer"
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DataTableChipFilterHeader;
