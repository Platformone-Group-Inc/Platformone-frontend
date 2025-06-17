"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentsDataTable from "./tables/documents-data-table";
// import ControlsDataTable from "./tables/controls-data-table";
import EvidenceDataTable from "./tables/evidence-table";

export const tabData = [
  {
    label: "Documents",
    value: "documents",
    table: () => <EvidenceDataTable />,
  },
  {
    label: "Controls",
    value: "controls",
    table: () => <DocumentsDataTable />,
  },
  {
    label: "Evidence",
    value: "evidence",
    // table: () => <ControlsDataTable />,
    table: () => <p>Data Table for Actions Item </p>,
  },
  {
    label: "Action Items",
    value: "actions",
    table: () => <p>Data Table for Actions Item </p>,
  },
];

const MyWorkTab = () => {
  return (
    <Tabs defaultValue={tabData[0].value}>
      <TabsList className="sticky top-0 z-10 p-1 h-auto gap-4 bg-white border">
        {tabData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="h-auto px-3.5 py-1.5 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-black/40 transition-all"
          >
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
