"use client";

import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PlanMilestonesContent = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {[
          "Planned start date",
          "Planned completion  date",
          "Actual start date",
          "Actual completion  date",
          "Cost",

          // Currency
        ].map((i) => (
          <Input key={i} placeholder={i} />
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select>
          <SelectTrigger id="currency">
            <SelectValue placeholder="United States Dollar ($)" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="milestones" className="text-sm font-bold">
          Milestones
        </Label>
        <Textarea
          id="milestones"
          placeholder="Milestones"
          className="h-[150px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="change" className="text-sm font-bold">
          Changes to milestones
        </Label>
        <Textarea
          id="change"
          placeholder="Changes to milestones"
          className="h-[70px]"
        />
      </div>
      <DateTimePicker
        hideTime
        value={new Date()}
        onChange={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
};

export default PlanMilestonesContent;
