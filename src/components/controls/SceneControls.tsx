import { useState } from "react";
import {
  RotateCcw,
  Plus,
  Minus,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  User,
} from "lucide-react";
import { CameraPreset } from "../../types/bone";

export type AnatomicalRegion = "full" | "head" | "torso" | "pelvis" | "legs" | "feet";

interface SceneControlsProps {
  onSelectPreset?: (preset: CameraPreset) => void;
  onResetView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPanUp?: () => void;
  onPanDown?: () => void;
  onFocusRegion?: (region: AnatomicalRegion) => void;
  isXRayMode: boolean;
  onToggleXRay: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  isAutoRotate: boolean;
  onToggleAutoRotate: () => void;
  hoveredBoneName?: string;
  hoveredBoneLatin?: string;
  isDark: boolean;
  isBoneSelected?: boolean;
}

const REGION_OPTIONS: { id: AnatomicalRegion; label: string }[] = [
  { id: "full", label: "Semua" },
  { id: "head", label: "Kepala" },
  { id: "torso", label: "Dada" },
  { id: "pelvis", label: "Panggul" },
  { id: "legs", label: "Kaki/Tungkai" },
];

export function SceneControls({
  onResetView,
  onZoomIn,
  onZoomOut,
  onPanUp,
  onPanDown,
  onFocusRegion,
  hoveredBoneName,
  hoveredBoneLatin,
  isDark,
}: SceneControlsProps) {
  const [isMobileRegionOpen, setIsMobileRegionOpen] = useState(false);

  return (
    <>
      {/* Top Floating Hover Tooltip Indicator */}
      {hoveredBoneName && (
        <div
          id="scene-hover-indicator"
          className={`absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full border shadow-xl flex items-center gap-2 pointer-events-none transition-all animate-fadeIn max-w-[90vw] truncate ${
            isDark
              ? "bg-slate-900/90 border-cyan-500/80 text-white backdrop-blur-md"
              : "bg-white/95 border-sky-400 text-slate-900 backdrop-blur-md"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-xs font-bold truncate">{hoveredBoneName}</span>
            {hoveredBoneLatin && (
              <span className="text-[11px] text-cyan-400 dark:text-cyan-300 font-serif italic truncate hidden sm:inline">
                ({hoveredBoneLatin})
              </span>
            )}
          </div>
        </div>
      )}

      {/* Top Left / Center: Quick Anatomical Region Jump Bar */}
      <div
        id="anatomical-region-bar"
        className={`absolute top-3 left-3 z-20 hidden sm:flex items-center p-1 rounded-xl border shadow-lg backdrop-blur-md transition-all ${
          isDark
            ? "bg-slate-900/85 border-slate-700/80 text-slate-300"
            : "bg-white/90 border-slate-200 text-slate-700"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-2 py-1 gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-r border-inherit">
          <User className="w-3.5 h-3.5 text-cyan-500" />
          <span>Fokus:</span>
        </div>

        <div className="flex items-center gap-0.5 pl-1">
          {REGION_OPTIONS.map((region) => (
            <button
              key={region.id}
              onClick={(e) => {
                e.stopPropagation();
                if (onFocusRegion) onFocusRegion(region.id);
              }}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                region.id === "legs"
                  ? isDark
                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 hover:bg-cyan-500/30"
                    : "bg-sky-50 text-sky-700 font-semibold border border-sky-200 hover:bg-sky-100"
                  : isDark
                  ? "hover:bg-slate-800 hover:text-white"
                  : "hover:bg-slate-100 hover:text-slate-900"
              }`}
              title={`Fokus pandangan ke area ${region.label}`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Top Left: Region Dropdown */}
      <div className="absolute top-3 left-3 z-20 sm:hidden">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileRegionOpen((prev) => !prev);
          }}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border shadow-md backdrop-blur-md text-xs font-semibold ${
            isDark
              ? "bg-slate-900/90 border-slate-700 text-slate-200"
              : "bg-white/95 border-slate-300 text-slate-800"
          }`}
          aria-label="Pilih Bagian Tubuh"
        >
          <User className="w-3.5 h-3.5 text-cyan-500" />
          <span>Bagian</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {isMobileRegionOpen && (
          <div
            className={`absolute left-0 mt-1.5 w-36 py-1 rounded-xl border shadow-xl backdrop-blur-lg flex flex-col z-30 animate-fadeIn ${
              isDark
                ? "bg-slate-900/95 border-slate-700 text-slate-200"
                : "bg-white/95 border-slate-200 text-slate-800"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {REGION_OPTIONS.map((region) => (
              <button
                key={region.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onFocusRegion) onFocusRegion(region.id);
                  setIsMobileRegionOpen(false);
                }}
                className={`px-3 py-2 text-left text-xs font-medium transition-colors ${
                  isDark
                    ? "hover:bg-slate-800 hover:text-cyan-400"
                    : "hover:bg-slate-100 hover:text-sky-600"
                }`}
              >
                Fokus {region.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Side Vertical Quick Zoom & Pan Toolbar */}
      <div
        id="side-zoom-controls"
        className={`absolute right-3 top-16 sm:top-20 z-20 flex flex-col items-center gap-1.5 p-1.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all ${
          isDark
            ? "bg-slate-900/90 border-slate-700/80 text-slate-200"
            : "bg-white/95 border-slate-200 text-slate-800"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Pan Up */}
        {onPanUp && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPanUp();
            }}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold transition-all active:scale-90 select-none ${
              isDark
                ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900"
            }`}
            title="Geser Kamera ke Atas (Menuju Kepala)"
            aria-label="Geser Atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Pan Down (Directly slides toward legs and feet!) */}
        {onPanDown && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPanDown();
            }}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold transition-all active:scale-90 select-none ${
              isDark
                ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900"
            }`}
            title="Geser Kamera ke Bawah (Menuju Kaki & Tungkai)"
            aria-label="Geser Bawah"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        )}

        <div className="w-6 h-[1px] bg-slate-500/20 my-0.5" />

        {/* Zoom In */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onZoomIn();
          }}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold transition-all active:scale-90 select-none ${
            isDark
              ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300"
              : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-sky-600 hover:text-sky-700"
          }`}
          title="Perbesar Tampilan (+)"
          aria-label="Perbesar"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onZoomOut();
          }}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold transition-all active:scale-90 select-none ${
            isDark
              ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300"
              : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-sky-600 hover:text-sky-700"
          }`}
          title="Perkecil Tampilan (-)"
          aria-label="Perkecil"
        >
          <Minus className="w-5 h-5" />
        </button>

        <div className="w-6 h-[1px] bg-slate-500/20 my-0.5" />

        {/* Reset View */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onResetView();
          }}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all active:scale-90 select-none ${
            isDark
              ? "border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white"
              : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
          }`}
          title="Kembalikan Posisi Normal (Reset)"
          aria-label="Reset Posisi"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

