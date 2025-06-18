"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AssessmentQuestionForm from "../forms/assignment-question-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const CreateQuestionModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"transparent"}>Add Question</Button>
      </DialogTrigger>
      <DialogContent className="md:rounded-none max-w-xl bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle>Create Question for Universal Assessment</DialogTitle>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] overflow-y-auto">
          <AssessmentQuestionForm onClose={() => setOpen(false)} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionModal;
