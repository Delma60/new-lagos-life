// components/game/npc/Pedestrians.tsx
"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pedestrians } from "@/data/district";
import { LoopPath, lerpAngle, PathSample } from "@/lib/path";
import { useGameStore } from "@/store/gameStore";
import type { PedestrianDef } from "@/types/game";

const sample: PathSample = { x: 0, z: 0, heading: 0 };
const PED_HEIGHT = 1.6; // capsule radius 0.3 + length 1.0

function Pedestrian({ def }: { def: PedestrianDef }) {
  const path = useMemo(() => new LoopPath(def.route), [def.route]);
  const start = useMemo(
    () => path.sample(def.offset, { x: 0, z: 0, heading: 0 }),
    [path, def.offset]
  );
  const group = useRef<THREE.Group>(null);
  const dist = useRef(def.offset);
  const heading = useRef(start.heading);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g || useGameStore.getState().paused) return;

    const dt = Math.min(delta, 0.1);
    dist.current += def.speed * dt;
    path.sample(dist.current, sample);

    heading.current = lerpAngle(heading.current, sample.heading, Math.min(1, dt * 6));
    const bob = Math.abs(Math.sin(dist.current * 3)) * 0.05;

    g.position.set(sample.x, PED_HEIGHT / 2 + bob, sample.z);
    g.rotation.y = heading.current;
  });

  return (
    <group ref={group} position={[start.x, PED_HEIGHT / 2, start.z]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.3, 1.0]} />
        <meshStandardMaterial color={def.color} />
      </mesh>
    </group>
  );
}

export default function Pedestrians() {
  return (
    <>
      {pedestrians.map((p) => (
        <Pedestrian key={p.id} def={p} />
      ))}
    </>
  );
}