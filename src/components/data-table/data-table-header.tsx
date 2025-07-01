import { flexRender, type Header } from "@tanstack/react-table";
import { TableHead } from "@/components/ui/table";

const DataTableHeader = <TData,>({
  header,
}: {
  header: Header<TData, unknown>;
}) => {
  return (
    <TableHead
      className="relative border-r border-white"
      style={{
        width: header.getSize(),
        // width: `${header.getSize()}px`,
      }}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanResize() && (
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-border opacity-0 hover:opacity-100 hover:bg-primary"
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
        />
      )}
    </TableHead>
  );
};

export default DataTableHeader;
