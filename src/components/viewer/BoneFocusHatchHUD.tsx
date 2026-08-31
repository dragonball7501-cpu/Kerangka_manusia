import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  BookOpen,
  X,
  ChevronRight,
  MapPin,
  Layers,
  ZoomIn,
} from "lucide-react";
import { BoneData } from "../../types/bone";
import { BONE_GROUPS } from "../../data/groups";

interface BoneFocusHatchHUDProps {
  bone: BoneData | null;
  onOpenDefinition: () => void;
  onClose: () => void;
  isDark: boolean;
}

export function BoneFocusHatchHUD({
  bone,
  onOpenDefinition,
  onClose,
  isDark,
}: BoneFocusHatchHUDProps) {
  if (!bone) return null;

  const groupMeta = BONE_GROUPS.find((g) => g.id === bone.group);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={bone.id}
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 300,
        }}
        id="bone-focus-hatch-hud"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-25 max-w-[94vw] sm:max-w-md w-full pointer-events-auto px-2"
      >
        <div
          className={`relative rounded-2xl p-4 sm:p-5 border shadow-2xl backdrop-blur-xl transition-all ${
            isDark
              ? "bg-slate-900/95 border-amber-500/50 text-slate-100 shadow-amber-950/40 ring-1 ring-amber-500/30"
              : "bg-white/95 border-amber-400 text-slate-900 shadow-amber-900/15 ring-1 ring-amber-400/50"
          }`}
        >
          {/* Header Row: Badges & Close Button */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs"
                style={{ backgroundColor: groupMeta?.colorHex || "#d97706" }}
              >
                {groupMeta?.name || bone.group}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 border border-amber-500/40 text-amber-500 dark:text-amber-300 animate-pulse">
                <Layers className="w-2.5 h-2.5" />
                <span>Area Diarsir & Di-zoom</span>
              </span>
            </div>

            <button
              id="btn-close-focus-hatch"
              onClick={onClose}
              className={`p-1.5 rounded-lg border transition-colors ${
                isDark
                  ? "border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  : "border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              }`}
              title="Batalkan Pilihan Tulang"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bone Name */}
          <div className="mb-2.5">
            <h3 className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2">
              <span>{bone.commonName}</span>
              <span className="text-xs font-serif italic font-normal text-amber-500 dark:text-amber-400">
                ({bone.latinName})
              </span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-300 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
              <span>{bone.location}</span>
            </p>
          </div>

          {/* Interactive Hint: 2-step click explanation */}
          <div
            className={`p-2.5 rounded-xl border mb-3 flex items-center gap-2.5 text-xs ${
              isDark
                ? "bg-amber-950/25 border-amber-500/30 text-amber-200"
                : "bg-amber-50 border-amber-200 text-amber-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-bounce" />
            <p className="leading-snug">
              Ketuk <strong className="underline decoration-amber-500 underline-offset-2">arsiran tulang</strong> ini lagi di model 3D, atau klik tombol di bawah untuk membuka pengertian lengkap.
            </p>
          </div>

          {/* Primary Action Button */}
          <button
            id="btn-open-definition-from-hatch"
            onClick={onOpenDefinition}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all active:scale-98 cursor-pointer shadow-lg ${
              isDark
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-950/50"
                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Buka Pengertian & Detail {bone.commonName}</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
