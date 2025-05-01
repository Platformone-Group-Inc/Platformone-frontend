"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AssessmentTableAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Add Questions</DropdownMenuItem>
        <DropdownMenuItem>Upload Questions</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AssessmentTableAction;
