import * as THREE from "three";

export interface ThemeColors {
  background: number;
  boneColor: number;
  boneRoughness: number;
  boneMetalness: number;
  hoverColor: number;
  selectedColor: number;
  ghostOpacity: number;
  gridColor: number;
  cartilageColor: number;
}

export const DARK_THEME_COLORS: ThemeColors = {
  background: 0x070b14, // Deep twilight navy lab
  boneColor: 0xf3eee3, // Warm organic ivory cortical bone
  boneRoughness: 0.38,
  boneMetalness: 0.04,
  hoverColor: 0x38bdf8, // Vibrant sky cyan
  selectedColor: 0xf59e0b, // Warm golden amber
  ghostOpacity: 0.15,
  gridColor: 0x1e293b,
  cartilageColor: 0xa5b4fc, // Semi-translucent hyaline cartilage
};

export const LIGHT_THEME_COLORS: ThemeColors = {
  background: 0xf8fafc, // Crisp clinical off-white
  boneColor: 0xded9cf, // Natural specimen bone tone
  boneRoughness: 0.42,
  boneMetalness: 0.02,
  hoverColor: 0x0284c7, // Crisp ocean blue
  selectedColor: 0xd97706, // Deep amber
  ghostOpacity: 0.12,
  gridColor: 0xe2e8f0,
  cartilageColor: 0x93c5fd,
};

/**
 * Creates a procedural organic micro-texture for realistic bone porosity and cortical surface ridges
 */
function createBoneProceduralTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Base bone tone
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Subtle noise & osteon micro-porosity
    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Perlin-like pseudo noise for subtle cortical grain
      const noise = (Math.random() - 0.5) * 28;
      const val = Math.min(255, Math.max(0, 240 + noise));
      data[i] = val; // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    // Subtle longitudinal bone fibers / trabecular striations
    ctx.fillStyle = "rgba(200, 200, 200, 0.15)";
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * size;
      const h = Math.random() * 2 + 1;
      ctx.fillRect(0, y, size, h);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

/**
 * Creates procedural medical anatomical hatching (arsiran garis diagonal berulang) for selected bones
 */
function createHatchedProceduralTexture(isDark: boolean): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Fill base with light ivory tone
    ctx.fillStyle = isDark ? "#2a2216" : "#fef3c7";
    ctx.fillRect(0, 0, size, size);

    // Primary diagonal hatching lines (arsiran tegas 45 derajat)
    ctx.strokeStyle = isDark ? "#fbbf24" : "#d97706";
    ctx.lineWidth = 5.5;
    ctx.lineCap = "square";

    const step = 16;
    for (let x = -size; x <= size * 2; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + size, size);
      ctx.stroke();
    }

    // Secondary subtle cross-hatching striations
    ctx.strokeStyle = isDark ? "rgba(251, 191, 36, 0.35)" : "rgba(217, 119, 6, 0.25)";
    ctx.lineWidth = 2.5;
    for (let x = -size; x <= size * 2; x += step * 2) {
      ctx.beginPath();
      ctx.moveTo(x, size);
      ctx.lineTo(x + size, 0);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}

export class MaterialManager {
  private defaultMaterial: THREE.MeshStandardMaterial;
  private cartilageMaterial: THREE.MeshStandardMaterial;
  private hoverMaterial: THREE.MeshStandardMaterial;
  private selectedMaterial: THREE.MeshStandardMaterial;
  private ghostMaterial: THREE.MeshStandardMaterial;
  private groupMaterials: Map<string, THREE.MeshStandardMaterial> = new Map();
  private boneTexture: THREE.CanvasTexture;
  private hatchedTexture: THREE.CanvasTexture;
  private isDark: boolean = true;

  constructor(isDark: boolean = true) {
    this.isDark = isDark;
    this.boneTexture = createBoneProceduralTexture();
    this.hatchedTexture = createHatchedProceduralTexture(isDark);
    const colors = isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

    // Realistic anatomical bone material with micro-texture bump & roughness
    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: colors.boneColor,
      roughness: colors.boneRoughness,
      metalness: colors.boneMetalness,
      bumpMap: this.boneTexture,
      bumpScale: 0.002,
      roughnessMap: this.boneTexture,
      flatShading: false,
    });

    // Cartilage material for costal cartilage and intervertebral discs
    this.cartilageMaterial = new THREE.MeshStandardMaterial({
      color: colors.cartilageColor,
      roughness: 0.3,
      metalness: 0.05,
      transparent: true,
      opacity: 0.85,
    });

    // Interactive Highlight Material (Hover)
    this.hoverMaterial = new THREE.MeshStandardMaterial({
      color: colors.hoverColor,
      roughness: 0.22,
      metalness: 0.15,
      emissive: colors.hoverColor,
      emissiveIntensity: isDark ? 0.5 : 0.3,
      bumpMap: this.boneTexture,
      bumpScale: 0.002,
    });

    // Interactive Arsiran & Highlight Material (Selected with anatomical hatching texture)
    this.selectedMaterial = new THREE.MeshStandardMaterial({
      color: colors.selectedColor,
      map: this.hatchedTexture,
      roughness: 0.25,
      metalness: 0.15,
      emissive: colors.selectedColor,
      emissiveIntensity: isDark ? 0.55 : 0.35,
      bumpMap: this.hatchedTexture,
      bumpScale: 0.004,
    });

    // X-Ray / Ghosted Dimmed Material
    this.ghostMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x334155 : 0x94a3b8,
      roughness: 0.85,
      metalness: 0.05,
      transparent: true,
      opacity: colors.ghostOpacity,
      depthWrite: false,
    });
  }

  public setDarkTheme(isDark: boolean) {
    this.isDark = isDark;
    const colors = isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

    this.defaultMaterial.color.setHex(colors.boneColor);
    this.defaultMaterial.roughness = colors.boneRoughness;
    this.defaultMaterial.metalness = colors.boneMetalness;

    this.cartilageMaterial.color.setHex(colors.cartilageColor);

    this.hoverMaterial.color.setHex(colors.hoverColor);
    this.hoverMaterial.emissive.setHex(colors.hoverColor);
    this.hoverMaterial.emissiveIntensity = isDark ? 0.5 : 0.3;

    this.selectedMaterial.color.setHex(colors.selectedColor);
    this.selectedMaterial.emissive.setHex(colors.selectedColor);
    this.selectedMaterial.emissiveIntensity = isDark ? 0.7 : 0.45;

    this.ghostMaterial.color.setHex(isDark ? 0x334155 : 0x94a3b8);
    this.ghostMaterial.opacity = colors.ghostOpacity;
  }

  public getMaterial(
    state: "default" | "hover" | "selected" | "ghost" | "cartilage",
    groupColor?: string
  ): THREE.Material {
    if (state === "selected") return this.selectedMaterial;
    if (state === "hover") return this.hoverMaterial;
    if (state === "ghost") return this.ghostMaterial;
    if (state === "cartilage") return this.cartilageMaterial;

    if (groupColor) {
      if (!this.groupMaterials.has(groupColor)) {
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(groupColor),
          roughness: 0.35,
          metalness: 0.1,
          emissive: new THREE.Color(groupColor),
          emissiveIntensity: this.isDark ? 0.18 : 0.1,
          bumpMap: this.boneTexture,
          bumpScale: 0.002,
        });
        this.groupMaterials.set(groupColor, mat);
      }
      return this.groupMaterials.get(groupColor)!;
    }

    return this.defaultMaterial;
  }

  public getDefaultMaterial(): THREE.MeshStandardMaterial {
    return this.defaultMaterial;
  }

  public getCartilageMaterial(): THREE.MeshStandardMaterial {
    return this.cartilageMaterial;
  }
}
