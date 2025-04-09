"use client";

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

const data = [
  {
    label: "Operating System(s)",
    description:
      "What OS is used across the entire FedRAMP environment? If more than one, list all.",
    placeholder: "RHEL",
  },
  {
    label: "Database(s)",
    description: "What DBs & versions are in use? If more than one, list all.",
    placeholder: "Mongo DB",
  },
  {
    label: "Operating System(s)",
    description:
      "What OS is used across the entire FedRAMP environment? If more than one, list all.",
    placeholder: "RHEL",
  },
  {
    label: "Database(s)",
    description: "What DBs & versions are in use? If more than one, list all.",
    placeholder: "Mongo DB",
  },
  {
    label: "Operating System(s)",
    description:
      "What OS is used across the entire FedRAMP environment? If more than one, list all.",
    placeholder: "RHEL",
  },
  {
    label: "Database(s)",
    description: "What DBs & versions are in use? If more than one, list all.",
    placeholder: "Mongo DB",
  },
  {
    label: "Operating System(s)",
    description:
      "What OS is used across the entire FedRAMP environment? If more than one, list all.",
    placeholder: "RHEL",
  },
  {
    label: "Database(s)",
    description: "What DBs & versions are in use? If more than one, list all.",
    placeholder: "Mongo DB",
  },
  {
    label: "Operating System(s)",
    description:
      "What OS is used across the entire FedRAMP environment? If more than one, list all.",
    placeholder: "RHEL",
  },
  {
    label: "Database(s)",
    description: "What DBs & versions are in use? If more than one, list all.",
    placeholder: "Mongo DB",
  },
  {
    label: "Operating System(s)",
    description:
      "What OS is used across the entire FedRAMP environment? If more than one, list all.",
    placeholder: "RHEL",
  },
  {
    label: "Database(s)",
    description: "What DBs & versions are in use? If more than one, list all.",
    placeholder: "Mongo DB",
  },
];

const SystemMGTTabContent = () => {
  return (
    <div className="">
      <h2 className="font-semibold mb-4">Systems/Mgt</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-1.5">
            <Label htmlFor={`${index}`} className="font-semibold text-base">
              {item.label}
            </Label>
            <p className="text-sm ">{item.description}</p>
            <Select>
              <SelectTrigger
                id={index.toString()}
                className=" w-full max-w-3xl"
              >
                <SelectValue placeholder={item.placeholder} />
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
        ))}
      </div>
    </div>
  );
};

export default SystemMGTTabContent;
