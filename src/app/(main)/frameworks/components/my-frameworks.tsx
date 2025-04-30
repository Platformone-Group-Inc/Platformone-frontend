"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InfoIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import FrameworksCard from "./frameworks-card";

const MyFrameworks = () => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-semibold inline-flex items-center gap-2 text-xl">
            My Frameworks
            <InfoIcon className="" size={16} />
            <Badge className="rounded-md" variant={"secondary"}>
              3 Framework
            </Badge>
          </h1>

          <p className="text-sm text-secondary-400">
            Keep track of vendor and their security ratings.
          </p>
        </div>
        <Link href={"/frameworks/new"} className={cn(buttonVariants())}>
          <PlusIcon size={20} />
          Add Framework
        </Link>
      </div>
      <div className="grid gap-6 grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <FrameworksCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default MyFrameworks;
