// store/gameStore.ts
import { create } from "zustand";
import { dialogues } from "@/data/dialogues";

type DialogueState = { treeId: string; nodeId: string } | null;

type GameState = {
  paused: boolean;
  cash: number;
  energy: number;
  hunger: number;
  timeOfDay: number; // 0-24
  dialogue: DialogueState;
  nearbyNpc: string | null;
  setPaused: (p: boolean) => void;
  addCash: (n: number) => void;
  setTimeOfDay: (t: number) => void;
  setNearbyNpc: (id: string | null) => void;
  startDialogue: (treeId: string) => void;
  advanceDialogue: (nextId: string | null) => void;
  endDialogue: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  paused: false,
  cash: 5000,
  energy: 100,
  hunger: 100,
  timeOfDay: 9,
  dialogue: null,
  nearbyNpc: null,
  setPaused: (paused) => set({ paused }),
  addCash: (n) => set((s) => ({ cash: s.cash + n })),
  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
  setNearbyNpc: (nearbyNpc) => set({ nearbyNpc }),
  startDialogue: (treeId) => {
    const tree = dialogues[treeId];
    if (!tree) return;
    set({ dialogue: { treeId, nodeId: tree.start } });
  },
  advanceDialogue: (nextId) =>
    set((s) => {
      if (!s.dialogue) return s;
      const tree = dialogues[s.dialogue.treeId];
      if (nextId === null || !tree?.nodes[nextId]) return { dialogue: null };
      return { dialogue: { ...s.dialogue, nodeId: nextId } };
    }),
  endDialogue: () => set({ dialogue: null }),
}));