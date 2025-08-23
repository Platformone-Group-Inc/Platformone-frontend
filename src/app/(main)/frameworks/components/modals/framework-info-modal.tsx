/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddedFrameworkBadge from "../added-framework-badge";
import RadialChart from "@/components/charts/radial-chart";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  open?: boolean;
  onOpenChange?: () => void;
}

// TODO get data from API

const data: {
  percentage: number;
  title: string;
  description: string;
}[] = [
  {
    percentage: 95,
    title: " NIST SP 800-53 (Rev. 4)",
    description:
      "The control set NIST SP 800-53 (Rev. 4) fulfills 95% (104/110) of CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0) requirements.*",
  },
  {
    percentage: 61,
    title: "ISO-27001 [Controls ONLY]",
    description:
      " The control set ISO-27001 [Controls ONLY] fulfills 61% (67/110) of CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0) requirements.*",
  },
  {
    percentage: 93,
    title: "NIST 800-53 Rev 5",
    description:
      "The control set NIST 800-53 Rev 5 fulfills 93% (102/110) of CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0) requirements.*",
  },
  {
    percentage: 100,
    title: "NIST 800 171 R2",
    description:
      "The control set NIST 800 171 R2 fulfills 100% (110/110) of CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0) requirements.*",
  },
];

const FrameworkInfoModal: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogClose /> */}
      <DialogContent className="flex flex-col gap-0 p-6 space-y-6  sm:max-w-lg md:max-w-4xl ">
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
          </DialogHeader>
          <div className="inline-flex text-xs border font-medium border-info text-info rounded-md px-2.5 py-1">
            110 requirements in 14 sections to be implemented
          </div>
          <p className="text-xs text-secondary-400">
            CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0)
          </p>
          <h3 className="font-semibold">
            Implementing CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0)
          </h3>
          <p className="text-sm text-secondary-400">
            Following are the recommended and pre-mapped control sets to meet
            CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0) requirements.
          </p>
        </div>
        <ScrollArea className="h-[500px] border  rounded-md p-4 ">
          {data.map((i, index) => (
            <div
              key={index}
              className="border border-border rounded-md p-4 mb-5"
            >
              <div className="flex gap-4 ">
                {/* <div className="size-[64] rounded-full bg-success flex-shrink-0 "></div> */}
                <RadialChart value={i.percentage} size={88} />
                <div>
                  <p className="font-semibold text-sm text-secondary">
                    {i.title}
                  </p>
                  <p className="text-xs text-secondary-400">{i.description}</p>
                </div>
              </div>
              {/* <hr className="my-4" /> */}
              {/* <AddedFrameworkBadge /> */}
            </div>
          ))}
        </ScrollArea>

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
