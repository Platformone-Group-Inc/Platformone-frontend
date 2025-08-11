"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// tabs content
import OrganizationTabContent from "./tab-content/organization-tab-content";
import SecurityTabContent from "./tab-content/security-tab-content";
import InfoSystemTabContent from "./tab-content/info-system-tab-content";

export const systemTabs = [
  {
    value: "organization",
    label: "Organization",
    content: OrganizationTabContent,
  },
  // {
  //   value: "security",
  //   label: "Security Personnel",
  //   content: SecurityTabContent,
  // },
  {
    value: "info-system",
    label: "Info System",
    content: InfoSystemTabContent,
  },
  //   {
  //     value: "organization",
  //     label: "Organization",
  //     content: () => null,
  //   },
];

export const SystemTabs = () => {
  return (
    <Tabs defaultValue={systemTabs[0].value}>
      <div className="p-6 bg-white space-y-6 w-full border-b border-black/10 pb-0 sticky top-0 z-10 ">
        <h1 className="px-2 font-semibold text-lg inline-flex items-center gap-2">
          System Information
        </h1>

        <TabsList className="flex h-auto w-full flex-wrap justify-start rounded-none p-0 @lg:flex-nowrap @lg:overflow-x-auto @lg:whitespace-nowrap">
          {systemTabs.map((i) => (
            <TabsTrigger
              key={i.value}
              value={i.value}
              className="relative h-auto px-5 rounded-none text-secondary-600 font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:text-primary-600 data-[state=active]:bg-primary-100 data-[state=active]:shadow-none data-[state=active]:after:bg-primary-600"
            >
              {i.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="px-6 my-6 max-w-3xl">
        {systemTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-4">
            <tab.content />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
