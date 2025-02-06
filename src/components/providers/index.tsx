"use client";

import { TooltipProvider } from "../ui/tooltip";

const Providers = ({ children }: React.PropsWithChildren) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};

export default Providers;
