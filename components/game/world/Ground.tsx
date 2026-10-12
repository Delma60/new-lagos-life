// components/game/world/Ground.tsx
"use client";
import { RigidBody } from "@react-three/rapier";

export default function Ground() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <boxGeometry args={[200, 200, 0.1]} />
        <meshStandardMaterial color="#7c7766" />
      </mesh>
    </RigidBody>
  );
}