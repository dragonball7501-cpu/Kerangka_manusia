import { Mic, MicOff, Volume2, X, CheckCircle2, AlertCircle, BookOpen } from "lucide-react";
import { VoiceAssistantFeedback } from "../../hooks/useVoiceAssistant";

interface VoiceFloatingHUDProps {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  feedback: VoiceAssistantFeedback | null;
  onToggleListening: () => void;
  onOpenVoiceModal: () => void;
  onCloseFeedback: () => void;
  isDark: boolean;
}

export function VoiceFloatingHUD({
  isListening,
  transcript,
  interimTranscript,
  feedback,
  onToggleListening,
  onOpenVoiceModal,
  onCloseFeedback,
  isDark,
}: VoiceFloatingHUDProps) {
  // Only show if listening or if there is active feedback
  if (!isListening && !feedback) {
    return null;
  }

  const currentDisplaySpeech = interimTranscript || transcript;

  return (
    <div
      id="voice-floating-hud"
      className="absolute top-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center max-w-[92vw] sm:max-w-md w-full px-2 pointer-events-auto transition-all animate-fadeIn"
    >
      <div
        className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border-2 border-black dark:border-cyan-400 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#06b6d4] transition-all ${
          feedback?.type === "success"
            ? isDark
              ? "bg-emerald-950 text-emerald-100"
              : "bg-emerald-200 text-emerald-950"
            : feedback?.type === "error"
            ? isDark
              ? "bg-rose-950 text-rose-100"
              : "bg-rose-200 text-rose-950"
            : isListening
            ? isDark
              ? "bg-slate-900 text-slate-100"
              : "bg-yellow-200 text-slate-950"
            : isDark
            ? "bg-slate-900 text-slate-200"
            : "bg-white text-slate-900"
        }`}
      >
        {/* Left: Animated Microphone / Status Icon */}
        <button
          onClick={onToggleListening}
          className={`relative shrink-0 w-9 h-9 rounded-lg border-2 border-black flex items-center justify-center font-bold transition-all neo-press cursor-pointer ${
            isListening
              ? "bg-cyan-400 text-black shadow-[1.5px_1.5px_0px_#000]"
              : isDark
              ? "bg-slate-800 text-cyan-400 border-cyan-400 shadow-[1.5px_1.5px_0px_#06b6d4]"
              : "bg-slate-100 text-black shadow-[1.5px_1.5px_0px_#000]"
          }`}
          title={isListening ? "Hentikan Suara" : "Mulai Suara"}
        >
          {isListening ? (
            <>
              <Mic className="w-4 h-4 z-10 stroke-[2.5]" />
              <span className="absolute inset-0 rounded-lg bg-cyan-400 animate-ping opacity-30" />
            </>
          ) : (
            <MicOff className="w-4 h-4 stroke-[2.5]" />
          )}
        </button>

        {/* Center: Live Text & Status Feedback */}
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={onOpenVoiceModal}
          title="Klik untuk membuka panduan suara lengkap"
        >
          <div className="flex items-center gap-1.5">
            {feedback?.type === "success" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />
            ) : feedback?.type === "error" ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 stroke-[2.5] shrink-0" />
            ) : (
              <div className="flex items-center gap-0.5 shrink-0">
                <span className="w-1.5 h-3 bg-black dark:bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-4 bg-black dark:bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-2.5 bg-black dark:bg-cyan-400 rounded-full animate-bounce" />
              </div>
            )}
            <span className="font-anton text-[11px] uppercase tracking-wider text-black dark:text-cyan-300 truncate">
              {feedback?.type === "success"
                ? "Suara Dikenali"
                : feedback?.type === "error"
                ? "Pemberitahuan"
                : isListening
                ? "Mendengarkan..."
                : "Asisten Suara"}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold truncate leading-tight mt-0.5 text-slate-900 dark:text-slate-100">
            {feedback?.message ||
              (currentDisplaySpeech ? (
                <span className="italic text-black dark:text-cyan-300 font-mono font-black">
                  "{currentDisplaySpeech}"
                </span>
              ) : (
                "Katakan 'Cranium', 'Femur', atau 'Tulang Dada'..."
              ))}
          </p>
        </div>

        {/* Right: Quick actions (Open Guide / Close) */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onOpenVoiceModal}
            className={`p-1.5 rounded-lg border-2 border-black text-xs font-anton uppercase flex items-center gap-1 transition-all neo-press cursor-pointer ${
              isDark
                ? "bg-cyan-400 text-black border-cyan-300 shadow-[1.5px_1.5px_0px_#06b6d4]"
                : "bg-white text-black shadow-[1.5px_1.5px_0px_#000]"
            }`}
            title="Buka panduan & tes suara"
          >
            <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline text-[10px] tracking-wide">Panduan</span>
          </button>

          <button
            onClick={onCloseFeedback}
            className={`p-1.5 rounded-lg border-2 border-black transition-colors neo-press cursor-pointer ${
              isDark
                ? "bg-slate-800 text-slate-200 border-cyan-400 shadow-[1.5px_1.5px_0px_#06b6d4]"
                : "bg-white text-black shadow-[1.5px_1.5px_0px_#000]"
            }`}
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
