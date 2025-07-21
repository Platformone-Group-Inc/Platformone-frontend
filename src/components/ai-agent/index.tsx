"use client";

import { motion } from "motion/react";
import { ChatMessageList } from "./chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "./chat-bubble";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronRightIcon, SendIcon } from "lucide-react";
import AiIcon from "../icons/ai-icon";
import { useAiChatBoxStore } from "@/store/useAiChatBoxStore";
import { getChatRemediationQueryFn } from "@/services/operations/Ai";
import { formatMessageContent } from "@/lib/formatMessageContent";
interface ChatMessage {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: number;
}

interface StoredChatData {
  messages: ChatMessage[];
  apiChatHistory: any[]; // Store the API chat history separately
  expiry: number;
}

const CHAT_STORAGE_KEY = "cmmc_chat_history";
const CHAT_EXPIRY_HOURS = 24;

const AiChatBox = () => {
  const { closeChat } = useAiChatBoxStore();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: Date.now(),
    }
  ]);

  const [apiChatHistory, setApiChatHistory] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadChatHistory = () => {
      try {
        const storedData = localStorage.getItem(CHAT_STORAGE_KEY);
        if (storedData) {
          const parsedData: StoredChatData = JSON.parse(storedData);

          if (Date.now() < parsedData.expiry) {
            setMessages(parsedData.messages);
            setApiChatHistory(parsedData.apiChatHistory || []);
          } else {
            localStorage.removeItem(CHAT_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
        localStorage.removeItem(CHAT_STORAGE_KEY);
      }
    };

    loadChatHistory();
  }, []);

  useEffect(() => {
    const saveChatHistory = () => {
      try {
        const chatData: StoredChatData = {
          messages,
          apiChatHistory,
          expiry: Date.now() + (CHAT_EXPIRY_HOURS * 60 * 60 * 1000),
        };
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatData));
      } catch (error) {
        console.error("Error saving chat history:", error);
      }
    };

    if (messages.length > 1) {
      saveChatHistory();
    }
  }, [messages, apiChatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageContent = input.trim();
    const userMessage: ChatMessage = {
      id: Date.now(),
      content: userMessageContent,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getChatRemediationQueryFn(
        apiChatHistory, 
        userMessageContent
      );

      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        content: response.response || "I apologize, but I couldn't generate a response. Please try again.",
        sender: "ai",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      
      if (response.chat_history) {
        setApiChatHistory(response.chat_history);
      }

    } catch (error) {
      console.error("Error getting AI response:", error);

      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "ai",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    const initialMessage: ChatMessage = {
      id: 1,
      content: "Hello! How can I help you with CMMC compliance today?",
      sender: "ai",
      timestamp: Date.now(),
    };

    setMessages([initialMessage]);
    setApiChatHistory([]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
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
              <div className="flex flex-col">
               <div className="mb-1">
      {message.sender === "ai"
        ? formatMessageContent(message.content)
        : message.content}
    </div>
    <div className="text-xs text-gray-500 opacity-70">
      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
              </div>
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