import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  X,
  ChevronRight,
  MapPin,
  Layers,
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
          className={`relative rounded-2xl p-4 sm:p-5 border-3 border-black shadow-[5px_5px_0px_#000000] dark:border-cyan-400 dark:shadow-[5px_5px_0px_#06b6d4] transition-all ${
            isDark
              ? "bg-slate-900 text-slate-100"
              : "bg-white text-slate-950"
          }`}
        >
          {/* Header Row: Badges & Close Button */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-md text-[10px] font-anton uppercase tracking-wider text-black border border-black shadow-[1px_1px_0px_#000]"
                style={{ backgroundColor: groupMeta?.colorHex || "#facc15" }}
              >
                {groupMeta?.name || bone.group}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-yellow-200 border border-black text-black shadow-[1px_1px_0px_#000]">
                <Layers className="w-2.5 h-2.5 stroke-[2.5]" />
                <span>Terpilih & Fokus</span>
              </span>
            </div>

            <button
              id="btn-close-focus-hatch"
              onClick={onClose}
              className="p-1 rounded-md border-2 border-black bg-white dark:bg-slate-800 text-black dark:text-white shadow-[1.5px_1.5px_0px_#000] neo-press cursor-pointer"
              title="Batalkan Pilihan Tulang"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Bone Name */}
          <div className="mb-2">
            <h3 className="flex items-baseline gap-2 flex-wrap">
              <span className="font-anton text-lg sm:text-xl uppercase tracking-wider text-black dark:text-white">{bone.commonName}</span>
              <span className="text-xs font-bold italic text-slate-700 dark:text-cyan-300">
                ({bone.latinName})
              </span>
            </h3>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-300 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 stroke-[2.5]" />
              <span>{bone.location}</span>
            </p>
          </div>

          {/* Interactive Hint */}
          <div
            className={`p-2.5 rounded-xl border-2 mb-3 text-xs font-semibold ${
              isDark
                ? "bg-slate-800 border-cyan-400 text-slate-200"
                : "bg-yellow-100 border-black text-slate-950 shadow-[1.5px_1.5px_0px_#000]"
            }`}
          >
            <p className="leading-snug">
              Ketuk tulang ini lagi di model 3D atau klik tombol di bawah untuk membuka informasi anatomi lengkap.
            </p>
          </div>

          {/* Primary Action Button */}
          <button
            id="btn-open-definition-from-hatch"
            onClick={onOpenDefinition}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-anton uppercase tracking-wider transition-all cursor-pointer border-2 border-black bg-lime-400 hover:bg-lime-300 text-black shadow-[3px_3px_0px_#000] dark:border-cyan-200 dark:shadow-[3px_3px_0px_#06b6d4] neo-press"
          >
            <BookOpen className="w-4 h-4 stroke-[2.5]" />
            <span>Buka Detail {bone.commonName}</span>
            <ChevronRight className="w-4 h-4 ml-auto stroke-[2.5]" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
