import {
  Bone,
  Sun,
  Moon,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Menu,
  BookOpen,
  Mic,
  MicOff,
  Trophy,
  BrainCircuit,
} from "lucide-react";
import { ThemeMode } from "../../hooks/useTheme";

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenHelp: () => void;
  onResetView: () => void;
  onToggleSidebar: () => void;
  selectedBoneName?: string;
  isVoiceListening?: boolean;
  onOpenVoiceAssistant?: () => void;
  onOpenQuiz?: () => void;
  onOpenLeaderboard?: () => void;
}

export function Header({
  theme,
  onToggleTheme,
  onOpenHelp,
  onResetView,
  onToggleSidebar,
  selectedBoneName,
  isVoiceListening = false,
  onOpenVoiceAssistant,
  onOpenQuiz,
  onOpenLeaderboard,
}: HeaderProps) {
  const isDark = theme === "dark";

  return (
    <header
      id="app-header"
      className={`relative z-20 flex items-center justify-between px-3 py-2.5 sm:px-6 transition-colors duration-200 border-b ${
        isDark
          ? "bg-slate-900/90 border-slate-800 text-slate-100 backdrop-blur-md"
          : "bg-white/90 border-slate-200 text-slate-800 backdrop-blur-md"
      }`}
    >
      {/* Left section: Mobile menu + Logo & App Title */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          id="btn-toggle-sidebar"
          onClick={onToggleSidebar}
          className={`lg:hidden p-2 rounded-lg border transition-colors ${
            isDark
              ? "border-slate-800 hover:bg-slate-800 text-slate-300"
              : "border-slate-200 hover:bg-slate-100 text-slate-700"
          }`}
          aria-label="Buka Navigasi Rangka"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${
              isDark
                ? "bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-cyan-950"
                : "bg-gradient-to-tr from-sky-600 to-blue-600 text-white shadow-sky-100"
            }`}
          >
            <Bone className="w-5 h-5 -rotate-45" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-lg font-bold tracking-tight leading-none">
                3D Skeletal Explorer
              </h1>
              <span
                className={`hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                  isDark
                    ? "bg-cyan-950/80 text-cyan-400 border border-cyan-800/60"
                    : "bg-sky-50 text-sky-700 border border-sky-200"
                }`}
              >
                Biologi SMA/MA
              </span>
            </div>
            <p
              className={`text-xs mt-0.5 hidden sm:block ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {selectedBoneName ? (
                <span className="font-medium text-amber-400 dark:text-amber-400">
                  Fokus: {selectedBoneName}
                </span>
              ) : (
                "Eksplorasi Anatomi Rangka Manusia Interaktif"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Right controls: Quiz, Leaderboard, Voice Assistant, Reset, Help, Theme toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {onOpenQuiz && (
          <button
            id="btn-header-quiz"
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-md shadow-amber-950/20 hover:brightness-110 active:scale-95 transition-all"
            title="Main Kuis Anatomi Rangka Seru"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Kuis Seru</span>
          </button>
        )}

        {onOpenLeaderboard && (
          <button
            id="btn-header-leaderboard"
            onClick={onOpenLeaderboard}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isDark
                ? "bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-amber-400 hover:text-amber-300"
                : "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800"
            }`}
            title="Papan Skor & Peringkat (Leaderboard)"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">Leaderboard</span>
          </button>
        )}

        {onOpenVoiceAssistant && (
          <button
            id="btn-header-voice-assistant"
            onClick={onOpenVoiceAssistant}
            className={`relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isVoiceListening
                ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white border-cyan-300 shadow-md shadow-cyan-500/20 ring-2 ring-cyan-400/40"
                : isDark
                ? "bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-cyan-400 hover:text-cyan-300"
                : "bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700"
            }`}
            title="Asisten Suara: Sebutkan nama tulang untuk langsung menyorotnya"
          >
            <Mic className={`w-3.5 h-3.5 ${isVoiceListening ? "animate-bounce" : ""}`} />
            <span className="hidden sm:inline">
              {isVoiceListening ? "Mendengarkan..." : "Suara"}
            </span>
          </button>
        )}

        <button
          id="btn-header-reset"
          onClick={onResetView}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            isDark
              ? "bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
              : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"
          }`}
          title="Kembalikan Tampilan Rangka ke Posisi Semula"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reset</span>
        </button>

        <button
          id="btn-header-help"
          onClick={onOpenHelp}
          className={`p-2 rounded-lg border transition-all ${
            isDark
              ? "bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
              : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"
          }`}
          title="Petunjuk Interaksi 3D"
        >
          <HelpCircle className="w-4 h-4 text-cyan-500" />
        </button>

        <button
          id="btn-theme-toggle"
          onClick={onToggleTheme}
          className={`p-2 rounded-lg border transition-all ${
            isDark
              ? "bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-amber-400"
              : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"
          }`}
          aria-label={isDark ? "Ganti ke Tema Terang" : "Ganti ke Tema Gelap"}
          title={isDark ? "Mode Terang (Klinis)" : "Mode Gelap (Laboratorium)"}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>
      </div>
    </header>
  );
}
