"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateQuestionModal from "./modals/create-question-modal";
import UploadQuestionsModal from "./modals/upload-questions-modal";

const AssessmentTableAction = () => {
  return (
    // todo remove this default open
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <DropdownMenuItem asChild>
          <CreateQuestionModal />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UploadQuestionsModal />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AssessmentTableAction;
