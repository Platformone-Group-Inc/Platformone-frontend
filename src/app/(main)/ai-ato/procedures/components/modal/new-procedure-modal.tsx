"use client";

import { ModalProps } from "@/lib/types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NewProcedureModal: React.FC<ModalProps> = ({ open, onOpenChange }) => {
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
        <div className="space-y-6">
          <Input placeholder="Procedure Name" />
          <div className="space-y-2">
            <Label className="text-xs">
              How do you want to set up your Procedure?
            </Label>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Manage in Compliance One</SelectItem>
                <SelectItem value="dark">Upload as a document</SelectItem>
                <SelectItem value="system">
                  Provide a link to an external document
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProcedureModal;
