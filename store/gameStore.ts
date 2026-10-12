// store/gameStore.ts
import { create } from "zustand";

type GameState = {
  paused: boolean;
  cash: number;
  energy: number;
  hunger: number;
  timeOfDay: number; // 0-24
  setPaused: (p: boolean) => void;
  addCash: (n: number) => void;
  setTimeOfDay: (t: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  paused: false,
  cash: 5000,
  energy: 100,
  hunger: 100,
  timeOfDay: 9,
  setPaused: (paused) => set({ paused }),
  addCash: (n) => set((s) => ({ cash: s.cash + n })),
  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
}));