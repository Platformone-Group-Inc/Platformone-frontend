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

export type RegisterCredentials = {
  email: string;
  password: string;
  name: string;
};

export type ForgotPasswordCredentials = {
  email: string;
};

export type ResetPasswordCredentials = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type OTPCredentials = {
  otp: string;
  email: string;
};

// Define response types
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
const authAPI = {
  login: (data: LoginCredentials) => 
    API.post<AuthResponse>("/users/login", data),
  
  register: (data: RegisterCredentials) => 
    API.post<AuthResponse>("/users/register", data),
  
  forgotPassword: (data: ForgotPasswordCredentials) => 
    API.post("/users/forgot-password", data),
  
  resetPassword: (data: ResetPasswordCredentials) => 
    API.post("/users/reset-password", data),
  
  verifyOtp: (data: OTPCredentials) => 
    API.post<AuthResponse>("/users/verify-otp", data),
    
  getUserSession: () => 
    API.get<AuthResponse>("/users/sessions/current"),
    
  logout: () => 
    API.post("/users/logout")
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
      toast.success("Login successful",{
        icon: '👏'
      });
      router.push("/")
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


// Registration hook
export function useRegister(options: {
  onSuccess?: (data: AxiosResponse<AuthResponse>) => void;
  onError?: (error: AxiosError) => void;
  redirectTo?: string;
} = {}): UseMutationResult<AxiosResponse<AuthResponse>, AxiosError, RegisterCredentials> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { redirectTo } = options;

  return useMutation({
    mutationFn: authAPI.register,
    onMutate: () => {
      toast.loading("Creating your account...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      // toast.success("Account created successfully!", {
      //   description: "Please verify your email to continue.",
      // });
      
      // Update auth user in the query cache
      queryClient.setQueryData(["authUser"], data.data);
      
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data);
      }
      
      // Redirect if path is provided
      if (redirectTo) {
        router.push(redirectTo);
      }
    },
    onError: (error) => {
      toast.dismiss();
      // const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      // toast.error("Registration failed", {
      //   description: errorMessage,
      // });
      
      if (options.onError) {
        options.onError(error);
      }
    },
  });
}

// Forgot password hook
// export function useForgotPassword(options: {
//   onSuccess?: () => void;
//   onError?: (error: AxiosError) => void;
// } = {}): UseMutationResult<AxiosResponse<any>, AxiosError, ForgotPasswordCredentials> {
//   return useMutation({
//     mutationFn: authAPI.forgotPassword,
//     onMutate: () => {
//       toast.loading("Sending reset link...");
//     },
//     onSuccess: () => {
//       toast.dismiss();
//       toast.success("Reset link sent", {
//         description: "Please check your email for the password reset link",
//       });
      
//       if (options.onSuccess) {
//         options.onSuccess();
//       }
//     },
//     onError: (error) => {
//       toast.dismiss();
//       const errorMessage = error.response?.data?.message || "Failed to send reset link. Please try again.";
//       toast.error("Failed to send reset link", {
//         description: errorMessage,
//       });
      
//       if (options.onError) {
//         options.onError(error);
//       }
//     },
//   });
// }

// OTP verification hook
// export function useVerifyOtp(options: {
//   onSuccess?: (data: AxiosResponse<AuthResponse>) => void;
//   onError?: (error: AxiosError) => void;
//   redirectTo?: string;
// } = {}): UseMutationResult<AxiosResponse<AuthResponse>, AxiosError, OTPCredentials> {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { redirectTo } = options;

//   return useMutation({
//     mutationFn: authAPI.verifyOtp,
//     onMutate: () => {
//       toast.loading("Verifying code...");
//     },
//     onSuccess: (data) => {
//       toast.dismiss();
//       toast.success("Email verified successfully!", {
//         description: "You can now access your account.",
//       });
      
//       // Update auth user in the query cache
//       queryClient.setQueryData(["authUser"], data.data);
      
//       if (options.onSuccess) {
//         options.onSuccess(data);
//       }
      
//       if (redirectTo) {
//         router.push(redirectTo);
//       }
//     },
//     onError: (error) => {
//       toast.dismiss();
//       const errorMessage = error.response?.data?.message || "Invalid verification code. Please try again.";
//       toast.error("Verification failed", {
//         description: errorMessage,
//       });
      
//       if (options.onError) {
//         options.onError(error);
//       }
//     },
//   });
// }

// Logout hook
// export function useLogout(options: {
//   onSuccess?: () => void;
//   onError?: (error: AxiosError) => void;
//   redirectTo?: string;
// } = {}): UseMutationResult<AxiosResponse<any>, AxiosError, void> {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { redirectTo } = options;

//   return useMutation({
//     mutationFn: authAPI.logout,
//     onMutate: () => {
//       toast.loading("Logging out...");
//     },
//     onSuccess: () => {
//       toast.dismiss();
//       toast.success("Logged out successfully");
      
//       // Clear all queries from the cache
//       queryClient.clear();
      
//       if (options.onSuccess) {
//         options.onSuccess();
//       }
      
//       if (redirectTo) {
//         router.push(redirectTo);
//       }
//     },
//     onError: (error) => {
//       toast.dismiss();
//       const errorMessage = error.response?.data?.message || "Logout failed.";
//       toast.error("Logout failed", {
//         description: errorMessage,
//       });
      
//       if (options.onError) {
//         options.onError(error);
//       }
      
//       // Force logout on frontend even if API fails
//       queryClient.clear();
//       if (redirectTo) {
//         router.push(redirectTo);
//       }
//     },
//   });
// }

// Export all API functions separately as well
export const authService = authAPI;