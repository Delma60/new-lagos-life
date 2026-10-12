// data/district.ts
import type {
  BuildingDef,
  NpcDef,
  PedestrianDef,
  VehicleDef,
  VehicleKind,
  Vector3Tuple,
} from "@/types/game";

export const ROAD_WIDTH = 10;

// Four roads forming a square block. Centre lines at x/z = ±30.
export const roads = [
  { x: 0, z: -30, w: 200, d: ROAD_WIDTH },
  { x: 0, z: 30, w: 200, d: ROAD_WIDTH },
  { x: -30, z: 0, w: ROAD_WIDTH, d: 200 },
  { x: 30, z: 0, w: ROAD_WIDTH, d: 200 },
];

const b = (
  id: string,
  x: number,
  z: number,
  w: number,
  d: number,
  h: number,
  color: string
): BuildingDef => ({ id, x, z, w, d, h, color });

export const buildings: BuildingDef[] = [
  // Inside the block (the centre stays open as a plaza)
  b("in-nw", -15, -15, 12, 12, 10, "#d9c7a3"),
  b("in-ne", 15, -15, 12, 12, 14, "#c97b5a"),
  b("in-sw", -15, 15, 12, 12, 8, "#9fb8c9"),
  b("in-se", 15, 15, 12, 12, 12, "#e0b84f"),
  // North and south of the block
  b("n-w", -15, -50, 16, 14, 9, "#c9b8a0"),
  b("n-e", 15, -50, 16, 14, 16, "#b0604a"),
  b("s-w", -15, 50, 16, 14, 11, "#a7c0a0"),
  b("s-e", 15, 50, 16, 14, 7, "#d8a76b"),
  // West and east of the block
  b("w-n", -50, -15, 14, 16, 12, "#b9a9c4"),
  b("w-s", -50, 15, 14, 16, 8, "#d9c7a3"),
  b("e-n", 50, -15, 14, 16, 10, "#9fb8c9"),
  b("e-s", 50, 15, 14, 16, 15, "#c97b5a"),
];

// Street lamps stand on the inner sidewalk
export const streetLights: [number, number][] = [
  [-24.5, -24.5],
  [24.5, -24.5],
  [24.5, 24.5],
  [-24.5, 24.5],
  [0, -24.5],
  [0, 24.5],
  [-24.5, 0],
  [24.5, 0],
];

// Right-hand traffic, counter-clockwise loop (north is -z)
export const trafficLoop: [number, number][] = [
  [32.5, 32.5],
  [32.5, -32.5],
  [-32.5, -32.5],
  [-32.5, 32.5],
];

// Loop is 260 m long. Same speed for all vehicles + 43 m spacing = no overlaps.
export const vehicles: VehicleDef[] = [
  { kind: "danfo", offset: 0 },
  { kind: "keke", offset: 43 },
  { kind: "danfo", offset: 86 },
  { kind: "keke", offset: 130 },
  { kind: "danfo", offset: 173 },
  { kind: "keke", offset: 216 },
];

export const VEHICLE_TYPES: Record<
  VehicleKind,
  {
    size: Vector3Tuple;
    body: string;
    accent: { color: string; size: Vector3Tuple; y: number };
  }
> = {
  danfo: {
    size: [2.2, 2.4, 5.4],
    body: "#f5c518",
    accent: { color: "#111111", size: [2.24, 0.35, 5.0], y: 0 },
  },
  keke: {
    size: [1.4, 1.6, 2.6],
    body: "#2f9e57",
    accent: { color: "#f5c518", size: [1.5, 0.15, 2.5], y: 0.8 },
  },
};

const plazaLoop: [number, number][] = [
  [-7, -7],
  [7, -7],
  [7, 7],
  [-7, 7],
];

const sidewalkLoop: [number, number][] = [
  [-23, -23],
  [23, -23],
  [23, 23],
  [-23, 23],
];

export const pedestrians: PedestrianDef[] = [
  { id: "p1", route: plazaLoop, speed: 1.3, offset: 0, color: "#e11d48" },
  { id: "p2", route: plazaLoop, speed: 1.3, offset: 14, color: "#2563eb" },
  { id: "p3", route: plazaLoop, speed: 1.1, offset: 28, color: "#a855f7" },
  { id: "p4", route: sidewalkLoop, speed: 1.5, offset: 0, color: "#f97316" },
  { id: "p5", route: sidewalkLoop, speed: 1.4, offset: 46, color: "#0d9488" },
  { id: "p6", route: sidewalkLoop, speed: 1.2, offset: 92, color: "#facc15" },
];

export const npcs: NpcDef[] = [
  {
    id: "mama-tosin",
    name: "Mama Tosin",
    position: [4, 0.85, -3],
    rotationY: Math.PI * 0.75,
    color: "#d946ef",
    dialogueId: "mama-tosin",
  },
  {
    id: "conductor-bayo",
    name: "Bayo",
    position: [-4, 0.85, 3],
    rotationY: -Math.PI * 0.25,
    color: "#0ea5e9",
    dialogueId: "conductor-bayo",
  },
];