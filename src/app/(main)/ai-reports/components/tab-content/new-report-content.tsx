"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon, MailboxIcon, SaveIcon } from "lucide-react";

const NewReportContent = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Frameworks</h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-2xl p-4 space-y-2">
              <h3 className="text-sm font-semibold text-black">
                Plan of Action & Milestone (POA&M)
              </h3>
              <p className="text-xs text-secondary-400">
                A document for a system that “identifies tasks needing to be
                accomplished. It details resources required to accomplish the
                elements of the plan, any milestones in meeting the tasks, and
                scheduled completion dates for the milestones.
              </p>
              <div className="flex mt-2 w-full items-center gap-2">
                <Button
                  variant={"transparent"}
                  className="text-primary-700 text-sm px-3"
                >
                  <DownloadIcon className="size-4" /> Download
                </Button>
                <Button
                  variant={"transparent"}
                  className="text-primary-700 text-sm px-3"
                >
                  <MailboxIcon className="size-4" /> Mail
                </Button>
                <Button
                  variant={"transparent"}
                  className="text-primary-700 text-sm px-3"
                >
                  <SaveIcon className="size-4" /> Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Documents</h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-2xl p-4 space-y-2">
              <h3 className="text-sm font-semibold text-black">
                Plan of Action & Milestone (POA&M)
              </h3>
              <p className="text-xs text-secondary-400">
                A document for a system that “identifies tasks needing to be
                accomplished. It details resources required to accomplish the
                elements of the plan, any milestones in meeting the tasks, and
                scheduled completion dates for the milestones.
              </p>
              <div className="flex mt-2 w-full items-center gap-2">
                <Button
                  variant={"transparent"}
                  className="text-primary-700 text-sm px-3"
                >
                  <DownloadIcon className="size-4" /> Download
                </Button>
                <Button
                  variant={"transparent"}
                  className="text-primary-700 text-sm px-3"
                >
                  <MailboxIcon className="size-4" /> Mail
                </Button>
                <Button
                  variant={"transparent"}
                  className="text-primary-700 text-sm px-3"
                >
                  <SaveIcon className="size-4" /> Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewReportContent;
