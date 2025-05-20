"use client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TooltipProvider } from "../ui/tooltip";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <NuqsAdapter>
      {" "}
      <TooltipProvider>{children}</TooltipProvider>
    </NuqsAdapter>
  );
};

export default Providers;
