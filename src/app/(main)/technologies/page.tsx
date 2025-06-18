/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { useState, useEffect } from "react";

const TechnologiesPage = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["technology", user?.organization],
    queryFn: () => getTechnologyQueryFn(user?.organization || ""),
    enabled: !!user?.organization,
  });
  console.log(user, "organization");

  console.log(data, "technologies");
  const technologies = data?.data?.technologies;

  // Helper function to get saved value for a specific question

  // @ts-ignore
  const getSavedValue = (categorySlug, questionLabel) => {
    if (!technologies) return "";

    const category = technologies.find((cat) => cat.slug === categorySlug);
    if (!category) return "";

    const item = category.items.find((item) => item.question === questionLabel);
    return item ? item.answer : "";
  };

  // @ts-ignore
  // Helper function to convert answer back to option value
  const getOptionValueFromAnswer = (
    answer: string,
    options: Array<{ label: string; value: string }>
  ): string => {
    if (!answer) return "";

    // @ts-ignore
    const option = options.find((opt) => opt.label === answer);
    return option ? option.value : "other";
  };

  // Initialize form data when technologies data is loaded
  useEffect(() => {
    if (technologies) {
      const initialFormData = {};

      technologiesOption.forEach((category) => {
        category.items.forEach((item) => {
          const savedAnswer = getSavedValue(category.id, item.label);
          if (savedAnswer) {
            const optionValue = getOptionValueFromAnswer(
              savedAnswer,
              item.options
            );
            // @ts-ignore

            initialFormData[item.value] = optionValue;
          }
        });
      });

      setFormData(initialFormData);
    }
  }, [technologies]);

  // @ts-ignore

  const handleSelectChange = (itemValue, selectedValue) => {
    setFormData((prev) => ({
      ...prev,
      [itemValue]: selectedValue,
    }));
  };

  const handleSave = () => {
    console.log("Form data to save:", formData);
    // Implement your save logic here
  };

  console.log({ technologies, formData });

  return (
    <div className=" @container w-full">
      <Tabs defaultValue={technologiesOption[0].id}>
        <div className="p-6 backdrop-blur bg-white/10 space-y-6 w-full border-b border-black/10 pb-0 sticky top-0 z-10 ">
          <h1 className="font-semibold text-lg inline-flex items-center gap-2">
            Technologies
            <InfoCircle className="size-4 stroke-secondary" />
          </h1>

          {/* todo change this to actual loading skeleton */}
          {isLoading && <div>Loading...</div>}

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
          {technologiesOption.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-4"
            >
              {category.items.map((item) => {
                // @ts-ignore

                const currentValue = formData[item.value] || "";

                return (
                  <div
                    key={item.value}
                    className="border p-4 rounded-xl space-y-2"
                  >
                    <Label className="font-semibold">{item.label}</Label>
                    {item?.description && (
                      <p className="text-xs font-medium">{item.description}</p>
                    )}
                    <Select
                      value={currentValue}
                      onValueChange={(val) =>
                        handleSelectChange(item.value, val)
                      }
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
                        <SelectItem value={"other"}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </div>
      </Tabs>

      <div className="fixed right-8 bottom-8">
        <Button className="rounded-xl" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default TechnologiesPage;
