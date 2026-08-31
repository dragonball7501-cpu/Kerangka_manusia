import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
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
  if (!isOpen) return null;

  return (
    <div
      id="voice-assistant-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="voice-assistant-modal-content"
        className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? "bg-slate-900 border-slate-700 text-slate-100 shadow-cyan-950/40"
            : "bg-white border-slate-200 text-slate-800 shadow-slate-200/80"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${
            isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-100 bg-slate-50/80"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                isListening
                  ? "bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white animate-pulse"
                  : isDark
                  ? "bg-slate-800 text-cyan-400 border border-slate-700"
                  : "bg-sky-100 text-sky-700"
              }`}
            >
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Voice Assistant Rangka 3D
                </h2>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                    isListening
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse"
                      : isDark
                      ? "bg-slate-800 text-slate-400"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {isListening ? "● Mendengarkan" : "Siap"}
                </span>
              </div>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Ucapkan nama tulang (contoh: "Cranium", "Femur") untuk langsung menyorotnya di model 3D
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isDark
                ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
            }`}
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Interactive Mic Centerpiece */}
          <div
            className={`flex flex-col items-center justify-center p-6 rounded-3xl border text-center transition-all ${
              isListening
                ? isDark
                  ? "bg-gradient-to-b from-cyan-950/60 to-slate-900/90 border-cyan-500/40 shadow-inner"
                  : "bg-gradient-to-b from-sky-50 to-white border-cyan-300 shadow-inner"
                : isDark
                ? "bg-slate-800/40 border-slate-800"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            {/* Big Mic Button with Glowing Rings */}
            <div className="relative mb-4">
              {isListening && (
                <>
                  <div className="absolute -inset-4 rounded-full bg-cyan-500/20 animate-ping" />
                  <div className="absolute -inset-2 rounded-full bg-cyan-400/30 animate-pulse" />
                </>
              )}

              <button
                id="btn-voice-assistant-toggle"
                onClick={onToggleListening}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center font-bold text-white shadow-xl transition-all active:scale-95 ${
                  isListening
                    ? "bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-500 shadow-cyan-500/40 ring-4 ring-cyan-400/30"
                    : isDark
                    ? "bg-gradient-to-tr from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-blue-700 text-slate-200 shadow-slate-950"
                    : "bg-gradient-to-tr from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-sky-200"
                }`}
                title={isListening ? "Klik untuk menghentikan pendengar suara" : "Klik untuk mulai berbicara"}
              >
                {isListening ? (
                  <Mic className="w-8 h-8 animate-bounce" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>
            </div>

            <h3 className="text-base font-bold mb-1">
              {isListening ? "Silakan Bicara Sekarang..." : "Klik Mikrofon untuk Mulai"}
            </h3>

            {/* Realtime Live Speech Feedback Box */}
            <div
              className={`w-full max-w-md mt-2 px-4 py-3 rounded-2xl border text-sm font-medium transition-all ${
                feedback?.type === "success"
                  ? isDark
                    ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-200"
                    : "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : isDark
                  ? "bg-slate-900/90 border-slate-700 text-slate-300"
                  : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              {feedback ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              ) : interimTranscript || transcript ? (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 animate-spin" />
                  <span className="italic font-mono text-cyan-400 font-semibold">
                    "{interimTranscript || transcript}"
                  </span>
                </div>
              ) : (
                <span className="opacity-60 text-xs">
                  {isListening
                    ? "Mendengarkan ucapan Anda (Bahasa Indonesia & Latin)..."
                    : "Coba ucapkan: 'Cranium', 'Femur', 'Tulang Paha', atau 'Sternum'"}
                </span>
              )}
            </div>

            {/* Settings toggles bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs">
              {/* Language Selector */}
              <div
                className={`flex items-center p-0.5 rounded-xl border ${
                  isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
                }`}
              >
                <button
                  onClick={() => onSelectLanguage("id-ID")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                    language === "id-ID"
                      ? isDark
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "bg-sky-100 text-sky-800 border border-sky-300"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>🇮🇩</span>
                  <span>Indonesia</span>
                </button>
                <button
                  onClick={() => onSelectLanguage("en-US")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                    language === "en-US"
                      ? isDark
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "bg-sky-100 text-sky-800 border border-sky-300"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>Latin / EN</span>
                </button>
              </div>

              {/* TTS Voice Feedback Toggle */}
              <button
                onClick={onToggleTtsFeedback}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                  enableTtsFeedback
                    ? isDark
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                      : "bg-sky-50 text-sky-700 border-sky-200"
                    : isDark
                    ? "bg-slate-900 border-slate-700 text-slate-400"
                    : "bg-white border-slate-200 text-slate-500"
                }`}
                title="Aktifkan/Nonaktifkan Suara Pelafalan Bahasa Latin"
              >
                {enableTtsFeedback ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Suara Pelafalan: Aktif</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Suara Pelafalan: Mati</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Click-to-Test / Example Vocabulary Guide */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                  Daftar Kata Suara yang Didukung (Klik untuk Menguji)
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">
                Bisa diklik langsung
              </span>
            </div>

            <div className="space-y-3.5">
              {EXAMPLE_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className={`p-3.5 rounded-2xl border ${
                    isDark ? "bg-slate-800/30 border-slate-800" : "bg-slate-50/80 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-sm">{cat.icon}</span>
                    <span className="text-xs font-bold text-slate-300 dark:text-slate-300">
                      {cat.title}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <button
                        key={item.command}
                        onClick={() => onTestCommand(item.command)}
                        className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all active:scale-95 ${
                          isDark
                            ? "bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-cyan-500 hover:text-cyan-300 hover:bg-slate-800"
                            : "bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50"
                        }`}
                        title={`Uji suara "${item.command}"`}
                      >
                        <Play className="w-2.5 h-2.5 text-cyan-500 opacity-60 group-hover:opacity-100" />
                        <span className="font-semibold">{item.latin}</span>
                        <span className="text-[11px] opacity-60">({item.common})</span>
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
          className={`flex items-center justify-between px-5 py-3 border-t text-xs ${
            isDark ? "border-slate-800 bg-slate-900/80 text-slate-400" : "border-slate-100 bg-slate-50 text-slate-500"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Siswa dapat menyebutkan nama Indonesia maupun Latin.</span>
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl font-bold transition-all ${
              isDark
                ? "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30"
                : "bg-sky-600 hover:bg-sky-700 text-white"
            }`}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
