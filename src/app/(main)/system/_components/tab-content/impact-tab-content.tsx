import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import InfoSystemImpactForm from "../forms/info-system-impact-form";

const ImpactTabContent = () => {
  return (
    <>
      <div className="space-y-2 ">
        <h2 className="text-base font-semibold">Impact</h2>
        <p className="text-sm text-gray-600 max-w-4xl">
          The loss of confidentiality, integrity, or availability could be
          expected to have: (i) Low: A limited adverse effect; (ii) a Moderate:
          serious adverse effect; or (iii) High: a severe or catastrophic
          adverse effect on the systemMore info{" "}
          <a
            href="#"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "link" }),
              "px-0 font-medium"
            )}
          >
            here <ExternalLinkIcon className="size-3" />
          </a>
        </p>
      </div>
      <InfoSystemImpactForm />
    </>
  );
};

export default ImpactTabContent;
