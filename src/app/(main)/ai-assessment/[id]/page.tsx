"use client";

import { Button } from "@/components/ui/button";
import { InfoCircle } from "iconsax-react";
import { ArrowLeftIcon } from "lucide-react";

import AssessmentTable from "../components/assesment-table";
import FilterModal from "../components/modals/filter-modal";
import AssessmentTableAction from "../components/table-actions";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="p-6 w-full">
      <div className="space-y-1 border-b pb-6 flex items-center justify-between ">
        <div className="space-y-3">
          {/* <NewActionModal /> */}
          <h1 className="font-semibold text-xl inline-flex gap-1 items-center">
            CMMS GAP Assessment
            <InfoCircle className="stroke-secondary size-4" />
            {/* <Badge className="ml-3.5">Showing 1 Document</Badge> */}
          </h1>
          <div className="text-sm space-y-3">
            <Button
              variant={"transparent"}
              onClick={router.back}
              size={"icon"}
              className="inline-flex items-center gap-3 !text-black !stroke-black fill-black"
            >
              <ArrowLeftIcon size={20} />
            </Button>
            Showing 1-50 Questions
            <p className="font-medium">
              Answered- 24 of 107 (Yes - 18, No - 1, Partially - 1, NA - 4)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AssessmentTableAction />

          <FilterModal />
        </div>
      </div>
      <AssessmentTable />
    </div>
  );
};

export default Page;
