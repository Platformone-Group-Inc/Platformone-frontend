"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/auth-provider";
import { useCloneFramework } from "@/services/mutations/Framework";

import { XIcon } from "lucide-react";

const ImportFrameworkModal = ({ framework }: any) => {
  const { user, isLoading: authLoading } = useAuthContext();
  const { mutate: cloneFramework } = useCloneFramework({
    redirectTo: "/frameworks",
    onSuccess: (data) => {
      console.log("Framework cloned:", data);
    },
  });

  const handleCloneClick = () => {
    cloneFramework({
      organizationId: user?.organization || "",
      frameworkId: framework?._id,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          radius={"full"}
          className="rounded-full border-primary text-primary hover:text-primary font-semibold w-full text-xs h-auto py-1.5"
        >
          Import Content
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-6 space-y-6 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <img
              src="https://www.sysarc.com/wp-content/uploads/2023/05/CMMC-Logo.jpeg"
              alt=""
              className="size-10 rounded-xl"
            />
            <DialogTitle className="text-xl font-semibold">
              CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0)
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
          <div className="border rounded-xl">
            <h2 className="text-base font-medium py-3 px-4">Program Name</h2>
            <hr />
            <p className="text-sm  p-4">
              CYBERSECURITY MATURITY MODEL CERTIFICATION (CMMC 2.0)
            </p>
          </div>
          <div className="border rounded-xl">
            <h2 className="text-base font-semibold py-3 px-4">Program scope</h2>
            <p className="text-sm px-4">
              The Cybersecurity Maturity Model Certification (CMMC) is a unified
              standard for implementing cybersecurity across the defense
              industrial base (DIB).
            </p>
            <hr className="mt-3" />
            <div className="flex items-center gap-3 p-4">
              <Checkbox defaultChecked id="requirements" />
              <Label htmlFor="requirements">All Requirements</Label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleCloneClick}>Start Import</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportFrameworkModal;
