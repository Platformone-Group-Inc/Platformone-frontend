'use client';
import { useQuery } from "@tanstack/react-query";
import AssessmentCard from "./components/assessment-card";
import { getFrameworksByOrganizationQueryFn } from "@/services/operations/Framework";
import { useAuthContext } from "@/context/auth-provider";

const AiAssessment = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const {
    data: myFrameworks,
    isLoading: myFrameworksLoading,
    error: myFrameworksError,
  } = useQuery({
    queryKey: ["frameworks", user?.organization],
    queryFn: () => getFrameworksByOrganizationQueryFn(user?.organization),
    enabled: !!user?.organization,
  });

  return (
    <div>
      <div className="p-6 border-b">
        <h1 className="font-medium text-xl">Ai Assessment</h1>
      </div>
      <div className="py-4 space-y-4 px-6 @container">
        <h2 className="text-lg font-bold ">Answers Progress for frameworks</h2>
        <div className="grid gap-4 grid-cols-1 @[550px]:grid-cols-2 @[800px]:grid-cols-3 @[1200px]:grid-cols-4 ">
          {
            myFrameworks?.frameworks?.map((framework: any) => (
              <AssessmentCard key={framework?._id} framework={framework} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default AiAssessment;
