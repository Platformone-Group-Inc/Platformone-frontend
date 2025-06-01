"use client";

import { useEffect, useMemo,useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { useDataTable } from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/tablecheckbox";
import { EllipsisIcon } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

interface Control {
  id: string;
  controlCode: string;
  controlFamily: string;
  controlName: string;
  document: string;
  evidence: string;
  ownerName: string;
  ownerAvatar: string;
  priorities: string;
  status: string;
  actionItems: string | null;
  createdAt: Date;
}

interface ControlByControlFamilies {
  data?: any[];
  totalPages?: number;
  currentPage?: number;
}

interface ControlsTableProps {
  controlByControlFamilies: ControlByControlFamilies;
  onPageChange: (page: number) => void;
}

const ControlsTable = ({
  controlByControlFamilies,
  onPageChange,
}: ControlsTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPage = parseInt(searchParams?.get("page") || "1", 10);
  const page = Number.isNaN(queryPage) ? 1 : queryPage;

  const data: Control[] = useMemo(() => {
    return controlByControlFamilies?.data?.map((item, index) => ({
      id: item._id,
      controlCode: item.identifier,
      controlFamily: item.controlFamily?.identifier || "N/A",
      controlName: item.identifier,
      document: "N/A",
      evidence: "N/A",
      ownerName: "John Doe",
      ownerAvatar: `https://api.dicebear.com/7.x/personas/svg?seed=${index + 1}`,
      priorities: "N/A",
      status: item.status,
      actionItems: "N/A",
      createdAt: new Date(item.createdAt),
    })) || [];
  }, [controlByControlFamilies]);

  const columns: ColumnDef<Control>[] = [
{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected()}
      onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      indeterminate={row.getIsSomeSelected()}
      onChange={(e) => row.toggleSelected(e.target.checked)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
}
,
    {
      accessorKey: "controlCode",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    },
    {
      accessorKey: "controlName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Control Name" />,
      cell: ({ row }) => (
        <Link href="#" className={cn(buttonVariants({ variant: "link" }), "px-0")}>
          {row.original.controlName}
        </Link>
      ),
    },
    {
      accessorKey: "owner",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Owner" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="aspect-square size-10 rounded-full border">
            <AvatarImage src={row.original.ownerAvatar} />
            <AvatarFallback>{row.original.ownerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium truncate text-sm">{row.original.ownerName}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge
            variant={row.original.status === "implanted" ? "success" : "error"}
            size="sm"
            className="text-center capitalize"
          >
            {row.original.status}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "evidence",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Evidence" />,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge variant="success" size="sm" className="text-center capitalize">
            {row.original.evidence}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "controlFamily",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Control Family" />,
    },
    {
      accessorKey: "actionItems",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Action Items" />,
    },
    {
      accessorKey: "document",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Document" />,
    },
    {
      accessorKey: "priorities",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Priorities" />,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge variant="error" size="sm" className="text-center capitalize">
            {row.original.priorities}
          </Badge>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <Button variant="transparent" size="icon">
          <EllipsisIcon size={18} />
        </Button>
      ),
      enableSorting: false,
    },
  ];

const { table } = useDataTable({
  data,
  columns,
  pageCount: controlByControlFamilies?.totalPages || 1,
  initialState: {
    pagination: {
      pageIndex: page - 1,
      pageSize: 10,
    },
  },
  onPaginationChange: (updater) => {
    const nextPageIndex =
      typeof updater === "function"
        ? updater({ pageIndex: page - 1, pageSize: 10 }).pageIndex
        : updater.pageIndex;

    const newPage = nextPageIndex + 1;
    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.set("page", newPage.toString());

    router.push(`?${currentParams.toString()}`);
    onPageChange(newPage); 
  },
});



  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
};

export default ControlsTable;
