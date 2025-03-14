"use client";

import Rings from "@/components/icons/rings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const DeleteControlModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[400px] space-y-4">
        <div className="flex flex-col gap-2 max-sm:items-center">
          <div
            className="relative flex size-14 p-3 bg-error-500/20 text-error-500 shrink-0 items-center justify-center rounded-full"
            aria-hidden="true"
          >
            <Trash2Icon size={24} strokeWidth={2} />
            <Rings className="absolute " />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-semibold">
              Delete Control Set
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Are you sure you want to delete Control Set? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel asChild>
            <Button variant={"outline"} className="w-full">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"error"}
              className="w-full bg-error-600 text-white hover:bg-error-600"
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
