"use client";

import { Button } from "@/components/ui/button";
// import { InfoCircle } from "iconsax-react";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useSearchParams } from "next/navigation";
import AssessmentTable from "../components/assesment-table";
// import FilterModal from "../components/modals/filter-modal";
// import AssessmentTableAction from "../components/table-actions";
import { useParams, useRouter } from "next/navigation";
import { useSubmitAssignment } from "@/services/mutations/Assignment";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  getAssignmentsByOrganizationQueryFn,
  getAssignmentStatQueryFn,
  getReportQueryFn,
} from "@/services/operations/Assignments";
import FallbackLoader from "@/components/other/fallback-loader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth-provider";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuthContext();
  const [isGenerating, setIsGenerating] = useState(false);
  // console.log(user, 'user')

  const [jumpToPage, setJumpToPage] = useState("");

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(20)
  );

  const [answers, setAnswers] = useState<
    Record<string, "yes" | "no" | "n/a" | undefined>
  >({});
  const [originalAnswers, setOriginalAnswers] = useState<
    Record<string, "yes" | "no" | "n/a" | undefined>
  >({});

  function toSafeUrl(rawUrl: string) {
    const u = new URL(rawUrl);
    u.pathname = u.pathname.split("/").map(encodeURIComponent).join("/");
    return u.toString();
  }

  const generateReportHandler = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    // const newTab = window.open("", "_blank", "noopener,noreferrer");

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
      // console.log(response?.data?.data?.task_id, 'task_id')
      // console.log(response?.data?.data?.download_url, 'download_url')

      // window.open(response?.data?.data?.download_url);
      //     const rawUrl = response?.data?.data?.download_url;
      // router.push(rawUrl)
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
  const handleJumpToPage = () => {
    const num = Number(jumpToPage);
    if (num >= 1 && num <= totalPages) {
      setPage(num);
    }
  };

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

  const handleAnswerChange = (id: string, value: "yes" | "no" | "n/a") => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

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

  const handleSave = () => {
    const changedAnswers = Object.entries(answers)
      .filter(([_id, answer]) => {
        return originalAnswers[_id] !== answer;
      })
      .map(([_id, answer]) => ({
        _id,
        answer: answer as string,
      }));
    if (changedAnswers.length > 0) {
      submitAssignment.mutate(changedAnswers);
    }
  };

  if (assignmentsLoading) {
    return <FallbackLoader />;
  }

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
            {/* <InfoCircle className="stroke-secondary size-4" /> */}
          </h1>
          <div className="flex items-center gap-4">
            {/* <AssessmentTableAction />
          <FilterModal /> */}
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

            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
        <div className="pb-4 border-b px-6">
          {/* Showing 1 - {assignmentsStats?.answerStats?.totalAssignments}{" "}
          Questions */}
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
        assignments={assignments?.assignments || []}
      />

      <div
        className={cn(
          "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8"
        )}
      >
        <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
          {page} of {pageSize} row(s) selected.
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
          <div className="flex items-center justify-center font-medium text-sm">
            Page {page} of {100}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => setPageSize((s) => s - 1)}
              // disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPageSize((s) => s - 1)}
              // disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPageSize((s) => s + 1)}
              // disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"

              // disabled={!table.getCanNextPage()}
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
