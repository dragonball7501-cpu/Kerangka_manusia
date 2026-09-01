import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  X,
  Search,
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
    <AnimatePresence>
      {isOpen && (
        <div
          id="leaderboard-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            id="leaderboard-modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000000] dark:border-cyan-400 dark:shadow-[6px_6px_0px_#06b6d4] overflow-hidden transition-all ${
              isDark
                ? "bg-slate-900 text-slate-100"
                : "bg-amber-50 text-slate-900"
            }`}
          >
        {/* Modal Header */}
        <div
          className={`p-4 sm:p-5 border-b-2 border-inherit flex items-center justify-between shrink-0 ${
            isDark ? "bg-slate-800" : "bg-yellow-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000]">
              <Trophy className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-anton text-lg sm:text-xl uppercase tracking-wider text-black dark:text-white leading-none">
                  Leaderboard Kuis Anatomi
                </h2>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-anton uppercase bg-white text-black border border-black shadow-[1px_1px_0px_#000]">
                  <Cloud className="w-3 h-3 text-cyan-600 stroke-[2.5]" />
                  Top 100 Cloud
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-300 mt-0.5">
                Papan peringkat 100 skor kuis anatomi terbaik siswa SMA/MA se-Indonesia
              </p>
            </div>
          </div>

          <button
            id="btn-close-leaderboard"
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-black bg-white dark:bg-slate-800 text-black dark:text-white shadow-[2px_2px_0px_#000] neo-press cursor-pointer"
            aria-label="Tutup Leaderboard"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Top 3 Podium (If available) */}
        {topThree.length > 0 && (
          <div
            className={`px-3 py-3 sm:px-6 sm:py-4 border-b-2 border-inherit shrink-0 ${
              isDark ? "bg-slate-850" : "bg-yellow-100/60"
            }`}
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-3 items-end">
              {/* #2 Rank (Silver) */}
              {topThree[1] ? (
                <div
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl border-2 shadow-[2px_2px_0px_#000] ${
                    isDark
                      ? "bg-slate-800 border-cyan-400 text-slate-200"
                      : "bg-white border-black text-slate-900"
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-200 text-black border-2 border-black flex items-center justify-center font-anton text-xs shadow-[1px_1px_0px_#000]">
                    2
                  </div>
                  <span className="font-anton text-xs uppercase tracking-wide truncate max-w-full mt-1.5 text-black dark:text-white">
                    {topThree[1].name}
                  </span>
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-cyan-400">
                    {topThree[1].score} pts
                  </span>
                  {topThree[1].school && (
                    <span className="text-[10px] text-slate-700 dark:text-slate-300 font-semibold truncate max-w-full">
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
                  className={`flex flex-col items-center text-center p-3 rounded-xl border-2 border-black -translate-y-1 shadow-[3px_3px_0px_#000] ${
                    isDark
                      ? "bg-amber-400 text-black border-amber-300"
                      : "bg-yellow-300 text-black"
                  }`}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-lime-400 text-black border-2 border-black flex items-center justify-center font-anton text-sm shadow-[2px_2px_0px_#000]">
                    1
                  </div>
                  <span className="font-anton text-xs sm:text-sm uppercase tracking-wide truncate max-w-full mt-1.5 text-black">
                    {topThree[0].name}
                  </span>
                  <span className="text-sm font-mono font-black text-black">
                    {topThree[0].score} pts
                  </span>
                  {topThree[0].school && (
                    <span className="text-[10px] text-black font-bold truncate max-w-full">
                      {topThree[0].school} {topThree[0].grade ? `(${topThree[0].grade})` : ""}
                    </span>
                  )}
                </div>
              )}

              {/* #3 Rank (Bronze) */}
              {topThree[2] ? (
                <div
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl border-2 shadow-[2px_2px_0px_#000] ${
                    isDark
                      ? "bg-slate-800 border-cyan-400 text-slate-200"
                      : "bg-white border-black text-slate-900"
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-200 text-black border-2 border-black flex items-center justify-center font-anton text-xs shadow-[1px_1px_0px_#000]">
                    3
                  </div>
                  <span className="font-anton text-xs uppercase tracking-wide truncate max-w-full mt-1.5 text-black dark:text-white">
                    {topThree[2].name}
                  </span>
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">
                    {topThree[2].score} pts
                  </span>
                  {topThree[2].school && (
                    <span className="text-[10px] text-slate-700 dark:text-slate-300 font-semibold truncate max-w-full">
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
        <div className="p-3 sm:px-5 sm:py-3 border-b-2 border-inherit flex items-center gap-2 shrink-0 bg-yellow-50 dark:bg-slate-800/50">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-300 stroke-[2.5]" />
            <input
              type="text"
              placeholder="Cari nama siswa, asal sekolah, atau kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-semibold border-2 border-black outline-none transition-all ${
                isDark
                  ? "bg-slate-900 border-cyan-400 text-slate-200 placeholder-slate-400 shadow-[2px_2px_0px_#06b6d4]"
                  : "bg-white border-black text-slate-900 placeholder-slate-500 shadow-[2px_2px_0px_#000]"
              }`}
            />
          </div>

          <button
            onClick={handleManualRefresh}
            title="Muat ulang data dari Cloud"
            className="p-2 rounded-xl border-2 border-black bg-white dark:bg-slate-800 text-black dark:text-white shadow-[2px_2px_0px_#000] neo-press cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 stroke-[2.5] ${isLoading ? "animate-spin text-cyan-500" : ""}`} />
          </button>
        </div>

        {/* Scrollable Leaderboard Table */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2 custom-scrollbar">
          {isLoading && entries.length === 0 ? (
            <div className="text-center py-12 text-slate-800 dark:text-slate-300 text-xs space-y-2">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin text-black dark:text-cyan-400" />
              <p className="font-anton uppercase tracking-wide">Menghubungkan ke Cloud Database...</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-slate-800 dark:text-slate-300 text-xs space-y-2">
              <Trophy className="w-10 h-10 mx-auto text-amber-500 stroke-[2.5]" />
              <p className="font-anton uppercase tracking-wide text-sm">
                {searchQuery
                  ? "Tidak ada peserta atau sekolah yang cocok."
                  : "Belum ada riwayat skor kuis di Cloud."}
              </p>
              {!searchQuery && (
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 max-w-xs mx-auto">
                  Jadilah yang pertama menyelesaikan kuis dan catatkan nama serta asal sekolahmu!
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
                  className={`flex items-center justify-between p-3 rounded-xl border-2 shadow-[2px_2px_0px_#000] transition-all ${
                    index === 0
                      ? isDark
                        ? "bg-amber-950/40 border-amber-400 text-slate-100"
                        : "bg-yellow-100 border-black text-slate-900"
                      : isDark
                      ? "bg-slate-800 border-cyan-400/60 text-slate-100"
                      : "bg-white border-black text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div
                      className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center font-anton text-xs shrink-0 shadow-[1px_1px_0px_#000] ${
                        index === 0
                          ? "bg-yellow-300 text-black font-black"
                          : index === 1
                          ? "bg-slate-200 text-black font-bold"
                          : index === 2
                          ? "bg-amber-200 text-black font-bold"
                          : isDark
                          ? "bg-slate-700 text-cyan-300"
                          : "bg-slate-100 text-black"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      {/* Name & Title */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-anton text-xs sm:text-sm uppercase tracking-wide truncate max-w-[150px] sm:max-w-[220px] text-black dark:text-white">
                          {entry.name}
                        </span>
                        {index === 0 && (
                          <span className="text-[10px] font-anton uppercase bg-yellow-300 text-black px-1.5 py-0.5 rounded border border-black">Juara 1</span>
                        )}
                      </div>

                      {/* School & Grade */}
                      {(entry.school || entry.grade) && (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-cyan-300 truncate mt-0.5">
                          {entry.school && (
                            <span className="flex items-center gap-1 truncate max-w-[140px] sm:max-w-[200px]">
                              <School className="w-3 h-3 shrink-0" />
                              {entry.school}
                            </span>
                          )}
                          {entry.school && entry.grade && <span>•</span>}
                          {entry.grade && (
                            <span className="flex items-center gap-1 text-[10px] truncate max-w-[110px] sm:max-w-[160px]">
                              <GraduationCap className="w-3 h-3 shrink-0" />
                              {entry.grade}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stats & Tier */}
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                        <span className="truncate">{entry.rankTier}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                          {entry.correctCount}/{entry.totalQuestions} ({accuracy}%)
                        </span>
                        {entry.timeSpentSeconds && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3 text-slate-600 dark:text-slate-300 stroke-[2.5]" />
                              {entry.timeSpentSeconds}s
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right shrink-0 pl-2">
                    <div className="font-anton text-sm sm:text-base text-black dark:text-amber-400">
                      {entry.score.toLocaleString("id-ID")}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      {formatRelativeTime(entry.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Call-to-Action */}
        <div className="p-3 sm:p-4 border-t-2 border-inherit flex items-center justify-between shrink-0 bg-yellow-100 dark:bg-slate-800">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-300 hidden sm:flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 stroke-[2.5]" />
            <span>Data tersimpan permanen di Cloud Firestore.</span>
          </div>

          <button
            id="btn-play-quiz-from-leaderboard"
            onClick={() => {
              onClose();
              onStartQuiz();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-anton uppercase tracking-wider text-xs sm:text-sm text-black bg-lime-400 hover:bg-lime-300 border-2 border-black shadow-[3px_3px_0px_#000] neo-press transition-all cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 stroke-[2.5]" />
            <span>Main Kuis Sekarang!</span>
          </button>
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}

