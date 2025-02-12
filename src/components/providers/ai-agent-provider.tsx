// TODO: change page to a server component
"use client";

import AiAgent from "@/components/ai-agent";

import { motion } from "motion/react";
// import { Metadata } from "next";

import { AnimatePresence } from "motion/react";
import { useAiChat } from "@/store/useAiChatStore";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

const AiAgentProvider = ({ children }: React.PropsWithChildren) => {
  const { isOpen } = useAiChat();
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        key={"tab"}
        className="rounded-xl flex-grow bg-white w-full h-full"
      >
        <ScrollArea className="w-full overflow-y-scroll max-h-[calc(100vh-120px)]">
          {children}
        </ScrollArea>
      </motion.div>
      {isOpen && <AiAgent key={"ai-agent"} />}
    </AnimatePresence>
  );
};

export default AiAgentProvider;
