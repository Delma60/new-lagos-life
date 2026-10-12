// components/game/ui/LoadingScreen.tsx
"use client";
import { useProgress } from "@react-three/drei";

// Used two ways:
//  - as the next/dynamic fallback (no props, outside <Canvas>, shows a plain screen)
//  - as an overlay inside GameCanvas (overlay) that tracks real asset progress
export default function LoadingScreen({ overlay = false }: { overlay?: boolean }) {
  const { progress, active } = useProgress();

  if (overlay && !active && progress >= 100) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-black text-white">
      <p className="text-lg">Loading Lagos…</p>
      {overlay && (
        <div className="h-2 w-56 overflow-hidden rounded bg-zinc-700">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}