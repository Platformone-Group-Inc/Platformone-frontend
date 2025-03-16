"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Implementation = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">
        AC 1 Control Summary Information
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm border rounded-lg px-3.5 py-2.5">
          <div className="font-semibold text-secondary-600 flex-shrink-0">
            Responsible Role:
          </div>
          <p className="text-secondary-300 font-medium">
            ID.Me has developed and implemented an Access Control Policy that
            establishes the overarching framework for managing and controlling
            access to its information systems.
          </p>
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm border rounded-lg px-3.5 py-2.5"
          >
            <div className="font-semibold text-secondary-600 flex-shrink-0">
              Parameter AC-1 (a):
            </div>
            <p className="text-secondary-300 font-medium">Add here</p>
          </div>
        ))}
      </div>
      <hr />
      <div className="w-full divide-x space-y-4">
        <div className="flex items-start gap-4">
          <div className="text-sm">
            <div className="font-semibold text-secondary-600 flex-shrink-0">
              Implementation Status
            </div>
            <p className="text-secondary-300 font-medium">
              (Check all that apply)
            </p>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Checkbox id={`id-${i}`} />
                <Label
                  htmlFor={`id-${i}`}
                  className="font-medium cursor-pointer"
                >
                  Partially Implemented
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Implementation;
