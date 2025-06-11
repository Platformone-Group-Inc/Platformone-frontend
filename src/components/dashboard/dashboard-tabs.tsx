import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartsGrid from "./charts-grid";

const tabData = [
  {
    value: "tab-1",
    label: "All",
    content: () => <ChartsGrid />,
  },
  // {
  //   value: "tab-2",
  //   label: "Fedramp High",
  //   content: () => (
  //     <p className="p-4 text-center text-xs text-muted-foreground">
  //       Content for Tab 2
  //     </p>
  //   ),
  // },
];

const DashboardTab = () => {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList className="h-auto sticky top-0 bg-white/40 backdrop-blur z-10 w-full justify-start rounded-none border-b border-border/80 p-0">
        {tabData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative rounded-none py-4 px-8 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabData.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          {<tab.content />}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DashboardTab;
