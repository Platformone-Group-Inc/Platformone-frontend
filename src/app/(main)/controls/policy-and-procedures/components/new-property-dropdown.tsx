"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDownIcon, PlusIcon } from "lucide-react";
import NewPropertyModal from "./modals/new-property-modal";
import { useState } from "react";

const NewPropertyDropdown = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          // className="outline-none "
        >
          <Button
            variant={"outline"}
            className="h-auto stroke-secondary data-[state=open]:outline outline-4 outline-primary-600/10 px-3 py-2.5"
          >
            <PlusIcon className="size-5" />
            New
            <ChevronDownIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 space-y-2">
          <DropdownMenuItem asChild>
            <Button
              variant={"transparent"}
              onClick={() => setOpenModal(true)}
              className="px-3 w-full justify-normal rounded-lg cursor-pointer"
            >
              Risk
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              variant={"transparent"}
              onClick={() => setOpenModal(true)}
              className="px-3 w-full justify-normal rounded-lg cursor-pointer"
            >
              Risk
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              variant={"transparent"}
              onClick={() => setOpenModal(true)}
              className="px-3 w-full justify-normal rounded-lg cursor-pointer"
            >
              Risk
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              variant={"transparent"}
              onClick={() => setOpenModal(true)}
              className="px-3 w-full justify-normal rounded-lg cursor-pointer"
            >
              Risk
            </Button>
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <NewPropertyModal
        open={openModal}
        onOpenChange={() => setOpenModal(false)}
      />
    </>
  );
};

export default NewPropertyDropdown;
