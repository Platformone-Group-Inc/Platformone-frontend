"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentsDataTable from "./tables/documents-data-table";

export const tabData = [
  {
    label: "Documents",
    value: "documents",
    table: () => <DocumentsDataTable />,
  },
  {
    label: "Controls",
    value: "controls",
    table: () => <p>Data Table for controls</p>,
  },
  {
    label: "Evidence",
    value: "evidence",
    table: () => <p>Data Table for Evidence</p>,
  },
  {
    label: "Actions Items",
    value: "actions",
    table: () => <p>Data Table for Actions Item </p>,
  },
];

const MyWorkTab = () => {
  return (
    <Tabs defaultValue={tabData[0].value}>
      <TabsList>
        {tabData.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <tab.table />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MyWorkTab;
