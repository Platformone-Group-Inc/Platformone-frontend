"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

import { XIcon } from "lucide-react";
import { useId } from "react";

const UpdateControlModal = () => {
  const id = useId();

  return (
    <Dialog open>
      {/* <DialogClose /> */}
      <DialogContent className="flex flex-col gap-0 p-6 space-y-6 sm:rounded-none sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              Update control status
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
          <div>
            <div className="space-y-2 min-w-[300px]">
              <Label htmlFor={id} className="text-secondary-400">
                Update status for Policy and Procedure{" "}
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  id={id}
                  className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                  <SelectItem value="1">
                    <span className="flex items-center gap-2">
                      <StatusDot className="text-success" />
                      <span className="truncate">Implemented</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="2">
                    <span className="flex items-center gap-2">
                      <StatusDot className="text-error" />
                      <span className="truncate">Not Implemented</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="3">
                    <span className="flex items-center gap-2">
                      <StatusDot className="text-error-400" />
                      <span className="truncate">Partially Implemented</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="4">
                    <span className="flex items-center gap-2">
                      <StatusDot className="text-primary-600" />
                      <span className="truncate">
                        Alternative Implementation
                      </span>
                    </span>
                  </SelectItem>
                  <SelectItem value="5">
                    <span className="flex items-center gap-2">
                      <StatusDot className="text-info" />
                      <span className="truncate">In Progress/Planned</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="6">
                    <span className="flex items-center gap-2">
                      <StatusDot className="text-secondary-400" />
                      <span className="truncate">Not Applicable</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">Update</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateControlModal;
