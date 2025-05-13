"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";

const NewControlSetModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-auto px-3.5 py-2.5 rounded-lg">
          <PlusIcon className="size-5 stroke-white" />
          <span className="font-semibold text-sm">New Control Set</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center">Create Control Set</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Create control set name" />
          <Input placeholder="Control set identifier" />
          <Input placeholder="Control set owner" />
          <Textarea placeholder="Control set description" />
        </div>
        <div className="flex items-center justify-end gap-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewControlSetModal;
