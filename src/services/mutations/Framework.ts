import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import API from "../axios-client";
import { toast } from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

// Types for the clone framework operation
export type CloneFrameworkParams = {
  organizationId: string;
  frameworkId: string;
};

export type CloneFrameworkResponse = {
  // Add the specific response properties based on your API
  success: boolean;
  message: string;
  data: any; // Replace with your specific data type
};

// API function for cloning framework
const cloneFullFrameworkQueryFn = async (params: CloneFrameworkParams) => {
  return await API.post('/frameworks/cloneFullFramework', {
    organizationId: params.organizationId,
    framework: params.frameworkId
  });
};

// Mutation hook for cloning a framework
export function useCloneFramework(options: {
  onSuccess?: (data: AxiosResponse<CloneFrameworkResponse>) => void;
  onError?: (error: AxiosError) => void;
  redirectTo?: string;
} = {}): UseMutationResult<AxiosResponse<CloneFrameworkResponse>, AxiosError, CloneFrameworkParams> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { redirectTo } = options;

  return useMutation({
    mutationFn: cloneFullFrameworkQueryFn,

    onMutate: () => {
      const toastId = toast.loading("Cloning framework...");
      return toastId;
    },

    onSuccess: (data, _variables, context) => {
      toast.dismiss(context);
      toast.success("Framework cloned successfully", {
        icon: '👏'
      });

      // Invalidate queries related to frameworks to refresh data
      queryClient.invalidateQueries({ queryKey: ['frameworks'] });

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
    },

    onError: (error, _variables, context) => {
      toast.dismiss(context);
      const errorMessage =  "Failed to clone framework. Please try again.";
      toast.error(errorMessage);
      if (options.onError) {
        options.onError(error);
      }
    },
  });
}

