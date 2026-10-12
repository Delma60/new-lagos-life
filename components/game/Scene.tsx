// components/game/Scene.tsx
"use client";
import World from "./world/World";
import Player from "./player/Player";
import FollowCamera from "./player/FollowCamera";
import SkyAndLights from "./world/SkyAndLights";

export default function Scene() {
  return (
    <>
      <SkyAndLights />
      <World />
      <Player />
      <FollowCamera />
    </>
  );
}