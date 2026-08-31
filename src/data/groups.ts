import { BoneGroupMeta } from "../types/bone";

export const BONE_GROUPS: BoneGroupMeta[] = [
  {
    id: "skull",
    name: "Tengkorak",
    latinName: "Cranium & Ossa Faciei",
    division: "axial",
    description: "Melindungi otak dan indra utama serta membentuk struktur dasar wajah manusia.",
    boneCountApprox: "22 tulang (8 kranial, 14 fasial)",
    iconName: "Brain",
    colorHex: "#38bdf8", // Sky blue
    defaultFocusPoint: [0, 2.3, 0],
    defaultDistance: 1.1,
  },
  {
    id: "vertebral-column",
    name: "Tulang Belakang",
    latinName: "Columna Vertebralis",
    division: "axial",
    description: "Sumbu utama tubuh yang melindungi medula spinalis dan menyangga kepala serta batang tubuh.",
    boneCountApprox: "26 ruas (7 servikal, 12 torakal, 5 lumbal, 1 sakrum, 1 koksigis)",
    iconName: "Activity",
    colorHex: "#818cf8", // Indigo
    defaultFocusPoint: [0, 1.1, 0],
    defaultDistance: 2.0,
  },
  {
    id: "rib-cage",
    name: "Rangka Dada",
    latinName: "Thorax / Cavea Thoracis",
    division: "axial",
    description: "Melindungi organ vital rongga dada (jantung dan paru-paru) serta memfasilitasi pernapasan.",
    boneCountApprox: "25 tulang (1 sternum, 24 rusuk / 12 pasang)",
    iconName: "Shield",
    colorHex: "#34d399", // Emerald
    defaultFocusPoint: [0, 1.35, 0],
    defaultDistance: 1.5,
  },
  {
    id: "shoulder-girdle",
    name: "Gelang Bahu",
    latinName: "Cingulum Pectorale",
    division: "appendicular",
    description: "Menghubungkan lengan atas dengan rangka aksial dan memberi rentang gerak bahu yang luas.",
    boneCountApprox: "4 tulang (2 klavikula, 2 skapula)",
    iconName: "Feather",
    colorHex: "#fbbf24", // Amber
    defaultFocusPoint: [0, 1.7, 0],
    defaultDistance: 1.4,
  },
  {
    id: "upper-limb",
    name: "Anggota Gerak Atas",
    latinName: "Membrum Superius",
    division: "appendicular",
    description: "Alat manipulasi dan gerak presisi tinggi (lengan, siku, pergelangan, dan jari-jari tangan).",
    boneCountApprox: "60 tulang (30 pada tiap lengan)",
    iconName: "Hand",
    colorHex: "#f472b6", // Pink
    defaultFocusPoint: [0.65, 1.1, 0],
    defaultDistance: 1.8,
  },
  {
    id: "pelvic-girdle",
    name: "Gelang Panggul",
    latinName: "Cingulum Pelvicum / Pelvis",
    division: "appendicular",
    description: "Penyangga beban tubuh bagian atas dan pelindung organ reproduksi serta ekskresi bawah.",
    boneCountApprox: "2 tulang koksa (fusi ilium, iskium, pubis)",
    iconName: "CircleDot",
    colorHex: "#a78bfa", // Purple
    defaultFocusPoint: [0, 0.45, 0],
    defaultDistance: 1.3,
  },
  {
    id: "lower-limb",
    name: "Anggota Gerak Bawah",
    latinName: "Membrum Inferius",
    division: "appendicular",
    description: "Penyangga berat badan, penggerak lokomosi utama, dan peredam kejut saat berjalan/berlari.",
    boneCountApprox: "60 tulang (30 pada tiap tungkai)",
    iconName: "Footprints",
    colorHex: "#fb923c", // Orange
    defaultFocusPoint: [0.25, -0.9, 0],
    defaultDistance: 2.2,
  },
];
