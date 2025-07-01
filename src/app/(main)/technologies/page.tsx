"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoCircle } from "iconsax-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-provider";
import API from "@/services/axios-client";
import { technologiesOption } from "./data";
import { getTechnologyQueryFn } from "@/services/operations/Technology";
import {
  useAddTechnology,
  useUpdateTechnology,
  useTechnologyMutation,
} from "@/services/mutations/Technology";
type FormData = Record<string, string>;

function buildResponsesFromFormData(
  formData: FormData,
  options: any
): Record<string, any> {
  const responses: Record<string, any> = {};
  options.forEach((category: any) => {
    responses[category.label] = category.items.map((item: any) => ({
      question: item.label,
      answer: formData[item.value] || "Other",
    }));
  });
  return responses;
}

const TechnologiesPage = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({});
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // --- Fetch technology data for this org ---
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["technology", user?.organization],
    queryFn: () => getTechnologyQueryFn(user?.organization),
    enabled: !!user?.organization,
    retry: false,
  });

  const technologyMutation = useTechnologyMutation(isEdit, {
    onSuccess: (data) => {
      console.log("Technology operation successful:", data);
      if (!isEdit) {
        setIsEdit(true); // Switch to edit mode after successful add
      }
    },
    onError: (error) => {
      console.error("Technology operation failed:", error);
    },
  });

  // --- Populate form on load or error (404 = add mode) ---
  useEffect(() => {
    if (data?.data?.technologies) {
      setIsEdit(true);
      setShowForm(true);
      const apiData = data.data.technologies;
      const apiMap: FormData = {};
      console.log(apiData, "apiData");
      apiData.forEach((cat) => {
        const foundCategory = technologiesOption.find(
          (c) => c.label === cat.category
        );

        if (foundCategory) {
          cat.items.forEach((item) => {
            const foundItem = foundCategory.items.find(
              (i) => i.label === item.question
            );

            if (foundItem) {
              // First try exact match with answer
              let matchingOpt = foundItem.options.find(
                (opt) => opt.label === item.answer
              );

              // If no exact match, try matching with value
              if (!matchingOpt) {
                matchingOpt = foundItem.options.find(
                  (opt) => opt.value === item.answer
                );
              }

              // If still no match, try case-insensitive comparison
              if (!matchingOpt) {
                matchingOpt = foundItem.options.find(
                  (opt) =>
                    opt.label.toLowerCase() === item.answer.toLowerCase() ||
                    opt.value.toLowerCase() === item.answer.toLowerCase()
                );
              }

              // Set the form value
              apiMap[foundItem.value] = matchingOpt?.value || "Other";

              // Debug logging to see what's happening
              if (!matchingOpt && item.answer !== "Other") {
                console.log(
                  `No match found for question: "${item.question}", answer: "${item.answer}"`
                );
                console.log(
                  "Available options:",
                  foundItem.options.map((opt) => ({
                    label: opt.label,
                    value: opt.value,
                  }))
                );
              }
            }
          });
        }
      });
      setFormData(apiMap);
    } else if (isError || (!isLoading && !data?.data?.technologies)) {
      // Show form for new entries when there's no data
      setIsEdit(false);
      setShowForm(true);
      const blankFormData: FormData = {};
      technologiesOption.forEach((category: any) => {
        category.items.forEach((item: any) => {
          blankFormData[item.value] = "";
        });
      });
      setFormData(blankFormData);
    } else if (isError) {
      // Handle other errors - don't show form
      setShowForm(false);
    }
  }, [data, isError, error, isLoading]);

  // --- Handle select change ---
  const handleSelectChange = (itemValue: string, selectedValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [itemValue]: selectedValue,
    }));
  };

  // --- Save ---
  const handleSave = async () => {
    if (!user?.organization) {
      // Optionally show a toast or error message here
      console.error("No organization ID");
      return;
    }
    const payload = {
      organizationId: user?.organization,
      responses: buildResponsesFromFormData(formData, technologiesOption),
    };

    console.log(payload);
    await technologyMutation.mutateAsync(payload);
  };

  // --- Render loading skeleton ---
  const loadingSkeleton = (
    <div className="px-6 my-6 space-y-5 max-w-2xl">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton key={i} className="h-[100px] w-full" />
      ))}
    </div>
  );

  // --- Render error (not 404) ---
  const renderError = () => {
    if (isError) {
      console.log(error);
    }
    return null;
  };

  // --- Render ---
  return (
    <div className="@container w-full">
      <Tabs defaultValue={technologiesOption[0].id}>
        <div className="p-6 bg-white space-y-6 w-full border-b border-black/10 pb-0 sticky top-0 z-10 ">
          <h1 className="font-semibold text-lg inline-flex items-center gap-2">
            Technologies
            <InfoCircle className="size-4 stroke-secondary" />
          </h1>

          {isLoading && (
            <div className="flex pb-3 h-auto w-full gap-2 flex-wrap justify-start rounded-none p-0 @lg:flex-nowrap @lg:overflow-x-auto @lg:whitespace-nowrap">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-8 w-[150px] flex-shrink-0 rounded-md"
                />
              ))}
            </div>
          )}

          {showForm && !isLoading && (
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
          )}
        </div>

        {isLoading && loadingSkeleton}

        {renderError()}

        {showForm && !isLoading && (
          <div className="px-6 my-6 max-w-2xl">
            {technologiesOption.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="space-y-4"
              >
                {category.items.map((item) => {
                  const currentValue = formData[item.value] || "";
                  return (
                    <div
                      key={item.value}
                      className="border p-4 rounded-xl space-y-2"
                    >
                      <Label className="font-semibold">{item.label}</Label>
                      {item?.description && (
                        <p className="text-xs font-medium">
                          {item.description}
                        </p>
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
                          <SelectItem value={"Other"}>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </TabsContent>
            ))}
          </div>
        )}
      </Tabs>

      {showForm && !isLoading && (
        <div className="fixed right-8 bottom-8">
          <Button
            className="rounded-xl"
            onClick={handleSave}
            disabled={technologyMutation.isPending}
          >
            {technologyMutation.isPending
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : "Save"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TechnologiesPage;
