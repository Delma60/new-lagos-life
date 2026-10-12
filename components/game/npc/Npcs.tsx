// components/game/npc/Npcs.tsx
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { npcs } from "@/data/district";
import { playerPosition } from "@/lib/playerRef";
import { NPC_TALK_RADIUS, PLAYER } from "@/lib/constants";
import { useGameStore } from "@/store/gameStore";
import type { NpcDef } from "@/types/game";

function Npc({ npc }: { npc: NpcDef }) {
  const marker = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const dx = playerPosition.x - npc.position[0];
    const dz = playerPosition.z - npc.position[2];
    const near = dx * dx + dz * dz < NPC_TALK_RADIUS * NPC_TALK_RADIUS;

    const s = useGameStore.getState();
    if (near && s.nearbyNpc !== npc.id) s.setNearbyNpc(npc.id);
    else if (!near && s.nearbyNpc === npc.id) s.setNearbyNpc(null);

    // Floating "talk to me" marker
    if (marker.current) {
      marker.current.position.y = 1.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      marker.current.rotation.y += 0.02;
    }
  });

  return (
    <RigidBody
      type="fixed"
      colliders={false}
      position={npc.position}
      rotation={[0, npc.rotationY, 0]}
    >
      <CapsuleCollider args={[PLAYER.capsuleHalfHeight, PLAYER.capsuleRadius]} />
      <mesh castShadow>
        <capsuleGeometry args={[PLAYER.capsuleRadius, PLAYER.capsuleHalfHeight * 2]} />
        <meshStandardMaterial color={npc.color} />
      </mesh>
      <mesh ref={marker}>
        <octahedronGeometry args={[0.18]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.5} />
      </mesh>
    </RigidBody>
  );
}

export default function Npcs() {
  return (
    <>
      {npcs.map((n) => (
        <Npc key={n.id} npc={n} />
      ))}
    </>
  );
}