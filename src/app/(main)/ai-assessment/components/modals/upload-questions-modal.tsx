"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import UploadQuestionsForm from "../forms/upload-questions-form";

const UploadQuestionsModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"transparent"}>Upload Questions</Button>
      </DialogTrigger>
      <DialogContent className="md:rounded-none max-w-xl bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle>Create Question for Universal Assessment</DialogTitle>
          </div>
        </DialogHeader>
        <UploadQuestionsForm />
      </DialogContent>
    </Dialog>
  );
};

export default UploadQuestionsModal;
