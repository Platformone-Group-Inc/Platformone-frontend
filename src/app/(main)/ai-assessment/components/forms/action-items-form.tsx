"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ActionItemsForm = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm font-semibold">
          Summary
        </Label>
        <Textarea id="summary" placeholder="Summary" className="h-[100px]" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Description"
          className="h-[30px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="corrective-action" className="text-sm font-semibold">
          Corrective Action
        </Label>
        <Textarea
          id="corrective-action"
          placeholder="Corrective Action"
          className="h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Input placeholder="Responsible Person" />
        <Input placeholder="Responsible Person" />
        <Input placeholder="Responsible Person" />
        <Input placeholder="Responsible Person" />
        <Input placeholder="Responsible Person" />
        <Input placeholder="Responsible Person" />
        <Input placeholder="Responsible Person" />
      </div>
    </div>
  );
};

export default ActionItemsForm;
