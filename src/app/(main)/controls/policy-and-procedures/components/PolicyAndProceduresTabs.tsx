"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX, ReactElement } from "react";
import Requirements from "./tab-content/requirements";
import Implementation from "./tab-content/implementation";
import Policies from "./tab-content/policies";
import { SearchNormal } from "iconsax-react";
import AddFrameworkModal from "@/app/(main)/frameworks/components/modals/add-framework-modal";

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
    content: <Implementation />,
  },
  {
    value: "policies",
    label: "Policies",
    content: <Policies />,
  },
  {
    value: "procedure",
    label: "Procedure",
    content: <Policies />,
    // content: (
    //   <p className="p-4 text-center text-xs text-muted-foreground">
    //     Content for Procedure
    //   </p>
    // ),
  },
  {
    value: "evidence",
    label: "Evidence",
    content: (
      <div className="min-h-[500px] h-full w-full flex flex-col text-center items-center justify-center gap-4">
        {/* TODO: add mask */}
        <span className="p-3 bg-primary/10 rounded-xl">
          <SearchNormal className="size-6 stroke-primary" />
        </span>
        <div className="space-y-1">
          <h2 className="font-bold text-lg">No Evidence Found</h2>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Quam <br /> faucibus iaculis
            dictum diam.
          </p>
        </div>
        <AddFrameworkModal title="Evidence" />
      </div>
    ),
  },
  {
    value: "action-Items",
    label: "Action Items",
    content: (
      <div className="min-h-[500px] h-full w-full flex flex-col text-center items-center justify-center gap-4">
        {/* TODO: add mask */}
        <span className="p-3 bg-primary/10 rounded-xl">
          <SearchNormal className="size-6 stroke-primary" />
        </span>
        <div className="space-y-1">
          <h2 className="font-bold text-lg">No Action Items!</h2>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Quam <br /> faucibus iaculis
            dictum diam.
          </p>
        </div>
        <AddFrameworkModal title="Action Item" />
      </div>
    ),
  },
  {
    value: "risks",
    label: "Risks",
    content: (
      <div className="min-h-[500px] h-full w-full flex flex-col text-center items-center justify-center gap-4">
        {/* TODO: add mask */}
        <span className="p-3 bg-primary/10 rounded-xl">
          <SearchNormal className="size-6 stroke-primary" />
        </span>
        <div className="space-y-1">
          <h2 className="font-bold text-lg">No Risk!</h2>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Quam <br /> faucibus iaculis
            dictum diam.
          </p>
        </div>
        <AddFrameworkModal title="Risk" />
      </div>
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
