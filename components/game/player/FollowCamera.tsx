// components/game/player/FollowCamera.tsx
"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useRapier } from "@react-three/rapier";
import * as THREE from "three";
import { playerPosition, playerBody } from "@/lib/playerRef";
import { CAMERA } from "@/lib/constants";

const target = new THREE.Vector3();
const pivot = new THREE.Vector3();
const toCamera = new THREE.Vector3();
const lookAt = new THREE.Vector3();

export default function FollowCamera() {
  const camera = useThree((s) => s.camera);
  const { world, rapier } = useRapier();
  const ray = useRef<InstanceType<typeof rapier.Ray> | null>(null);

  useFrame((_, delta) => {
    const p = playerPosition;

    pivot.set(p.x, p.y + CAMERA.pivotHeight, p.z);
    target.set(
      p.x + CAMERA.offset[0],
      p.y + CAMERA.offset[1],
      p.z + CAMERA.offset[2]
    );

    // Frame-rate independent smoothing
    const k = 1 - Math.pow(1 - CAMERA.lerp, Math.min(delta, 0.1) * 60);
    camera.position.lerp(target, k);

    // Collision: cast from the player's head toward the camera
    toCamera.copy(camera.position).sub(pivot);
    const dist = toCamera.length();

    if (dist > 0.001) {
      toCamera.divideScalar(dist);

      if (!ray.current) {
        ray.current = new rapier.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 });
      }
      const r = ray.current;
      r.origin.x = pivot.x;
      r.origin.y = pivot.y;
      r.origin.z = pivot.z;
      r.dir.x = toCamera.x;
      r.dir.y = toCamera.y;
      r.dir.z = toCamera.z;

      const hit = world.castRay(
        r,
        dist,
        true,
        rapier.QueryFilterFlags.EXCLUDE_SENSORS,
        undefined,
        undefined,
        playerBody.current ?? undefined // ignore the player's own body
      );

      if (hit) {
        const safe = Math.max(
          hit.timeOfImpact - CAMERA.collisionMargin,
          CAMERA.minDistance
        );
        if (safe < dist) {
          camera.position.copy(pivot).addScaledVector(toCamera, safe);
        }
      }
    }

    lookAt.set(p.x, p.y + 1, p.z);
    camera.lookAt(lookAt);
  });

  return null;
}