// components/game/world/SkyAndLights.tsx
"use client";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { getDaylight, getSunAngle } from "@/lib/daylight";

const DAY_FOG = new THREE.Color("#cfd8dc");
const NIGHT_FOG = new THREE.Color("#0a0f1c");

export default function SkyAndLights() {
  const t = useGameStore((s) => s.timeOfDay);
  const angle = getSunAngle(t);
  const day = getDaylight(t);

  const sun: [number, number, number] = [
    Math.cos(angle) * 100,
    Math.sin(angle) * 100,
    20,
  ];
  const fogColor = NIGHT_FOG.clone().lerp(DAY_FOG, day);

  return (
    <>
      <Sky sunPosition={sun} />
      <ambientLight intensity={0.2 + 0.35 * day} />
      <directionalLight
        position={sun}
        intensity={1.2 * day}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
        shadow-camera-near={1}
        shadow-camera-far={250}
      />
      <fog attach="fog" args={["#cfd8dc", 40, 160]} color={fogColor} />
    </>
  );
}