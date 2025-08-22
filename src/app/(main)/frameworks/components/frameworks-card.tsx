"use client";

import RadialChart from "@/components/charts/radial-chart";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, EllipsisIcon, Loader2Icon } from "lucide-react";
import { motion } from "motion/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import API from "@/services/axios-client";
import { getStatsByFramework } from "@/services/operations/Stats";

type Framework = {
  _id: string;
  name: string;
};

const FrameworksCardActions = ({ frameworkId }: { frameworkId: string }) => {
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await API({
          url: "/frameworks/uninstallFramework",
          data: { frameworkId },
          method: "delete",
        });
        return data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw Error("Failed to uninstall framework");
      }
    },
    onSuccess: () => {
      toast.success("Framework uninstalled");
      // Ideally: invalidate queries instead of reload. Keeping reload for MVP parity.
      window.location.reload();
    },
    onError: () => {
      toast.error("Failed to uninstall framework");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="transparent" size="icon" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <EllipsisIcon size={20} className="stroke-secondary-400" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuItem onClick={() => push("/")}>Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => push("/controls")}>Control</DropdownMenuItem>
        <DropdownMenuItem onClick={() => push("/ai-reports")}>Report</DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={() => mutate()}>
          Uninstall
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FrameworksCard = ({ framework }: { framework: Framework }) => {
  const router = useRouter();

  const {
    data: myStats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stats", framework._id],
    queryFn: () => getStatsByFramework(framework._id),
    enabled: !!framework._id,
  });


  console.log(myStats, 'mystats')
  const completionPct = Math.max(
    0,
    Math.min(100, Number(myStats?.
statistics?.totalCompletedInPercentage ?? 0))
  );
  const totalSubmitted = Number(myStats?.
statistics?.totalSubmitted ?? 0);
  const totalAssignments = Number(myStats?.
statistics?.totalAssignments ?? 0);

  return (
    <div className="rounded-2xl flex flex-col justify-normal items-center gap-3 p-6 border">
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-1.5">
          <motion.img
            src="https://www.sysarc.com/wp-content/uploads/2023/05/CMMC-Logo.jpeg"
            alt={`${framework.name} logo`}
            className="size-10 rounded-lg object-cover"
          />
          <p className="font-semibold text-sm">{framework.name}</p>
        </div>

        <FrameworksCardActions frameworkId={framework._id} />
      </div>

      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <RadialChart
          value={completionPct}
          size={140}
          arcWidth={15}
          // optionally provide a loading/empty state API inside RadialChart
        />
        <p className="text-sm font-medium">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Failed to load stats"
          ) : (
            <>
              <b className="text-base font-semibold">{totalSubmitted}</b> /{totalAssignments} Assignments
            </>
          )}
        </p>
      </div>

      <hr className="w-full" />

      <Button
        onClick={() => {
          router.push(`/controls/info?id=${framework._id}&name=${encodeURIComponent(framework.name)}`);
        }}
        variant="transparent"
        className="text-primary-600 text-sm"
      >
        View Details
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default FrameworksCard;
