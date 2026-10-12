"use client";

import { useEffect, useState } from "react";
import { playerPosition } from "@/lib/playerRef";

export default function Minimap() {
  const [position, setPosition] = useState({ x: 0, z: 0 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPosition({ x: playerPosition.x, z: playerPosition.z });
    }, 100);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      aria-label={`Map position ${Math.round(position.x)}, ${Math.round(position.z)}`}
      className="minimap"
      role="img"
    >
      <span className="minimap__player" />
    </div>
  );
}
