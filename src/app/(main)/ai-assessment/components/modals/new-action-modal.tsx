"use client";

import { ModalProps } from "@/lib/types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewActionModalTab from "../new-action-modal-tab";
import { ScrollArea } from "@/components/ui/scroll-area";

const NewActionModal: React.FC<ModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={"transparent"}
          className="h-auto w-full px-4 py-2.5 border-primary/20 rounded-lg hover:bg-primary/10"
        >
          Add Action Item
        </Button>
      </DialogTrigger>
      <DialogContent className=" flex bg-white flex-col gap-0 p-3 space-y-6 sm:rounded-none sm:max-w-2xl [&>button:last-child]:hidden">
        <div className="space-y-4 px-3">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              New Action Item
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
        </div>
        <div className="space-y-6 ">
          <ScrollArea className="px-3 max-h-[600px] overflow-y-scroll">
            <NewActionModalTab />
          </ScrollArea>
          <div className="w-full flex items-center justify-end">
            <Button>Create Action Item</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewActionModal;
