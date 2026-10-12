// components/game/player/FollowCamera.tsx
"use client";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { playerPosition } from "@/lib/playerRef";
import { CAMERA } from "@/lib/constants";

const target = new THREE.Vector3();
const lookAt = new THREE.Vector3();

export default function FollowCamera() {
  const camera = useThree((s) => s.camera);

  useFrame(() => {
    // TODO: add a raycast from player to camera so it doesn't clip through walls.
    target.set(
      playerPosition.x + CAMERA.offset[0],
      playerPosition.y + CAMERA.offset[1],
      playerPosition.z + CAMERA.offset[2]
    );
    camera.position.lerp(target, CAMERA.lerp);
    lookAt.set(playerPosition.x, playerPosition.y + 1, playerPosition.z);
    camera.lookAt(lookAt);
  });

  return null;
}