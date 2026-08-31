export type BoneGroupId =
  | "skull"
  | "vertebral-column"
  | "rib-cage"
  | "shoulder-girdle"
  | "upper-limb"
  | "pelvic-girdle"
  | "lower-limb";

export type SkeletonDivision = "axial" | "appendicular";

export type BoneShapeType =
  | "Tulang Pipa (Panjang)"
  | "Tulang Pipih"
  | "Tulang Pendek"
  | "Tulang Tak Beraturan"
  | "Tulang Sesamoid"
  | "Tulang Tak Beraturan / Pipih"
  | "Tulang Pipih Melengkung"
  | "Tulang Pipih Melengkung Pendek"
  | "Tulang Pipa Mini"
  | "Tulang Pipih / Tak Beraturan"
  | "Tulang Pipa Ramping"
  | "Tulang Pendek Masif"
  | "Tulang Pipa Mini Masif"
  | "Tulang Pipa Mini Pendek";

export interface BoneModelConfig {
  meshName: string;
  focusPoint: [number, number, number]; // [x, y, z] in Three.js coordinates
  preferredDistance: number; // camera distance from target
  cameraAngle?: [number, number, number]; // optional custom camera offset
  labelPosition: [number, number, number]; // 3D pin/label position
}

export interface ArticulationInfo {
  jointName: string; // e.g. "Sendi Peluru (Articulatio Coxae)"
  connectedTo: string; // e.g. "Asetabulum pada Pelvis"
  movementType: string; // e.g. "Gerak segala arah (fleksi, ekstensi, rotasi, sirkumduksi)"
}

export interface BoneData {
  id: string;
  commonName: string; // e.g. "Tulang Paha"
  latinName: string; // e.g. "Femur (Os Femoris)"
  group: BoneGroupId;
  division: SkeletonDivision;
  shapeType: BoneShapeType;
  countDescription: string; // e.g. "2 buah (kiri dan kanan)"
  location: string; // e.g. "Tungkai atas / regio femoris"
  summary: string; // brief 1-2 sentence description
  functions: string[];
  anatomyFacts: string[];
  characteristics: string[];
  articulations: ArticulationInfo[];
  clinicalNotes: string[]; // e.g. fractures, osteoporosis, exam points
  model: BoneModelConfig;
}

export interface BoneGroupMeta {
  id: BoneGroupId;
  name: string;
  latinName: string;
  division: SkeletonDivision;
  description: string;
  boneCountApprox: string;
  iconName: string;
  colorHex: string;
  defaultFocusPoint: [number, number, number];
  defaultDistance: number;
}

export type CameraPreset = "anterior" | "posterior" | "lateral-left" | "lateral-right" | "superior" | "reset";
