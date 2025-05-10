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
    redirectTo: '/frameworks',
    onSuccess: (data) => {
      console.log('Framework cloned:', data);
    }
  });

  const handleCloneClick = () => {
  cloneFramework({
    organizationId: user?.organization || '',
    frameworkId: framework?._id
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
          <div className="border rounded-xl">
            <h2 className="text-base font-medium py-3 px-4">Program Name</h2>
            <hr />
            <p className="text-sm  p-4">Fedramp (Rev5) Moderate Baseline</p>
          </div>
          <div className="border rounded-xl">
            <h2 className="text-base font-semibold py-3 px-4">Program scope</h2>
            <p className="text-sm px-4">
              There are 323 objectives to be implemented for Fedramp (Rev5)
              Moderate Baseline. All requirements in Fedramp (Rev5) Moderate
              Baseline are required to be implemented for successful completion.
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
