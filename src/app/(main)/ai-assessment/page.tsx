"use client";

import { Button } from "@/components/ui/button";
import { InfoCircle, MessageText } from "iconsax-react";
import { EllipsisVerticalIcon, ListFilterIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import NewActionModal from "./components/modals/new-action-modal";

const Page = () => {
  return (
    <div className="p-6 w-full">
      <div className="space-y-1 border-b pb-6 flex items-center justify-between ">
        <h1 className="font-semibold text-xl inline-flex gap-1 items-center">
          CMMS GAP Assessment
          <InfoCircle className="stroke-secondary size-4" />
          {/* <Badge className="ml-3.5">Showing 1 Document</Badge> */}
        </h1>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="gap-1 rounded-lg px-3.5 font-semibold text-sm">
              <SelectValue placeholder="Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="question"
                  className="rounded-lg hover:text-primary focus:text-primary font-semibold focus:bg-primary/10"
                >
                  Add Questions
                </SelectItem>
                <SelectItem
                  value="upload"
                  className="rounded-lg hover:text-primary focus:text-primary font-semibold focus:bg-primary/10"
                >
                  Upload Questions
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant={"outline"}
            className="h-auto px-4 py-2.5 border-primary/20 rounded-lg hover:bg-primary/10"
          >
            <ListFilterIcon className="size-5 stroke-secondary-400" />

            <span className="font-semibold text-sm text-secondary-400">
              Filter
            </span>
          </Button>
        </div>
      </div>
      <div className="w-full space-y-10 mt-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center border-b pb-4 gap-4 ">
            <Checkbox />
            <div className="text-sm font-medium hover:underline text-info-600 px-4 flex-grow">
              Q-AST-04.1: Does the organization determine cybersecurity and
              privacy control applicability by identifying, assigning and
              documenting the appropriate asset scope categorization for all
              systems, applications, services and personnel (internal and
              third-parties)?
            </div>
            <div className="flex items-center flex-shrink-0 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox defaultChecked />
                <Label>Yes</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <Label>No</Label>
              </div>
              {/* <div className="flex items-center gap-2">
                <Checkbox />
                <Label>Partially</Label>
              </div> */}
              <div className="flex items-center gap-2">
                <Checkbox />
                <Label>N/A</Label>
              </div>
            </div>
            <div className="text-xs flex-shrink-0">
              <p>CA.L2-3.12.3</p>
            </div>
            <Button variant={"transparent"} size={"icon"}>
              <EllipsisVerticalIcon className="size-5" />
            </Button>
            <Button variant={"transparent"} size={"icon"}>
              <MessageText className="stroke-secondary size-5" />
            </Button>
          </div>
        ))}
      </div>
      <NewActionModal />
    </div>
  );
};

export default Page;
