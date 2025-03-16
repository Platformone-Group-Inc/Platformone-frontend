"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";

interface Props {
  open?: boolean;
  onOpenChange?: () => void;
}

const NewPropertyModal: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex bg-white sm:ounded-none flex-col gap-0 p-6 space-y-6 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              Fedramp (Rev5) Moderate Baseline
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
        </div>
        <form className="space-y-4">
          <Input placeholder="Policy Name" className="" />
          <Input
            placeholder="How do you want to set up your policy?"
            className=""
          />
          <Input
            placeholder="Select a prebuilt policy to import content"
            className=""
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPropertyModal;
