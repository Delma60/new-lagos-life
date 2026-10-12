// components/game/player/Player.tsx
"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useKeyboardInput } from "./useKeyboardInput";
import { input } from "@/lib/input";
import { playerPosition, playerBody } from "@/lib/playerRef";
import { PLAYER } from "@/lib/constants";

const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const move = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);

export default function Player() {
  useKeyboardInput();
  const body = useRef<RapierRigidBody>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const camera = useThree((s) => s.camera);

  useFrame(() => {
    const rb = body.current;
    if (!rb) return;
    playerBody.current = rb;

    // Movement relative to the camera's facing direction
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, UP).normalize();

    move.set(0, 0, 0).addScaledVector(forward, input.y).addScaledVector(right, input.x);
    if (move.lengthSq() > 0) move.normalize();

    const speed = input.run ? PLAYER.runSpeed : PLAYER.walkSpeed;
    const vel = rb.linvel();
    let vy = vel.y;

    // Grounded check (simple): vertical velocity near zero
    if (input.jump && Math.abs(vel.y) < 0.05) vy = PLAYER.jumpForce;

    rb.setLinvel({ x: move.x * speed, y: vy, z: move.z * speed }, true);

    const p = rb.translation();
    playerPosition.set(p.x, p.y, p.z);

    // Face movement direction
    if (mesh.current && move.lengthSq() > 0) {
      mesh.current.rotation.y = Math.atan2(move.x, move.z);
    }
  });

  return (
    <RigidBody
      ref={body}
      position={[0, 2, 0]}
      enabledRotations={[false, false, false]}
      colliders={false}
      linearDamping={0.5}
    >
      <CapsuleCollider args={[PLAYER.capsuleHalfHeight, PLAYER.capsuleRadius]} />
      <mesh ref={mesh} castShadow>
        <capsuleGeometry args={[PLAYER.capsuleRadius, PLAYER.capsuleHalfHeight * 2]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
    </RigidBody>
  );
}