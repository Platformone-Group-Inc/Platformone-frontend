"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag, TagInput } from "emblor";
import { useState } from "react";

const tags = [
  {
    id: "1",
    text: "User 1",
  },
];

const SecurityPersonnel = () => {
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-base font-semibold">Security Personnel</h2>
        <p className="text-sm text-gray-600">
          Provide the names & contact details of key information security
          personnel.
        </p>
      </div>
      {/* TODO add drop down */}
      <form className="space-y-4 max-w-[550px]">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Organization Details</Label>
          {/* TODO add user avatar */}
          <TagInput
            id="input-57"
            tags={exampleTags}
            setTags={(newTags) => {
              setExampleTags(newTags);
            }}
            placeholder="Select or type to add"
            styleClasses={{
              inlineTagsContainer:
                "border-input rounded-lg shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
              input:
                "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
              tag: {
                body: "h-7 relative border border-input bg-transparent hover:bg-primary-100 rounded-lg font-medium text-xs ps-2 pe-7 flex",
                closeButton:
                  "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-secondary/80 hover:text-secondary",
              },
            }}
            activeTagIndex={activeTagIndex}
            setActiveTagIndex={setActiveTagIndex}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Organization Details</Label>
          <Input placeholder="Search for Employees" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Organization Details</Label>
          <Input placeholder="Search for Employees" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Organization Details</Label>
          <Input placeholder="Search for Employees" />
        </div>
      </form>
    </>
  );
};

export default SecurityPersonnel;
