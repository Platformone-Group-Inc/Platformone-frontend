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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import API from "@/services/axios-client";

const FrameworksCardActions = ({ frameworkId }: { frameworkId: string }) => {
  const router = useRouter();

  // const { user } = useAuthContext();

  // const queryClient = useQueryClient();
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
        console.log(error);
        throw Error("Failed to uninstall framework");
      }
    },
    onSuccess: () => {
      toast.success("Framework uninstalled");
      window.location.reload();
      // queryClient.refetchQueries({
      //   queryKey: ["frameworks", user?.organization],
      // });
    },
    onError: () => {
      toast.error("Failed to uninstall framework");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"transparent"}
          size={"icon"}
          disabled={isPending}
          // onClick={() => setOpenInfoModal(true)}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <EllipsisIcon size={20} className="stroke-secondary-400" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuItem onClick={() => router.push("/")}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/controls")}>
          Control
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/ai-reports")}>
          Report
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={() => mutate()}>
          Uninstall
        </DropdownMenuItem>
        {/* <button
          onClick={() => {
            console.log(frameworkId, user?.organization);
          }}
        >
          click
        </button> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FrameworksCard = ({ framework }: any) => {
  const router = useRouter();
  return (
    <div className="rounded-2xl flex flex-col justify-normal items-center gap-3 p-6 border">
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-1.5">
          {/* TODO */}
          <motion.img
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJSRyd-WENuShraJJsJ22fdVvoKTztuuZ4A&s"
            src="https://www.sysarc.com/wp-content/uploads/2023/05/CMMC-Logo.jpeg"
            alt=""
            className="size-10 rounded-lg object-cover"
          />

          <p className="font-semibold text-sm">{framework?.name}</p>
        </div>
        {/* <button
          onClick={() => {
            console.log(framework);
          }}
        >
          click
        </button> */}
        <FrameworksCardActions frameworkId={framework._id as string} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <RadialChart value={80} size={140} arcWidth={15} />
        <p className="text-sm font-medium">
          <b className="text-base font-semibold">137</b> /420 Compliant
        </p>
      </div>
      <hr className="w-full" />

      <Button
        onClick={() => {
          // console.log(framework);

          router.push(
            `/controls/info?id=${framework?._id}&name=${framework?.name}}`
          );
        }}
        variant={"transparent"}
        className="text-primary-600 text-sm"
      >
        View Details
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default FrameworksCard;
