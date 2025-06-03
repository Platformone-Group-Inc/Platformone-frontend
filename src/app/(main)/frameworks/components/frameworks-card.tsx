import RadialChart from "@/components/charts/radial-chart";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, EllipsisIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FrameworksCardActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"transparent"}
          size={"icon"}
          // onClick={() => setOpenInfoModal(true)}
        >
          <EllipsisIcon size={20} className="stroke-secondary-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuItem>Control</DropdownMenuItem>
        <DropdownMenuItem>Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FrameworksCard = ({framework}:any) => {
  return (
    <div className="rounded-2xl flex flex-col justify-normal items-center gap-3 p-6 border">
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-1.5">
          {/* TODO */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJSRyd-WENuShraJJsJ22fdVvoKTztuuZ4A&s"
            alt=""
            className="size-10 rounded-lg"
          />

          <p className="font-semibold text-sm">
           {framework?.name}
          </p>
        </div>

        <FrameworksCardActions />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <RadialChart value={80} size={140} arcWidth={15} />
        <p className="text-sm font-medium">
          <b className="text-base font-semibold">137</b> /420 Compliant
        </p>
      </div>
      <hr className="w-full" />

      <Button variant={"transparent"} className="text-primary-600 text-sm">
        View Details
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default FrameworksCard;
