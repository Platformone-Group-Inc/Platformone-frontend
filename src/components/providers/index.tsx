"use client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TooltipProvider } from "../ui/tooltip";
import { TooltipProvider as AnimateTooltipProvider } from "../animate-ui/radix-tooltip";
import { Toaster } from "sonner";
// import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <NuqsAdapter>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      > */}
      <AnimateTooltipProvider>
        <TooltipProvider>
          {children}

          <Toaster richColors />
        </TooltipProvider>
      </AnimateTooltipProvider>
      {/* </ThemeProvider> */}
    </NuqsAdapter>
  );
};

export default Providers;
