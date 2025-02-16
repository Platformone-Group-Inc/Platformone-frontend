"use client";
import { useAiChat } from "@/store/useAiChatStore";
import ChartCard from "./chart-card";
import { cn } from "@/lib/utils";

const ChartsGrid = () => {
  const { isOpen } = useAiChat();
  return (
    <div
      className={cn(
        "grid grid-cols-1  gap-6 p-4",
        isOpen ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3"
      )}
    >
      {Array.from({ length: 21 }).map((_, i) => (
        <ChartCard key={i} />
      ))}
    </div>
  );
};

export default ChartsGrid;
