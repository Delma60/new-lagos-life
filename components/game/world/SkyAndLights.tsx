// components/game/world/SkyAndLights.tsx
"use client";
import { Sky } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";

export default function SkyAndLights() {
  const t = useGameStore((s) => s.timeOfDay);
  // Simple sun arc: 6am sunrise, 18pm sunset
  const angle = ((t - 6) / 12) * Math.PI;
  const sun: [number, number, number] = [Math.cos(angle) * 100, Math.sin(angle) * 100, 20];
  const isDay = Math.sin(angle) > 0;

  return (
    <>
      <Sky sunPosition={sun} />
      <ambientLight intensity={isDay ? 0.5 : 0.1} />
      <directionalLight
        position={sun}
        intensity={isDay ? 1.2 : 0.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <fog attach="fog" args={["#cfd8dc", 40, 160]} />
    </>
  );
}