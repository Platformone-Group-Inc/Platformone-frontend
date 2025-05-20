"use client";
import { useState } from "react";

import { faker } from "@faker-js/faker";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface Control {
  id: string;
  controlCode: string;
  controlName: string;

  ownerName: string;
  ownerAvatar: string;
  status: "implement" | "not implement";
  evidence: string;
  controlFamily: string;
  actionItems: string | null;
  documents: string | null;
  priorities: "high" | "mid" | "low";
}

const data: Control[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  controlCode: "adfasdf",
  controlFamily: faker.company.name(),
  controlName: faker.company.name(),
  documents: null,
  evidence: "null",
  priorities: "high",
  status: "implement",
  actionItems: null,
  ownerName: faker.person.fullName(),
  ownerAvatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i + 1}`,
}));

export function DataTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 50]);
  const [visibleCols, setVisibleCols] = useState<string[]>([
    "name",
    "email",
    "age",
    "actions",
  ]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [sorting, setSorting] = useState<SortingState>([]);

  const filtered = data;

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const columns: ColumnDef<Control>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(val) => {
            const ids = paginated.map((u) => u.id);
            setSelectedRows((prev) =>
              val
                ? [...new Set([...prev, ...ids])]
                : prev.filter((id) => !ids.includes(id))
            );
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRows.includes(row.original.id)}
          onCheckedChange={(val) => {
            setSelectedRows((prev) =>
              val
                ? [...prev, row.original.id]
                : prev.filter((id) => id !== row.original.id)
            );
          }}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "controlCode",
      header: "Code",
    },
    {
      accessorKey: "controlName",
      header: "Control Name",
    },
    {
      accessorKey: "ownerName",
      header: "Owner",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.ownerAvatar} />
            <AvatarFallback>{row.original.ownerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{row.original.ownerName}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "evidence",
      header: "Evidence",
    },
    {
      accessorKey: "controlFamily",
      header: "Control Family",
    },

    {
      accessorKey: "actionItems",
      header: "Action Items",
    },

    {
      accessorKey: "documents",
      header: "Documents",
    },
    {
      accessorKey: "priorities",
      header: "Priorities",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({}) => (
        <Button
          variant="outline"
          size="sm"
          //   onClick={() => alert(`Edit ${row.original.name}`)}
        >
          Edit
        </Button>
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: paginated,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    manualPagination: true,
    pageCount: Math.ceil(filtered.length / perPage),
  });

  const displayedColumns = table
    .getAllColumns()
    .filter((col) => col.getCanSort() || visibleCols.includes(col.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Table</h1>
        <div>
          {selectedRows.length > 0 && (
            <div className="flex justify-between items-center">
              <Button
                variant="error"
                onClick={() =>
                  alert(`Delete users: ${selectedRows.join(", ")}`)
                }
              >
                Delete Selected
              </Button>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {columns.map((col) => {
                const key = col.aggregatedCell as string;
                if (!key) return null;
                return (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={visibleCols.includes(key)}
                    onCheckedChange={() => {
                      setVisibleCols((prev) =>
                        prev.includes(key)
                          ? prev.filter((k) => k !== key)
                          : [...prev, key]
                      );
                    }}
                  >
                    {key}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " \u25B2"
                    : header.column.getIsSorted() === "desc"
                    ? " \u25BC"
                    : null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {Math.ceil(filtered.length / perPage)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(filtered.length / perPage))
            )
          }
          disabled={page === Math.ceil(filtered.length / perPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const TablePage = () => {
  return (
    <div className="min-h-screen p-4">
      <DataTable />
    </div>
  );
};

export default TablePage;
