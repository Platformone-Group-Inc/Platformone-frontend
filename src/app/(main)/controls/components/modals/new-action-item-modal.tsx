"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { XIcon } from "lucide-react";
import { ModalProps } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "@/components/ui/datetime-picker";

const ActionItemsTab = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="summary">Summary</Label>
      <Textarea id="summary" className="h-[180px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti illum
        delectus nostrum. Corrupti modi, distinctio unde omnis cum ab sed!
      </Textarea>
    </div>
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" className="h-[100px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </Textarea>
    </div>
    <div className="space-y-2">
      <Label htmlFor="description">Corrective Action</Label>
      <Textarea id="description" className="h-[100px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </Textarea>
    </div>
    <div className="space-y-2">
      <DateTimePicker
        id="date"
        value={new Date()}
        onChange={(e) => {
          console.log(e);
        }}
        placeholder="Pick your target date and time"
        min={new Date()}
        use12HourFormat
      />
    </div>
    <div className="space-y-2">
      <Input placeholder="Responsible Person" />
    </div>
    <div className="space-y-2">
      <Input placeholder="Responsible Person" />
    </div>
    <div className="space-y-2">
      <Input placeholder="Responsible Person" />
    </div>
    <div className="space-y-2"></div>
  </div>
);
const MappingsTab = () => <div></div>;

const tabData = [
  {
    value: "action-items",
    label: "Action Items",
    content: ActionItemsTab,
  },
  {
    value: "mapping",
    label: "Mapping",
    content: MappingsTab,
  },
];

const NewActionItemModal: React.FC<ModalProps> = ({ onOpenChange }) => {
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="flex bg-white sm:rounded-none flex-col gap-0 p-6 space-y-6 sm:max-h-[min(640px,80vh)] overflow-y-scroll sm:max-w-2xl [&>button:last-child]:hidden">
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              New Action Item
            </DialogTitle>
            <DialogClose className="ml-auto">
              <XIcon className=" text-placeholder" />
            </DialogClose>
          </DialogHeader>
          <Tabs defaultValue={tabData[0].value}>
            <TabsList className="h-auto gap-2 rounded-none w-full border-b border-border bg-transparent px-0 py-0.5 text-foreground">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative rounded-none mb-0 after:absolute after:inset-x-0 after:bottom-0 after:-mb-0.5 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-primary-100 data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabData.map((tab) => (
              <TabsContent key={`${tab.value}-content`} value="tab-1">
                <tab.content />
              </TabsContent>
            ))}
            <ActionItemsTab />
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewActionItemModal;
