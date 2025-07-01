import type { Column } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface ColumnFilterProps<TData> {
  column: Column<TData>;
}

export const ColumnFilter = <TData,>({ column }: ColumnFilterProps<TData>) => {
  const columnFilterValue = column.getFilterValue();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateRangeFilter = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      column.setFilterValue([range.from, range.to]);
    } else {
      column.setFilterValue(undefined);
    }
  };

  const clearFilter = () => {
    column.setFilterValue(undefined);
    setDateRange(undefined);
  };

  // Text filter for most columns
  if (column.id === "name" || column.id === "email") {
    return (
      <div className="flex items-center space-x-2">
        <Input
          placeholder={`Filter ${column.id}...`}
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="h-8 w-[150px]"
        />
        {columnFilterValue && (
          <Button variant="transparent" size="sm" onClick={clearFilter}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  // Select filter for role and status
  if (column.id === "role") {
    return (
      <div className="flex items-center space-x-2">
        <Select
          value={columnFilterValue as string}
          onValueChange={(value) =>
            column.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
          </SelectContent>
        </Select>
        {columnFilterValue && (
          <Button variant="transparent" size="sm" onClick={clearFilter}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  if (column.id === "status") {
    return (
      <div className="flex items-center space-x-2">
        <Select
          value={columnFilterValue as string}
          onValueChange={(value) =>
            column.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        {columnFilterValue && (
          <Button variant="transparent" size="sm" onClick={clearFilter}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  // Date range filter for date columns
  if (column.id === "createdAt" || column.id === "lastLogin") {
    return (
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateRangeFilter}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        {dateRange && (
          <Button variant="transparent" size="sm" onClick={clearFilter}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return null;
};
