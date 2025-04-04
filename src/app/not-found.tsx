"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="w-full h-dvh flex text-center items-center justify-center flex-col">
      <div className="aspect-auto p-3 border rounded-xl">
        <SearchIcon className="size-6" />
      </div>
      <h1 className="text-2xl mt-6 font-bold">Page not found</h1>
      <p className="mt-6 text-xl">
        The page you are looking for does&apos;t exist. <br />
        Here are some helpful links:
      </p>
      <div className="flex items-center gap-3 mt-12">
        <Button variant={"outline"} className="md:py-7" onClick={router.back}>
          <ChevronLeftIcon /> Go Back
        </Button>
        <Link href={"/"} className={cn(buttonVariants(), "md:py-7")}>
          Take me home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
