"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-provider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { technologiesOption } from "./data";
import { getTechnologyQueryFn } from "@/services/operations/Technology";
import { useTechnologyMutation } from "@/services/mutations/Technology";

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
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});
  const [initialData, setInitialData] = useState<FormData>({});
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const nextRoute = useRef<string | null>(null);

  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["technology", user?.organization],
    queryFn: () => getTechnologyQueryFn(user?.organization),
    enabled: !!user?.organization,
    retry: false,
  });

  const technologyMutation = useTechnologyMutation(isEdit, {
    onSuccess: () => {
      setIsEdit(true);
      setInitialData(formData);
    },
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isDirty) {
        setShowDialog(true);
        nextRoute.current = url;
        throw "Route change blocked.";
      }
    };
    const pushState = router.push;
    router.push = (url) => {
      if (isDirty) {
        setShowDialog(true);
        nextRoute.current = url.toString();
        return;
      }
      pushState(url);
    };
    return () => {
      router.push = pushState;
    };
  }, [isDirty, router]);

  useEffect(() => {
    if (data?.data?.technologies) {
      setIsEdit(true);
      setShowForm(true);
      const apiData = data.data.technologies;
      const apiMap: FormData = {};
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
              let matchingOpt = foundItem.options.find(
                (opt) => opt.label === item.answer || opt.value === item.answer
              );
              if (!matchingOpt) {
                matchingOpt = foundItem.options.find(
                  (opt) =>
                    opt.label.toLowerCase() === item.answer.toLowerCase() ||
                    opt.value.toLowerCase() === item.answer.toLowerCase()
                );
              }
              apiMap[foundItem.value] = matchingOpt?.value || "Other";
            }
          });
        }
      });
      setFormData(apiMap);
      setInitialData(apiMap);
    } else if (isError || (!isLoading && !data?.data?.technologies)) {
      setIsEdit(false);
      setShowForm(true);
      const blankFormData: FormData = {};
      technologiesOption.forEach((category: any) => {
        category.items.forEach((item: any) => {
          blankFormData[item.value] = "";
        });
      });
      setFormData(blankFormData);
      setInitialData(blankFormData);
    } else if (isError) {
      setShowForm(false);
    }
  }, [data, isError, error, isLoading]);

  const handleSelectChange = (itemValue: string, selectedValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [itemValue]: selectedValue,
    }));
  };

  const handleSave = async () => {
    if (!user?.organization) return;
    const payload = {
      organizationId: user?.organization,
      responses: buildResponsesFromFormData(formData, technologiesOption),
    };
    await technologyMutation.mutateAsync(payload);
  };

  const handleLeave = () => {
    setShowDialog(false);
    if (nextRoute.current) {
      router.push(nextRoute.current);
      nextRoute.current = null;
    }
  };

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

        {showForm && !isLoading && (
          <div className="px-6 my-6 max-w-2xl">
            {technologiesOption.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="space-y-4"
              >
                {category.items.map((item) => (
                  <div
                    key={item.value}
                    className="border p-4 rounded-xl space-y-2"
                  >
                    <Label className="font-semibold">{item.label}</Label>
                    {item?.description && (
                      <p className="text-xs">{item.description}</p>
                    )}
                    <Select
                      value={formData[item.value] || ""}
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
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved changes</DialogTitle>
          </DialogHeader>
          <p>
            You have unsaved changes. Are you sure you want to leave this page?
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button variant="error" onClick={handleLeave}>
              Leave Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TechnologiesPage;
