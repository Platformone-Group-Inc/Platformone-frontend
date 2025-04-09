"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { XIcon } from "lucide-react";
import NewRiskForm from "../forms/new-risk-form";

interface Props {
  open?: boolean;
  onOpenChange?: () => void;
}

const NewRiskModal: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex bg-white flex-col gap-0 p-6 space-y-6  sm:max-w-lg [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              Create Risk
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
        </div>
        <NewRiskForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewRiskModal;
