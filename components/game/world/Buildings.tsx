// components/game/world/Buildings.tsx
"use client";
import { Instance, Instances } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { buildings } from "@/data/district";

export default function Buildings() {
  return (
    <>
      {/* One draw call for every building */}
      <Instances limit={buildings.length} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
        {buildings.map((b) => (
          <Instance
            key={b.id}
            position={[b.x, b.h / 2, b.z]}
            scale={[b.w, b.h, b.d]}
            color={b.color}
          />
        ))}
      </Instances>

      {/* One static body with a cuboid collider per building */}
      <RigidBody type="fixed" colliders={false}>
        {buildings.map((b) => (
          <CuboidCollider
            key={b.id}
            args={[b.w / 2, b.h / 2, b.d / 2]}
            position={[b.x, b.h / 2, b.z]}
          />
        ))}
      </RigidBody>
    </>
  );
}