"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import AvailableFrameworksList from "./available-frameworks-list";
import MyFrameworksList from "./my-frameworks-list";

const MyFrameworks = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b my-6 pb-6">
        <div className="space-y-1">
          <h1 className="font-medium text-xl">Frameworks already setup</h1>
          <p className="text-sm text-gray-500">
            Content for these frameworks has already been imported and setup.
          </p>
        </div>
        <Link href={"/frameworks/new"} className={cn(buttonVariants())}>
          <PlusIcon size={20} />
          Add Framework
        </Link>
      </div>
      <MyFrameworksList />
      <AvailableFrameworksList />
    </div>
  );
};

export default MyFrameworks;
