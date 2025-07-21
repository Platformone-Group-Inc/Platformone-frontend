"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { ChatMessageList } from "./chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "./chat-bubble";
import { useEffect, useState, useRef } from "react";
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
  isStreaming?: boolean;
}

interface StoredChatData {
  messages: ChatMessage[];
  apiChatHistory: any[];
  expiry: number;
}

const CHAT_STORAGE_KEY = "cmmc_chat_history";
const CHAT_EXPIRY_HOURS = 24;

// Framer Motion Typewriter Component
const FramerTypewriter = ({ 
  text, 
  onComplete, 
  speed = 0.03,
  onUpdate 
}: { 
  text: string; 
  onComplete: () => void;
  speed?: number;
  onUpdate?: () => void;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [isComplete, setIsComplete] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (!text) return;
    
    setIsComplete(false);
    setCurrentText("");
    
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * speed, // Adjustable speed
      ease: "linear",
      onUpdate: (latest) => {
        setCurrentText(text.slice(0, Math.round(latest)));
        // Call onUpdate to trigger scroll during streaming
        if (onUpdate) {
          onUpdate();
        }
      },
      onComplete: () => {
        setIsComplete(true);
        setCurrentText(text);
        onComplete();
      }
    });

    return () => controls.stop();
  }, [text, speed, count, onComplete, onUpdate]);

  return (
    <div className="flex items-start">
      <motion.div className="flex-1">
        {formatMessageContent(currentText)}
      </motion.div>
      {!isComplete && (
        <motion.span 
          className="ml-1 text-blue-500"
          animate={{ opacity: [1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          ▋
        </motion.span>
      )}
    </div>
  );
};

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
  
  // Refs for auto-scroll functionality
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-scroll during streaming (called from FramerTypewriter)
  const handleStreamingUpdate = () => {
    scrollToBottom();
  };

  useEffect(() => {
    const loadChatHistory = () => {
      try {
        const storedData = localStorage.getItem(CHAT_STORAGE_KEY);
        if (storedData) {
          const parsedData: StoredChatData = JSON.parse(storedData);

          if (Date.now() < parsedData.expiry) {
            // Only load completed messages, not streaming ones
            const completedMessages = parsedData.messages.filter(msg => !msg.isStreaming);
            setMessages(completedMessages);
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
        // Only save completed messages
        const completedMessages = messages.filter(msg => !msg.isStreaming);
        const chatData: StoredChatData = {
          messages: completedMessages,
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

  const handleStreamingComplete = (messageId: number) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? { ...msg, isStreaming: false }
        : msg
    ));
  };

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

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call your existing API
      const response = await getChatRemediationQueryFn(
        apiChatHistory, 
        userMessageContent
      );

      const responseText = response.response || "I apologize, but I couldn't generate a response. Please try again.";
      
      // Create streaming AI message
      const streamingMessageId = Date.now() + 1;
      const streamingMessage: ChatMessage = {
        id: streamingMessageId,
        content: responseText,
        sender: "ai",
        timestamp: Date.now(),
        isStreaming: true,
      };

      // Add streaming message to the list
      setMessages((prev) => [...prev, streamingMessage]);
      
      // Update chat history if provided
      if (response.chat_history) {
        setApiChatHistory(response.chat_history);
      }

    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorText = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
      const errorMessageId = Date.now() + 1;
      const errorMessage: ChatMessage = {
        id: errorMessageId,
        content: errorText,
        sender: "ai",
        timestamp: Date.now(),
        isStreaming: true,
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
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-[400px] border rounded-2xl h-full flex flex-col justify-between bg-white overflow-hidden shrink-0"
    >
      {/* Header */}
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

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto"
      >
        <ChatMessageList>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index > 0 ? 0.1 : 0,
                ease: "easeOut"
              }}
            >
              <ChatBubble
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
                      {message.sender === "ai" ? (
                        message.isStreaming ? (
                          <FramerTypewriter 
                            text={message.content}
                            speed={0.025} // Adjust speed here (lower = faster)
                            onComplete={() => handleStreamingComplete(message.id)}
                            onUpdate={handleStreamingUpdate} // Add scroll trigger during streaming
                          />
                        ) : (
                          formatMessageContent(message.content)
                        )
                      ) : (
                        message.content
                      )}
                    </div>
                    <div className="text-xs text-gray-500 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </ChatBubbleMessage>
              </ChatBubble>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <ChatBubble variant="received">
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src="https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg"
                  fallback="AI"
                />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            </motion.div>
          )}
          
          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </ChatMessageList>
      </div>

      {/* Input Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-[#F6F7F9] p-2 border-t"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI"
          disabled={isLoading}
          className="flex-1"
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            type="submit" 
            className="rounded-full" 
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <SendIcon size={16} />
          </Button>
        </motion.div>
      </motion.form>

      {/* Debug/Clear Button (optional) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.button
          onClick={clearChatHistory}
          className="absolute top-2 right-20 text-xs text-gray-400 hover:text-gray-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Clear
        </motion.button>
      )}
    </motion.div>
  );
};

export default AiChatBox;