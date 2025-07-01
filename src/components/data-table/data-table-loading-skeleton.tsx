import { Table } from "@tanstack/react-table";
import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const DataTableLoadingSkeleton = <T,>({
  table,
  rows = 20,
}: {
  table: Table<T>;
  rows?: number;
}) =>
  Array.from({ length: rows }).map((_, i) => (
    <TableRow key={i}>
      {table.getAllColumns().map((col) => (
        <TableCell style={{ width: col.getSize() }} key={col.id}>
          <Skeleton className="h-5 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));

export default DataTableLoadingSkeleton;
