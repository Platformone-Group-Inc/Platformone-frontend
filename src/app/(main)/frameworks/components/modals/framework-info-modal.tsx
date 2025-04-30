/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { XIcon } from "lucide-react";
import AddedFrameworkBadge from "../added-framework-badge";

interface Props {
  open?: boolean;
  onOpenChange?: () => void;
}

const FrameworkInfoModal: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogClose /> */}
      <DialogContent className="flex flex-col gap-0 p-6 space-y-6 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJSRyd-WENuShraJJsJ22fdVvoKTztuuZ4A&s"
              alt=""
              className="size-10 rounded-xl"
            />
            <DialogTitle className="text-xl font-semibold">
              Fedramp (Rev5) Moderate Baseline
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
          <div className="inline-flex text-xs border font-medium border-info text-info rounded-md px-2.5 py-1">
            123 requirements in 2 sections to be implemented
          </div>
          <p className="text-sm text-secondary-400">
            Low Impact is most appropriate for CSOs where the loss of
            confidentiality, integrity, and availability would result in limited
            adverse effect on an agency&apos;s operations, assets, or
            individuals.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-secondary">
            Implementing Fedramp (Rev5) Low Baseline
          </h3>
          <p className="text-sm text-secondary-600">
            Following are the recommended and pre-mapped control sets to meet
            Fedramp (Rev5) Low Baseline requirements.
          </p>
        </div>
        <div className="border border-border rounded p-4">
          <div className="flex gap-4 ">
            <div className="size-[64] rounded-full bg-success flex-shrink-0 "></div>
            <div>
              <p className="font-semibold text-sm text-secondary">
                FedRAMP Moderate (800-53 Rev. 5)
              </p>
              <p className="text-xs text-secondary-400">
                The control set FedRAMP Moderate (800-53 Rev. 5) fulfills 100%
                (323/323) of Fedramp (Rev5) Moderate Baseline requirements.*
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <AddedFrameworkBadge />
        </div>
        <p className="text-xs text-secondary-400">
          * % mapped indicates the percentage of requirements in Fedramp (Rev5)
          Moderate Baseline which map to atleast one control in the control set.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default FrameworkInfoModal;
