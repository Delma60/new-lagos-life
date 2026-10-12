"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/game/ui/LoadingScreen";

const GameCanvas = dynamic(() => import("./GameCanvas"), {
  ssr: false,
  loading: () => <LoadingScreen label="Preparing the city..." />,
});

export default function GameLoader() {
  return <GameCanvas />;
}
