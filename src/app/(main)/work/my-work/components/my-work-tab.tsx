"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentsDataTable from "./tables/documents-data-table";
import ControlsDataTable from "./tables/controls-data-table";
import EvidenceDataTable from "./tables/evidence-table";

export const tabData = [
  {
    label: "Documents",
    value: "documents",
    table: () => <ControlsDataTable />,
  },
  {
    label: "Controls",
    value: "controls",
    table: () => <DocumentsDataTable />,
  },
  {
    label: "Evidence",
    value: "evidence",
    table: () => <EvidenceDataTable />,
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
