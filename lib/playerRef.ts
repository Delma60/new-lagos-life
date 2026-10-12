// lib/playerRef.ts
import * as THREE from "three";
import type { RapierRigidBody } from "@react-three/rapier";

export const playerPosition = new THREE.Vector3(0, 2, 0);

// Lets the camera ignore the player's own collider when raycasting.
export const playerBody: { current: RapierRigidBody | null } = { current: null };
