import { motion, AnimatePresence } from "motion/react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Globe,
  CheckCircle2,
  HelpCircle,
  Play,
  Bone,
  Layers,
  RotateCcw,
  Zap,
} from "lucide-react";
import { VoiceAssistantFeedback } from "../../hooks/useVoiceAssistant";

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  interimTranscript: string;
  feedback: VoiceAssistantFeedback | null;
  language: "id-ID" | "en-US";
  enableTtsFeedback: boolean;
  onToggleListening: () => void;
  onSelectLanguage: (lang: "id-ID" | "en-US") => void;
  onToggleTtsFeedback: () => void;
  onTestCommand: (command: string) => void;
  isDark: boolean;
}

interface ExampleCategory {
  title: string;
  icon: string;
  items: { latin: string; common: string; command: string }[];
}

const EXAMPLE_CATEGORIES: ExampleCategory[] = [
  {
    title: "Tengkorak & Kepala (Skull)",
    icon: "💀",
    items: [
      { latin: "Cranium", common: "Tempurung Kepala", command: "Cranium" },
      { latin: "Mandibula", common: "Rahang Bawah", command: "Mandibula" },
      { latin: "Ossa Faciei", common: "Tulang Wajah", command: "Tulang Wajah" },
    ],
  },
  {
    title: "Batang Tubuh & Dada (Thorax & Spine)",
    icon: "🫁",
    items: [
      { latin: "Sternum", common: "Tulang Dada", command: "Sternum" },
      { latin: "Costae Verae", common: "Rusuk Sejati", command: "Tulang Rusuk Sejati" },
      { latin: "Costae Fluctuantes", common: "Rusuk Melayang", command: "Rusuk Melayang" },
      { latin: "Vertebrae Cervicales", common: "Tulang Leher", command: "Tulang Leher" },
      { latin: "Vertebrae Lumbales", common: "Tulang Pinggang", command: "Vertebra Lumbal" },
      { latin: "Os Sacrum", common: "Tulang Kelangkang", command: "Sakrum" },
      { latin: "Os Coccygis", common: "Tulang Ekor", command: "Tulang Ekor" },
    ],
  },
  {
    title: "Bahu & Lengan (Upper Limb)",
    icon: "💪",
    items: [
      { latin: "Clavicula", common: "Tulang Selangka", command: "Clavicle" },
      { latin: "Scapula", common: "Tulang Belikat", command: "Tulang Belikat" },
      { latin: "Humerus", common: "Lengan Atas", command: "Humerus" },
      { latin: "Radius", common: "Tulang Pengumpil", command: "Radius" },
      { latin: "Ulna", common: "Tulang Hasta", command: "Ulna" },
      { latin: "Ossa Carpi", common: "Pergelangan Tangan", command: "Carpals" },
      { latin: "Phalanges Manus", common: "Jari Tangan", command: "Jari Tangan" },
    ],
  },
  {
    title: "Panggul & Tungkai Bawah (Lower Limb)",
    icon: "🦵",
    items: [
      { latin: "Pelvis / Os Coxae", common: "Tulang Panggul", command: "Pelvis" },
      { latin: "Femur", common: "Tulang Paha", command: "Femur" },
      { latin: "Patella", common: "Tempurung Lutut", command: "Patella" },
      { latin: "Tibia", common: "Tulang Kering", command: "Tibia" },
      { latin: "Fibula", common: "Tulang Betis", command: "Fibula" },
      { latin: "Ossa Tarsi", common: "Pergelangan Kaki", command: "Tarsal" },
      { latin: "Phalanges Pedis", common: "Jari Kaki", command: "Jari Kaki" },
    ],
  },
  {
    title: "Navigasi & Kontrol 3D Rangka",
    icon: "⚡",
    items: [
      { latin: "Reset Posisi", common: "Kembali ke Tampilan Awal", command: "Reset Posisi" },
      { latin: "Mode Rontgen", common: "Efek Sinar-X Transparan", command: "Mode Rontgen" },
      { latin: "Rotasi Otomatis", common: "Putar Rangka 360°", command: "Putar Otomatis" },
      { latin: "Fokus Kaki", common: "Arahkan Kamera ke Tungkai", command: "Fokus Kaki" },
      { latin: "Fokus Kepala", common: "Arahkan Kamera ke Tengkorak", command: "Fokus Kepala" },
    ],
  },
];

export function VoiceAssistantModal({
  isOpen,
  onClose,
  isListening,
  isSupported,
  transcript,
  interimTranscript,
  feedback,
  language,
  enableTtsFeedback,
  onToggleListening,
  onSelectLanguage,
  onToggleTtsFeedback,
  onTestCommand,
  isDark,
}: VoiceAssistantModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="voice-assistant-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            id="voice-assistant-modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000000] dark:border-cyan-400 dark:shadow-[6px_6px_0px_#06b6d4] overflow-hidden transition-all ${
              isDark
                ? "bg-slate-900 text-slate-100"
                : "bg-amber-50 text-slate-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b-2 border-inherit ${
            isDark ? "bg-slate-800" : "bg-yellow-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000] ${
                isListening
                  ? "bg-emerald-400 text-black animate-pulse"
                  : isDark
                  ? "bg-slate-700 text-cyan-300 border-cyan-400"
                  : "bg-white text-black"
              }`}
            >
              <Mic className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-anton text-base sm:text-lg uppercase tracking-wider text-black dark:text-white leading-none">
                  Voice Assistant Rangka 3D
                </h2>
                <span
                  className={`px-2 py-0.5 text-[10px] font-anton uppercase tracking-wider rounded-md border border-black ${
                    isListening
                      ? "bg-emerald-400 text-black animate-pulse shadow-[1px_1px_0px_#000]"
                      : isDark
                      ? "bg-slate-800 text-slate-300 border-cyan-400"
                      : "bg-white text-black"
                  }`}
                >
                  {isListening ? "● Mendengarkan" : "Siap"}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-300 mt-0.5">
                Ucapkan nama tulang untuk langsung menyorotnya di model 3D
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-black bg-white dark:bg-slate-800 dark:border-cyan-400 text-black dark:text-white shadow-[2px_2px_0px_#000] neo-press cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {/* Main Interactive Mic Centerpiece */}
          <div
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center transition-all shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#06b6d4] ${
              isListening
                ? isDark
                  ? "bg-slate-800 border-cyan-400"
                  : "bg-yellow-200 border-black"
                : isDark
                ? "bg-slate-850 border-cyan-400/50"
                : "bg-white border-black"
            }`}
          >
            {/* Big Mic Button */}
            <div className="relative mb-4">
              <button
                id="btn-voice-assistant-toggle"
                onClick={onToggleListening}
                className={`relative w-20 h-20 rounded-2xl border-3 border-black flex items-center justify-center font-black transition-all neo-press cursor-pointer ${
                  isListening
                    ? "bg-emerald-400 text-black shadow-[4px_4px_0px_#000] ring-4 ring-emerald-300"
                    : isDark
                    ? "bg-cyan-400 text-black shadow-[4px_4px_0px_#06b6d4] border-cyan-200"
                    : "bg-yellow-400 hover:bg-yellow-300 text-black shadow-[4px_4px_0px_#000000]"
                }`}
                title={isListening ? "Klik untuk menghentikan pendengar suara" : "Klik untuk mulai berbicara"}
              >
                <Mic className="w-9 h-9 stroke-[2.5]" />
              </button>
            </div>

            <h3 className="font-anton text-base uppercase tracking-wider mb-1 text-black dark:text-white">
              {isListening ? "Silakan Bicara Sekarang..." : "Klik Mikrofon untuk Mulai"}
            </h3>

            {/* Realtime Live Speech Feedback Box */}
            <div
              className={`w-full max-w-md mt-2 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all shadow-[2px_2px_0px_#000000] ${
                feedback?.type === "success"
                  ? isDark
                    ? "bg-emerald-950 border-emerald-400 text-emerald-200"
                    : "bg-emerald-200 border-black text-emerald-950"
                  : isDark
                  ? "bg-slate-900 border-cyan-400 text-slate-200"
                  : "bg-yellow-50 border-black text-slate-900"
              }`}
            >
              {feedback ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              ) : interimTranscript || transcript ? (
                <div className="flex items-center justify-center gap-2">
                  <Mic className="w-4 h-4 text-amber-500 stroke-[2.5] shrink-0 animate-pulse" />
                  <span className="italic font-mono text-black dark:text-cyan-300 font-black">
                    "{interimTranscript || transcript}"
                  </span>
                </div>
              ) : (
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {isListening
                    ? "Mendengarkan ucapan Anda (Bahasa Indonesia & Latin)..."
                    : "Coba ucapkan: 'Cranium', 'Femur', 'Tulang Paha', atau 'Sternum'"}
                </span>
              )}
            </div>

            {/* Settings toggles bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-bold">
              {/* Language Selector */}
              <div
                className={`flex items-center p-1 rounded-xl border-2 border-black ${
                  isDark ? "bg-slate-900 border-cyan-400 shadow-[2px_2px_0px_#06b6d4]" : "bg-white border-black shadow-[2px_2px_0px_#000]"
                }`}
              >
                <button
                  onClick={() => onSelectLanguage("id-ID")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-black uppercase text-xs transition-all cursor-pointer ${
                    language === "id-ID"
                      ? isDark
                        ? "bg-cyan-400 text-black font-anton tracking-wide"
                        : "bg-yellow-300 text-black border border-black font-anton tracking-wide"
                      : "text-slate-800 dark:text-slate-300 font-bold hover:text-black"
                  }`}
                >
                  <span>🇮🇩</span>
                  <span>Indonesia</span>
                </button>
                <button
                  onClick={() => onSelectLanguage("en-US")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-black uppercase text-xs transition-all cursor-pointer ${
                    language === "en-US"
                      ? isDark
                        ? "bg-cyan-400 text-black font-anton tracking-wide"
                        : "bg-yellow-300 text-black border border-black font-anton tracking-wide"
                      : "text-slate-800 dark:text-slate-300 font-bold hover:text-black"
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>Latin / EN</span>
                </button>
              </div>

              {/* TTS Voice Feedback Toggle */}
              <button
                onClick={onToggleTtsFeedback}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 font-anton uppercase tracking-wider text-xs transition-all neo-press cursor-pointer ${
                  enableTtsFeedback
                    ? isDark
                      ? "bg-cyan-400 text-black border-cyan-300 shadow-[2px_2px_0px_#06b6d4]"
                      : "bg-emerald-300 text-black border-black shadow-[2px_2px_0px_#000]"
                    : isDark
                    ? "bg-slate-900 border-slate-700 text-slate-300"
                    : "bg-white border-black text-slate-900 shadow-[2px_2px_0px_#000]"
                }`}
                title="Aktifkan/Nonaktifkan Suara Pelafalan Bahasa Latin"
              >
                {enableTtsFeedback ? (
                  <>
                    <Volume2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Pelafalan: Aktif</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 stroke-[2.5]" />
                    <span>Pelafalan: Mati</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Click-to-Test / Example Vocabulary Guide */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-anton text-xs sm:text-sm uppercase tracking-wider text-black dark:text-cyan-300">
                Daftar Perintah Suara (Klik untuk Menguji Langsung)
              </h4>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Bisa diklik
              </span>
            </div>

            <div className="space-y-3.5">
              {EXAMPLE_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className={`p-3.5 rounded-2xl border-2 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#06b6d4] ${
                    isDark ? "bg-slate-800 border-cyan-400" : "bg-white border-black"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-sm">{cat.icon}</span>
                    <span className="font-anton text-xs uppercase tracking-wide text-black dark:text-cyan-300">
                      {cat.title}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <button
                        key={item.command}
                        onClick={() => onTestCommand(item.command)}
                        className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 text-xs font-bold transition-all neo-press cursor-pointer ${
                          isDark
                            ? "bg-slate-900 border-cyan-400 text-slate-100 hover:bg-cyan-400 hover:text-black shadow-[1.5px_1.5px_0px_#06b6d4]"
                            : "bg-yellow-50 border-black text-slate-950 hover:bg-yellow-200 shadow-[1.5px_1.5px_0px_#000000]"
                        }`}
                        title={`Uji suara "${item.command}"`}
                      >
                        <Play className="w-2.5 h-2.5 text-black dark:text-cyan-300 fill-current opacity-80 group-hover:opacity-100" />
                        <span className="font-black">{item.latin}</span>
                        <span className="text-[10px] text-slate-800 dark:text-slate-300 font-bold">({item.common})</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-t-2 border-inherit text-xs font-bold ${
            isDark ? "bg-slate-800 text-slate-300" : "bg-yellow-100 text-slate-900"
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold">
            <HelpCircle className="w-4 h-4 text-amber-600 stroke-[2.5]" />
            <span>Sebutkan nama Indonesia atau Latin.</span>
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl font-anton uppercase tracking-wider text-xs border-2 border-black transition-all neo-press cursor-pointer ${
              isDark
                ? "bg-cyan-400 text-black border-cyan-200 shadow-[2px_2px_0px_#06b6d4]"
                : "bg-yellow-400 text-black shadow-[2px_2px_0px_#000]"
            }`}
          >
            Selesai
          </button>
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}

