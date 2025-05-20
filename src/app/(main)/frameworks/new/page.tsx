'use client'

import MyFrameworksList from "../components/my-frameworks-list";
import AvailableFrameworksList from "../components/available-frameworks-list";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-provider";
import { getFrameworksByOrganizationQueryFn, getFrameworksQueryFn } from "@/services/operations/Framework";
import { useMemo } from "react";

const NewFrameworkPage = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  
  const { 
    data: myFrameworks, 
    isLoading: myFrameworksLoading,
    error: myFrameworksError
  } = useQuery({
    queryKey: ["frameworks", user?.organization],
    queryFn: () => getFrameworksByOrganizationQueryFn(user?.organization),
    enabled: !!user?.organization
  });
  
  const { 
    data: availableFrameworks, 
    isLoading: availableFrameworksLoading,
    error: availableFrameworksError 
  } = useQuery({
    queryKey: ["availableFrameworks"],
    queryFn: getFrameworksQueryFn,
  });


  const filteredFrameworks = useMemo(() => {
    if (!availableFrameworks || !myFrameworks?.frameworks) return [];
    
    const existingFrameworkIds = new Set(
      myFrameworks.frameworks.map((framework:any) => framework.name)
    );
    
    return availableFrameworks.filter(
      (framework:any) => !existingFrameworkIds.has(framework.name)
    );
  }, [availableFrameworks, myFrameworks]);


  if (authLoading) {
    return <div className="p-6">Verifying your account...</div>;
  }

  const isLoading = myFrameworksLoading || availableFrameworksLoading;
  const hasError = myFrameworksError || availableFrameworksError;

  if (isLoading) {
    return <div className="p-6">Loading frameworks...</div>;
  }

  if (hasError) {
    return <div className="p-6 text-red-500">Error loading frameworks. Please try again.</div>;
  }

  return (
    <div className="space-y-6 p-6 w-full">
      <MyFrameworksList frameworks={myFrameworks} />
      <AvailableFrameworksList availableFrameworks={filteredFrameworks} />
    </div>
  );
};

export default NewFrameworkPage;