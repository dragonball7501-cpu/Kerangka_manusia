import { useState, useRef, useEffect, TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Maximize2,
  Minimize2,
  BookOpen,
  Volume2,
} from "lucide-react";
import { BoneData } from "../../types/bone";
import { BONE_GROUPS } from "../../data/groups";
import { BoneInfoPanel } from "./BoneInfoPanel";
import { speakText } from "../../utils/audioFeedback";

interface MobileBottomSheetProps {
  bone: BoneData | null;
  onClose: () => void;
  isDark: boolean;
}

type SheetState = "peek" | "half" | "full";

export function MobileBottomSheet({ bone, onClose, isDark }: MobileBottomSheetProps) {
  const [sheetState, setSheetState] = useState<SheetState>("half");
  const touchStartY = useRef<number>(0);
  const touchDeltaY = useRef<number>(0);

  // When a new bone is selected, default to half sheet
  useEffect(() => {
    if (bone) {
      setSheetState("half");
    }
  }, [bone?.id]);

  if (!bone) return null;

  const groupMeta = BONE_GROUPS.find((g) => g.id === bone.group);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
  };

  const handleTouchEnd = () => {
    const delta = touchDeltaY.current;
    if (delta < -50) {
      // Swiped UP
      if (sheetState === "peek") setSheetState("half");
      else if (sheetState === "half") setSheetState("full");
    } else if (delta > 50) {
      // Swiped DOWN
      if (sheetState === "full") setSheetState("half");
      else if (sheetState === "half") setSheetState("peek");
      else if (sheetState === "peek") onClose();
    }
  };

  const toggleState = () => {
    if (sheetState === "peek") setSheetState("half");
    else if (sheetState === "half") setSheetState("full");
    else setSheetState("peek");
  };

  const getHeightClass = () => {
    switch (sheetState) {
      case "peek":
        return "h-[74px]";
      case "half":
        return "h-[50vh]";
      case "full":
        return "h-[88vh]";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={bone.id}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        id="mobile-bone-bottom-sheet"
        className={`fixed bottom-0 inset-x-0 z-40 transition-all duration-300 lg:hidden rounded-t-3xl border-t shadow-2xl flex flex-col overflow-hidden ${getHeightClass()} ${
          isDark
            ? "bg-slate-900/95 border-slate-700/80 text-slate-100 backdrop-blur-xl"
            : "bg-white/95 border-slate-300 text-slate-900 backdrop-blur-xl"
        }`}
      >
        {/* Top Drag Handle Bar (Touch Sensitive) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={toggleState}
          className="w-full pt-2.5 pb-2 px-4 flex flex-col items-center justify-center cursor-pointer select-none border-b border-inherit/20 shrink-0"
        >
          <div className="w-12 h-1.5 rounded-full bg-slate-400/50 mb-1" />

          {/* Peek Bar Content (always visible) */}
          <div className="w-full flex items-center justify-between gap-2 mt-0.5">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: groupMeta?.colorHex || "#0284c7" }}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold truncate leading-tight">
                    {bone.commonName}
                  </h3>
                  <span className="text-[11px] font-serif italic text-amber-500 dark:text-amber-400 truncate">
                    ({bone.latinName})
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block truncate">
                  {groupMeta?.name} • Rangka {bone.division === "axial" ? "Aksial" : "Apendikular"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* Voice button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(`${bone.latinName}. ${bone.commonName}. ${bone.summary}`, "id-ID");
                }}
                className={`p-1.5 rounded-lg border text-xs transition-all ${
                  isDark
                    ? "border-slate-700 bg-slate-800/80 text-amber-400"
                    : "border-slate-200 bg-slate-100 text-amber-800"
                }`}
                title="Dengarkan Pengertian Tulang"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>

              {/* Sheet Toggle Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleState();
                }}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-medium transition-all ${
                  isDark
                    ? "border-slate-700 bg-slate-800/80 text-slate-300"
                    : "border-slate-200 bg-slate-100 text-slate-700"
                }`}
                title={sheetState === "full" ? "Perkecil Panel" : "Perbesar Panel"}
              >
                {sheetState === "full" ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] hidden sm:inline">Perkecil</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] hidden sm:inline">Pengertian & Detail</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className={`p-1.5 rounded-lg border transition-all ${
                  isDark
                    ? "border-slate-700 bg-slate-800/80 text-slate-400 hover:text-white"
                    : "border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
                aria-label="Tutup Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Embedded Full Panel Content */}
        {sheetState !== "peek" && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <BoneInfoPanel bone={bone} onClose={onClose} isDark={isDark} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
