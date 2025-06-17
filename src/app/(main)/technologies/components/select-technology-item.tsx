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
import { technologiesOption } from "../data";

interface Props {
  slug: string;
  item: TechnologyItem;
}

const SelectTechnologyItem: React.FC<Props> = ({ slug, item }) => {
  // need review
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const options = technologiesOption[slug]?.options as {
    value: string;
    label: string;
  }[];

  return (
    <div className="border p-4 rounded-xl space-y-1.5">
      <p className="font-semibold mb-4 ">{item.question}</p>
      <Select>
        <SelectTrigger className=" w-full max-w-3xl">
          <SelectValue placeholder={item.question} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTechnologyItem;
