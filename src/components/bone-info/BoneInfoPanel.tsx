import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  BookOpen,
  Zap,
  Link2,
  Sparkles,
  Award,
  Info,
  MapPin,
  Maximize2,
  Activity,
  Stethoscope,
  ChevronRight,
  Layers,
  Volume2,
  CheckCircle2,
} from "lucide-react";
import { BoneData } from "../../types/bone";
import { BONE_GROUPS } from "../../data/groups";
import { BoneAIAssistant } from "./BoneAIAssistant";
import { speakText } from "../../utils/audioFeedback";

interface BoneInfoPanelProps {
  bone: BoneData | null;
  focusedBone?: BoneData | null;
  onOpenDefinition?: () => void;
  onClose: () => void;
  onSelectConnectedBone?: (boneId: string) => void;
  isDark: boolean;
}

type TabKey = "overview" | "functions" | "articulations" | "facts" | "ai-mentor";

export function BoneInfoPanel({
  bone,
  focusedBone,
  onOpenDefinition,
  onClose,
  onSelectConnectedBone,
  isDark,
}: BoneInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  if (!bone) {
    if (focusedBone) {
      const groupMeta = BONE_GROUPS.find((g) => g.id === focusedBone.group);
      return (
        <aside
          id="bone-info-focused-panel"
          className={`hidden lg:flex flex-col items-center justify-center p-8 text-center h-full border-l-2 sm:border-l-3 transition-colors select-none ${
            isDark
              ? "bg-slate-900 border-cyan-400 text-slate-100 shadow-[-3px_0_0_0_#06b6d4]"
              : "bg-amber-50/90 border-black text-slate-900 shadow-[-3px_0_0_0_#000000]"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center max-w-xs"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#06b6d4] ${
                isDark
                  ? "bg-amber-400 border-black text-black"
                  : "bg-yellow-300 border-black text-black"
              }`}
            >
              <Sparkles className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="flex items-center gap-1.5 mb-2">
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-black border border-black"
                style={{ backgroundColor: groupMeta?.colorHex || "#facc15" }}
              >
                {groupMeta?.name || focusedBone.group}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-lime-300 text-black border border-black">
                Area Terarsir
              </span>
            </div>

            <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-wide">
              {focusedBone.commonName}
            </h3>
            <p className="text-xs font-serif italic text-amber-700 dark:text-amber-400 mb-4 font-bold">
              {focusedBone.latinName}
            </p>

            <p className="text-xs leading-relaxed font-bold text-black dark:text-slate-200 mb-5">
              Area tulang telah diarsir & dizoom pada model 3D. Ketuk arsiran tulang sekali lagi atau klik tombol di bawah untuk menampilkan penjelasan materi lengkap.
            </p>

            {onOpenDefinition && (
              <button
                id="btn-open-definition-from-side"
                onClick={onOpenDefinition}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0px_#000000] dark:border-cyan-200 dark:shadow-[3px_3px_0px_#06b6d4] neo-press cursor-pointer"
              >
                <BookOpen className="w-4 h-4 stroke-[2.5]" />
                <span>Buka Materi Lengkap</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </motion.div>
        </aside>
      );
    }

    return (
      <aside
        id="bone-info-empty-panel"
        className={`hidden lg:flex flex-col items-center justify-center p-8 text-center h-full border-l-2 sm:border-l-3 transition-colors select-none ${
          isDark
            ? "bg-slate-900 border-cyan-400 text-slate-200 shadow-[-3px_0_0_0_#06b6d4]"
            : "bg-amber-50/90 border-black text-black shadow-[-3px_0_0_0_#000000]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2 border-black shadow-[3px_3px_0px_#000000] dark:border-cyan-400 dark:shadow-[3px_3px_0px_#06b6d4] ${
              isDark
                ? "bg-cyan-400 text-black"
                : "bg-yellow-300 text-black"
            }`}
          >
            <Info className="w-8 h-8 stroke-[2.5] animate-pulse" />
          </div>
          <h3 className="text-base font-black text-black dark:text-slate-100 uppercase tracking-wide">
            Pilih Tulang pada Rangka 3D
          </h3>
          <p className="text-xs max-w-xs mt-2 leading-relaxed font-bold text-black dark:text-slate-300">
            Klik langsung bagian tulang pada model 3D untuk men-zoom dan mengarsir area tulang, lalu klik arsiran untuk membuka materi dan pengertian anatomi lengkap.
          </p>
        </motion.div>
      </aside>
    );
  }

  const groupMeta = BONE_GROUPS.find((g) => g.id === bone.group);

  return (
    <motion.aside
      key={bone.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", damping: 26, stiffness: 300 }}
      id="bone-info-active-panel"
      className={`h-full flex flex-col transition-colors border-l-2 sm:border-l-3 relative z-10 ${
        isDark
          ? "bg-slate-900 border-cyan-400 text-slate-100 shadow-[-3px_0_0_0_#06b6d4]"
          : "bg-white border-black text-slate-900 shadow-[-3px_0_0_0_#000000]"
      }`}
    >
      {/* Panel Top Header */}
      <div className="p-4 border-b-2 border-inherit space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-black border border-black shadow-[1px_1px_0px_#000]"
                style={{ backgroundColor: groupMeta?.colorHex || "#0284c7" }}
              >
                {groupMeta?.name || bone.group}
              </span>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border border-black ${
                  bone.division === "axial"
                    ? "bg-lime-300 text-black"
                    : "bg-pink-300 text-black"
                }`}
              >
                Rangka {bone.division === "axial" ? "Aksial" : "Apendikular"}
              </span>
            </div>

            <h2 className="text-xl font-black uppercase tracking-tight mt-1 text-slate-950 dark:text-slate-50">
              {bone.commonName}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-amber-600 dark:text-amber-400 font-serif italic font-bold">
                {bone.latinName}
              </p>
              <button
                id="btn-speak-latin-name"
                onClick={() => speakText(`${bone.latinName}. ${bone.commonName}. ${bone.summary}`, "id-ID")}
                className={`p-1 rounded-md border-2 font-bold transition-all neo-press cursor-pointer ${
                  isDark
                    ? "border-cyan-400 bg-slate-800 text-amber-400 shadow-[1.5px_1.5px_0px_#06b6d4]"
                    : "border-black bg-yellow-100 text-black shadow-[1.5px_1.5px_0px_#000000]"
                }`}
                title="Dengarkan Pelafalan Bahasa Latin & Pengertian"
              >
                <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <button
            id="btn-close-info-panel"
            onClick={onClose}
            className={`p-1.5 rounded-lg border-2 font-bold transition-all neo-press cursor-pointer ${
              isDark
                ? "border-cyan-400 bg-slate-800 text-slate-100 shadow-[2px_2px_0px_#06b6d4]"
                : "border-black bg-white text-slate-900 shadow-[2px_2px_0px_#000000]"
            }`}
            aria-label="Tutup Panel Informasi"
            title="Tutup Panel Informasi"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 border-t-2 border-inherit custom-scrollbar">
          <button
            id="tab-overview"
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all border-2 flex items-center gap-1.5 neo-press cursor-pointer ${
              activeTab === "overview"
                ? isDark
                  ? "bg-cyan-400 text-black border-cyan-200 shadow-[2px_2px_0px_#06b6d4]"
                  : "bg-yellow-300 text-black border-black shadow-[2px_2px_0px_#000000]"
                : isDark
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-400"
                : "bg-slate-100 border-black text-black hover:bg-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Materi Inti</span>
          </button>

          <button
            id="tab-functions"
            onClick={() => setActiveTab("functions")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all border-2 flex items-center gap-1.5 neo-press cursor-pointer ${
              activeTab === "functions"
                ? isDark
                  ? "bg-cyan-400 text-black border-cyan-200 shadow-[2px_2px_0px_#06b6d4]"
                  : "bg-lime-300 text-black border-black shadow-[2px_2px_0px_#000000]"
                : isDark
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-400"
                : "bg-slate-100 border-black text-black hover:bg-slate-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Fungsi</span>
          </button>

          <button
            id="tab-articulations"
            onClick={() => setActiveTab("articulations")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all border-2 flex items-center gap-1.5 neo-press cursor-pointer ${
              activeTab === "articulations"
                ? isDark
                  ? "bg-cyan-400 text-black border-cyan-200 shadow-[2px_2px_0px_#06b6d4]"
                  : "bg-pink-300 text-black border-black shadow-[2px_2px_0px_#000000]"
                : isDark
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-400"
                : "bg-slate-100 border-black text-black hover:bg-slate-200"
            }`}
          >
            <Link2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Sendi</span>
          </button>

          <button
            id="tab-facts"
            onClick={() => setActiveTab("facts")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all border-2 flex items-center gap-1.5 neo-press cursor-pointer ${
              activeTab === "facts"
                ? isDark
                  ? "bg-cyan-400 text-black border-cyan-200 shadow-[2px_2px_0px_#06b6d4]"
                  : "bg-orange-300 text-black border-black shadow-[2px_2px_0px_#000000]"
                : isDark
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-400"
                : "bg-slate-100 border-black text-black hover:bg-slate-200"
            }`}
          >
            <Award className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Fakta & Klinis</span>
          </button>

          <button
            id="tab-ai-mentor"
            onClick={() => setActiveTab("ai-mentor")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all border-2 flex items-center gap-1.5 neo-press cursor-pointer ${
              activeTab === "ai-mentor"
                ? "bg-purple-500 text-black border-black shadow-[2px_2px_0px_#000000] dark:border-cyan-200 dark:shadow-[2px_2px_0px_#06b6d4]"
                : isDark
                ? "bg-slate-800 border-purple-800 text-purple-300"
                : "bg-purple-100 border-black text-purple-950"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 stroke-[2.5]" />
            <span>Tanya AI</span>
          </button>
        </div>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW & PENGERTIAN */}
          {activeTab === "overview" && (
            <motion.div
              key={`overview-${bone.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3.5"
            >
              {/* Main "Pengertian / Definisi" Hero Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-xl border-2 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#06b6d4] ${
                  isDark
                    ? "bg-slate-800 border-cyan-400"
                    : "bg-yellow-50 border-black"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-black dark:text-cyan-300 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 stroke-[2.5]" />
                    <span>Pengertian & Konsep Anatomi</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-yellow-300 text-black border border-black font-black uppercase">
                    Materi Inti
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed font-semibold text-slate-800 dark:text-slate-200">
                  {bone.summary}
                </p>
              </motion.div>

              {/* Quick Spec Matrix */}
              <div
                className={`p-3.5 rounded-xl border-2 grid grid-cols-2 gap-3 shadow-[2.5px_2.5px_0px_#000000] dark:shadow-[2.5px_2.5px_0px_#06b6d4] ${
                  isDark ? "bg-slate-800 border-cyan-400" : "bg-white border-black"
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 block tracking-wider">
                    Bentuk Tulang
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">
                    {bone.shapeType}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 block tracking-wider">
                    Jumlah / Segmen
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">
                    {bone.countDescription}
                  </span>
                </div>

                <div className="col-span-2 border-t-2 border-inherit pt-2">
                  <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 block tracking-wider">
                    Lokasi Anatomis
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 stroke-[2.5]" />
                    {bone.location}
                  </span>
                </div>
              </div>

              {/* Anatomical Characteristics */}
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
                  <Layers className="w-4 h-4 stroke-[2.5] text-cyan-400" />
                  Karakteristik & Ciri Morfologi:
                </h4>
                <ul className="space-y-1.5">
                  {bone.characteristics.map((char, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1 }}
                      className={`p-2.5 rounded-lg border-2 font-semibold leading-relaxed flex items-start gap-2 ${
                        isDark
                          ? "bg-slate-800/80 border-slate-700 text-slate-200"
                          : "bg-slate-50 border-black text-slate-900 shadow-[1.5px_1.5px_0px_#000]"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 border border-black" />
                      <span>{char}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FUNCTIONS */}
          {activeTab === "functions" && (
            <motion.div
              key={`functions-${bone.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              <h4 className="font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
                <Activity className="w-4 h-4 stroke-[2.5] text-emerald-500" />
                Peran & Fungsi Biologis Utama:
              </h4>
              <div className="space-y-2">
                {bone.functions.map((fn, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-3 rounded-xl border-2 font-semibold flex items-start gap-2.5 transition-all shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#06b6d4] ${
                      isDark
                        ? "bg-slate-800 border-cyan-400 text-slate-200"
                        : "bg-lime-50 border-black text-slate-900"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-lime-300 border border-black text-black font-mono font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{fn}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: ARTICULATIONS & JOINTS */}
          {activeTab === "articulations" && (
            <motion.div
              key={`articulations-${bone.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              <h4 className="font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
                <Link2 className="w-4 h-4 stroke-[2.5] text-cyan-400" />
                Persendian & Hubungan Antartulang:
              </h4>
              <div className="space-y-2.5">
                {bone.articulations.map((art, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-3.5 rounded-xl border-2 space-y-2 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#06b6d4] ${
                      isDark
                        ? "bg-slate-800 border-cyan-400 text-slate-200"
                        : "bg-pink-50 border-black text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-black text-black dark:text-amber-400 text-xs">
                      <span className="w-2 h-2 rounded-full bg-pink-500 border border-black" />
                      <span>{art.jointName}</span>
                    </div>

                    <div className="text-[11px] space-y-1 font-semibold">
                      <p>
                        <strong className="text-slate-500 dark:text-slate-400 uppercase text-[10px]">Bertaut dengan:</strong>{" "}
                        <span className="text-slate-900 dark:text-slate-100 font-bold">
                          {art.connectedTo}
                        </span>
                      </p>
                      <p>
                        <strong className="text-slate-500 dark:text-slate-400 uppercase text-[10px]">Tipe Gerak:</strong>{" "}
                        <span className="text-slate-800 dark:text-slate-300">
                          {art.movementType}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: FACTS & CLINICAL NOTES */}
          {activeTab === "facts" && (
            <motion.div
              key={`facts-${bone.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Anatomy Facts */}
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
                  <Award className="w-4 h-4 stroke-[2.5] text-amber-500" />
                  Fakta Anatomi & Konsep Ujian:
                </h4>
                <div className="space-y-2">
                  {bone.anatomyFacts.map((fact, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-3 rounded-xl border-2 font-semibold leading-relaxed shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#06b6d4] ${
                        isDark
                          ? "bg-slate-800 border-amber-400 text-amber-300"
                          : "bg-amber-100 border-black text-amber-950"
                      }`}
                    >
                      💡 {fact}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Clinical & Pathological Notes */}
              <div className="space-y-2 pt-2 border-t-2 border-inherit">
                <h4 className="font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
                  <Stethoscope className="w-4 h-4 stroke-[2.5] text-rose-500" />
                  Aspek Klinis & Kelainan / Cedera:
                </h4>
                <div className="space-y-2">
                  {bone.clinicalNotes.map((note, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-3 rounded-xl border-2 font-semibold leading-relaxed shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#06b6d4] ${
                        isDark
                          ? "bg-slate-800 border-rose-400 text-rose-300"
                          : "bg-rose-100 border-black text-rose-950"
                      }`}
                    >
                      ⚠️ {note}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: AI TUTOR */}
          {activeTab === "ai-mentor" && (
            <motion.div
              key={`ai-mentor-${bone.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <BoneAIAssistant bone={bone} isDark={isDark} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
