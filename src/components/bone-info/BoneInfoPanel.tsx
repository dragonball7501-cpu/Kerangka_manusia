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
          className={`hidden lg:flex flex-col items-center justify-center p-8 text-center h-full border-l transition-colors select-none ${
            isDark
              ? "bg-slate-900/90 border-slate-800 text-slate-300"
              : "bg-white/90 border-slate-200 text-slate-700"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center max-w-xs"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border shadow-lg ${
                isDark
                  ? "bg-amber-950/40 border-amber-500/40 text-amber-400"
                  : "bg-amber-50 border-amber-300 text-amber-600"
              }`}
            >
              <Sparkles className="w-8 h-8 animate-pulse text-amber-500" />
            </div>

            <div className="flex items-center gap-1.5 mb-2">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white"
                style={{ backgroundColor: groupMeta?.colorHex || "#d97706" }}
              >
                {groupMeta?.name || focusedBone.group}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/40">
                Area Terarsir
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-100 dark:text-white">
              {focusedBone.commonName}
            </h3>
            <p className="text-xs font-serif italic text-amber-500 dark:text-amber-400 mb-4">
              {focusedBone.latinName}
            </p>

            <p className="text-xs leading-relaxed text-slate-400 mb-5">
              Area tulang telah diarsir & dizoom pada viewport 3D. Ketuk arsiran tulang sekali lagi atau klik tombol di bawah untuk menampilkan penjelasan lengkap.
            </p>

            {onOpenDefinition && (
              <button
                id="btn-open-definition-from-side"
                onClick={onOpenDefinition}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all active:scale-98 cursor-pointer shadow-lg ${
                  isDark
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-950/50"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-200"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Buka Pengertian Lengkap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </aside>
      );
    }

    return (
      <aside
        id="bone-info-empty-panel"
        className={`hidden lg:flex flex-col items-center justify-center p-8 text-center h-full border-l transition-colors select-none ${
          isDark
            ? "bg-slate-900/90 border-slate-800 text-slate-400"
            : "bg-white/90 border-slate-200 text-slate-500"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${
              isDark
                ? "bg-slate-800/80 border-slate-700 text-cyan-400"
                : "bg-sky-50 border-sky-200 text-sky-600"
            }`}
          >
            <Info className="w-8 h-8 opacity-80 animate-pulse" />
          </div>
          <h3 className="text-base font-bold text-slate-200 dark:text-slate-100">
            Pilih Tulang pada Rangka 3D
          </h3>
          <p className="text-xs max-w-xs mt-2 leading-relaxed text-slate-400">
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
      className={`h-full flex flex-col transition-colors border-l shadow-2xl relative z-10 ${
        isDark
          ? "bg-slate-900/95 border-slate-800 text-slate-100 backdrop-blur-lg"
          : "bg-white/95 border-slate-200 text-slate-800 backdrop-blur-lg"
      }`}
    >
      {/* Panel Top Header */}
      <div className="p-4 border-b border-inherit space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-xs"
                style={{ backgroundColor: groupMeta?.colorHex || "#0284c7" }}
              >
                {groupMeta?.name || bone.group}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                  bone.division === "axial"
                    ? isDark
                      ? "bg-cyan-950/60 border-cyan-800 text-cyan-400"
                      : "bg-sky-50 border-sky-200 text-sky-700"
                    : isDark
                    ? "bg-purple-950/60 border-purple-800 text-purple-400"
                    : "bg-purple-50 border-purple-200 text-purple-700"
                }`}
              >
                Rangka {bone.division === "axial" ? "Aksial" : "Apendikular"}
              </span>
            </div>

            <h2 className="text-xl font-extrabold tracking-tight mt-1 text-slate-100 dark:text-slate-100">
              {bone.commonName}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-amber-500 dark:text-amber-400 font-serif italic">
                {bone.latinName}
              </p>
              <button
                id="btn-speak-latin-name"
                onClick={() => speakText(`${bone.latinName}. ${bone.commonName}. ${bone.summary}`, "id-ID")}
                className={`p-1 rounded-md border transition-all ${
                  isDark
                    ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-amber-400"
                    : "border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800"
                }`}
                title="Dengarkan Pelafalan Bahasa Latin & Pengertian"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            id="btn-close-info-panel"
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-all ${
              isDark
                ? "border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white"
                : "border-slate-200 hover:bg-slate-100 text-slate-600"
            }`}
            aria-label="Tutup Panel Informasi"
            title="Tutup Panel Informasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pt-1 pb-1 border-t border-inherit/40 no-scrollbar">
          <button
            id="tab-overview"
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? isDark
                  ? "bg-cyan-900/70 text-cyan-300 border border-cyan-700/60 shadow-xs"
                  : "bg-sky-100 text-sky-800 border border-sky-300 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pengertian & Ikhtisar</span>
          </button>

          <button
            id="tab-functions"
            onClick={() => setActiveTab("functions")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "functions"
                ? isDark
                  ? "bg-cyan-900/70 text-cyan-300 border border-cyan-700/60 shadow-xs"
                  : "bg-sky-100 text-sky-800 border border-sky-300 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Fungsi</span>
          </button>

          <button
            id="tab-articulations"
            onClick={() => setActiveTab("articulations")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "articulations"
                ? isDark
                  ? "bg-cyan-900/70 text-cyan-300 border border-cyan-700/60 shadow-xs"
                  : "bg-sky-100 text-sky-800 border border-sky-300 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Sendi</span>
          </button>

          <button
            id="tab-facts"
            onClick={() => setActiveTab("facts")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "facts"
                ? isDark
                  ? "bg-cyan-900/70 text-cyan-300 border border-cyan-700/60 shadow-xs"
                  : "bg-sky-100 text-sky-800 border border-sky-300 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Fakta & Klinis</span>
          </button>

          <button
            id="tab-ai-mentor"
            onClick={() => setActiveTab("ai-mentor")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "ai-mentor"
                ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-950/40"
                : "text-purple-400 hover:text-purple-300"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tanya AI</span>
          </button>
        </div>
      </div>

      {/* Tab Content Body with Smooth Animation */}
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
              {/* Main Smooth "Pengertian / Definisi" Hero Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-2xl border shadow-sm relative overflow-hidden ${
                  isDark
                    ? "bg-gradient-to-br from-slate-800/90 via-slate-800/60 to-cyan-950/40 border-cyan-500/30"
                    : "bg-gradient-to-br from-sky-50 via-white to-blue-50/50 border-sky-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 dark:text-cyan-300 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Pengertian & Konsep Anatomi</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    Materi Inti
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed font-normal text-slate-200 dark:text-slate-200">
                  {bone.summary}
                </p>
              </motion.div>

              {/* Quick Spec Matrix */}
              <div
                className={`p-3.5 rounded-xl border grid grid-cols-2 gap-3 ${
                  isDark ? "bg-slate-800/60 border-slate-700/80" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Bentuk Tulang
                  </span>
                  <span className="font-semibold text-slate-200 dark:text-slate-100">
                    {bone.shapeType}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Jumlah / Segmen
                  </span>
                  <span className="font-semibold text-slate-200 dark:text-slate-100">
                    {bone.countDescription}
                  </span>
                </div>

                <div className="col-span-2 border-t border-inherit/40 pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Lokasi Anatomis
                  </span>
                  <span className="font-semibold text-slate-200 dark:text-slate-100 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    {bone.location}
                  </span>
                </div>
              </div>

              {/* Anatomical Characteristics */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 dark:text-slate-100 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Karakteristik & Ciri Morfologi:
                </h4>
                <ul className="space-y-1.5">
                  {bone.characteristics.map((char, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1 }}
                      className={`p-2.5 rounded-lg border leading-relaxed flex items-start gap-2 ${
                        isDark
                          ? "bg-slate-800/40 border-slate-700/60 text-slate-300"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
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
              <h4 className="font-bold text-slate-200 dark:text-slate-100 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                Peran & Fungsi Biologis Utama:
              </h4>
              <div className="space-y-2">
                {bone.functions.map((fn, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                      isDark
                        ? "bg-slate-800/50 border-slate-700/80 text-slate-200"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
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
              <h4 className="font-bold text-slate-200 dark:text-slate-100 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-cyan-400" />
                Persendian & Hubungan Antartulang:
              </h4>
              <div className="space-y-2.5">
                {bone.articulations.map((art, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-3.5 rounded-xl border space-y-2 ${
                      isDark
                        ? "bg-slate-800/60 border-slate-700 text-slate-200"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-amber-400 dark:text-amber-400 text-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{art.jointName}</span>
                    </div>

                    <div className="text-[11px] space-y-1">
                      <p>
                        <strong className="text-slate-400">Bertaut dengan:</strong>{" "}
                        <span className="text-slate-200 dark:text-slate-100 font-medium">
                          {art.connectedTo}
                        </span>
                      </p>
                      <p>
                        <strong className="text-slate-400">Tipe Pergerakan:</strong>{" "}
                        <span className="text-slate-300 dark:text-slate-300">
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
                <h4 className="font-bold text-slate-200 dark:text-slate-100 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Fakta Anatomi & Konsep Ujian:
                </h4>
                <div className="space-y-2">
                  {bone.anatomyFacts.map((fact, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-3 rounded-xl border leading-relaxed ${
                        isDark
                          ? "bg-amber-950/20 border-amber-800/40 text-amber-200/90"
                          : "bg-amber-50/80 border-amber-200 text-amber-950"
                      }`}
                    >
                      💡 {fact}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Clinical & Pathological Notes */}
              <div className="space-y-2 pt-2 border-t border-inherit/40">
                <h4 className="font-bold text-slate-200 dark:text-slate-100 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-rose-400" />
                  Aspek Klinis & Kelainan / Cedera:
                </h4>
                <div className="space-y-2">
                  {bone.clinicalNotes.map((note, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-3 rounded-xl border leading-relaxed ${
                        isDark
                          ? "bg-rose-950/20 border-rose-800/40 text-rose-200/90"
                          : "bg-rose-50/80 border-rose-200 text-rose-950"
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
