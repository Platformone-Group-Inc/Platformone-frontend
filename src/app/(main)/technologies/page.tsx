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

  const getSavedValue = (categorySlug: string, questionLabel: string): string => {
    if (!technologies) return "";
    
    const slugVariations = [
      categorySlug,
      categorySlug.replace('-and-', '-&-'), 
      categorySlug.replace('-&-', '-and-'), 
    ];
    
    const category = technologies.find((cat: any) => 
      slugVariations.includes(cat.slug)
    );
    if (!category) return "";
    
    
    let item = category.items.find((item: any) => item.question === questionLabel);
    
    if (!item) {
      item = category.items.find((item: any) => {
        const apiQuestion = item.question.toLowerCase();
        const optionQuestion = questionLabel.toLowerCase();
        
        if (optionQuestion.includes('mfa') && apiQuestion.includes('multi-factor')) return true;
        if (optionQuestion.includes('iam') && apiQuestion.includes('identity management')) return true;
        if (optionQuestion.includes('vulnerability scanning') && apiQuestion.includes('vulnerability')) return true;
        if (optionQuestion.includes('log management') && apiQuestion.includes('log')) return true;
        
        return false;
      });
    }
    
    return item ? item.answer : "";
  };

  const getOptionValueFromAnswer = (answer: string, options: Array<{ label: string; value: string }>): string => {
    if (!answer) return "";
    
    const option = options.find(opt => opt.label === answer);
    return option ? option.value : "other";
  };

  useEffect(() => {
    if (technologies) {
      const initialFormData: Record<string, string> = {};
      
      console.log("API Categories:", technologies.map((cat: any) => ({ slug: cat.slug, category: cat.category })));
      console.log("Options Categories:", technologiesOption.map(cat => ({ id: cat.id, label: cat.label })));
      
      technologiesOption.forEach(category => {
        console.log(`\nProcessing category: ${category.label} (${category.id})`);
        
        category.items.forEach(item => {
          const savedAnswer = getSavedValue(category.id, item.label);
          console.log(`  - Question: "${item.label}" | Saved Answer: "${savedAnswer}"`);
          
          if (savedAnswer) {
            const optionValue = getOptionValueFromAnswer(savedAnswer, item.options);
            initialFormData[item.value] = optionValue;
            console.log(`    -> Setting ${item.value} = ${optionValue}`);
          }
        });
      });
      
      setFormData(initialFormData);
    }
  }, [technologies]);

  const handleSelectChange = (itemValue: string, selectedValue: string) => {
    setFormData(prev => ({
      ...prev,
      [itemValue]: selectedValue
    }));
  };

  const handleSave = () => {
    console.log("Form data to save:", formData);
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
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              {category.items.map((item) => {
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
                      onValueChange={(val) => handleSelectChange(item.value, val)}
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