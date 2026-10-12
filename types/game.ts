// types/game.ts
export type Vector3Tuple = [number, number, number];

export type Mission = {
  id: string;
  title: string;
  description: string;
  reward: number;
};

export type DialogueChoice = {
  label: string;
  next: string | null; // node id, or null to end the conversation
};

export type DialogueNode = {
  speaker: string;
  text: string;
  next?: string | null; // used when there are no choices
  choices?: DialogueChoice[];
};

export type DialogueTree = {
  start: string;
  nodes: Record<string, DialogueNode>;
};

export type BuildingDef = {
  id: string;
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  color: string;
};

export type NpcDef = {
  id: string;
  name: string;
  position: Vector3Tuple;
  rotationY: number;
  color: string;
  dialogueId: string;
};

export type VehicleKind = "danfo" | "keke";

export type VehicleDef = {
  kind: VehicleKind;
  offset: number; // starting distance along the loop, in metres
};

export type PedestrianDef = {
  id: string;
  route: [number, number][];
  speed: number;
  offset: number;
  color: string;
};