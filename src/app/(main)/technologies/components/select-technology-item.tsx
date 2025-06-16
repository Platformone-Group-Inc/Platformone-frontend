"use client";

import { TechnologyItem } from "@/services/operations/Technology";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  item: TechnologyItem;
}

const SelectTechnologyItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="border p-4 rounded-xl space-y-1.5">
      <p className="font-semibold mb-4 ">{item.question}</p>
      <Select>
        <SelectTrigger className=" w-full max-w-3xl">
          <SelectValue placeholder={item.question} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTechnologyItem;
