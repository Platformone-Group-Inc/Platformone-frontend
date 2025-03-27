"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX, ReactElement } from "react";
import InfrastructureTabContent from "./tab-content/infrastructure-tab-content";

const tabData: {
  value: string;
  label: string;
  content: ReactElement | JSX.Element;
}[] = [
  {
    value: "infrastructure",
    label: "Infrastructure",
    content: <InfrastructureTabContent />,
  },
  {
    value: "systems-mgt",
    label: "Systems/Mgt",
    content: <div>Content for Systems/Mgt</div>,
  },
  {
    value: "access-id-mgt",
    label: "Access & ID Mgt",
    content: <div>Content for Access & ID Mgt</div>,
  },
  {
    value: "logging",
    label: "Logging",
    content: <div>Content for Logging</div>,
  },
  {
    value: "monitoring",
    label: "Monitoring",
    content: <div>Content for Monitoring</div>,
  },
  {
    value: "scanning",
    label: "Scanning",
    content: <div>Content for Scanning</div>,
  },
  {
    value: "sdlc",
    label: "SDLC",
    content: <div>Content for SDLC</div>,
  },
  {
    value: "corp-systems",
    label: "Corp Systems",
    content: <div>Content for Corp Systems</div>,
  },
];

function TechnologiesTab() {
  return (
    <Tabs defaultValue={tabData[0].value} className="space-y-6">
      <TabsList className="h-auto w-full justify-start rounded-none bg-info border-b border-border bg-transparent p-0">
        {tabData?.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative h-auto px-5 rounded-none text-secondary-600 font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5  data-[state=active]:text-primary-600 data-[state=active]:bg-primary-100 data-[state=active]:shadow-none data-[state=active]:after:bg-primary-600"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabData?.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
export default TechnologiesTab;
