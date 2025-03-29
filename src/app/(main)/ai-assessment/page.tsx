"use client";

import { Button } from "@/components/ui/button";
import { InfoCircle } from "iconsax-react";
import { ListFilterIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  return (
    <div className="p-6 w-full">
      <div className="space-y-1 border-b pb-6 flex items-center justify-between ">
        <h1 className="font-semibold text-xl inline-flex gap-1 items-center">
          CMMS GAP Assessment
          <InfoCircle className="stroke-secondary size-4" />
          {/* <Badge className="ml-3.5">Showing 1 Document</Badge> */}
        </h1>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="gap-1 rounded-lg px-3.5 font-semibold text-sm">
              <SelectValue placeholder="Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="question"
                  className="rounded-lg hover:text-primary focus:text-primary font-semibold focus:bg-primary/10"
                >
                  Add Questions
                </SelectItem>
                <SelectItem
                  value="upload"
                  className="rounded-lg hover:text-primary focus:text-primary font-semibold focus:bg-primary/10"
                >
                  Upload Questions
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant={"outline"}
            className="h-auto px-4 py-2.5 border-primary/20 rounded-lg hover:bg-primary/10"
          >
            <ListFilterIcon className="size-5 stroke-secondary-400" />

            <span className="font-semibold text-sm text-secondary-400">
              Filter
            </span>
          </Button>
        </div>
      </div>
      <div className="min-h-dvh flex items-start gap-6 w-full mt-8">hello</div>
    </div>
  );
};

export default Page;
