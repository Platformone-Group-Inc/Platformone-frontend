"use client";

import { getUserSessionQueryFn } from "@/services/operations/Auth";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSessionQueryFn,
    staleTime: Infinity,
    retry: 5,
    gcTime: 1000 * 60 * 60,
    
  });
  return query;
};

export default useAuth;