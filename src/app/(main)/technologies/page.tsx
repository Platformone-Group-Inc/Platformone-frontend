"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
import { Input } from "@/components/ui/input";

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
  const [navigationBlocked, setNavigationBlocked] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const pendingNavigationRef = useRef<(() => void) | null>(null);
  const originalPushRef = useRef<typeof router.push | null>(null);
  const originalReplaceRef = useRef<typeof router.replace | null>(null);

  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["technology", user?.organization],
    queryFn: () => getTechnologyQueryFn(user?.organization),
    enabled: !!user?.organization,
    retry: false,
  });
  const isLoadingContent = isLoading || isInitializing;

  const shouldShowSkeleton = isLoadingContent || !user?.organization;
  const technologyMutation = useTechnologyMutation(isEdit, {
    onSuccess: () => {
      setIsEdit(true);
      setInitialData(formData);
      // If there's a pending navigation after successful save, execute it
      if (pendingNavigationRef.current) {
        const pendingNavigation = pendingNavigationRef.current;
        pendingNavigationRef.current = null;
        setNavigationBlocked(false);
        setTimeout(() => pendingNavigation(), 0);
      }
    },
  });

  // Enhanced beforeunload handler
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isDirty && !technologyMutation.isPending) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    },
    [isDirty, technologyMutation.isPending]
  );

  // Navigation blocking setup
  useEffect(() => {
    if (!originalPushRef.current) {
      originalPushRef.current = router.push;
      originalReplaceRef.current = router.replace;
    }

    const interceptNavigation = (
      originalMethod: typeof router.push,
      url: Parameters<typeof router.push>[0],
      options?: Parameters<typeof router.push>[1]
    ) => {
      if (isDirty && !navigationBlocked) {
        setNavigationBlocked(true);
        setShowDialog(true);
        pendingNavigationRef.current = () => originalMethod(url, options);
        return Promise.resolve(true); // Indicate navigation was handled
      }
      return originalMethod(url, options);
    };

    // Override router methods
    router.push = (url, options) =>
      interceptNavigation(originalPushRef.current!, url, options);
    router.replace = (url, options) =>
      interceptNavigation(originalReplaceRef.current!, url, options);

    return () => {
      // Restore original methods
      if (originalPushRef.current) {
        router.push = originalPushRef.current;
      }
      if (originalReplaceRef.current) {
        router.replace = originalReplaceRef.current;
      }
    };
  }, [isDirty, navigationBlocked, router]);

  // Browser navigation protection
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [handleBeforeUnload]);

  // History/back button protection (for browsers that support it)
  useEffect(() => {
    if (!isDirty) return;

    const handlePopState = (e: PopStateEvent) => {
      if (isDirty) {
        e.preventDefault();
        setShowDialog(true);
        pendingNavigationRef.current = () => {
          window.history.back();
        };
        // Push current state back to prevent actual navigation
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Add a dummy state to the history to catch back button
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty]);

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
      setIsInitializing(false);
      setTimeout(() => setContentLoaded(true), 100);
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
      setIsInitializing(false);
      setTimeout(() => setContentLoaded(true), 100);
    } else if (isError) {
      setShowForm(false);
      setIsInitializing(false);
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

  const handleSaveAndLeave = async () => {
    if (!user?.organization) return;

    try {
      const payload = {
        organizationId: user?.organization,
        responses: buildResponsesFromFormData(formData, technologiesOption),
      };
      await technologyMutation.mutateAsync(payload);
      // Navigation will be handled in the mutation success callback
    } catch (error) {
      console.error("Save failed:", error);
      // Keep dialog open if save fails
    }
  };

  const handleDiscardAndLeave = () => {
    setShowDialog(false);
    setNavigationBlocked(false);

    // Reset form to initial state
    setFormData(initialData);

    // Execute pending navigation
    if (pendingNavigationRef.current) {
      const pendingNavigation = pendingNavigationRef.current;
      pendingNavigationRef.current = null;
      setTimeout(() => pendingNavigation(), 0);
    }
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
    setNavigationBlocked(false);
    pendingNavigationRef.current = null;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      setNavigationBlocked(false);
      pendingNavigationRef.current = null;
    };
  }, []);

  return (
    <div className="@container w-full">
      <Tabs
        defaultValue={technologiesOption[0].id}
        onValueChange={() => {
          if (typeof window !== "undefined") {
            const rootScroll = document.querySelector("#root-scroll");
            rootScroll?.scrollIntoView({
              behavior: "smooth",
            });
          }
        }}
      >
        <div className="p-6 bg-white space-y-6 w-full border-b border-black/10 pb-0 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg inline-flex items-center gap-2">
              Technologies
              <InfoCircle className="size-4 stroke-secondary" />
            </h1>

            {isDirty && (
              <div className="text-sm text-orange-600 font-medium flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                Unsaved changes
              </div>
            )}
          </div>

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
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData[item.value] === "other" && (
                      <Input placeholder={item.label} />
                    )}
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
            <DialogTitle>You have unsaved changes</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            You have unsaved changes that will be lost if you leave this page.
            What would you like to do?
          </p>
          <DialogFooter className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleDialogCancel}
              disabled={technologyMutation.isPending}
            >
              Stay on Page
            </Button>
            <Button
              variant="error"
              onClick={handleDiscardAndLeave}
              disabled={technologyMutation.isPending}
            >
              Discard Changes
            </Button>
            <Button
              onClick={handleSaveAndLeave}
              disabled={technologyMutation.isPending}
            >
              {technologyMutation.isPending ? "Saving..." : "Save & Leave"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TechnologiesPage;
