// components/game/ui/TouchControls.tsx
"use client";
import { useEffect, useRef } from "react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { input } from "@/lib/input";

export default function TouchControls() {
  const isTouch = useIsTouch();
  const zone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTouch || !zone.current) return;
    let manager: import("nipplejs").JoystickManager | undefined;

    // nipplejs touches `window`, so import it only on the client
    import("nipplejs").then((nipple) => {
      manager = nipple.default.create({
        zone: zone.current!,
        mode: "static",
        position: { left: "50%", top: "50%" },
        color: "white",
      });
      manager.on("move", (_, d) => {
        input.x = d.vector.x;
        input.y = d.vector.y;
        input.run = d.force > 1.2;
      });
      manager.on("end", () => {
        input.x = 0;
        input.y = 0;
        input.run = false;
      });
    });

    return () => manager?.destroy();
  }, [isTouch]);

  if (!isTouch) return null;

  return (
    <>
      <div ref={zone} className="fixed bottom-8 left-8 h-32 w-32" />
      <button
        className="fixed bottom-10 right-8 h-20 w-20 rounded-full bg-white/30 text-white backdrop-blur"
        onTouchStart={() => (input.jump = true)}
        onTouchEnd={() => (input.jump = false)}
      >
        Jump
      </button>
    </>
  );
}