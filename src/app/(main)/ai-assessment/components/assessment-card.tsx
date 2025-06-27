import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const AssessmentCard = ({framework}: any) => {
  return (
    <div className="w-full border rounded-2xl divide-y">
      <div className="p-3 flex items-center justify-between">
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="size-6 cursor-pointer text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className="max-w-sm text-xs leading-normal">
            <p className="mb-2 font-semibold">How is this calculated?</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                Percentage is based on the number of questions answered
                positively (<b>Yes</b> or <b>Partially</b>).
              </li>
              <li>
                Only <b>APPLICABLE</b> questions are considered; unanswered ones
                are treated as <b>No</b>.
              </li>
              <li>
                <b>Maximum Score Possible</b> = Total number of APPLICABLE
                questions.
              </li>
              <li>
                Each <b>YES</b> = 1 point
              </li>
              <li>
                Each <b>PARTIAL</b> = 0.5 point
              </li>
              <li>
                Each <b>NO</b> / Unanswered = 0 points
              </li>
              <li>
                <b>Score</b> = (Sum of Points / Maximum Score Possible) × 100
              </li>
              <li>Overall percentages are based on the score above.</li>
            </ul>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="h-20" />
      <div className="flex flex-col p-3">
        <Link
          href={`/ai-assessment/${framework?._id}`}
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "md",
            }),

            "rounded-full border-2"
          )}
        >
          Take Assessment
        </Link>
        <Button variant={"link"} size={"md"} className="rounded-full">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default AssessmentCard;
