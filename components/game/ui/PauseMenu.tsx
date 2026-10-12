// components/game/ui/PauseMenu.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";
import { useSettingsStore, Quality } from "@/store/settingsStore";

export default function PauseMenu() {
  const paused = useGameStore((s) => s.paused);
  const setPaused = useGameStore((s) => s.setPaused);
  const quality = useSettingsStore((s) => s.quality);
  const setQuality = useSettingsStore((s) => s.setQuality);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") setPaused(!useGameStore.getState().paused);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPaused]);

  return (
    <>
      <button
        onClick={() => setPaused(true)}
        className="fixed left-4 top-12 rounded bg-black/50 px-3 py-1 text-white"
      >
        Pause
      </button>

      {paused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-72 space-y-4 rounded-lg bg-zinc-900 p-6 text-white">
            <h2 className="text-xl font-semibold">Paused</h2>
            <label className="block text-sm">
              Graphics quality
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as Quality)}
                className="mt-1 w-full rounded bg-zinc-800 p-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <button
              onClick={() => setPaused(false)}
              className="w-full rounded bg-green-600 py-2"
            >
              Resume
            </button>
            <Link href="/" className="block text-center text-sm text-zinc-400">
              Quit to home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}