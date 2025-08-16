import { ExternalLinkIcon } from "lucide-react";
import InfoSystemForm from "../forms/info-system-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import InfoSystemImpactForm from "../forms/info-system-impact-form";

const InfoSystemTabContent = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-base font-semibold">Info System Details</h2>
        <p className="text-sm text-gray-600 max-w-4xl">
          Capture key information pertaining to the information system under
          assessment. Although, this information is not mandatory across
          standards, certain standards such as CMMC 2.0, FedRAMP require this
          information to be present in reports such as SSP. More info{" "}
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
      <InfoSystemForm />
    </div>
  );
};

export default InfoSystemTabContent;
