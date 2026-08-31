import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
      <AnimatePresence>
        {hoveredBoneName && (
          <motion.div
            id="scene-hover-indicator"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-xl border-2 font-black shadow-[3px_3px_0px_#000000] flex items-center gap-2 pointer-events-none max-w-[90vw] truncate ${
              isDark
                ? "bg-slate-900 border-cyan-400 text-cyan-300 dark:shadow-[3px_3px_0px_#06b6d4]"
                : "bg-yellow-300 border-black text-black"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black animate-ping shrink-0" />
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-xs font-black uppercase tracking-wide truncate">{hoveredBoneName}</span>
              {hoveredBoneLatin && (
                <span className="text-[11px] font-serif italic truncate hidden sm:inline opacity-85">
                  ({hoveredBoneLatin})
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Left / Center: Quick Anatomical Region Jump Bar */}
      <div
        id="anatomical-region-bar"
        className={`absolute top-3 left-3 z-20 hidden sm:flex items-center p-1.5 rounded-xl border-2 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#06b6d4] transition-all ${
          isDark
            ? "bg-slate-900 border-cyan-400 text-slate-100"
            : "bg-white border-black text-slate-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-2 py-1 gap-1 text-[11px] font-black uppercase tracking-wider border-r-2 border-inherit text-black dark:text-cyan-300">
          <User className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Fokus:</span>
        </div>

        <div className="flex items-center gap-1 pl-1.5">
          {REGION_OPTIONS.map((region) => (
            <button
              key={region.id}
              onClick={(e) => {
                e.stopPropagation();
                if (onFocusRegion) onFocusRegion(region.id);
              }}
              className={`px-2.5 py-1 text-xs rounded-lg font-black uppercase tracking-wide border-2 transition-all neo-press cursor-pointer ${
                region.id === "legs"
                  ? isDark
                    ? "bg-cyan-400 text-slate-950 border-cyan-200 shadow-[1.5px_1.5px_0px_#06b6d4]"
                    : "bg-pink-300 text-black border-black shadow-[1.5px_1.5px_0px_#000000]"
                  : isDark
                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-white shadow-[1.5px_1.5px_0px_#000000]"
                  : "bg-amber-100/70 border-black text-black hover:bg-yellow-200 shadow-[1.5px_1.5px_0px_#000000]"
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
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 font-black uppercase text-xs transition-all neo-press cursor-pointer ${
            isDark
              ? "bg-slate-900 border-cyan-400 text-cyan-300 shadow-[2.5px_2.5px_0px_#06b6d4]"
              : "bg-yellow-300 border-black text-black shadow-[2.5px_2.5px_0px_#000000]"
          }`}
          aria-label="Pilih Bagian Tubuh"
        >
          <User className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Bagian</span>
          <ChevronDown className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 ${isMobileRegionOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isMobileRegionOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute left-0 mt-2 w-40 p-1.5 rounded-xl border-2 shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#06b6d4] flex flex-col z-30 gap-1 ${
                isDark
                  ? "bg-slate-900 border-cyan-400 text-slate-100"
                  : "bg-white border-black text-slate-900"
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
                  className={`px-3 py-1.5 text-left text-xs font-black uppercase rounded-lg border transition-all cursor-pointer ${
                    isDark
                      ? "border-transparent hover:bg-cyan-950 hover:border-cyan-400 text-slate-200"
                      : "border-transparent hover:bg-yellow-200 hover:border-black text-black"
                  }`}
                >
                  Fokus {region.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Side Vertical Quick Zoom & Pan Toolbar */}
      <div
        id="side-zoom-controls"
        className={`absolute right-3 top-16 sm:top-20 z-20 flex flex-col items-center gap-2 p-2 rounded-2xl border-2 shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#06b6d4] transition-all ${
          isDark
            ? "bg-slate-900 border-cyan-400 text-slate-100"
            : "bg-white border-black text-slate-900"
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
            className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black transition-all neo-press select-none cursor-pointer ${
              isDark
                ? "border-slate-700 bg-slate-800 hover:border-cyan-400 text-slate-100 shadow-[2px_2px_0px_#000000]"
                : "border-black bg-slate-100 hover:bg-yellow-100 text-black shadow-[2px_2px_0px_#000000]"
            }`}
            title="Geser Kamera ke Atas (Menuju Kepala)"
            aria-label="Geser Atas"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        {/* Pan Down */}
        {onPanDown && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPanDown();
            }}
            className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black transition-all neo-press select-none cursor-pointer ${
              isDark
                ? "border-slate-700 bg-slate-800 hover:border-cyan-400 text-slate-100 shadow-[2px_2px_0px_#000000]"
                : "border-black bg-slate-100 hover:bg-yellow-100 text-black shadow-[2px_2px_0px_#000000]"
            }`}
            title="Geser Kamera ke Bawah (Menuju Kaki & Tungkai)"
            aria-label="Geser Bawah"
          >
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        <div className="w-6 h-[2px] bg-black dark:bg-cyan-400 my-0.5" />

        {/* Zoom In */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onZoomIn();
          }}
          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black transition-all neo-press select-none cursor-pointer ${
            isDark
              ? "border-cyan-400 bg-cyan-950 text-cyan-300 shadow-[2px_2px_0px_#06b6d4]"
              : "border-black bg-lime-300 hover:bg-lime-400 text-black shadow-[2px_2px_0px_#000000]"
          }`}
          title="Perbesar Tampilan (+)"
          aria-label="Perbesar"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onZoomOut();
          }}
          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black transition-all neo-press select-none cursor-pointer ${
            isDark
              ? "border-cyan-400 bg-cyan-950 text-cyan-300 shadow-[2px_2px_0px_#06b6d4]"
              : "border-black bg-pink-300 hover:bg-pink-400 text-black shadow-[2px_2px_0px_#000000]"
          }`}
          title="Perkecil Tampilan (-)"
          aria-label="Perkecil"
        >
          <Minus className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="w-6 h-[2px] bg-black dark:bg-cyan-400 my-0.5" />

        {/* Reset View */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onResetView();
          }}
          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black transition-all neo-press select-none cursor-pointer ${
            isDark
              ? "border-slate-700 bg-slate-800 hover:border-cyan-400 text-slate-100 shadow-[2px_2px_0px_#000000]"
              : "border-black bg-yellow-300 hover:bg-yellow-400 text-black shadow-[2px_2px_0px_#000000]"
          }`}
          title="Kembalikan Posisi Normal (Reset)"
          aria-label="Reset Posisi"
        >
          <RotateCcw className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </>
  );
}

