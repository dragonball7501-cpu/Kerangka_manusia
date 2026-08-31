import { useState, useEffect } from "react";
import {
  Trophy,
  X,
  Search,
  RotateCcw,
  Sparkles,
  Clock,
  CheckCircle2,
  Gamepad2,
  School,
  GraduationCap,
  Cloud,
  RefreshCw,
} from "lucide-react";
import { LeaderboardEntry } from "../../types/quiz";
import {
  fetchGlobalLeaderboard,
  subscribeLeaderboard,
  resetLeaderboardToDefault,
  getLocalCachedLeaderboard,
} from "../../utils/leaderboardStorage";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
  isDark: boolean;
}

export function LeaderboardModal({
  isOpen,
  onClose,
  onStartQuiz,
  isDark,
}: LeaderboardModalProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(getLocalCachedLeaderboard());
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load and listen to Firestore realtime updates
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    // Initial fetch
    fetchGlobalLeaderboard()
      .then((data) => {
        setEntries(data);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Realtime subscription across all devices
    const unsubscribe = subscribeLeaderboard((updatedList) => {
      setEntries(updatedList);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const query = searchQuery.toLowerCase().trim();
  const filteredEntries = entries.filter((e) => {
    if (!query) return true;
    const nameMatch = e.name.toLowerCase().includes(query);
    const schoolMatch = e.school ? e.school.toLowerCase().includes(query) : false;
    const gradeMatch = e.grade ? e.grade.toLowerCase().includes(query) : false;
    return nameMatch || schoolMatch || gradeMatch;
  });

  const topThree = entries.slice(0, 3);

  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  const handleManualRefresh = async () => {
    setIsLoading(true);
    const data = await fetchGlobalLeaderboard();
    setEntries(data);
    setIsLoading(false);
  };

  return (
    <div
      id="leaderboard-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="leaderboard-modal-content"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? "bg-slate-900/95 border-slate-700 text-slate-100 shadow-amber-950/30"
            : "bg-white/95 border-slate-200 text-slate-800 shadow-amber-100"
        }`}
      >
        {/* Top Gold / Amber Banner */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-inherit flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  Leaderboard Kuis Anatomi
                </h2>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  <Cloud className="w-3 h-3 text-cyan-400" />
                  Cloud Database Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Peringkat skor kuis anatomi rangka beserta asal sekolah & kelas (Tersimpan Online)
              </p>
            </div>
          </div>

          <button
            id="btn-close-leaderboard"
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? "border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white"
                : "border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
            }`}
            aria-label="Tutup Leaderboard"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top 3 Podium (If available) */}
        {topThree.length > 0 && (
          <div
            className={`px-3 py-3 sm:px-6 sm:py-4 border-b border-inherit shrink-0 ${
              isDark ? "bg-slate-950/40" : "bg-amber-50/50"
            }`}
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-3 items-end">
              {/* #2 Rank (Silver) */}
              {topThree[1] ? (
                <div
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl border ${
                    isDark
                      ? "bg-slate-800/60 border-slate-700 text-slate-200"
                      : "bg-white border-slate-200 text-slate-800 shadow-sm"
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-xs shadow-inner">
                    🥈 2
                  </div>
                  <span className="text-xs font-bold truncate max-w-full mt-1">
                    {topThree[1].name}
                  </span>
                  <span className="text-xs font-mono font-bold text-sky-500">
                    {topThree[1].score} pts
                  </span>
                  {topThree[1].school && (
                    <span className="text-[10px] text-slate-400 truncate max-w-full">
                      {topThree[1].school}
                    </span>
                  )}
                </div>
              ) : (
                <div />
              )}

              {/* #1 Rank (Gold) */}
              {topThree[0] && (
                <div
                  className={`flex flex-col items-center text-center p-3 rounded-xl border -translate-y-1 ${
                    isDark
                      ? "bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-500/50 text-amber-200 shadow-md shadow-amber-950/40"
                      : "bg-gradient-to-b from-amber-100 to-white border-amber-300 text-amber-950 shadow-md shadow-amber-200"
                  }`}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-sm shadow-md">
                    👑 1
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold truncate max-w-full mt-1">
                    {topThree[0].name}
                  </span>
                  <span className="text-sm font-mono font-black text-amber-500">
                    {topThree[0].score} pts
                  </span>
                  {topThree[0].school && (
                    <span className="text-[10px] text-amber-400/90 font-medium truncate max-w-full">
                      {topThree[0].school} {topThree[0].grade ? `(${topThree[0].grade})` : ""}
                    </span>
                  )}
                </div>
              )}

              {/* #3 Rank (Bronze) */}
              {topThree[2] ? (
                <div
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl border ${
                    isDark
                      ? "bg-slate-800/60 border-slate-700 text-slate-200"
                      : "bg-white border-slate-200 text-slate-800 shadow-sm"
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-700/60 text-amber-100 flex items-center justify-center font-bold text-xs shadow-inner">
                    🥉 3
                  </div>
                  <span className="text-xs font-bold truncate max-w-full mt-1">
                    {topThree[2].name}
                  </span>
                  <span className="text-xs font-mono font-bold text-orange-500">
                    {topThree[2].score} pts
                  </span>
                  {topThree[2].school && (
                    <span className="text-[10px] text-slate-400 truncate max-w-full">
                      {topThree[2].school}
                    </span>
                  )}
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}

        {/* Search & Actions toolbar */}
        <div className="p-3 sm:px-5 sm:py-3 border-b border-inherit flex items-center gap-2 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama siswa, asal sekolah, atau kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border outline-none transition-all ${
                isDark
                  ? "bg-slate-800/80 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-amber-400"
                  : "bg-slate-100 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-500"
              }`}
            />
          </div>

          <button
            onClick={handleManualRefresh}
            title="Muat ulang data dari Cloud"
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? "border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                : "border-slate-200 hover:bg-slate-100 text-slate-600"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
          </button>
        </div>

        {/* Scrollable Leaderboard Table */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2">
          {isLoading && entries.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs space-y-2">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin text-cyan-400" />
              <p className="font-semibold text-slate-300">Menghubungkan ke Cloud Database...</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs space-y-2">
              <Trophy className="w-10 h-10 mx-auto opacity-30 text-amber-400" />
              <p className="font-semibold text-slate-300">
                {searchQuery
                  ? "Tidak ada peserta atau sekolah yang cocok dengan pencarian."
                  : "Belum ada riwayat skor kuis yang tercatat di Cloud."}
              </p>
              {!searchQuery && (
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Jadilah yang pertama menyelesaikan kuis dan catatkan nama serta asal sekolahmu di papan peringkat global!
                </p>
              )}
            </div>
          ) : (
            filteredEntries.map((entry, index) => {
              const accuracy = Math.round(
                (entry.correctCount / Math.max(1, entry.totalQuestions)) * 100
              );

              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    index === 0
                      ? isDark
                        ? "bg-amber-950/20 border-amber-500/40 text-slate-100"
                        : "bg-amber-50/70 border-amber-200 text-slate-800"
                      : isDark
                      ? "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80"
                      : "bg-white border-slate-200 hover:bg-slate-50 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        index === 0
                          ? "bg-amber-400 text-amber-950 font-black"
                          : index === 1
                          ? "bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold"
                          : index === 2
                          ? "bg-amber-700 text-amber-100 font-bold"
                          : isDark
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      {/* Name & Title */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold truncate max-w-[150px] sm:max-w-[220px]">
                          {entry.name}
                        </span>
                        {index === 0 && (
                          <span className="text-[10px] text-amber-400 font-bold">★ Juara 1</span>
                        )}
                      </div>

                      {/* School & Grade pill if available */}
                      {(entry.school || entry.grade) && (
                        <div className="flex items-center gap-1.5 text-[11px] text-cyan-400/90 font-medium truncate mt-0.5">
                          {entry.school && (
                            <span className="flex items-center gap-1 truncate max-w-[140px] sm:max-w-[200px]">
                              <School className="w-3 h-3 text-cyan-500 shrink-0" />
                              {entry.school}
                            </span>
                          )}
                          {entry.school && entry.grade && <span className="text-slate-600">•</span>}
                          {entry.grade && (
                            <span className="flex items-center gap-1 text-slate-400 text-[10px] truncate max-w-[110px] sm:max-w-[160px]">
                              <GraduationCap className="w-3 h-3 shrink-0" />
                              {entry.grade}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stats & Tier */}
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 mt-1">
                        <span className="truncate">{entry.rankTier}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {entry.correctCount}/{entry.totalQuestions} ({accuracy}%)
                        </span>
                        {entry.timeSpentSeconds && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {entry.timeSpentSeconds}s
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right shrink-0 pl-2">
                    <div className="text-sm sm:text-base font-black font-mono text-amber-500">
                      {entry.score.toLocaleString("id-ID")}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {formatRelativeTime(entry.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Call-to-Action */}
        <div className="p-3 sm:p-4 border-t border-inherit flex items-center justify-between shrink-0 bg-slate-950/20">
          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>Data tersimpan permanen di Cloud Firestore.</span>
          </div>

          <button
            id="btn-play-quiz-from-leaderboard"
            onClick={() => {
              onClose();
              onStartQuiz();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-md shadow-amber-950/30 hover:brightness-110 active:scale-98 transition-all"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Main Kuis Sekarang!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
