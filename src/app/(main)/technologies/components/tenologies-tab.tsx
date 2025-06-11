"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX, ReactElement } from "react";
import InfrastructureTabContent from "./tab-content/infrastructure-tab-content";
import SystemMGTTabContent from "./tab-content/systems-mgt-tab-content";
import AccessIDTabContent from "./tab-content/access-id-mgt-tab-content";
import LoggingTabContent from "./tab-content/logging-tab-content";
import MonitoringTabContent from "./tab-content/monitoring-tab-content";
import ScanningTabContent from "./tab-content/scanning-tab-content";
import SDLCTabContent from "./tab-content/sdlc-tab-content";
import CorpSystemTabContent from "./tab-content/corp-systems-tab-content";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    content: <SystemMGTTabContent />,
  },
  {
    value: "access-id-mgt",
    label: "Access & ID Mgt",
    content: <AccessIDTabContent />,
  },
  {
    value: "logging",
    label: "Logging",
    content: <LoggingTabContent />,
  },
  {
    value: "monitoring",
    label: "Monitoring",
    content: <MonitoringTabContent />,
  },
  {
    value: "scanning",
    label: "Scanning",
    content: <ScanningTabContent />,
  },
  {
    value: "sdlc",
    label: "SDLC",
    content: <SDLCTabContent />,
  },
  {
    value: "corp-systems",
    label: "Corp Systems",
    content: <CorpSystemTabContent />,
  },
];

function TechnologiesTab() {
  return (
    <Tabs defaultValue={tabData[0].value} className="space-y-6">
      {/* TODO need fix */}
      <TabsList className="h-auto max-w-[calc(100vw)] sticky top-0 z-10 justify-start overflow-x-auto rounded-none bg-white/20 backdrop-blur border-b border-black/10 p-0">
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
