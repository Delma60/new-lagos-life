// components/game/world/Roads.tsx
"use client";
import { roads } from "@/data/district";

export default function Roads() {
  return (
    <>
      {roads.map((r, i) => (
        <mesh
          key={i}
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[r.x, 0.01, r.z]}
        >
          <planeGeometry args={[r.w, r.d]} />
          <meshStandardMaterial color="#2b2b2f" />
        </mesh>
      ))}

      {/* Central plaza where the player spawns */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#b8ad98" />
      </mesh>
    </>
  );
}