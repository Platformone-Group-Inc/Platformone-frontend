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
    label: "Identity Management",
    description: "What tool is used to manage accounts in the FR Environment?",
    placeholder: "Okta IDaaS",
  },
  {
    label: "Multi-Factor Authentication (MFA)",
    description:
      "What is MFA used to access infrastructure, web app, other entry points?",
    placeholder: "Okta Verify",
  },
  {
    label: "Multi-Factor Authentication (MFA)",
    description:
      "What is MFA used to access infrastructure, web app, other entry points?",
    placeholder: "Okta Verify",
  },
];

const ScanningTabContent = () => {
  return (
    <div className="">
      <h2 className="font-semibold mb-4">Access & ID Mgt</h2>
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

export default ScanningTabContent;
