// components/game/traffic/Traffic.tsx
"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { trafficLoop, vehicles, VEHICLE_TYPES } from "@/data/district";
import { LoopPath, lerpAngle, PathSample } from "@/lib/path";
import { TRAFFIC } from "@/lib/constants";
import { useGameStore } from "@/store/gameStore";
import type { VehicleDef } from "@/types/game";

const trafficPath = new LoopPath(trafficLoop);
const sample: PathSample = { x: 0, z: 0, heading: 0 };
const quat = new THREE.Quaternion();
const UP = new THREE.Vector3(0, 1, 0);

function Vehicle({ def }: { def: VehicleDef }) {
  const type = VEHICLE_TYPES[def.kind];
  const [w, h, l] = type.size;

  const body = useRef<RapierRigidBody>(null);
  const dist = useRef(def.offset);
  const start = useMemo(
    () => trafficPath.sample(def.offset, { x: 0, z: 0, heading: 0 }),
    [def.offset]
  );
  const heading = useRef(start.heading);

  useFrame((_, delta) => {
    const rb = body.current;
    if (!rb || useGameStore.getState().paused) return;

    const dt = Math.min(delta, 0.1);
    dist.current += TRAFFIC.speed * dt;
    trafficPath.sample(dist.current, sample);

    // Smooth the heading so corners are rounded, not snapped
    heading.current = lerpAngle(heading.current, sample.heading, Math.min(1, dt * 5));
    quat.setFromAxisAngle(UP, heading.current);

    rb.setNextKinematicTranslation({ x: sample.x, y: h / 2, z: sample.z });
    rb.setNextKinematicRotation(quat);
  });

  return (
    <RigidBody
      ref={body}
      type="kinematicPosition"
      colliders={false}
      position={[start.x, h / 2, start.z]}
      rotation={[0, start.heading, 0]}
    >
      <CuboidCollider args={[w / 2, h / 2, l / 2]} />
      <mesh castShadow>
        <boxGeometry args={type.size} />
        <meshStandardMaterial color={type.body} />
      </mesh>
      <mesh position={[0, type.accent.y, 0]}>
        <boxGeometry args={type.accent.size} />
        <meshStandardMaterial color={type.accent.color} />
      </mesh>
    </RigidBody>
  );
}

export default function Traffic() {
  return (
    <>
      {vehicles.map((v, i) => (
        <Vehicle key={i} def={v} />
      ))}
    </>
  );
}