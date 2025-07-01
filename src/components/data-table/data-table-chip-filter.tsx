import type { Column } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChipsFilterProps<T> {
  column: Column<T, unknown>;
  options: string[];
  title: string;
}

export function ChipsFilter<T>({
  column,
  options,
  title,
}: ChipsFilterProps<T>) {
  const selectedValues = (column.getFilterValue() as string[]) || [];

  const toggleValue = (value: string) => {
    const currentValues = selectedValues;
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    column.setFilterValue(newValues.length > 0 ? newValues : undefined);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{title}:</p>
      <div className="flex flex-wrap gap-1">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <Badge
              key={option}
              variant={isSelected ? "default" : "secondary"}
              className={cn(
                "cursor-pointer text-xs hover:bg-primary hover:text-primary-foreground transition-colors",
                isSelected && "bg-primary text-primary-foreground"
              )}
              onClick={() => toggleValue(option)}
            >
              {option}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
