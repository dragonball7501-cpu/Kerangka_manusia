import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Volume2,
  Sparkles,
  X,
  ChevronRight,
  MapPin,
  Maximize2,
  Info,
} from "lucide-react";
import { BoneData } from "../../types/bone";
import { BONE_GROUPS } from "../../data/groups";
import { speakText } from "../../utils/audioFeedback";

interface BoneQuickDefinitionHUDProps {
  bone: BoneData | null;
  onClose: () => void;
  onOpenFullDetail?: () => void;
  isDark: boolean;
}

export function BoneQuickDefinitionHUD({
  bone,
  onClose,
  onOpenFullDetail,
  isDark,
}: BoneQuickDefinitionHUDProps) {
  if (!bone) return null;

  const groupMeta = BONE_GROUPS.find((g) => g.id === bone.group);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={bone.id}
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 280,
          mass: 0.8,
        }}
        id="bone-quick-definition-hud"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-16 sm:bottom-6 left-3 sm:left-6 z-25 max-w-[94vw] sm:max-w-md w-full pointer-events-auto"
      >
        <div
          className={`relative rounded-2xl p-4 sm:p-5 border shadow-2xl backdrop-blur-xl transition-colors ${
            isDark
              ? "bg-slate-900/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/60 ring-1 ring-cyan-500/20"
              : "bg-white/95 border-sky-300 text-slate-900 shadow-sky-900/20 ring-1 ring-sky-300/60"
          }`}
        >
          {/* Header Row: Badges & Close Button */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-md text-[10px] font-anton uppercase tracking-wider text-black bg-yellow-300 border border-black shadow-[1px_1px_0px_#000]"
              >
                {groupMeta?.name || bone.group}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-anton uppercase tracking-wide border ${
                  bone.division === "axial"
                    ? isDark
                      ? "bg-cyan-950/70 border-cyan-800 text-cyan-300"
                      : "bg-lime-200 border-black text-black"
                    : isDark
                    ? "bg-purple-950/70 border-purple-800 text-purple-300"
                    : "bg-pink-200 border-black text-black"
                }`}
              >
                Rangka {bone.division === "axial" ? "Aksial" : "Apendikular"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                id="btn-quick-hud-speak"
                onClick={() => speakText(`${bone.latinName}. ${bone.commonName}. ${bone.summary}`, "id-ID")}
                className={`p-1.5 rounded-lg border-2 font-bold transition-all ${
                  isDark
                    ? "border-cyan-400 bg-slate-800 text-cyan-300 shadow-[1.5px_1.5px_0px_#06b6d4]"
                    : "border-black bg-white hover:bg-yellow-100 text-black shadow-[1.5px_1.5px_0px_#000]"
                }`}
                title="Dengarkan Pengertian & Pelafalan Tulang"
              >
                <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <button
                id="btn-close-quick-definition"
                onClick={onClose}
                className={`p-1.5 rounded-lg border-2 font-bold transition-colors ${
                  isDark
                    ? "border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                    : "border-black bg-white hover:bg-slate-100 text-black shadow-[1.5px_1.5px_0px_#000]"
                }`}
                title="Tutup Pengertian Singkat"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Titles */}
          <div className="mb-2.5">
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5 text-black dark:text-white">
              <span>{bone.commonName}</span>
            </h3>
            <p className="text-xs font-serif italic text-amber-700 dark:text-amber-400 font-bold">
              {bone.latinName}
            </p>
          </div>

          {/* Dedicated Smooth "Pengertian" Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.3 }}
            className={`p-3 rounded-xl border mb-3 ${
              isDark
                ? "bg-slate-800/80 border-slate-700/80 text-slate-200 shadow-inner"
                : "bg-slate-100 border-slate-300 text-slate-950 shadow-inner"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-extrabold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Pengertian & Penjelasan:</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-900 dark:text-slate-200 font-semibold">
              {bone.summary}
            </p>

            <div className="mt-2 pt-2 border-t border-inherit/40 flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-400 font-bold">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-600 shrink-0 stroke-[2.5]" />
                <span className="truncate max-w-[200px]">{bone.location}</span>
              </span>
              <span className="font-extrabold text-slate-900 dark:text-cyan-300">
                {bone.shapeType}
              </span>
            </div>
          </motion.div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-2">
            {onOpenFullDetail && (
              <button
                id="btn-quick-hud-open-full"
                onClick={onOpenFullDetail}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-anton uppercase tracking-wide border-2 transition-all active:scale-98 neo-press cursor-pointer ${
                  isDark
                    ? "bg-cyan-400 text-black border-cyan-200 shadow-[2px_2px_0px_#06b6d4]"
                    : "bg-yellow-300 hover:bg-yellow-200 text-black border-black shadow-[2px_2px_0px_#000]"
                }`}
              >
                <span>Pelajari Materi Lengkap</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
