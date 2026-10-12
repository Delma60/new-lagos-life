// components/game/world/TimeController.tsx
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/store/gameStore";
import { TIME } from "@/lib/constants";

// Updates the store a few times per second instead of every frame,
// so subscribed components don't re-render at 60 Hz.
export default function TimeController() {
  const acc = useRef(0);

  useFrame((_, delta) => {
    const s = useGameStore.getState();
    if (s.paused) return;

    acc.current += delta;
    if (acc.current < TIME.tickSeconds) return;

    const dt = acc.current;
    acc.current = 0;
    s.setTimeOfDay((s.timeOfDay + dt * TIME.hoursPerSecond) % 24);
  });

  return null;
}