"use client";

import { Button } from "@/components/ui/button";
import { InfoCircle } from "iconsax-react";
import { ArrowLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";

import AssessmentTable from "../components/assesment-table";
import FilterModal from "../components/modals/filter-modal";
import AssessmentTableAction from "../components/table-actions";
import { useParams, useRouter } from "next/navigation";
import { useSubmitAssignment } from "@/services/mutations/Assignment";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  getAssignmentsByOrganizationQueryFn,
  getAssignmentStatQueryFn,
} from "@/services/operations/Assignments";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | "n/a">>(
    {}
  );

  const {
    data: assignments,
    isLoading: assignmentsLoading,
    error: assignmentsError,
  } = useQuery({
    queryKey: ["assignments", params.id],
    queryFn: () => getAssignmentsByOrganizationQueryFn(params.id as string),
    enabled: !!params.id,
  });

  const {
    data: assignmentsStats,
    isLoading: assignmentsStatsLoading,
    error: assignmentsStatsError,
  } = useQuery({
    queryKey: ["assignmentsStats", params.id],
    queryFn: () => getAssignmentStatQueryFn(params.id as string),
    enabled: !!params.id,
  });

  console.log(assignmentsStats, "assignmentsStats");

  useEffect(() => {
    if (assignments && assignments.length > 0) {
      const existingAnswers: Record<string, "yes" | "no" | "n/a"> = {};

      assignments.forEach((assignment: any) => {
        if (assignment.answer) {
          existingAnswers[assignment._id] = assignment.answer;
        } else if (assignment.response) {
          existingAnswers[assignment._id] = assignment.response;
        } else if (assignment.value) {
          existingAnswers[assignment._id] = assignment.value;
        }
      });

      setAnswers(existingAnswers);
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
      queryClient.invalidateQueries({ queryKey: ["assignments", params.id] });
      console.log("Assignment submitted:", data);
    },
    onError: (error) => {
      console.error("Submission failed:", error);
    },
  });

  const handleSave = () => {
    const result = Object.entries(answers).map(([_id, answer]) => ({
      _id,
      answer,
    }));

    submitAssignment.mutate(result);
    console.log("All Answers:", result);
  };

  if (assignmentsLoading) {
    return <div>Loading...</div>;
  }

  if (assignmentsError) {
    return <div>Error loading assignments</div>;
  }

  return (
    <div className="p-6 w-full">
      <div className="space-y-1 border-b pb-6 flex items-center justify-between">
        <div className="space-y-3">
          <h1 className="font-semibold text-xl inline-flex gap-1 items-center">
            {assignmentsStats?.frameworkName} GAP Assessment
            <InfoCircle className="stroke-secondary size-4" />
          </h1>
          <div className="text-sm space-y-3">
            <Button
              variant={"transparent"}
              onClick={router.back}
              size={"icon"}
              className="inline-flex items-center gap-3 !text-black !stroke-black fill-black"
            >
              <ArrowLeftIcon size={20} />
            </Button>
            Showing 1 - {assignmentsStats?.answerStats?.totalAssignments}{" "}
            Questions
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AssessmentTableAction />
          <FilterModal />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
      <AssessmentTable
        frameworkId={params.id as string}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        assignments={assignments}
      />
    </div>
  );
};

export default Page;
