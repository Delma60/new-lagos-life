// store/settingsStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Quality = "low" | "medium" | "high";

type SettingsState = {
  quality: Quality;
  setQuality: (q: Quality) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      quality: "medium",
      setQuality: (quality) => set({ quality }),
    }),
    { name: "lagos-settings" }
  )
);