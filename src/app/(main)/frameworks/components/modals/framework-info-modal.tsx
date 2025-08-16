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
import RadialChart from "@/components/charts/radial-chart";

interface Props {
  open?: boolean;
  onOpenChange?: () => void;
}

// TODO get data from API

const FrameworkInfoModal: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogClose /> */}
      <DialogContent className="flex flex-col gap-0 p-6 space-y-6 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <img
              src="https://assets.ctrlmap.com/assets/images/framework_logos/cmmc2.png"
              alt=""
              className="size-10 rounded-xl object-cover"
            />
            <DialogTitle className="text-xl font-semibold">
              CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0)
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
          <div className="inline-flex text-xs border font-medium border-info text-info rounded-md px-2.5 py-1">
            110 requirements in 14 sections to be implemented
          </div>
          <p className="text-sm text-secondary-400">
            Following are the recommended and pre-mapped control sets to meet
            CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0) requirements.
          </p>
        </div>
        {/* <div>
          <h3 className="font-medium text-sm text-secondary">
            Implementing Fedramp (Rev5) Low Baseline
          </h3>
          <p className="text-sm text-secondary-600">
            Following are the recommended and pre-mapped control sets to meet
            Fedramp (Rev5) Low Baseline requirements.
          </p>
        </div> */}
        <div className="border border-border rounded p-4">
          <div className="flex gap-4 ">
            {/* <div className="size-[64] rounded-full bg-success flex-shrink-0 "></div> */}
            <RadialChart value={100} size={88} />
            <div>
              <p className="font-semibold text-sm text-secondary">
                NIST SP 800-53 (Rev. 4)
              </p>
              <p className="text-xs text-secondary-400">
                The control set NIST SP 800-53 (Rev. 4) fulfills 95% (104/110)
                of CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0)
                requirements.*
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <AddedFrameworkBadge />
        </div>
        <p className="text-xs text-secondary-400">
          * % mapped indicates the percentage of requirements in CYBERSECURITY
          MATURITY MODEL CERTIFICATION (CMMC 2.0) which map to atleast one
          control in the control set.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default FrameworkInfoModal;
