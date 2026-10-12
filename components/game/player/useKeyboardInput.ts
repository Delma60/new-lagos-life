// components/game/player/useKeyboardInput.ts
"use client";
import { useEffect } from "react";
import { input } from "@/lib/input";

export function useKeyboardInput() {
  useEffect(() => {
    const keys = new Set<string>();

    const update = () => {
      input.x = (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) -
                (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0);
      input.y = (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0) -
                (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0);
      input.run = keys.has("ShiftLeft") || keys.has("ShiftRight");
      input.jump = keys.has("Space");
    };

    const down = (e: KeyboardEvent) => {
      keys.add(e.code);
      update();
    };
    const up = (e: KeyboardEvent) => {
      keys.delete(e.code);
      update();
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
}