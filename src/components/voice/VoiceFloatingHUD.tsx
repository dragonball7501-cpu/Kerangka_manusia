import { Mic, MicOff, Volume2, Sparkles, X, CheckCircle2, AlertCircle } from "lucide-react";
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
        className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all ${
          feedback?.type === "success"
            ? isDark
              ? "bg-emerald-950/90 border-emerald-500/60 text-emerald-100 shadow-emerald-950/50 ring-1 ring-emerald-500/30"
              : "bg-emerald-50/95 border-emerald-300 text-emerald-900 shadow-emerald-100 ring-1 ring-emerald-400"
            : feedback?.type === "error"
            ? isDark
              ? "bg-rose-950/90 border-rose-500/60 text-rose-100 shadow-rose-950/50"
              : "bg-rose-50/95 border-rose-300 text-rose-900 shadow-rose-100"
            : isListening
            ? isDark
              ? "bg-slate-900/90 border-cyan-500/50 text-slate-100 shadow-cyan-950/60 ring-1 ring-cyan-500/40"
              : "bg-white/95 border-cyan-400 text-slate-800 shadow-sky-100 ring-1 ring-cyan-400"
            : isDark
            ? "bg-slate-900/90 border-slate-700 text-slate-200"
            : "bg-white/95 border-slate-200 text-slate-800"
        }`}
      >
        {/* Left: Animated Microphone / Status Icon */}
        <button
          onClick={onToggleListening}
          className={`relative shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all active:scale-95 ${
            isListening
              ? "bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30"
              : isDark
              ? "bg-slate-800 text-slate-400 hover:text-white"
              : "bg-slate-100 text-slate-600 hover:text-slate-900"
          }`}
          title={isListening ? "Hentikan Suara" : "Mulai Suara"}
        >
          {isListening ? (
            <>
              <Mic className="w-4 h-4 z-10" />
              <span className="absolute inset-0 rounded-xl bg-cyan-400 animate-ping opacity-30" />
            </>
          ) : (
            <MicOff className="w-4 h-4" />
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
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : feedback?.type === "error" ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            ) : (
              <div className="flex items-center gap-0.5 shrink-0">
                <span className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-4 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
              </div>
            )}
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-75 truncate">
              {feedback?.type === "success"
                ? "Suara Dikenali"
                : feedback?.type === "error"
                ? "Pemberitahuan"
                : isListening
                ? "Mendengarkan..."
                : "Asisten Suara"}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold truncate leading-tight mt-0.5">
            {feedback?.message ||
              (currentDisplaySpeech ? (
                <span className="italic text-cyan-400 font-mono">
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
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              isDark
                ? "bg-slate-800/80 hover:bg-slate-700 text-cyan-300"
                : "bg-slate-100 hover:bg-slate-200 text-sky-700"
            }`}
            title="Buka panduan & tes suara"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Panduan</span>
          </button>

          <button
            onClick={onCloseFeedback}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                : "hover:bg-slate-200 text-slate-500 hover:text-slate-800"
            }`}
            title="Tutup Notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
