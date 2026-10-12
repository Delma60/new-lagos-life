// lib/path.ts
export type PathSample = { x: number; z: number; heading: number };

// A closed loop of waypoints on the ground plane (x, z).
export class LoopPath {
  private pts: [number, number][];
  private cum: number[]; // distance at which each segment starts
  readonly length: number;

  constructor(points: [number, number][]) {
    this.pts = points;
    this.cum = [];
    let total = 0;
    for (let i = 0; i < points.length; i++) {
      this.cum.push(total);
      const [ax, az] = points[i];
      const [bx, bz] = points[(i + 1) % points.length];
      total += Math.hypot(bx - ax, bz - az);
    }
    this.length = total;
  }

  sample(distance: number, out: PathSample): PathSample {
    const d = ((distance % this.length) + this.length) % this.length;
    let i = this.pts.length - 1;
    while (this.cum[i] > d) i--;

    const [ax, az] = this.pts[i];
    const [bx, bz] = this.pts[(i + 1) % this.pts.length];
    const segLen = Math.hypot(bx - ax, bz - az);
    const t = segLen === 0 ? 0 : (d - this.cum[i]) / segLen;

    out.x = ax + (bx - ax) * t;
    out.z = az + (bz - az) * t;
    out.heading = Math.atan2(bx - ax, bz - az); // model faces +z
    return out;
  }
}

// Shortest-way angle interpolation so turns don't spin the long way round.
export function lerpAngle(a: number, b: number, t: number) {
  const diff =
    ((((b - a + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) -
    Math.PI;
  return a + diff * t;
}