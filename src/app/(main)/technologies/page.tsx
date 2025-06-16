"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoCircle } from "iconsax-react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-provider";
import { getTechnologyQueryFn } from "@/services/operations/Technology";
import SelectTechnology from "./components/select-technology";

const TechnologiesPage = () => {
  const { user } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["technology", user?.organization],
    queryFn: () => getTechnologyQueryFn(user?.organization as string),
    enabled: !!user?.organization,
  });

  const technologies = data?.data?.technologies;

  return (
    <div className="@container w-full">
      <Tabs>
        <div className="p-6 backdrop-blur bg-white/10 space-y-6 w-full border-b border-black/10 pb-0 sticky top-0 z-10 ">
          <h1 className="font-semibold text-lg inline-flex items-center gap-2">
            Technologies
            <InfoCircle className="size-4 stroke-secondary" />
          </h1>

          {isLoading && "loading"}

          <button
            onClick={() => {
              console.log();
            }}
          >
            click
          </button>

          <TabsList className="flex h-auto w-full flex-wrap justify-start rounded-none bg-white/20 backdrop-blur p-0 @lg:flex-nowrap @lg:overflow-x-auto @lg:whitespace-nowrap">
            {technologies?.map((technology) => (
              <TabsTrigger
                key={technology?.slug}
                value={technology?.slug}
                className="relative h-auto px-5 rounded-none text-secondary-600 font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:text-primary-600 data-[state=active]:bg-primary-100 data-[state=active]:shadow-none data-[state=active]:after:bg-primary-600"
              >
                {technology?.category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="px-6 mt-6 max-w-2xl">
          {technologies?.map((technology) => (
            <TabsContent key={technology?.slug} value={technology?.slug}>
              <SelectTechnology technology={technology} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default TechnologiesPage;
