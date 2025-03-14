"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX, ReactElement } from "react";
import Requirements from "./tab-content/requirements";

// Requirements
// Implementation
// Policies
// Procedure
// Evidence
// Action Items
// Risks

const tabData: {
  value: string;
  label: string;
  content: ReactElement | JSX.Element;
}[] = [
  {
    value: "requirements",
    label: "Requirements",
    content: <Requirements />,
  },
  {
    value: "implementation",
    label: "Implementation",
    content: (
      <p className="p-4 text-center text-xs text-muted-foreground">
        Content for Implementation
      </p>
    ),
  },
  {
    value: "policies",
    label: "Policies",
    content: (
      <p className="p-4 text-center text-xs text-muted-foreground">
        Content for Policies
      </p>
    ),
  },
  {
    value: "procedure",
    label: "Procedure",
    content: (
      <p className="p-4 text-center text-xs text-muted-foreground">
        Content for Procedure
      </p>
    ),
  },
  {
    value: "evidence",
    label: "Evidence",
    content: (
      <p className="p-4 text-center text-xs text-muted-foreground">
        Content for Evidence
      </p>
    ),
  },
  {
    value: "action-Items",
    label: "Action Items",
    content: (
      <p className="p-4 text-center text-xs text-muted-foreground">
        Content for Action Items
      </p>
    ),
  },
  {
    value: "risks",
    label: "Risks",
    content: (
      <p className="p-4 text-center text-xs text-muted-foreground">
        Content for Risks
      </p>
    ),
  },
];

function PolicyAndProceduresTabs() {
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

export default PolicyAndProceduresTabs;
