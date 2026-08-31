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
      className={`relative z-20 flex items-center justify-between px-3 py-2.5 sm:px-6 transition-colors duration-200 border-b-2 sm:border-b-3 ${
        isDark
          ? "bg-slate-900 border-cyan-400 text-slate-100 shadow-[0_3px_0_0_#06b6d4]"
          : "bg-amber-100/90 border-black text-slate-900 shadow-[0_3px_0_0_#000000]"
      }`}
    >
      {/* Left section: Mobile menu + Logo & App Title */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          id="btn-toggle-sidebar"
          onClick={onToggleSidebar}
          className={`lg:hidden p-2 rounded-lg border-2 font-bold neo-press cursor-pointer ${
            isDark
              ? "border-cyan-400 bg-slate-800 text-cyan-300 neo-shadow-xs"
              : "border-black bg-white text-black neo-shadow-xs"
          }`}
          aria-label="Buka Navigasi Rangka"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border-2 border-black font-extrabold shadow-[2px_2px_0px_#000000] dark:border-cyan-300 dark:shadow-[2px_2px_0px_#06b6d4] ${
              isDark
                ? "bg-cyan-400 text-slate-950"
                : "bg-lime-400 text-black"
            }`}
          >
            <Bone className="w-5 h-5 -rotate-45 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-anton text-base sm:text-xl uppercase tracking-wider leading-none text-slate-950 dark:text-cyan-300">
                3D Skeletal Explorer
              </h1>
              <span
                className={`hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-anton uppercase tracking-wider rounded-md border-2 ${
                  isDark
                    ? "bg-cyan-400 text-slate-950 border-cyan-200 shadow-[1.5px_1.5px_0px_#06b6d4]"
                    : "bg-yellow-300 text-black border-black shadow-[1.5px_1.5px_0px_#000000]"
                }`}
              >
                Biologi SMA
              </span>
            </div>
            <p
              className={`text-xs mt-0.5 font-semibold hidden sm:block ${
                isDark ? "text-slate-300" : "text-slate-800"
              }`}
            >
              {selectedBoneName ? (
                <span className="font-bold text-amber-600 dark:text-amber-300">
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
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide border-2 transition-all neo-press cursor-pointer ${
              isDark
                ? "bg-amber-400 text-slate-950 border-amber-200 shadow-[2px_2px_0px_#d97706]"
                : "bg-amber-300 hover:bg-amber-400 text-black border-black shadow-[2px_2px_0px_#000000]"
            }`}
            title="Main Kuis Anatomi Rangka Seru"
          >
            <BrainCircuit className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden xs:inline sm:inline">Kuis Seru</span>
          </button>
        )}

        {onOpenLeaderboard && (
          <button
            id="btn-header-leaderboard"
            onClick={onOpenLeaderboard}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide border-2 transition-all neo-press cursor-pointer ${
              isDark
                ? "bg-slate-800 border-cyan-400 text-cyan-300 shadow-[2px_2px_0px_#06b6d4]"
                : "bg-yellow-100 hover:bg-yellow-200 border-black text-black shadow-[2px_2px_0px_#000000]"
            }`}
            title="Papan Skor & Peringkat (Leaderboard)"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
            <span className="hidden md:inline">Skor</span>
          </button>
        )}

        {onOpenVoiceAssistant && (
          <button
            id="btn-header-voice-assistant"
            onClick={onOpenVoiceAssistant}
            className={`relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide border-2 transition-all neo-press cursor-pointer ${
              isVoiceListening
                ? "bg-emerald-400 text-black border-black shadow-[2px_2px_0px_#000000] ring-2 ring-emerald-300"
                : isDark
                ? "bg-slate-800 border-cyan-400 text-cyan-300 shadow-[2px_2px_0px_#06b6d4]"
                : "bg-sky-200 hover:bg-sky-300 border-black text-black shadow-[2px_2px_0px_#000000]"
            }`}
            title="Asisten Suara: Sebutkan nama tulang untuk langsung menyorotnya"
          >
            <Mic className={`w-3.5 h-3.5 stroke-[2.5] ${isVoiceListening ? "animate-bounce" : ""}`} />
            <span className="hidden sm:inline">
              {isVoiceListening ? "Mendengarkan..." : "Suara"}
            </span>
          </button>
        )}

        <button
          id="btn-header-reset"
          onClick={onResetView}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide border-2 transition-all neo-press cursor-pointer ${
            isDark
              ? "bg-slate-800 border-cyan-400 text-slate-200 shadow-[2px_2px_0px_#06b6d4]"
              : "bg-white hover:bg-slate-100 border-black text-black shadow-[2px_2px_0px_#000000]"
          }`}
          title="Kembalikan Tampilan Rangka ke Posisi Semula"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden md:inline">Reset</span>
        </button>

        <button
          id="btn-header-help"
          onClick={onOpenHelp}
          className={`p-2 rounded-lg border-2 transition-all neo-press cursor-pointer ${
            isDark
              ? "bg-slate-800 border-cyan-400 text-cyan-300 shadow-[2px_2px_0px_#06b6d4]"
              : "bg-sky-100 hover:bg-sky-200 border-black text-black shadow-[2px_2px_0px_#000000]"
          }`}
          title="Petunjuk Interaksi 3D"
        >
          <HelpCircle className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          id="btn-theme-toggle"
          onClick={onToggleTheme}
          className={`p-2 rounded-lg border-2 transition-all neo-press cursor-pointer ${
            isDark
              ? "bg-amber-400 border-amber-200 text-slate-950 shadow-[2px_2px_0px_#d97706]"
              : "bg-purple-200 hover:bg-purple-300 border-black text-purple-950 shadow-[2px_2px_0px_#000000]"
          }`}
          aria-label={isDark ? "Ganti ke Tema Terang" : "Ganti ke Tema Gelap"}
          title={isDark ? "Mode Terang (Klinis)" : "Mode Gelap (Laboratorium)"}
        >
          {isDark ? <Sun className="w-4 h-4 stroke-[2.5]" /> : <Moon className="w-4 h-4 stroke-[2.5]" />}
        </button>
      </div>
    </header>
  );
}
