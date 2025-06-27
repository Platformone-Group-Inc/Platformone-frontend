import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import API from "../axios-client";
import { toast } from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

// Types for the submit assignment operation
export type SubmitAssignmentItem = {
  _id: string;
  answer: string;
};

export type SubmitAssignmentParams = SubmitAssignmentItem[];

export type SubmitAssignmentResponse = {
  success: boolean;
  message: string;
  data: any; // Replace with your specific data type
};

// API function for submitting assignments
const submitAssignmentQueryFn = async (params: SubmitAssignmentParams) => {
  return await API.post('/assignments/submit-multiple', params);
};

// Mutation hook for submitting assignments
export function useSubmitAssignment(options: {
  onSuccess?: (data: AxiosResponse<SubmitAssignmentResponse>) => void;
  onError?: (error: AxiosError) => void;
  redirectTo?: string;
} = {}): UseMutationResult<AxiosResponse<SubmitAssignmentResponse>, AxiosError, SubmitAssignmentParams> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { redirectTo } = options;

  return useMutation({
    mutationFn: submitAssignmentQueryFn,

    onMutate: () => {
      const toastId = toast.loading("Submitting assignment...");
      return toastId;
    },

    onSuccess: (data, _variables, context) => {
      toast.dismiss(context);
      toast.success("Assignment submitted successfully", {
        icon: '✅'
      });

      // Invalidate queries related to assignments to refresh data
      

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
    },

    onError: (error, _variables, context) => {
      toast.dismiss(context);
      const errorMessage = "Failed to submit assignment. Please try again.";
      toast.error(errorMessage);
      
      if (options.onError) {
        options.onError(error);
      }
    },
  });
}