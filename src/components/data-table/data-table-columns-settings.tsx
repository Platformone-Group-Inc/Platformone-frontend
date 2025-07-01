import React from "react";
import type { Column, Table } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsIcon, GripVerticalIcon } from "lucide-react";

import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface ColumnSettingsProps<TData> {
  table: Table<TData>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onColumnOrderChange?: (newOrder: string[]) => void;
}

const ColumnItem = <TData,>({ column }: { column: Column<TData, unknown> }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const isVisible = column.getIsVisible();
  const label =
    typeof column.columnDef.header === "string"
      ? column.columnDef.header
      : column.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "relative flex items-center space-x-3 p-2 border rounded-md shadow-sm",
        isVisible ? "bg-background" : "bg-muted",
        isDragging && "ring-2 ring-primary bg-muted z-50"
      )}
    >
      {/* Grip for drag */}
      <button type="button" {...listeners}>
        <GripVerticalIcon className="h-4 w-4 text-muted-foreground cursor-grab" />
      </button>

      <Checkbox
        checked={isVisible}
        onCheckedChange={(checked) => column.toggleVisibility(!!checked)}
      />

      <span className="flex-1 text-sm truncate">{label}</span>
    </div>
  );
};

export const ColumnSettings = <TData,>({
  table,
  open,
  onOpenChange,
  onColumnOrderChange,
}: ColumnSettingsProps<TData>) => {
  const allColumns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (col) => typeof col.accessorFn !== "undefined" && col.getCanHide()
        ),
    [table]
  );

  const initialOrder = allColumns.map((col) => col.id);
  const [columnOrder, setColumnOrder] = React.useState<string[]>(initialOrder);

  // Sync external state
  React.useEffect(() => {
    const currentOrder = table.getState().columnOrder;
    if (currentOrder.length > 0) setColumnOrder(currentOrder);
  }, [table]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columnOrder.indexOf(active.id as string);
    const newIndex = columnOrder.indexOf(over.id as string);
    const updatedOrder = [...columnOrder];

    const [moved] = updatedOrder.splice(oldIndex, 1);
    updatedOrder.splice(newIndex, 0, moved);

    setColumnOrder(updatedOrder);
    table.setColumnOrder(updatedOrder);
    onColumnOrderChange?.(updatedOrder);
  };

  const handleReset = () => {
    table.resetColumnOrder();
    allColumns.forEach((col) => col.toggleVisibility(true));
    const resetOrder = allColumns.map((col) => col.id);
    setColumnOrder(resetOrder);
  };

  const orderedColumns = React.useMemo(
    () =>
      columnOrder
        .map((id) => allColumns.find((col) => col?.id === id))
        .filter(Boolean) as Column<TData>[],
    [columnOrder, allColumns]
  );

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="size-8 aspect-square">
          <SettingsIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Column Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Manage Columns</span>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset to Default
            </Button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
          >
            <SortableContext
              items={columnOrder}
              strategy={verticalListSortingStrategy}
            >
              <ScrollArea className="h-[400px] overflow-y-auto">
                <div className="space-y-2 px-2 relative z-10">
                  {orderedColumns.map((col) => (
                    <ColumnItem key={col.id} column={col} />
                  ))}
                </div>
              </ScrollArea>
            </SortableContext>
          </DndContext>
        </div>
      </DialogContent>
    </Dialog>
  );
};
