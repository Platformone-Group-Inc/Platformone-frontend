"use client";

import { motion } from "motion/react";
import { ChatMessageList } from "./chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "./chat-bubble";
import { useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronRightIcon, SendIcon } from "lucide-react";
import AiIcon from "../icons/ai-icon";
import { useAiChatBoxStore } from "@/store/useAiChatBoxStore";

const AiChatBox = () => {
  const { closeChat } = useAiChatBoxStore();

  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai",
    },
    {
      id: 2,
      content: "I have a question about the component library.",
      sender: "user",
    },
    {
      id: 3,
      content: "Sure! I'd be happy to help. What would you like to know?",
      sender: "ai",
    },
    { id: 4, content: "How do I install the library?", sender: "user" },
    { id: 5, content: "You can install it using npm or yarn.", sender: "ai" },
    { id: 6, content: "Can you show me the command?", sender: "user" },
    {
      id: 7,
      content: "Sure! Use: npm install your-library-name",
      sender: "ai",
    },
    { id: 8, content: "Is it compatible with Next.js?", sender: "user" },
    {
      id: 9,
      content: "Yes, it's fully compatible with Next.js.",
      sender: "ai",
    },
    { id: 10, content: "What about TypeScript support?", sender: "user" },
    { id: 11, content: "It has built-in TypeScript types.", sender: "ai" },
    { id: 12, content: "How do I import a button component?", sender: "user" },
    {
      id: 13,
      content: "Import it like: import { Button } from 'your-library-name';",
      sender: "ai",
    },
    { id: 14, content: "Are there any themes available?", sender: "user" },
    {
      id: 15,
      content: "Yes, light and dark themes are supported.",
      sender: "ai",
    },
    { id: 16, content: "How do I switch themes?", sender: "user" },
    {
      id: 17,
      content: "You can use the ThemeProvider component.",
      sender: "ai",
    },
    { id: 18, content: "Is there a documentation site?", sender: "user" },
    { id: 19, content: "Yes, check out docs.your-library.com.", sender: "ai" },
    { id: 20, content: "Can I customize components?", sender: "user" },
    {
      id: 21,
      content: "Absolutely! Use the sx prop or custom CSS.",
      sender: "ai",
    },
    { id: 22, content: "How do I report a bug?", sender: "user" },
    { id: 23, content: "Open an issue on our GitHub repo.", sender: "ai" },
    { id: 24, content: "Is there a roadmap?", sender: "user" },
    {
      id: 25,
      content: "Yes, it's available on our GitHub page.",
      sender: "ai",
    },
    { id: 26, content: "Can I contribute?", sender: "user" },
    {
      id: 27,
      content: "Contributions are welcome! See CONTRIBUTING.md.",
      sender: "ai",
    },
    {
      id: 28,
      content: "Does it support server-side rendering?",
      sender: "user",
    },
    { id: 29, content: "Yes, SSR is supported out of the box.", sender: "ai" },
    { id: 30, content: "How do I get started quickly?", sender: "user" },
    {
      id: 31,
      content: "Follow the Getting Started guide in the docs.",
      sender: "ai",
    },
    { id: 32, content: "Is there a Slack community?", sender: "user" },
    {
      id: 33,
      content: "Yes, join us at slack.your-library.com.",
      sender: "ai",
    },
    { id: 34, content: "Are there any example projects?", sender: "user" },
    {
      id: 35,
      content: "Yes, see the examples folder in the repo.",
      sender: "ai",
    },
    {
      id: 36,
      content: "How do I update to the latest version?",
      sender: "user",
    },
    { id: 37, content: "Run npm update your-library-name.", sender: "ai" },
    { id: 38, content: "Is tree-shaking supported?", sender: "user" },
    { id: 39, content: "Yes, the library is tree-shakable.", sender: "ai" },
    { id: 40, content: "How do I use icons?", sender: "user" },
    {
      id: 41,
      content: "Import icons from 'your-library-name/icons'.",
      sender: "ai",
    },
    { id: 42, content: "Can I use it with React Native?", sender: "user" },
    { id: 43, content: "Currently, only web is supported.", sender: "ai" },
    { id: 44, content: "Is there a changelog?", sender: "user" },
    { id: 45, content: "Yes, see CHANGELOG.md in the repo.", sender: "ai" },
    { id: 46, content: "How do I request a new feature?", sender: "user" },
    { id: 47, content: "Open a feature request on GitHub.", sender: "ai" },
    { id: 48, content: "Are there accessibility features?", sender: "user" },
    { id: 49, content: "Yes, all components are accessible.", sender: "ai" },
    { id: 50, content: "Thank you for your help!", sender: "user" },
    {
      id: 51,
      content: "You're welcome! Let me know if you need anything else.",
      sender: "ai",
    },
    { id: 52, content: "How do I reset the chat?", sender: "user" },
    { id: 53, content: "You can refresh the page to reset.", sender: "ai" },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "This is an AI response to your message.",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" w-[400px] border rounded-2xl h-full flex flex-col justify-between bg-white overflow-hidden shrink-0"
    >
      <div className="flex px-4 py-3 border-b items-center gap-2 font-medium">
        <AiIcon className="scale-[.7]" />
        Ai Agent
        <Button
          variant={"transparent"}
          size={"icon"}
          className="rounded-full ml-auto"
          onClick={closeChat}
        >
          <ChevronRightIcon size={16} />
        </Button>
      </div>

      <ChatMessageList>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            variant={message.sender === "user" ? "sent" : "received"}
          >
            <ChatBubbleAvatar
              className="h-8 w-8 shrink-0"
              src={
                message.sender === "user"
                  ? "https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg"
                  : "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg"
              }
              fallback={message.sender === "user" ? "US" : "AI"}
            />
            <ChatBubbleMessage
              variant={message.sender === "user" ? "sent" : "received"}
            >
              {message.content}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}

        {isLoading && (
          <ChatBubble variant="received">
            <ChatBubbleAvatar
              className="h-8 w-8 shrink-0"
              src="https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg"
              fallback="AI"
            />
            <ChatBubbleMessage isLoading />
          </ChatBubble>
        )}
      </ChatMessageList>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-[#F6F7F9] p-2 border-t"
      >
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Ask AI"
        />
        <Button type="submit" className="rounded-full" size={"icon"}>
          <SendIcon size={16} />
        </Button>
      </form>
    </motion.div>
  );
};

export default AiChatBox;
