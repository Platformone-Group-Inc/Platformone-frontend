import Rings from "@/components/icons/rings";
// import { BgRingIcon } from "@/components/ui/bg-ring-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ram2 } from "iconsax-react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const NoFrameworks = () => {
  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center w-full">
      <div className="max-h-[500px] flex flex-col items-center justify-center text-center gap-6 relative">
        <div className="relative">
          <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-primary-100 p-3 stroke-primary">
            <Ram2 size={24} strokeWidth={2} />
          </div>
          <Rings className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto scale-125 text-primary " />
        </div>

        {/* <BgRingIcon>
        <Ram2 size={24} strokeWidth={2} />
      </BgRingIcon> */}

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">No Framework Added</h2>
          <p className="text-sm text-muted-foreground leading-snug">
            Import a framework to start mapping policies, risks and controls.
          </p>
        </div>

        <Link
          href="/frameworks/new"
          className={cn(
            buttonVariants(),
            "relative gap-2 px-5 py-2.5 h-auto font-medium"
          )}
        >
          <PlusIcon className="size-4" />
          Add framework
        </Link>
      </div>
    </div>
  );
};

export default NoFrameworks;
