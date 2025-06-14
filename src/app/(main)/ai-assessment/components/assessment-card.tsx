import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AssessmentCard = () => {
  return (
    <div className="w-full border rounded-2xl divide-y">
      <div className="p-3">
        <div className="flex items-center gap-1.5">
          {/* TODO */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJSRyd-WENuShraJJsJ22fdVvoKTztuuZ4A&s"
            alt=""
            className="size-10 rounded-lg"
          />

          <p className="font-semibold text-sm">
            Cybersecurity Maturity Model Certification (CMMC 2.0)
          </p>
        </div>
      </div>
      <div className="h-20" />
      <div className="flex flex-col p-3">
        <Link
          href={"/ai-assessment/asdfasdfsdf"}
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
