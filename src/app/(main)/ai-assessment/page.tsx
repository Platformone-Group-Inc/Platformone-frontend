"use client";
import { useQuery } from "@tanstack/react-query";
import AssessmentCard from "./components/assessment-card";
import { getFrameworksByOrganizationQueryFn } from "@/services/operations/Framework";
import { useAuthContext } from "@/context/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AiAssessment = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const { data: myFrameworks, isLoading: myFrameworksLoading } = useQuery({
    queryKey: ["frameworks", user?.organization],
    queryFn: () => getFrameworksByOrganizationQueryFn(user?.organization),
    enabled: !!user?.organization,
  });

  return (
    <div className="@container">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl inline-flex items-center gap-2">
            Ai Assessment
            <InfoIcon className="" size={16} />
          </h1>
          <Link href="/ai-assessment/test-chat">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <MessageSquare size={16} />
              Test AI Chat
            </Button>
          </Link>
        </div>
      </div>
      <div className="py-4 space-y-4 px-6 @container">
        <h2 className="text-base font-medium ">
          Select a framework for Gap Assessment
        </h2>
        <div className="grid gap-4 grid-cols-1 @[550px]:grid-cols-2 @[800px]:grid-cols-3 @[1200px]:grid-cols-4 ">
          {(myFrameworksLoading || authLoading || !myFrameworks) &&
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-[200px]" />
            ))}
          {myFrameworks?.frameworks?.map((framework: any) => (
            <AssessmentCard key={framework?._id} framework={framework} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiAssessment;
