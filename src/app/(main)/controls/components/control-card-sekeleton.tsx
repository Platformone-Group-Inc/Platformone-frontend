import { Skeleton } from "@/components/ui/skeleton";

const ControlCardSkeleton = () => {
  return (
    <div className="border w-full aspect-[3/4] rounded-2xl shadow-md p-4 flex flex-col gap-4 justify-between">
      <div className="flex gap-2 items-center justify-between">
        <Skeleton className="size-14  aspect-square rounded-full" />
        <Skeleton className="h-8 w-full rounded" />
      </div>
      <div className="space-y-2 flex-grow">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
      </div>
      <Skeleton className="h-10 !mt-4 w-full rounded" />
    </div>
  );
};

export default ControlCardSkeleton;
