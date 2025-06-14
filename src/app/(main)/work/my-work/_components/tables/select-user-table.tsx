"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faker } from "@faker-js/faker";

const data: User[] = Array.from({ length: 300 }).map((_, i) => ({
  id: crypto.randomUUID(),
  name: faker.person.fullName(),
  avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i + 1}`,
  createdAt: faker.date.past(),
}));

export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: Date;
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 48,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="transparent"
        className="px-0 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        onClick={() => row.toggleSelected()}
        className="flex items-center gap-2 rounded-md hover:bg-primary-100 cursor-pointer"
      >
        <Avatar className="aspect-square size-10 rounded-full border">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium truncate text-sm">
          {row.original.name}
        </span>
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="transparent"
        className="px-0 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const d = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(row.original.createdAt);
      const t = new Intl.DateTimeFormat("en-US").format(row.original.createdAt);
      return (
        <Tooltip>
          <TooltipTrigger>{d}</TooltipTrigger>
          <TooltipContent>
            <p>{t}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
];

interface Props {
  onSelectUser: (u: User) => void;
  onClose: () => void;
}

export const SelectUserTable: React.FC<Props> = ({ onSelectUser, onClose }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>([]);
  const [sel, setSel] = React.useState<Record<string, boolean>>({});

  const handleSel = (updater: any) => {
    let next = typeof updater === "function" ? updater(sel) : updater;
    const keys = Object.keys(next);
    if (keys.length > 1) {
      const key = keys[keys.length - 1];
      next = { [key]: true };
    }
    setSel(next);
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: handleSel,
    state: { sorting, columnFilters: filters, rowSelection: sel },
    initialState: { pagination: { pageSize: 5 } },
  });

  const one = Object.keys(sel).length === 1;
  const selectedRow = one ? table.getSelectedRowModel().rows[0] : undefined;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Filter user..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button
          disabled={!one}
          onClick={() =>
            one && selectedRow && onSelectUser(selectedRow.original)
          }
        >
          Reassign
        </Button>
      </div>
    </div>
  );
};

export default SelectUserTable;
