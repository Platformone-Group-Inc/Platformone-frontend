"use client";

import { ArrowRight2 } from "iconsax-react";
import AiIcon from "../icons/ai-icon";

import { motion } from "motion/react";
import { useAiChat } from "@/store/useAiChatStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { useAnimatedText } from "@/hooks/use-animated-text";
import { MessageLoading } from "./message-loading";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "./chat-bubble";

const DEMO_TEXT =
  "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.\n\n" +
  '"Whenever you feel like criticizing anyone," he told me, "just remember that all the people in this world haven\'t had the advantages that you\'ve had."\n\n' +
  "He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgements, a habit that has opened up many curious natures to me.";
const AiAgent = () => {
  const { closeChat } = useAiChat();

  const [isPlaying, setIsPlaying] = useState(true);
  const characterText = useAnimatedText(isPlaying ? DEMO_TEXT : "", "");

  const handleRestart = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 0);
  };

  return (
    <motion.div
      layout
      className="flex-shrink-0 flex flex-col rounded-xl bg-white w-[380px] h-[calc(100dvh-120px)]"
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
      <ScrollArea className="flex-grow overflow-y-scroll p-4">
        <p className="text-sm whitespace-pre-wrap">{characterText}</p>
        <Button variant="link" className="text-error" onClick={handleRestart}>
          restart
        </Button>
        <MessageLoading className="text-primary text-5xl size-10" />
        <p className="text-sm text-black whitespace-pre-wrap">
          By follwing these steps, you can effectively implement and manage
          Active Directory in accordance with the guidelines provided.
        </p>
        <div className="flex mt-4 gap-2 items-center">
          <Button
            size={"icon"}
            variant={"transparent"}
            className="text-gray-700"
          >
            <ThumbsUpIcon />
          </Button>
          <Button
            size={"icon"}
            variant={"transparent"}
            className="text-gray-700"
          >
            <ThumbsDownIcon />
          </Button>
        </div>

        <ChatBubble variant={"sent"}>
          <ChatBubbleAvatar
            className="h-8 w-8 shrink-0"
            src={"https://github.com/sahilverma-dev.png"}
            fallback={"US"}
          />
          <ChatBubbleMessage variant={"sent"}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam odit
            illo minima, veritatis, quod at magni, cum earum inventore quaerat
            sapiente vel recusandae nihil iure! Magnam doloremque corporis
            libero laboriosam.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant={"received"}>
          <ChatBubbleAvatar
            className="h-8 w-8 shrink-0"
            src={"https://github.com/sahilverma-dev.png"}
            fallback={"US"}
          />
          <ChatBubbleMessage variant={"sent"}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam odit
            illo minima, veritatis, quod at magni, cum earum inventore quaerat
            sapiente vel recusandae nihil iure! Magnam doloremque corporis
            libero laboriosam.
          </ChatBubbleMessage>
        </ChatBubble>
      </ScrollArea>
      <div className="border-t p-2 flex items-center justify-between">
        <div className="flex-1 flex items-center gap-2 bg-background py-1 px-2 border-transparent focus-within:border-primary border-2 rounded-lg transition-all">
          <Input
            placeholder="Query your files"
            className="py-0 px-1 h-auto bg-transparent text-sm border-transparent focus-visible:ring-0 focus-visible:outline-none shadow-none"
          />
          <Button size={"icon"} className="aspect-square rounded-full h-auto">
            <PlusIcon />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AiAgent;
