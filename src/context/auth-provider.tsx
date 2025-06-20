"use client";

import useAuth from "@/hooks/use-auth";
import { logoutUserMutationFn } from "@/services/operations/Auth";

import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";

type UserType = {
  fullname: string;
  email: string;
  id: string;
  isActive: boolean;
  isSuperAdmin: boolean;
  lastLogin: Date | any;
  organization: string;
  role: any;
};

type AuthContextType = {
  user?: UserType;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading, isFetching, refetch } = useAuth();
  const user = data?.data?.user;

  const router = useRouter();
 
  const logout = () => {
   logoutUserMutationFn();
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, isFetching, refetch, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  // console.log("Auth context state:", context);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
