"use client";

import { useState } from "react";
import ControlsInfoAction from "./components/controls-info-actions";
import { Button } from "@/components/ui/button";
import { Grid3X3Icon, Rows3Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import DemoDataTable from "../data-table/demo-data-table";
import ControlInfoCard from "../components/control-info-card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ControlInfoPage = () => {
  const [view, setView] = useState<"grid" | "table">("grid");
  return (
    <div className="p-6 space-y-6 min-h-screen overflow-y-scroll">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-lg">
            FedRAMP Moderate (800-53 Rev. 5)
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/controls">All Controls</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  FedRAMP Moderate (800-53 Rev. 5)
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            onClick={() => setView((s) => (s === "grid" ? "table" : "grid"))}
            className="p-1"
          >
            <span
              className={cn(
                "p-2 rounded-md aspect-square ",
                view === "grid" && "bg-primary text-primary-100"
              )}
            >
              <Grid3X3Icon size={18} />
            </span>
            <span
              className={cn(
                "p-2 rounded-md aspect-square ",
                view === "table" && "bg-primary text-primary-100"
              )}
            >
              <Rows3Icon size={18} />
            </span>
          </Button>
          <ControlsInfoAction />
        </div>
      </div>
      {view === "grid" && (
        <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <ControlInfoCard key={i} />
          ))}
        </div>
      )}
      {view === "table" && <DemoDataTable />}
    </div>
  );
};

export default ControlInfoPage;
