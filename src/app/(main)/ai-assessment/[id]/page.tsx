"use client";

import { Button } from "@/components/ui/button";
// import { InfoCircle } from "iconsax-react";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useSearchParams } from 'next/navigation'
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

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams()
  const npage = searchParams.get('page')
  const [jumpToPage, setJumpToPage] = useState('');
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(10)
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | "n/a" | undefined>>(
    {}
  );
  const [originalAnswers, setOriginalAnswers] = useState<Record<string, "yes" | "no" | "n/a" | undefined>>(
    {}
  );

  const {
    data: assignments,
    isLoading: assignmentsLoading,
    error: assignmentsError,
  } = useQuery({
    queryKey: ["assignments", params.id, page, pageSize],
    queryFn: () => getAssignmentsByOrganizationQueryFn(params.id as string, page, pageSize),
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
      const existingAnswers: Record<string, "yes" | "no" | "n/a" | undefined> = {};
      assignments?.assignments?.forEach((assignment: any) => {
        const answer = assignment.answer || assignment.response || assignment.value;
        if (answer && answer !== "" && (answer === "yes" || answer === "no" || answer === "n/a")) {
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
      queryClient.invalidateQueries({ queryKey: ["assignments", params.id, page, pageSize] });
      queryClient.invalidateQueries({ queryKey: ["assignmentsStats", params.id] });
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
            <Button onClick={()=>{console.log("report")}} disabled={assignmentsStats?.answerStats?.totalAssignments != assignmentsStats?.answerStats?.answeredYes + assignmentsStats?.answerStats?.answeredNo + assignmentsStats?.answerStats?.answeredNA}>Generate Report</Button>
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

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-2 px-4 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium whitespace-nowrap">
              Rows per page
            </p>
            <Select
              value={pageSize.toString()}
              onValueChange={(num) => setPageSize(Number(num))}
            >
              <SelectTrigger className="h-8 w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 25, 50, 100].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page info */}
          <div className="text-sm font-medium whitespace-nowrap">

            {/* TODO add final page */}
            Page {page} of 50

          </div>

          {/* Jump to page */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">
              Jump to:
            </span>
            {/* TODO kr dena sir */}
            <Input
              type="number"
              value={jumpToPage}
              placeholder="Page #"
              min={1}
              max={totalPages}
              onChange={(e) => setJumpToPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleJumpToPage();
              }}
              className="h-8 w-20"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleJumpToPage}
              disabled={
                !jumpToPage ||
                isNaN(Number(jumpToPage)) ||
                Number(jumpToPage) < 1 ||
                Number(jumpToPage) > totalPages
              }
            >
              Go
            </Button>

          </div>

          {/* Row info */}
          <div className="hidden sm:flex text-sm text-muted-foreground whitespace-nowrap">
            {/* Showing {startRow} to {endRow} of {totalCount} entries */}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPage(1);
            }}
            disabled={page === 1}
            aria-label="First Page"
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
            aria-label="Previous Page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === assignments?.meta?.totalPages}
            aria-label="Next Page"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPage(10);
            }}
            disabled={page === assignments?.meta?.totalPages}
            aria-label="Last Page"
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;