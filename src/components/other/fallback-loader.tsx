import { Loader2Icon } from "lucide-react";

const FallbackLoader = () => {
  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex-1 h-full flex items-center justify-center flex-col gap-4 font-medium text-sm">
      <Loader2Icon className="size-14 animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

export default FallbackLoader;
