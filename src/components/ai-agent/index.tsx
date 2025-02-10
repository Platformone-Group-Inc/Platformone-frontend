"use client";

import { ArrowRight2 } from "iconsax-react";
import AiIcon from "../icons/ai-icon";

import { motion } from "motion/react";
import { useAiChat } from "@/store/useAiChatStore";

const AiAgent = () => {
  const { closeChat } = useAiChat();
  return (
    <motion.div
      layout
      className="flex-shrink-0 rounded-xl bg-white w-[380px] h-[calc(100dvh-120px)]"
    >
      <div className="p-4 w-full border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AiIcon className="size-6" />
          {/*  */}
          <div className="text-sm font-medium">AI Agent</div>
        </div>

        <button onClick={closeChat}>
          <ArrowRight2 color="#596780" className="size-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default AiAgent;
