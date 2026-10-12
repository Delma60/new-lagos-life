// components/game/world/StreetLights.tsx
"use client";
import { useMemo } from "react";
import { Instance, Instances } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { streetLights } from "@/data/district";
import { useGameStore } from "@/store/gameStore";
import { getDaylight } from "@/lib/daylight";

const POLE_HEIGHT = 5;

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,214,150,0.9)");
  grad.addColorStop(1, "rgba(255,214,150,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export default function StreetLights() {
  const time = useGameStore((s) => s.timeOfDay);
  const night = 1 - getDaylight(time);
  const glow = useMemo(makeGlowTexture, []);
  const n = streetLights.length;

  return (
    <>
      <Instances limit={n} castShadow>
        <cylinderGeometry args={[0.08, 0.1, POLE_HEIGHT, 8]} />
        <meshStandardMaterial color="#2b2b2b" />
        {streetLights.map(([x, z]) => (
          <Instance key={`pole-${x}-${z}`} position={[x, POLE_HEIGHT / 2, z]} />
        ))}
      </Instances>

      <Instances limit={n}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial
          color="#fff3d6"
          emissive="#ffc46b"
          emissiveIntensity={night * 3}
        />
        {streetLights.map(([x, z]) => (
          <Instance key={`lamp-${x}-${z}`} position={[x, POLE_HEIGHT + 0.1, z]} />
        ))}
      </Instances>

      {/* Fake light pool on the ground: far cheaper than real point lights */}
      <Instances limit={n} visible={night > 0.02} renderOrder={1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          transparent
          opacity={night * 0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
        {streetLights.map(([x, z]) => (
          <Instance
            key={`glow-${x}-${z}`}
            position={[x, 0.03, z]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={10}
          />
        ))}
      </Instances>

      <RigidBody type="fixed" colliders={false}>
        {streetLights.map(([x, z]) => (
          <CuboidCollider
            key={`col-${x}-${z}`}
            args={[0.15, POLE_HEIGHT / 2, 0.15]}
            position={[x, POLE_HEIGHT / 2, z]}
          />
        ))}
      </RigidBody>
    </>
  );
}