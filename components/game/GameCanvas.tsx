// components/game/GameCanvas.tsx
"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Scene from "./Scene";
import HUD from "./ui/HUD";
import PauseMenu from "./ui/PauseMenu";
import TouchControls from "./ui/TouchControls";
import LoadingScreen from "./ui/LoadingScreen";
import { useSettingsStore } from "@/store/settingsStore";
import { useGameStore } from "@/store/gameStore";
import { QUALITY } from "@/lib/constants";

export default function GameCanvas() {
  const quality = useSettingsStore((s) => s.quality);
  const paused = useGameStore((s) => s.paused);
  const q = QUALITY[quality];

  return (
    <>
      <Canvas
        dpr={q.dpr}
        shadows={q.shadows}
        camera={{ fov: 60, near: 0.1, far: 300 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        {process.env.NODE_ENV === "development" && <Perf position="top-left" />}
        <Suspense fallback={null}>
          <Physics gravity={[0, -20, 0]} paused={paused}>
            <Scene />
          </Physics>
        </Suspense>
      </Canvas>
      <HUD />
      <TouchControls />
      <PauseMenu />
      <LoadingScreen overlay />
    </>
  );
}