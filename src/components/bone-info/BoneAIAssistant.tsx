import { useState } from "react";
import { Sparkles, Send, Loader2, BrainCircuit, Lightbulb, AlertCircle } from "lucide-react";
import { BoneData } from "../../types/bone";

interface BoneAIAssistantProps {
  bone: BoneData;
  isDark: boolean;
}

const QUICK_PROMPTS = [
  "Jelaskan proses osifikasi pembentukan tulang ini!",
  "Mekanisme gerak dan otot antagonis yang bekerja pada tulang ini?",
  "Apa kelainan klinis dan jenis fraktur yang sering terjadi?",
  "Buatkan 2 soal tipe UTBK/SNBT tentang tulang ini beserta pembahasan!",
];

export function BoneAIAssistant({ bone, isDark }: BoneAIAssistantProps) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async (queryText?: string) => {
    const q = queryText || question;
    if (!q.trim() || loading) return;

    setLoading(true);
    setError(null);
    if (!queryText) setQuestion("");

    try {
      const res = await fetch("/api/gemini/ask-anatomy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boneName: bone.commonName,
          boneLatin: bone.latinName,
          group: bone.group,
          question: q,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal menghubungi asisten AI.");
      }
      setAnswer(data.answer);
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat memproses jawaban.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Header Badge */}
      <div
        className={`p-3 rounded-xl border flex items-start gap-2.5 ${
          isDark
            ? "bg-gradient-to-r from-purple-950/40 via-cyan-950/30 to-blue-950/40 border-purple-800/40 text-slate-200"
            : "bg-gradient-to-r from-purple-50 via-sky-50 to-blue-50 border-purple-200 text-slate-800"
        }`}
      >
        <div className="p-1.5 rounded-lg bg-purple-600 text-white shrink-0">
          <BrainCircuit className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <p className="font-semibold text-purple-400 dark:text-purple-300 flex items-center gap-1.5">
            Pakar Biologi AI (Gemini 3.1 Thinking)
          </p>
          <p className="text-slate-400 dark:text-slate-400 mt-0.5 leading-relaxed">
            Tanyakan materi mendalam, mekanisme biomekanik, histologi, atau simulasi soal ujian biologi SMA tentang{" "}
            <span className="font-medium text-slate-200 dark:text-slate-100">{bone.commonName}</span>.
          </p>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" />
          Rekomendasi Pertanyaan Cepat:
        </span>
        <div className="grid grid-cols-1 gap-1.5">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => handleAsk(prompt)}
              className={`text-left p-2 rounded-lg text-xs transition-all border ${
                isDark
                  ? "bg-slate-800/60 hover:bg-slate-700/80 border-slate-700 text-slate-300 hover:text-white"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              • {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder={`Tanyakan tentang ${bone.commonName}...`}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          className={`flex-1 px-3 py-2 text-xs rounded-lg border outline-none transition-all ${
            isDark
              ? "bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-purple-500"
              : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-600"
          }`}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          <span>Tanya</span>
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <p>{error}</p>
        </div>
      )}

      {/* Loading Thinking Indicator */}
      {loading && (
        <div
          className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2.5 text-xs text-center ${
            isDark ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            <Sparkles className="w-3 h-3 text-amber-400 absolute" />
          </div>
          <div>
            <p className="font-semibold text-purple-400">Gemini 3.1 Pro sedang bernalar analitis...</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Memformulasikan konsep anatomi & biomekanika</p>
          </div>
        </div>
      )}

      {/* AI Answer Content */}
      {answer && !loading && (
        <div
          className={`p-4 rounded-xl border space-y-2 text-xs leading-relaxed transition-all ${
            isDark
              ? "bg-slate-800/80 border-slate-700 text-slate-200 shadow-inner"
              : "bg-slate-50 border-slate-200 text-slate-800 shadow-inner"
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-inherit">
            <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Penjelasan Anatomi AI:</span>
            </div>
            <button
              onClick={() => setAnswer(null)}
              className="text-[11px] text-slate-400 hover:text-slate-200 underline"
            >
              Hapus Jawaban
            </button>
          </div>
          <div className="whitespace-pre-line text-slate-300 dark:text-slate-200 prose-sm font-sans">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}
