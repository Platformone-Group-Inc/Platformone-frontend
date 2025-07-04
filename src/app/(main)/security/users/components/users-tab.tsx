"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import NewReportContent from "./tab-content/new-report-content";
import DemoDataTable from "@/app/(main)/controls/control-old/demo-data-table";

const tabData = [
  {
    value: "active",
    label: "Active",
    content: () => <DemoDataTable />,
  },
  {
    value: "inactive",
    label: "Inactive",
    content: () => <DemoDataTable />,
  },
  {
    value: "pending",
    label: "Pending",
    content: NewReportContent,
  },
];

const UsersTab = () => {
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
          <tab.content />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default UsersTab;
