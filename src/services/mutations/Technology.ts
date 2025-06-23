import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import API from "../axios-client";
import { toast } from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

// Types for technology operations
export type TechnologyAPIItem = {
  question: string;
  answer: string;
};

export type TechnologyParams = {
  organizationId: string;
  responses: Record<string, TechnologyAPIItem[]>;
};

export type TechnologyResponse = {
  success: boolean;
  message: string;
  data: any; // Replace with your specific data type
};

// API function for adding technology responses
const addTechnologyQueryFn = async (params: TechnologyParams) => {
  return await API.post('/technology/add-tech-responses', params);
};

// API function for updating technology responses
const updateTechnologyQueryFn = async (params: TechnologyParams) => {
  return await API.put('/technology/tech-responses-edit', params);
};

// Mutation hook for adding technology responses
export function useAddTechnology(options: {
  onSuccess?: (data: AxiosResponse<TechnologyResponse>) => void;
  onError?: (error: AxiosError) => void;
  redirectTo?: string;
} = {}): UseMutationResult<AxiosResponse<TechnologyResponse>, AxiosError, TechnologyParams> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { redirectTo } = options;

  return useMutation({
    mutationFn: addTechnologyQueryFn,

    onMutate: () => {
      const toastId = toast.loading("Adding technology responses...");
      return toastId;
    },

    onSuccess: (data, variables, context) => {
      toast.dismiss(context);
      toast.success("Technology responses added successfully", {
        icon: '✅'
      });

      // Invalidate queries related to technology to refresh data
      queryClient.invalidateQueries({ 
        queryKey: ['technology', variables.organizationId] 
      });

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
    },

    onError: (error, _variables, context) => {
      toast.dismiss(context);
      const errorMessage =  "Failed to add technology responses. Please try again.";
      toast.error(errorMessage);
      
      if (options.onError) {
        options.onError(error);
      }
    },
  });
}

// Mutation hook for updating technology responses
export function useUpdateTechnology(options: {
  onSuccess?: (data: AxiosResponse<TechnologyResponse>) => void;
  onError?: (error: AxiosError) => void;
  redirectTo?: string;
} = {}): UseMutationResult<AxiosResponse<TechnologyResponse>, AxiosError, TechnologyParams> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { redirectTo } = options;

  return useMutation({
    mutationFn: updateTechnologyQueryFn,

    onMutate: () => {
      const toastId = toast.loading("Updating technology responses...");
      return toastId;
    },

    onSuccess: (data, variables, context) => {
      toast.dismiss(context);
      toast.success("Technology responses updated successfully", {
        icon: '🔄'
      });

      // Invalidate queries related to technology to refresh data
      queryClient.invalidateQueries({ 
        queryKey: ['technology', variables.organizationId] 
      });

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
    },

    onError: (error, _variables, context) => {
      toast.dismiss(context);
      const errorMessage = "Failed to update technology responses. Please try again.";
      toast.error(errorMessage);
      
      if (options.onError) {
        options.onError(error);
      }
    },
  });
}

// Combined hook that decides whether to add or update based on isEdit flag
export function useTechnologyMutation(isEdit: boolean, options: {
  onSuccess?: (data: AxiosResponse<TechnologyResponse>) => void;
  onError?: (error: AxiosError) => void;
  redirectTo?: string;
} = {}) {
  const addMutation = useAddTechnology(options);
  const updateMutation = useUpdateTechnology(options);

  return isEdit ? updateMutation : addMutation;
}