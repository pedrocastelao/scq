// src/stores/sidebarStore.js
import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isCollapsed: false,
  currentView: "appointments",
  isDarkMode: false,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setCurrentView: (view) => set({ currentView: view }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useSidebarStore;
