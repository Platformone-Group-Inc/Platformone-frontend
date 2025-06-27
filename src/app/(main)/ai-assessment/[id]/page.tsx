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
import { getAssignmentsByOrganizationQueryFn } from "@/services/operations/Assignments";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  
  // Move answers state to parent component
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | "n/a">>({});

  // Fetch assignments data in parent component
  const {
    data: assignments,
    isLoading: assignmentsLoading,
    error: assignmentsError,
  } = useQuery({
    queryKey: ["assignments", params.id],
    queryFn: () => getAssignmentsByOrganizationQueryFn(params.id as string),
    enabled: !!params.id,
  });

  // Load existing answers when assignments data is fetched
  useEffect(() => {
    if (assignments && assignments.length > 0) {
      const existingAnswers: Record<string, "yes" | "no" | "n/a"> = {};
      
      assignments.forEach((assignment: any) => {
        // Check if assignment has an existing answer
        // Adjust the property name based on your API response structure
        // Common property names might be: answer, response, value, status, etc.
        if (assignment.answer) {
          existingAnswers[assignment._id] = assignment.answer;
        } else if (assignment.response) {
          existingAnswers[assignment._id] = assignment.response;
        } else if (assignment.value) {
          existingAnswers[assignment._id] = assignment.value;
        }
        // Add more conditions based on your API structure
      });
      
      setAnswers(existingAnswers);
    }
  }, [assignments]);

  // Handler for updating answers
  const handleAnswerChange = (id: string, value: "yes" | "no" | "n/a") => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitAssignment = useSubmitAssignment({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["assignments", params.id] });
      console.log('Assignment submitted:', data);
    },
    onError: (error) => {
      console.error('Submission failed:', error);
    }
  });

  // Save handler
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
            CMMS GAP Assessment
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
            Showing 1-50 Questions
            <p className="font-medium">
              Answered- 24 of 107 (Yes - 18, No - 1, Partially - 1, NA - 4)
            </p>
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
        assignments={assignments} // Pass assignments data
      />
    </div>
  );
};

export default Page;