"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DownloadIcon, ExternalLinkIcon, XIcon } from "lucide-react";

import { ModalProps } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const SelectProcedureTemplateModal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog defaultOpen open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" flex bg-white flex-col gap-0 p-6 space-y-6 rounded-none sm:max-w-lg [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              Select Procedure Template
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
        </div>
        {/* <NewRiskForm /> */}
        <div className="border rounded-md w-full divide-y">
          <div className="p-4 flex items-center justify-between gap-4 text-xs">
            <div>Select All</div>
            <div className="flex-1">Templates</div>
            <div>Action</div>
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 flex items-center justify-between gap-4"
            >
              <Checkbox />
              <p className="flex-1 text-sm">
                Business Continuity & Disaster Continuity
              </p>
              <div className="flex">
                <Button
                  size={"icon"}
                  variant={"transparent"}
                  className="text-primary"
                >
                  <DownloadIcon size={14} />
                </Button>
                <Button
                  size={"icon"}
                  variant={"transparent"}
                  className="text-primary"
                >
                  <ExternalLinkIcon size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectProcedureTemplateModal;
