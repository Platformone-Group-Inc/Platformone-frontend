import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  isExpanded: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useSideBarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isExpanded: false,
      toggle: () => set((state) => ({ isExpanded: !state.isExpanded })),
      open: () => set({ isExpanded: true }),
      close: () => set({ isExpanded: false }),
    }),
    { name: "sidebar" }
  )
);
