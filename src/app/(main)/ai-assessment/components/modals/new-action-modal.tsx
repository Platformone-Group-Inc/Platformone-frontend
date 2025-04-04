"use client";

import { ModalProps } from "@/lib/types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewActionModalTab from "../new-action-modal-tab";

const NewActionModal: React.FC<ModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} defaultOpen onOpenChange={onOpenChange}>
      <DialogContent className=" flex bg-white flex-col gap-0 p-6 space-y-6 sm:rounded-none sm:max-w-4xl [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              New Action Item
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
        </div>
        <div className="space-y-6">
          <NewActionModalTab />
          <div className="w-full flex items-center justify-end">
            <Button>Create Action Item</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewActionModal;
