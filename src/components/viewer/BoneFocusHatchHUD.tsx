import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  X,
  ChevronRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { BoneData } from "../../types/bone";
import { BONE_GROUPS } from "../../data/groups";

interface BoneFocusHatchHUDProps {
  bone: BoneData | null;
  onOpenDefinition: () => void;
  onClose: () => void;
  isDark?: boolean;
}

export function BoneFocusHatchHUD({
  bone,
  onOpenDefinition,
  onClose,
}: BoneFocusHatchHUDProps) {
  if (!bone) return null;

  const groupMeta = BONE_GROUPS.find((g) => g.id === bone.group);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={bone.id}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
        transition={{
          type: "spring",
          damping: 26,
          stiffness: 320,
        }}
        id="bone-focus-hatch-hud"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-20 sm:bottom-24 left-3 sm:left-6 z-25 max-w-[320px] sm:max-w-[360px] w-full pointer-events-auto"
      >
        <div className="relative rounded-2xl p-3.5 sm:p-4 border-2 sm:border-3 border-black bg-white/98 text-slate-950 shadow-[4px_4px_0px_#000000] backdrop-blur-md">
          {/* Header Row: Badges & Close Button */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-anton uppercase tracking-wider text-black border border-black shadow-[1px_1px_0px_#000]"
                style={{ backgroundColor: groupMeta?.colorHex || "#facc15" }}
              >
                {groupMeta?.name || bone.group}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-300 border border-black text-black shadow-[1px_1px_0px_#000]">
                <Sparkles className="w-2.5 h-2.5 stroke-[2.5]" />
                <span>Bagian Terarsir</span>
              </span>
            </div>

            <button
              id="btn-close-focus-hatch"
              onClick={onClose}
              className="p-1 rounded-md border-2 border-black bg-slate-100 hover:bg-red-100 text-black shadow-[1.5px_1.5px_0px_#000] neo-press cursor-pointer"
              title="Batalkan Pilihan Tulang"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Bone Name */}
          <div className="mb-2">
            <h3 className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-anton text-base sm:text-lg uppercase tracking-wider text-black">{bone.commonName}</span>
              <span className="text-xs font-bold italic text-amber-800">
                ({bone.latinName})
              </span>
            </h3>
            <p className="text-[11px] font-bold text-slate-700 mt-0.5 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-rose-600 shrink-0 stroke-[2.5]" />
              <span className="truncate">{bone.location}</span>
            </p>
          </div>

          {/* Primary Action Button */}
          <button
            id="btn-open-definition-from-hatch"
            onClick={onOpenDefinition}
            className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl text-xs font-anton uppercase tracking-wider transition-all cursor-pointer border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black shadow-[2.5px_2.5px_0px_#000] neo-press"
          >
            <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Buka Penjelasan Lengkap</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto stroke-[2.5]" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

