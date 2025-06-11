import { create } from "zustand";
import { persist } from "zustand/middleware";

type AiChatStore = {
  isOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
};

export const useAiChatBoxStore = create<AiChatStore>()(
  persist(
    (set) => ({
      isOpen: false,
      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
      openChat: () => set({ isOpen: true }),
      closeChat: () => set({ isOpen: false }),
    }),
    { name: "ai-agent-store" }
  )
);
