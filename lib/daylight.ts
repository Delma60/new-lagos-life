// lib/daylight.ts
import { MathUtils } from "three";

// 6:00 sunrise, 12:00 noon, 18:00 sunset
export function getSunAngle(t: number) {
  return ((t - 6) / 12) * Math.PI;
}

// 0 = full night, 1 = full day, smooth through dawn and dusk
export function getDaylight(t: number) {
  const height = Math.sin(getSunAngle(t));
  return MathUtils.smoothstep(height, -0.1, 0.25);
}