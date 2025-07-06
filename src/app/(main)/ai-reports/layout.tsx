"use client";

import FallbackLoader from "@/components/other/fallback-loader";
import { cn } from "@/lib/utils";
import { InfoCircle } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const tabData = [
  {
    value: "/ai-reports",
    label: "Generated Reports",
  },
  {
    value: "/ai-reports/scheduled",
    label: "Scheduled Reports",
  },
  {
    value: "/ai-reports/new",
    label: "New Reports",
  },
];

const ReportsLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <Suspense fallback={<FallbackLoader />}>
      <div className="border-b sticky bg-white top-0 left-0 z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-semibold text-xl inline-flex gap-1 items-center">
            AI Reports
            <InfoCircle className="stroke-secondary size-4" />
          </h1>
        </div>
        <div className="flex justify-start space-x-4">
          {tabData.map((tab) => {
            const isActive = pathname === tab.value;

            return (
              <Link
                key={tab.value}
                href={tab.value}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap text-sm py-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative h-auto px-5 rounded-none font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5",
                  isActive
                    ? "text-primary-600 bg-primary-100 shadow-none after:bg-primary-600"
                    : "text-secondary-600"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </Suspense>
  );
};

export default ReportsLayout;
