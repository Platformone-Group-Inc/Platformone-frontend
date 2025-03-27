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
    placeholder: "AWS",
    label: "Infrastructure as a Service (IaaS) or CSP-managed?",
  },
  {
    placeholder: "Infrastructure as a Service (IaaS) or CSP-managed?",
    label: "AWS Route53",
  },
  {
    placeholder: "Firewalls/WAF",
    label: "Akamai",
  },
  {
    placeholder: "Proxy Servers",
    label: "Squid",
  },
  {
    placeholder: "VPNs",
    label: "Palo Alto",
  },
  {
    placeholder: "Load Balancer",
    label: "AWS ELB",
  },
  {
    placeholder: "AWS",
    label: "Infrastructure as a Service (IaaS) or CSP-managed?",
  },
  {
    placeholder: "Infrastructure as a Service (IaaS) or CSP-managed?",
    label: "AWS Route53",
  },
  {
    placeholder: "Firewalls/WAF",
    label: "Akamai",
  },
  {
    placeholder: "Proxy Servers",
    label: "Squid",
  },
  {
    placeholder: "VPNs",
    label: "Palo Alto",
  },
  {
    placeholder: "Load Balancer",
    label: "AWS ELB",
  },
  // {
  //   placeholder: "",
  //   label: "",
  // },
];

const InfrastructureTabContent = () => {
  return (
    <div>
      <h2 className="font-semibold">Infrastructure</h2>
      <div className="space-y-4 w-full max-w-3xl">
        {data.map((item, index) => (
          <div key={index} className=" space-y-1.5">
            <Label htmlFor={`${index}`}>{item.label}</Label>
            <Select>
              <SelectTrigger id={index.toString()}>
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

export default InfrastructureTabContent;
