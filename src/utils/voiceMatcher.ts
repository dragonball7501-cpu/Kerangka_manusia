import { BONES_DATA } from "../data/bones";
import { BoneData } from "../types/bone";

export interface VoiceMatchResult {
  type: "bone" | "action";
  boneId?: string;
  bone?: BoneData;
  action?:
    | "reset"
    | "xray"
    | "rotate"
    | "labels"
    | "zoom-in"
    | "zoom-out"
    | "pan-up"
    | "pan-down"
    | "region-head"
    | "region-torso"
    | "region-pelvis"
    | "region-legs"
    | "region-full";
  confidence: number;
  matchedTerm: string;
  originalQuery: string;
}

// Normalized bone synonyms & phonetic aliases
export interface BoneVoiceAlias {
  boneId: string;
  keywords: string[];
}

export const BONE_VOICE_ALIASES: BoneVoiceAlias[] = [
  {
    boneId: "cranium",
    keywords: [
      "cranium",
      "kranium",
      "neurocranium",
      "tengkorak",
      "tempurung kepala",
      "tulang kepala",
      "kepala",
      "batok kepala",
      "skull",
      "head",
      "frontal",
      "parietal",
      "oksipital",
      "temporal",
      "otak",
    ],
  },
  {
    boneId: "facial-bones",
    keywords: [
      "facial bones",
      "facial",
      "ossa faciei",
      "viscerocranium",
      "tulang wajah",
      "wajah",
      "muka",
      "tulang hidung",
      "tulang pipi",
      "zigomatikum",
      "maksila",
      "nasal",
    ],
  },
  {
    boneId: "mandible",
    keywords: [
      "mandible",
      "mandibula",
      "rahang bawah",
      "rahang",
      "tulang rahang",
      "dagu",
      "jaw",
      "lower jaw",
    ],
  },
  {
    boneId: "cervical-vertebrae",
    keywords: [
      "cervical",
      "servikal",
      "vertebra servikal",
      "vertebrae cervicales",
      "tulang leher",
      "leher",
      "ruas leher",
      "atlas",
      "axis",
      "neck",
      "c1",
      "c7",
    ],
  },
  {
    boneId: "thoracic-vertebrae",
    keywords: [
      "thoracic",
      "torakal",
      "vertebra torakal",
      "vertebrae thoracicae",
      "tulang punggung",
      "punggung",
      "ruas punggung",
      "toraks",
      "t1",
      "t12",
    ],
  },
  {
    boneId: "lumbar-vertebrae",
    keywords: [
      "lumbar",
      "lumbal",
      "vertebra lumbal",
      "vertebrae lumbales",
      "tulang pinggang",
      "pinggang",
      "ruas pinggang",
      "punggung bawah",
      "l1",
      "l5",
    ],
  },
  {
    boneId: "sacrum",
    keywords: [
      "sacrum",
      "sakrum",
      "os sacrum",
      "tulang kelangkang",
      "kelangkang",
      "pelvis belakang",
    ],
  },
  {
    boneId: "coccyx",
    keywords: [
      "coccyx",
      "koksigis",
      "koksik",
      "os coccygis",
      "tulang ekor",
      "ekor",
      "tailbone",
    ],
  },
  {
    boneId: "sternum",
    keywords: [
      "sternum",
      "tulang dada",
      "dada tengah",
      "manubrium",
      "breastbone",
      "breast bone",
      "prosesus xifoideus",
    ],
  },
  {
    boneId: "true-ribs",
    keywords: [
      "true ribs",
      "costae verae",
      "rusuk sejati",
      "tulang rusuk sejati",
      "tulang rusuk",
      "rusuk",
      "iga",
      "tulang iga",
      "sangkar dada",
      "ribs",
    ],
  },
  {
    boneId: "false-ribs",
    keywords: [
      "false ribs",
      "costae spuriae",
      "rusuk palsu",
      "tulang rusuk palsu",
      "iga palsu",
    ],
  },
  {
    boneId: "floating-ribs",
    keywords: [
      "floating ribs",
      "costae fluctuantes",
      "rusuk melayang",
      "tulang rusuk melayang",
      "iga melayang",
    ],
  },
  {
    boneId: "clavicle",
    keywords: [
      "clavicle",
      "clavicula",
      "klavikula",
      "tulang selangka",
      "selangka",
      "collarbone",
      "collar bone",
    ],
  },
  {
    boneId: "scapula",
    keywords: [
      "scapula",
      "skapula",
      "tulang belikat",
      "belikat",
      "shoulder blade",
      "pundak",
    ],
  },
  {
    boneId: "humerus",
    keywords: [
      "humerus",
      "humerous",
      "tulang lengan atas",
      "lengan atas",
      "tulang lengan",
      "lengan",
      "upper arm",
      "arm",
    ],
  },
  {
    boneId: "radius",
    keywords: [
      "radius",
      "tulang pengumpil",
      "pengumpil",
      "lengan bawah jempol",
    ],
  },
  {
    boneId: "ulna",
    keywords: [
      "ulna",
      "tulang hasta",
      "hasta",
      "lengan bawah kelingking",
      "siku",
      "olekranon",
    ],
  },
  {
    boneId: "carpals",
    keywords: [
      "carpals",
      "carpal",
      "karpal",
      "ossa carpi",
      "pergelangan tangan",
      "tulang pergelangan tangan",
      "wrist",
      "skafoid",
      "lunatum",
    ],
  },
  {
    boneId: "metacarpals",
    keywords: [
      "metacarpals",
      "metacarpal",
      "metakarpal",
      "ossa metacarpi",
      "telapak tangan",
      "tulang telapak tangan",
      "palm",
    ],
  },
  {
    boneId: "hand-phalanges",
    keywords: [
      "hand phalanges",
      "phalanges manus",
      "falang tangan",
      "jari tangan",
      "tulang jari tangan",
      "ruas jari tangan",
      "jempol",
      "telunjuk",
      "jari",
      "fingers",
    ],
  },
  {
    boneId: "pelvis",
    keywords: [
      "pelvis",
      "pelvic",
      "panggul",
      "pinggul",
      "tulang panggul",
      "tulang pinggul",
      "os coxae",
      "koksa",
      "ilium",
      "iskium",
      "pubis",
      "kemaluan",
      "hip",
      "hip bone",
    ],
  },
  {
    boneId: "femur",
    keywords: [
      "femur",
      "femoral",
      "os femoris",
      "tulang paha",
      "paha",
      "thigh",
      "thigh bone",
    ],
  },
  {
    boneId: "patella",
    keywords: [
      "patella",
      "patela",
      "tempurung lutut",
      "tulang lutut",
      "lutut",
      "knee",
      "kneecap",
    ],
  },
  {
    boneId: "tibia",
    keywords: [
      "tibia",
      "tulang kering",
      "kering",
      "shin",
      "shin bone",
      "cruris",
    ],
  },
  {
    boneId: "fibula",
    keywords: [
      "fibula",
      "tulang betis",
      "betis",
      "calf",
      "calf bone",
    ],
  },
  {
    boneId: "tarsals",
    keywords: [
      "tarsals",
      "tarsal",
      "tarsus",
      "ossa tarsi",
      "pergelangan kaki",
      "tulang pergelangan kaki",
      "tumit",
      "kalkaneus",
      "talus",
      "ankle",
    ],
  },
  {
    boneId: "metatarsals",
    keywords: [
      "metatarsals",
      "metatarsal",
      "metatarsus",
      "ossa metatarsi",
      "telapak kaki",
      "tulang telapak kaki",
      "foot",
    ],
  },
  {
    boneId: "foot-phalanges",
    keywords: [
      "foot phalanges",
      "phalanges pedis",
      "falang kaki",
      "jari kaki",
      "tulang jari kaki",
      "ruas jari kaki",
      "jempol kaki",
      "toes",
    ],
  },
];

// Noise words in speech that should be stripped or ignored
const NOISE_WORDS = [
  "tolong",
  "bantu",
  "saya",
  "mau",
  "lihat",
  "cari",
  "carikan",
  "tampilkan",
  "sorot",
  "sorotkan",
  "fokus",
  "fokuskan",
  "fokus ke",
  "ke",
  "di",
  "pada",
  "mana",
  "di mana",
  "posisi",
  "bagian",
  "tulang",
  "os",
  "ossa",
  "show",
  "show me",
  "find",
  "select",
  "highlight",
  "look at",
  "the",
  "where is",
  "please",
];

function cleanVoiceText(text: string): string {
  let cleaned = text.toLowerCase().trim();
  // Remove punctuation
  cleaned = cleaned.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, " ");
  // Collapse whitespace
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return cleaned;
}

export function matchSpokenCommand(spokenText: string): VoiceMatchResult | null {
  if (!spokenText || !spokenText.trim()) return null;

  const rawClean = cleanVoiceText(spokenText);

  // 1. Check for Action Commands First
  if (
    rawClean.includes("reset") ||
    rawClean.includes("kembali") ||
    rawClean.includes("semula") ||
    rawClean.includes("posisi awal") ||
    rawClean.includes("reset view")
  ) {
    return {
      type: "action",
      action: "reset",
      confidence: 0.95,
      matchedTerm: "Reset Posisi",
      originalQuery: spokenText,
    };
  }

  if (
    rawClean.includes("rontgen") ||
    rawClean.includes("x ray") ||
    rawClean.includes("xray") ||
    rawClean.includes("sinar x") ||
    rawClean.includes("transparan")
  ) {
    return {
      type: "action",
      action: "xray",
      confidence: 0.95,
      matchedTerm: "Mode Rontgen / X-Ray",
      originalQuery: spokenText,
    };
  }

  if (
    rawClean.includes("putar") ||
    rawClean.includes("rotasi") ||
    rawClean.includes("auto rotate") ||
    rawClean.includes("berputar")
  ) {
    return {
      type: "action",
      action: "rotate",
      confidence: 0.9,
      matchedTerm: "Rotasi Otomatis 360°",
      originalQuery: spokenText,
    };
  }

  if (
    rawClean.includes("label") ||
    rawClean.includes("tampilkan nama") ||
    rawClean.includes("nama tulang") ||
    rawClean.includes("sembunyikan label")
  ) {
    return {
      type: "action",
      action: "labels",
      confidence: 0.9,
      matchedTerm: "Label Anatomi 3D",
      originalQuery: spokenText,
    };
  }

  if (
    rawClean.includes("perbesar") ||
    rawClean.includes("zoom in") ||
    rawClean.includes("dekatkan") ||
    rawClean.includes("perdekat")
  ) {
    return {
      type: "action",
      action: "zoom-in",
      confidence: 0.9,
      matchedTerm: "Perbesar (Zoom In)",
      originalQuery: spokenText,
    };
  }

  if (
    rawClean.includes("perkecil") ||
    rawClean.includes("zoom out") ||
    rawClean.includes("jauhkan") ||
    rawClean.includes("menjauh")
  ) {
    return {
      type: "action",
      action: "zoom-out",
      confidence: 0.9,
      matchedTerm: "Perkecil (Zoom Out)",
      originalQuery: spokenText,
    };
  }

  if (
    rawClean.includes("geser atas") ||
    rawClean.includes("pan up") ||
    rawClean.includes("kamera atas")
  ) {
    return {
      type: "action",
      action: "pan-up",
      confidence: 0.9,
      matchedTerm: "Geser Kamera ke Atas",
      originalQuery: spokenText,
    };
  }

  if (
    rawClean.includes("geser bawah") ||
    rawClean.includes("pan down") ||
    rawClean.includes("kamera bawah")
  ) {
    return {
      type: "action",
      action: "pan-down",
      confidence: 0.9,
      matchedTerm: "Geser Kamera ke Bawah",
      originalQuery: spokenText,
    };
  }

  // Region Jumps
  if (
    (rawClean.includes("fokus") || rawClean.includes("lihat")) &&
    (rawClean.includes("kepala") || rawClean.includes("head") || rawClean.includes("tengkorak"))
  ) {
    return {
      type: "action",
      action: "region-head",
      confidence: 0.85,
      matchedTerm: "Fokus Area Kepala",
      originalQuery: spokenText,
    };
  }

  if (
    (rawClean.includes("fokus") || rawClean.includes("lihat")) &&
    (rawClean.includes("dada") || rawClean.includes("torso") || rawClean.includes("rusuk"))
  ) {
    return {
      type: "action",
      action: "region-torso",
      confidence: 0.85,
      matchedTerm: "Fokus Area Dada",
      originalQuery: spokenText,
    };
  }

  if (
    (rawClean.includes("fokus") || rawClean.includes("lihat")) &&
    (rawClean.includes("panggul") || rawClean.includes("pinggul") || rawClean.includes("pelvis"))
  ) {
    return {
      type: "action",
      action: "region-pelvis",
      confidence: 0.85,
      matchedTerm: "Fokus Area Panggul",
      originalQuery: spokenText,
    };
  }

  if (
    (rawClean.includes("fokus") || rawClean.includes("lihat")) &&
    (rawClean.includes("kaki") || rawClean.includes("tungkai") || rawClean.includes("legs"))
  ) {
    return {
      type: "action",
      action: "region-legs",
      confidence: 0.85,
      matchedTerm: "Fokus Area Kaki & Tungkai",
      originalQuery: spokenText,
    };
  }

  if (
    rawClean.includes("seluruh tubuh") ||
    rawClean.includes("semua rangka") ||
    rawClean.includes("tampilkan semua")
  ) {
    return {
      type: "action",
      action: "region-full",
      confidence: 0.85,
      matchedTerm: "Tampilan Seluruh Rangka",
      originalQuery: spokenText,
    };
  }

  // 2. Bone Matching Engine
  // Strip noise words for focused bone matching
  let strippedQuery = rawClean;
  for (const noise of NOISE_WORDS) {
    // replace as whole word
    const regex = new RegExp(`\\b${noise}\\b`, "gi");
    strippedQuery = strippedQuery.replace(regex, " ");
  }
  strippedQuery = strippedQuery.replace(/\s+/g, " ").trim();

  let bestMatch: { boneId: string; confidence: number; matchedKeyword: string } | null = null;

  for (const aliasItem of BONE_VOICE_ALIASES) {
    for (const keyword of aliasItem.keywords) {
      const cleanKw = keyword.toLowerCase();

      // Exact full match
      if (rawClean === cleanKw || strippedQuery === cleanKw) {
        const bone = BONES_DATA.find((b) => b.id === aliasItem.boneId);
        return {
          type: "bone",
          boneId: aliasItem.boneId,
          bone,
          confidence: 1.0,
          matchedTerm: cleanKw,
          originalQuery: spokenText,
        };
      }

      // Keyword contained inside speech as whole word
      const wordBoundaryRegex = new RegExp(`\\b${cleanKw}\\b`, "i");
      if (wordBoundaryRegex.test(rawClean) || (strippedQuery && wordBoundaryRegex.test(strippedQuery))) {
        const score = cleanKw.length / (rawClean.length || 1) + 0.5;
        if (!bestMatch || score > bestMatch.confidence) {
          bestMatch = {
            boneId: aliasItem.boneId,
            confidence: Math.min(score, 0.98),
            matchedKeyword: cleanKw,
          };
        }
      }

      // Substring match for longer keywords (> 4 letters)
      if (cleanKw.length >= 4 && (rawClean.includes(cleanKw) || cleanKw.includes(strippedQuery))) {
        const score = 0.75;
        if (!bestMatch || score > bestMatch.confidence) {
          bestMatch = {
            boneId: aliasItem.boneId,
            confidence: score,
            matchedKeyword: cleanKw,
          };
        }
      }
    }
  }

  // Also match directly against BONES_DATA commonName & latinName
  if (!bestMatch) {
    for (const bone of BONES_DATA) {
      const cName = bone.commonName.toLowerCase();
      const lName = bone.latinName.toLowerCase();

      if (rawClean.includes(cName) || cName.includes(strippedQuery) || rawClean.includes(lName)) {
        bestMatch = {
          boneId: bone.id,
          confidence: 0.8,
          matchedKeyword: bone.commonName,
        };
        break;
      }
    }
  }

  if (bestMatch && bestMatch.confidence >= 0.6) {
    const bone = BONES_DATA.find((b) => b.id === bestMatch!.boneId);
    return {
      type: "bone",
      boneId: bestMatch.boneId,
      bone,
      confidence: bestMatch.confidence,
      matchedTerm: bestMatch.matchedKeyword,
      originalQuery: spokenText,
    };
  }

  return null;
}
