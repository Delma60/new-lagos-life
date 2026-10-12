"use client";

import Stats from "stats.js";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function PerformanceStats() {
  const stats = useRef<Stats | null>(null);

  useEffect(() => {
    const panel = new Stats();
    panel.showPanel(0);
    panel.dom.style.position = "absolute";
    panel.dom.style.top = "auto";
    panel.dom.style.bottom = "8px";
    panel.dom.style.left = "8px";
    document.body.appendChild(panel.dom);
    stats.current = panel;

    return () => {
      panel.dom.remove();
      stats.current = null;
    };
  }, []);

  useFrame(() => stats.current?.update());

  return null;
}
