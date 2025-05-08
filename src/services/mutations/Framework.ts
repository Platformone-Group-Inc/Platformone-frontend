import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import API from "../axios-client";
import { toast } from "react-hot-toast"
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

// Define common types
export type LoginCredentials = {
  email: string;
  password: string;
};


export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    isEmailVerified: boolean;
  };
};

// API functions - centralize all auth API calls
const frameworkAPI = {
  login: (data: LoginCredentials) =>
    API.post<AuthResponse>("/users/login", data)
};

// Login mutation hook
export function useLogin(options: {
  onSuccess?: (data: AxiosResponse<AuthResponse>) => void;
  onError?: (error: AxiosError) => void;
  redirectTo?: string;
} = {}): UseMutationResult<AxiosResponse<AuthResponse>, AxiosError, LoginCredentials> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { redirectTo } = options;

  return useMutation({
    mutationFn: authAPI.login,
    onMutate: () => {
      const toastId = toast.loading("Logging in...");
      return toastId;
    },

    onSuccess: (data, _variables, context) => {
      toast.dismiss(context);
      toast.success("Login successful", {
        icon: '👏'
      });
      queryClient.setQueryData(["authUser"], data.data);

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
    },

    onError: (error, _variables, context) => {
      toast.dismiss(context);
      toast.error("Login failed. Please try again.");
      if (options.onError) {
        options.onError(error);
      }
    },
  });
}



// Export all API functions separately as well
export const frameworkService = frameworkAPI;