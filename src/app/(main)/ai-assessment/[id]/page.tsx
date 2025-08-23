"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ClockIcon,
  Loader2,
  Check,
  TriangleAlertIcon,
  Loader2Icon,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { useDebouncedCallback } from "@mantine/hooks";

import AssessmentTable from "../components/assesment-table";
import { useParams, useRouter } from "next/navigation";
import { useSubmitAssignment } from "@/services/mutations/Assignment";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  getAssignmentsByOrganizationQueryFn,
  getAssignmentStatQueryFn,
  getReportQueryFn,
} from "@/services/operations/Assignments";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth-provider";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const { user } = useAuthContext();
  const [isGenerating, setIsGenerating] = useState(false);

  // const [jumpToPage, setJumpToPage] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(20)
  );

  const [answers, setAnswers] = useState<
    Record<string, "yes" | "no" | "n/a" | undefined>
  >({});

  const [saveStatus, setSaveStatus] = useState<
    "saved" | "saving" | "pending" | "error"
  >("saved");

  const [originalAnswers, setOriginalAnswers] = useState<
    Record<string, "yes" | "no" | "n/a" | undefined>
  >({});

  const generateReportHandler = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const data = {
        client_id: user?.id,
        client_name: user?.fullname,
        report_type: "CMMC",
        report_name: "GAP ANALYSIS REPORT",
        client_logo: "https://example.com/logo.png",
        client_address: [],
        organization_id: user?.organization,
        frameworkId: params?.id,
      };
      const response = await getReportQueryFn(data);
      if (response?.data?.data?.task_id) {
        toast.success("Report generation started");
        router.push("/ai-reports?from=assignment");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const {
    data: assignments,
    isLoading: assignmentsLoading,
    error: assignmentsError,
  } = useQuery({
    queryKey: ["assignments", params.id, page, pageSize],
    queryFn: () =>
      getAssignmentsByOrganizationQueryFn(params.id as string, page, pageSize),
    enabled: !!params.id,
  });

  const { data: assignmentsStats } = useQuery({
    queryKey: ["assignmentsStats", params.id],
    queryFn: () => getAssignmentStatQueryFn(params.id as string),
    enabled: !!params.id,
  });

  const totalPages = assignments?.meta?.totalPages || 1;
  const currentPageData = assignments?.assignments || [];

  // Row selection handlers
  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === currentPageData.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(
        currentPageData.map((item: any) => item._id as string)
      );
      setSelectedRows(allIds as Set<string>);
      setSelectAll(true);
    }
  };

  // Reset selection when page changes
  useEffect(() => {
    setSelectedRows(new Set());
    setSelectAll(false);
  }, [page]);

  // Update selectAll state when data changes
  useEffect(() => {
    if (currentPageData.length > 0) {
      const allSelected = currentPageData.every((item: any) =>
        selectedRows.has(item._id)
      );
      setSelectAll(allSelected && selectedRows.size > 0);
    }
  }, [selectedRows, currentPageData]);

  // const handleJumpToPage = () => {
  //   const num = Number(jumpToPage);
  //   if (num >= 1 && num <= totalPages) {
  //     setPage(num);
  //     setJumpToPage("");
  //   }
  // };

  useEffect(() => {
    if (assignments?.assignments && assignments?.assignments?.length > 0) {
      const existingAnswers: Record<string, "yes" | "no" | "n/a" | undefined> =
        {};
      assignments?.assignments?.forEach((assignment: any) => {
        const answer =
          assignment.answer || assignment.response || assignment.value;
        if (
          answer &&
          answer !== "" &&
          (answer === "yes" || answer === "no" || answer === "n/a")
        ) {
          existingAnswers[assignment._id] = answer;
        } else {
          existingAnswers[assignment._id] = undefined;
        }
      });
      setAnswers(existingAnswers);
      setOriginalAnswers({ ...existingAnswers });
    }
  }, [assignments]);

  const submitAssignment = useSubmitAssignment({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["assignments", params.id, page, pageSize],
      });
      queryClient.invalidateQueries({
        queryKey: ["assignmentsStats", params.id],
      });
      setOriginalAnswers({ ...answers });
    },
    onError: (error) => {
      console.error("Submission failed:", error);
    },
  });

  // Create the save function
  const saveChanges = useCallback(async () => {
    const changedAnswers = Object.entries(answers)
      .filter(([_id, answer]) => {
        return originalAnswers[_id] !== answer;
      })
      .map(([_id, answer]) => ({
        _id,
        answer: answer as string,
      }));

    if (changedAnswers.length > 0) {
      setSaveStatus("saving");
      try {
        await submitAssignment.mutateAsync(changedAnswers);
        setSaveStatus("saved");
      } catch (error) {
        setSaveStatus("error");
        console.error("Save failed:", error);
      }
    }
  }, [answers, originalAnswers]);

  // Debounced version for auto-save
  const debouncedSave = useDebouncedCallback(saveChanges, 1000);

  // Handle answer changes
  const handleAnswerChange = (
    id: string,
    answer: "yes" | "no" | "n/a" | undefined
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));

    // Set status to pending when user makes changes
    setSaveStatus("pending");

    // Trigger auto-save
    debouncedSave();
  };

  // Manual save (immediate)
  const handleSave = async () => {
    debouncedSave.cancel(); // Cancel pending auto-save
    await saveChanges(); // Save immediately
  };

  // Optional: Reset error status when user makes new changes
  // const resetErrorStatus = () => {
  //   if (saveStatus === "error") {
  //     setSaveStatus("pending");
  //   }
  // };

  // Bulk operations for selected rows
  const handleBulkAnswer = (value: "yes" | "no" | "n/a") => {
    const updates: Record<string, "yes" | "no" | "n/a"> = {};
    selectedRows.forEach((id) => {
      updates[id] = value;
    });
    setAnswers((prev) => ({ ...prev, ...updates }));
  };

  if (assignmentsError) {
    return <div>Error loading assignments</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="space-y-1 py-4 px-4 flex items-center justify-between">
          <h1 className="font-semibold text-xl inline-flex gap-1 items-center">
            <Button
              variant={"transparent"}
              onClick={router.back}
              size={"icon"}
              className="rounded-full inline-flex items-center gap-3 !text-black !stroke-black fill-black"
            >
              <ArrowLeftIcon size={20} />
            </Button>
            {assignmentsStats?.frameworkName} GAP Assessment
          </h1>
          <div className="flex items-center gap-4">
            {selectedRows.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedRows.size} selected
                </span>
                <Button size="sm" onClick={() => handleBulkAnswer("yes")}>
                  Mark Yes
                </Button>
                <Button size="sm" onClick={() => handleBulkAnswer("no")}>
                  Mark No
                </Button>
                <Button size="sm" onClick={() => handleBulkAnswer("n/a")}>
                  Mark N/A
                </Button>
              </div>
            )}
            <Button
              onClick={generateReportHandler}
              disabled={
                isGenerating ||
                assignmentsStats?.answerStats?.totalAssignments !=
                  assignmentsStats?.answerStats?.answeredYes +
                    assignmentsStats?.answerStats?.answeredNo +
                    assignmentsStats?.answerStats?.answeredNA
              }
            >
              {isGenerating ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating report…
                </span>
              ) : (
                "Generate Report"
              )}
            </Button>

            {/* Manual save button */}
            <Button
              onClick={handleSave}
              disabled={saveStatus === "saved" || saveStatus === "pending"}
            >
              {saveStatus === "saving" && <Loader2 className="animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
        <div className="pb-4 border-b px-6">
          <p className="font-medium">
            Answered-{" "}
            {assignmentsStats?.answerStats?.totalAssignments -
              assignmentsStats?.answerStats?.noAnswer}{" "}
            of {assignmentsStats?.answerStats?.totalAssignments} (Yes -{" "}
            {assignmentsStats?.answerStats?.answeredYes} , No -{" "}
            {assignmentsStats?.answerStats?.answeredNo}, NA -{" "}
            {assignmentsStats?.answerStats?.answeredNA})
          </p>
        </div>
      </div>

      <AssessmentTable
        frameworkId={params.id as string}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        assignments={currentPageData}
        isLoading={assignmentsLoading}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
      />

      <div
        className={cn(
          "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8"
        )}
      >
        <div className="pl-3 flex-1 whitespace-nowrap text-muted-foreground text-sm">
          {selectedRows.size} of {currentPageData.length} row(s) selected.
        </div>

        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap font-medium text-sm">
              Rows per page
            </p>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(parseInt(value));
                setPage(1); // Reset to first page when changing page size
              }}
            >
              <SelectTrigger className="h-8 w-[4.5rem] [&[data-size]]:h-8">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap font-medium text-sm">Jump to:</p>
            <Input
              className="h-8 w-16"
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleJumpToPage();
                }
              }}
              placeholder={page.toString()}
            />
            <Button size="sm" onClick={handleJumpToPage}>
              Go
            </Button>
          </div> */}

          <div className="flex items-center justify-center font-medium text-sm">
            Page {page} of {totalPages}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <ChevronsLeft size={16} />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRight size={16} />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages}
            >
              <ChevronsRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
