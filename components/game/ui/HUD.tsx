// components/game/ui/HUD.tsx
"use client";
import { useGameStore } from "@/store/gameStore";

export default function HUD() {
  const cash = useGameStore((s) => s.cash);
  const energy = useGameStore((s) => s.energy);
  const hunger = useGameStore((s) => s.hunger);

  return (
    <div className="pointer-events-none fixed right-4 top-4 space-y-1 rounded bg-black/50 p-3 text-sm text-white">
      <div>₦{cash.toLocaleString()}</div>
      <div>Energy: {energy}</div>
      <div>Hunger: {hunger}</div>
    </div>
  );
}