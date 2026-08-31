import { useState } from "react";
import { Send, Loader2, BrainCircuit, Lightbulb, AlertCircle } from "lucide-react";
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
        className={`p-3 rounded-xl border-2 flex items-start gap-2.5 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#06b6d4] ${
          isDark
            ? "bg-slate-800 border-cyan-400 text-slate-100"
            : "bg-purple-100 border-black text-slate-950"
        }`}
      >
        <div className="p-1.5 rounded-lg bg-purple-500 text-black border-2 border-black font-black shrink-0 shadow-[1px_1px_0px_#000]">
          <BrainCircuit className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div className="text-xs">
          <p className="font-black uppercase tracking-wider text-purple-700 dark:text-cyan-300 flex items-center gap-1.5">
            Pakar Biologi AI (Gemini Thinking)
          </p>
          <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed font-semibold">
            Tanyakan materi mendalam, histologi, atau simulasi soal biologi SMA tentang{" "}
            <span className="font-black underline text-black dark:text-white">{bone.commonName}</span>.
          </p>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
          Rekomendasi Pertanyaan Cepat:
        </span>
        <div className="grid grid-cols-1 gap-1.5">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => handleAsk(prompt)}
              className={`text-left p-2 rounded-lg text-xs font-bold transition-all border-2 neo-press cursor-pointer ${
                isDark
                  ? "bg-slate-800 hover:border-cyan-400 border-slate-700 text-slate-200 shadow-[1.5px_1.5px_0px_#000000]"
                  : "bg-white hover:bg-yellow-100 border-black text-slate-900 shadow-[2px_2px_0px_#000000]"
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
          className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg border-2 outline-none transition-all ${
            isDark
              ? "bg-slate-800 border-cyan-400 text-slate-100 placeholder-slate-400 focus:bg-slate-700 shadow-[2px_2px_0px_#06b6d4]"
              : "bg-white border-black text-slate-900 placeholder-slate-500 focus:bg-yellow-50 shadow-[2px_2px_0px_#000000]"
          }`}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="px-4 py-2 rounded-lg bg-purple-400 hover:bg-purple-500 border-2 border-black disabled:opacity-50 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#000000] dark:border-cyan-200 dark:shadow-[2px_2px_0px_#06b6d4] neo-press cursor-pointer"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5 stroke-[2.5]" />}
          <span>Tanya</span>
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-3 rounded-lg bg-rose-200 border-2 border-black text-rose-950 text-xs font-bold flex items-start gap-2 shadow-[2px_2px_0px_#000000]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-700 stroke-[2.5]" />
          <p>{error}</p>
        </div>
      )}

      {/* Loading Thinking Indicator */}
      {loading && (
        <div
          className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2.5 text-xs text-center shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#06b6d4] ${
            isDark ? "bg-slate-800 border-cyan-400 text-slate-200" : "bg-yellow-100 border-black text-slate-900"
          }`}
        >
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600 dark:text-cyan-400 stroke-[2.5]" />
          </div>
          <div>
            <p className="font-anton uppercase tracking-wider text-sm text-purple-800 dark:text-cyan-300">Gemini sedang menganalisis...</p>
            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-400 mt-0.5">Memformulasikan konsep anatomi & biomekanika</p>
          </div>
        </div>
      )}

      {/* AI Answer Content */}
      {answer && !loading && (
        <div
          className={`p-4 rounded-xl border-2 space-y-2 text-xs leading-relaxed transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#06b6d4] ${
            isDark
              ? "bg-slate-800 border-cyan-400 text-slate-100"
              : "bg-white border-black text-slate-900"
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b-2 border-inherit">
            <div className="flex items-center gap-1.5 font-anton uppercase tracking-wide text-purple-700 dark:text-cyan-300">
              <BrainCircuit className="w-4 h-4 stroke-[2.5]" />
              <span>Penjelasan Anatomi:</span>
            </div>
            <button
              onClick={() => setAnswer(null)}
              className="text-[11px] font-black uppercase text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              Hapus
            </button>
          </div>
          <div className="whitespace-pre-line font-medium leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}
