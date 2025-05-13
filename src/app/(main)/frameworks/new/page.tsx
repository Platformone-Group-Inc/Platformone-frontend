'use client'
import MyFrameworksList from "../components/my-frameworks-list";
import AvailableFrameworksList from "../components/available-frameworks-list";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-provider";
import { getFrameworksByOrganizationQueryFn } from "@/services/operations/Framework";
import { getFrameworksQueryFn } from "@/services/operations/Framework";

const NewFrameworkPage = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const { data: frameworks } = useQuery({
    queryKey: ["frameworks", user?.organization],
    queryFn: () => getFrameworksByOrganizationQueryFn(user?.organization),
    enabled: !!user?.organization
  });

  const { data: availableFrameworks, isLoading, error } = useQuery({
    queryKey: ["availableFrameworks"],
    queryFn: () => getFrameworksQueryFn(),
  });
  if (authLoading) {
    return <div>Loading frameworks...</div>;
  }

  const filteredFrameworks = availableFrameworks?.filter((framework: any) => !frameworks?.frameworks?.some((existingFramework: any) => existingFramework._id !== framework._id));
  console.log(filteredFrameworks, 'filteredFrameworks');
  return (
    <div className="space-y-6 p-6 w-full">
      <MyFrameworksList frameworks={frameworks} />
      <AvailableFrameworksList availableFrameworks={filteredFrameworks} />
    </div>
  );
};

export default NewFrameworkPage;
