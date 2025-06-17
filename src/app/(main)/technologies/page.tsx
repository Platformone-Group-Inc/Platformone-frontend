"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoCircle } from "iconsax-react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-provider";
import { getTechnologyQueryFn } from "@/services/operations/Technology";

import { technologiesOption } from "./data";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TechnologiesPage = () => {
  const { user } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["technology", user?.organization],
    queryFn: () => getTechnologyQueryFn(user?.organization as string),
    enabled: !!user?.organization,
  });

  const technologies = data?.data?.technologies;

  console.log({ technologies });

  return (
    <div className=" @container w-full">
      <Tabs defaultValue={technologiesOption[0].id}>
        <div className="p-6 backdrop-blur bg-white/10 space-y-6 w-full border-b border-black/10 pb-0 sticky top-0 z-10 ">
          <h1 className="font-semibold text-lg inline-flex items-center gap-2">
            Technologies
            <InfoCircle className="size-4 stroke-secondary" />
          </h1>

          {/* todo change this to actual loading skeleton */}
          {/* {isLoading && "loading"} */}

          <TabsList className="flex h-auto w-full flex-wrap justify-start rounded-none p-0 @lg:flex-nowrap @lg:overflow-x-auto @lg:whitespace-nowrap">
            {technologiesOption.map((i) => (
              <TabsTrigger
                key={i.id}
                value={i.id}
                className="relative h-auto px-5 rounded-none text-secondary-600 font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:text-primary-600 data-[state=active]:bg-primary-100 data-[state=active]:shadow-none data-[state=active]:after:bg-primary-600"
              >
                {i.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="px-6 my-6 max-w-2xl">
          {technologiesOption.map((i) => (
            <TabsContent key={i.id} value={i.id} className="space-y-4">
              {i.items.map((item) => (
                <div
                  key={item.value}
                  className="border p-4 rounded-xl space-y-2"
                >
                  <Label className="font-semibold">{item.label}</Label>
                  {item?.description && (
                    <p className="text-xs font-medium">{item.description}</p>
                  )}
                  <Select
                    onValueChange={(val) => {
                      console.log(val);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {item.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </TabsContent>
          ))}
        </div>
      </Tabs>

      <div className="fixed right-8 bottom-8">
        <Button className="rounded-xl">Save</Button>
      </div>
    </div>
  );
};

export default TechnologiesPage;
