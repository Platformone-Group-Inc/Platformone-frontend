"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActionItemsContent from "./tab-contents/action-items-content";
import PlanMilestonesContent from "./tab-contents/plan-milestones-content";
import MappingsContent from "./tab-contents/mappings-content";

const tabData = [
  {
    value: "action-items",
    label: "Action Items",
    content: ActionItemsContent,
  },
  {
    value: "plan-milestones",
    label: "Plan & Milestones",
    content: PlanMilestonesContent,
  },
  {
    value: "mappings",
    label: "Mappings",
    content: MappingsContent,
  },
  {
    value: "documents",
    label: "Documents",
    content: function DocumentsContent() {
      return <p>Documents Content</p>;
    },
  },
  {
    value: "comments",
    label: "Comments",
    content: function CommentsContent() {
      return <p>Comments Content</p>;
    },
  },
  {
    value: "activities",
    label: "Activities",
    content: function ActivitiesContent() {
      return <p>Activities Content</p>;
    },
  },
];

const NewActionModalTab = () => {
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

export default NewActionModalTab;
