"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ListFilterIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FilterModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-auto px-4 py-2.5 border-primary/20 rounded-lg hover:bg-primary/10"
        >
          <ListFilterIcon className="size-5 stroke-secondary-400" />

          <span className="font-semibold text-sm text-secondary-400">
            Filter
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" flex bg-white flex-col gap-0 p-3 space-y-6 sm:rounded-none sm:max-w-xl [&>button:last-child]:hidden">
        <div className="space-y-4 px-3">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              Filter Questions
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
        </div>
        <div className="space-y-6 ">
          <Select>
            <SelectTrigger className="gap-1 rounded-lg px-3.5 font-semibold text-sm">
              <SelectValue placeholder="Responded" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="question"
                  className="rounded-lg hover:text-primary focus:text-primary font-semibold focus:bg-primary/10"
                >
                  Responded
                </SelectItem>
                <SelectItem
                  value="upload"
                  className="rounded-lg hover:text-primary focus:text-primary font-semibold focus:bg-primary/10"
                >
                  Responded
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="gap-1 rounded-lg px-3.5 font-semibold text-sm">
              <SelectValue placeholder="Filter by Response" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="question"
                  className="rounded-lg hover:text-primary focus:text-primary font-semibold focus:bg-primary/10"
                >
                  Responded
                </SelectItem>
                <SelectItem
                  value="upload"
                  className="rounded-lg hover:text-primary focus:text-primary font-semibold focus:bg-primary/10"
                >
                  Responded
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="w-full flex items-center gap-2 justify-end">
            <Button variant={"outline"}>Cancel</Button>
            <Button>Apply Filters</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
