"use client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TooltipProvider } from "../ui/tooltip";
// import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <NuqsAdapter>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      > */}
      <TooltipProvider>{children}</TooltipProvider>
      {/* </ThemeProvider> */}
    </NuqsAdapter>
  );
};

export default Providers;
