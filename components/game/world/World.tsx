// components/game/world/World.tsx
"use client";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import SkyAndLights from "./SkyAndLights";
import Ground from "./Ground";
import Roads from "./Roads";
import Buildings from "./Buildings";
import StreetLights from "./StreetLights";

const HALF = 100; // half the ground size

export default function World() {
  return (
    <>
      <SkyAndLights />
      <Ground />
      <Roads />
      <Buildings />
      <StreetLights />

      {/* Invisible walls so the player can't walk off the map */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[HALF, 10, 0.5]} position={[0, 10, -HALF]} />
        <CuboidCollider args={[HALF, 10, 0.5]} position={[0, 10, HALF]} />
        <CuboidCollider args={[0.5, 10, HALF]} position={[-HALF, 10, 0]} />
        <CuboidCollider args={[0.5, 10, HALF]} position={[HALF, 10, 0]} />
      </RigidBody>
    </>
  );
}