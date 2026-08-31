import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Trophy,
  Flame,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Medal,
  BrainCircuit,
  User,
  School,
  GraduationCap,
  AlertCircle,
  Edit3,
  Play,
} from "lucide-react";
import { QuizQuestion, QuizState } from "../../types/quiz";
import { QUIZ_QUESTIONS, calculateRankTier } from "../../data/quizQuestions";
import {
  saveLeaderboardScore,
  getStoredStudentProfile,
  saveStudentProfile,
} from "../../utils/leaderboardStorage";
import {
  playCorrectSound,
  playIncorrectSound,
  playFanfareSound,
} from "../../utils/audioFeedback";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLeaderboard: () => void;
  onHighlightBone?: (boneId: string) => void;
  isDark: boolean;
}

export function QuizModal({
  isOpen,
  onClose,
  onOpenLeaderboard,
  onHighlightBone,
  isDark,
}: QuizModalProps) {
  // Student Profile Credentials (required before starting)
  const [playerName, setPlayerName] = useState<string>("");
  const [playerSchool, setPlayerSchool] = useState<string>("");
  const [playerGrade, setPlayerGrade] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  // Game Setup & Progress State
  const [questionCountMode, setQuestionCountMode] = useState<number>(10);
  const [gameState, setGameState] = useState<QuizState>("idle");
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Active Question State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOptionLocked, setIsOptionLocked] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Score & Gameplay Stats
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);

  // Leaderboard Submission status
  const [isSavedToLeaderboard, setIsSavedToLeaderboard] = useState<boolean>(false);

  // Reset or initialize on open and load cached profile
  useEffect(() => {
    if (isOpen) {
      const cached = getStoredStudentProfile();
      if (cached.name && !playerName) setPlayerName(cached.name);
      if (cached.school && !playerSchool) setPlayerSchool(cached.school);
      if (cached.grade && !playerGrade) setPlayerGrade(cached.grade);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState("idle");
      setFormError(null);
    }
  }, [isOpen]);

  // Question Timer Countdown
  useEffect(() => {
    if (gameState === "playing" && !isOptionLocked) {
      setTimeLeft(15);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameState, currentIndex, isOptionLocked]);

  if (!isOpen) return null;

  // Start new game with validation
  const startQuiz = (count: number = questionCountMode) => {
    // Validate required student credentials
    const cleanName = playerName.trim();
    const cleanSchool = playerSchool.trim();
    const cleanGrade = playerGrade.trim();

    if (!cleanName) {
      setFormError("Silakan isi Nama Lengkap terlebih dahulu.");
      return;
    }
    if (!cleanSchool) {
      setFormError("Silakan isi Asal Sekolah Anda.");
      return;
    }
    if (!cleanGrade) {
      setFormError("Silakan isi Kelas berapa Anda saat ini.");
      return;
    }

    setFormError(null);

    // Save profile to localStorage for future quizzes
    saveStudentProfile({
      name: cleanName,
      school: cleanSchool,
      grade: cleanGrade,
    });

    // Shuffle and pick questions
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setIsOptionLocked(false);
    setGameState("playing");
    setStartTime(Date.now());
    setIsSavedToLeaderboard(false);
  };

  // Time expired handler
  const handleTimeExpired = () => {
    if (isOptionLocked) return;
    setIsOptionLocked(true);
    setSelectedOption(-1); // -1 signifies timeout
    setStreak(0);
    playIncorrectSound();
  };

  // Select Option handler
  const handleSelectOption = (idx: number) => {
    if (isOptionLocked) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setIsOptionLocked(true);
    setSelectedOption(idx);

    const currentQ = activeQuestions[currentIndex];
    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      playCorrectSound();

      // Score calculation: Base 100 + Streak bonus + Speed bonus (up to 45 pts)
      const basePoints = 100;
      const streakBonus = streak * 20;
      const speedBonus = Math.max(0, timeLeft * 3);
      const pointsEarned = basePoints + streakBonus + speedBonus;

      setScore((prev) => prev + pointsEarned);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount((prev) => prev + 1);

      if (currentQ.relatedBoneId && onHighlightBone) {
        onHighlightBone(currentQ.relatedBoneId);
      }
    } else {
      playIncorrectSound();
      setStreak(0);
    }
  };

  // Next Question or Finish
  const handleNext = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsOptionLocked(false);
    } else {
      // Finished!
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      setTotalTimeSpent(elapsed);
      setGameState("finished");
      playFanfareSound();

      // Auto save to leaderboard with full student credentials
      saveLeaderboardScore({
        name: playerName.trim() || "Siswa Anatomi",
        school: playerSchool.trim(),
        grade: playerGrade.trim(),
        score,
        totalQuestions: activeQuestions.length,
        correctCount,
        timeSpentSeconds: elapsed,
        streakRecord: maxStreak,
      });
      setIsSavedToLeaderboard(true);
    }
  };

  // Save to Leaderboard manually if edited
  const handleSaveScore = (e: FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || isSavedToLeaderboard) return;

    saveLeaderboardScore({
      name: playerName.trim(),
      school: playerSchool.trim(),
      grade: playerGrade.trim(),
      score,
      totalQuestions: activeQuestions.length,
      correctCount,
      timeSpentSeconds: totalTimeSpent,
      streakRecord: maxStreak,
    });

    setIsSavedToLeaderboard(true);
  };

  const currentQ = activeQuestions[currentIndex];
  const accuracy = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;
  const currentRankTier = calculateRankTier(score, accuracy);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="quiz-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            id="quiz-modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000000] dark:border-cyan-400 dark:shadow-[6px_6px_0px_#06b6d4] overflow-hidden transition-all ${
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
            <div className="w-10 h-10 rounded-xl border-2 border-black bg-lime-400 text-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000]">
              <BrainCircuit className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-anton text-lg sm:text-xl uppercase tracking-wider text-black dark:text-white leading-none">
                  Kuis Anatomi Rangka
                </h2>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-anton uppercase tracking-wider bg-white text-black border border-black shadow-[1px_1px_0px_#000]">
                  Biologi SMA
                </span>
              </div>
              <p className="text-xs font-bold text-black dark:text-slate-200 mt-0.5">
                Uji pemahaman osteologi & catat namamu di Leaderboard
              </p>
            </div>
          </div>

          <button
            id="btn-close-quiz"
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-black bg-white dark:bg-slate-800 dark:border-cyan-400 text-black dark:text-white shadow-[2px_2px_0px_#000] neo-press cursor-pointer"
            aria-label="Tutup Kuis"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body: State-dependent */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {/* STATE 1: IDLE / START SCREEN & REGISTRATION FORM */}
          {gameState === "idle" && (
            <div className="flex flex-col items-center text-center space-y-4 py-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 border-black bg-yellow-400 flex items-center justify-center text-black shadow-[4px_4px_0px_#000] dark:border-cyan-300 dark:shadow-[4px_4px_0px_#06b6d4]">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="font-anton text-xl sm:text-2xl uppercase tracking-wider text-black dark:text-white">
                  Tantangan Kuis Rangka Manusia
                </h3>
                <p className="text-xs sm:text-sm font-bold mt-1 max-w-md text-black dark:text-slate-200">
                  Lengkapi data diri sebelum mulai untuk mencatat nama, asal sekolah, dan kelas Anda di papan skor!
                </p>
              </div>

              {/* STUDENT CREDENTIALS FORM */}
              <div
                className={`w-full max-w-md p-4 rounded-xl border-2 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#06b6d4] text-left space-y-3.5 ${
                  isDark
                    ? "bg-slate-800 border-cyan-400 text-slate-200"
                    : "bg-white border-black text-black"
                }`}
              >
                <div className="flex items-center justify-between border-b-2 pb-2 border-inherit">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black dark:text-cyan-300">
                    <User className="w-4 h-4 stroke-[2.5]" />
                    <span>Identitas Peserta Kuis</span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-yellow-300 text-black border border-black shadow-[1px_1px_0px_#000]">
                    Wajib Diisi
                  </span>
                </div>

                {/* Validation Error Notice */}
                {formError && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-200 border-2 border-black text-rose-950 text-xs font-bold shadow-[2px_2px_0px_#000]">
                    <AlertCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* 1. Nama Lengkap */}
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-wide flex items-center gap-1 text-black dark:text-slate-200">
                    <span>Nama Lengkap:</span>
                    <span className="text-rose-600 font-black">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="input-quiz-name"
                      type="text"
                      value={playerName}
                      onChange={(e) => {
                        setPlayerName(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="Masukkan nama lengkap Anda..."
                      maxLength={32}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs font-bold border-2 outline-none transition-all ${
                        isDark
                          ? "bg-slate-900 border-cyan-400 text-white placeholder-slate-400 focus:bg-slate-800"
                          : "bg-amber-50/50 border-black text-black placeholder-slate-500 focus:bg-white"
                      }`}
                    />
                    <User className="w-4 h-4 absolute left-2.5 top-2.5 text-black dark:text-slate-400 stroke-[2.5]" />
                  </div>
                </div>

                {/* 2. Asal Sekolah */}
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-wide flex items-center gap-1 text-black dark:text-slate-200">
                    <span>Asal Sekolah:</span>
                    <span className="text-rose-600 font-black">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="input-quiz-school"
                      type="text"
                      value={playerSchool}
                      onChange={(e) => {
                        setPlayerSchool(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="Contoh: SMAN 1 Jakarta..."
                      maxLength={40}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs font-bold border-2 outline-none transition-all ${
                        isDark
                          ? "bg-slate-900 border-cyan-400 text-white placeholder-slate-400 focus:bg-slate-800"
                          : "bg-amber-50/50 border-black text-black placeholder-slate-500 focus:bg-white"
                      }`}
                    />
                    <School className="w-4 h-4 absolute left-2.5 top-2.5 text-black dark:text-slate-400 stroke-[2.5]" />
                  </div>
                </div>

                {/* 3. Kelas Berapa */}
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-wide flex items-center gap-1 text-black dark:text-slate-200">
                    <span>Kelas:</span>
                    <span className="text-rose-600 font-black">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="input-quiz-grade"
                      type="text"
                      value={playerGrade}
                      onChange={(e) => {
                        setPlayerGrade(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="Contoh: XI MIPA 2..."
                      maxLength={24}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs font-bold border-2 outline-none transition-all ${
                        isDark
                          ? "bg-slate-900 border-cyan-400 text-white placeholder-slate-400 focus:bg-slate-800"
                          : "bg-amber-50/50 border-black text-black placeholder-slate-500 focus:bg-white"
                      }`}
                    />
                    <GraduationCap className="w-4 h-4 absolute left-2.5 top-2.5 text-black dark:text-slate-400 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Mode Selection */}
              <div className="w-full max-w-md space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-black dark:text-slate-200 block text-left">
                  Pilih Jumlah Soal:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { count: 5, label: "5 Soal", desc: "Kilat" },
                    { count: 10, label: "10 Soal", desc: "Standar" },
                    { count: 15, label: "15 Soal", desc: "Marathon" },
                  ].map((mode) => (
                    <button
                      key={mode.count}
                      onClick={() => setQuestionCountMode(mode.count)}
                      className={`p-2.5 sm:p-3 rounded-xl border-2 text-center transition-all neo-press cursor-pointer ${
                        questionCountMode === mode.count
                          ? isDark
                            ? "bg-cyan-400 text-slate-950 border-cyan-200 shadow-[2px_2px_0px_#06b6d4] font-black"
                            : "bg-yellow-300 text-black border-black shadow-[2px_2px_0px_#000000] font-black"
                          : isDark
                          ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-400 shadow-[1.5px_1.5px_0px_#000]"
                          : "bg-white border-black text-slate-900 hover:bg-yellow-100 shadow-[1.5px_1.5px_0px_#000]"
                      }`}
                    >
                      <div className="font-anton text-xs sm:text-sm uppercase tracking-wide">{mode.label}</div>
                      <div className="text-[10px] font-bold opacity-75">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-md flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  id="btn-start-quiz"
                  onClick={() => startQuiz(questionCountMode)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-anton text-sm sm:text-base uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 border-2 border-black shadow-[3px_3px_0px_#000000] dark:border-cyan-200 dark:shadow-[3px_3px_0px_#06b6d4] neo-press cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current stroke-[2.5]" />
                  <span>Mulai Kuis</span>
                </button>

                <button
                  id="btn-view-leaderboard-from-quiz"
                  onClick={() => {
                    onClose();
                    onOpenLeaderboard();
                  }}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-anton text-xs sm:text-sm uppercase tracking-wider border-2 transition-all neo-press cursor-pointer ${
                    isDark
                      ? "bg-slate-800 border-cyan-400 text-amber-400 shadow-[2px_2px_0px_#06b6d4]"
                      : "bg-yellow-100 border-black text-black shadow-[2px_2px_0px_#000000]"
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                  <span>Papan Skor</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: PLAYING QUESTION SCREEN */}
          {gameState === "playing" && currentQ && (
            <div className="space-y-4">
              {/* Active Student Badge */}
              <div className={`flex items-center justify-between text-xs px-3 py-2 rounded-xl border-2 ${
                isDark ? "bg-slate-800 border-cyan-400" : "bg-yellow-100 border-black"
              }`}>
                <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-200 truncate max-w-[280px]">
                  <User className="w-3.5 h-3.5 text-black dark:text-cyan-400 shrink-0 stroke-[2.5]" />
                  <span className="font-extrabold truncate text-black dark:text-white">{playerName}</span>
                  <span className="text-black dark:text-slate-400">•</span>
                  <span className="font-semibold truncate text-slate-800 dark:text-slate-300">{playerSchool} ({playerGrade})</span>
                </div>
                <div className="font-anton text-xs text-black dark:text-cyan-400 font-bold shrink-0">
                  {currentIndex + 1} / {activeQuestions.length}
                </div>
              </div>

              {/* Question Progress & Live Stats Bar */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-anton uppercase tracking-wide text-xs sm:text-sm text-black dark:text-cyan-400">
                    Soal {currentIndex + 1}
                  </span>
                  <span className="font-bold text-slate-500">/</span>
                  <span className="font-bold text-slate-700 dark:text-slate-400">{activeQuestions.length}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Streak Combo Pill */}
                  {streak > 1 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400 text-black border border-black text-[11px] font-black uppercase shadow-[1px_1px_0px_#000]">
                      <Flame className="w-3.5 h-3.5 text-rose-600 fill-current" />
                      <span>Streak x{streak}!</span>
                    </div>
                  )}

                  {/* Current Score */}
                  <div className="font-anton text-sm sm:text-base text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    {score} PTS
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full border-2 border-black dark:border-cyan-400 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-lime-400 dark:bg-cyan-400 transition-all duration-300"
                  style={{
                    width: `${((currentIndex + (isOptionLocked ? 1 : 0)) / activeQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Timer Bar */}
              <div className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border-2 ${
                isDark ? "bg-slate-800 border-cyan-400" : "bg-white border-black shadow-[2px_2px_0px_#000]"
              }`}>
                <div className="flex items-center gap-2 text-xs">
                  <Clock
                    className={`w-4 h-4 stroke-[2.5] ${
                      timeLeft <= 5 ? "text-rose-500 animate-bounce" : "text-black dark:text-cyan-400"
                    }`}
                  />
                  <span className="font-black uppercase tracking-wide text-slate-900 dark:text-slate-200">Waktu:</span>
                  <span
                    className={`font-anton text-sm ${
                      timeLeft <= 5 ? "text-rose-600 dark:text-rose-400 font-extrabold" : "text-black dark:text-cyan-300"
                    }`}
                  >
                    {timeLeft}S
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-black uppercase bg-purple-200 text-purple-950 border border-black">
                    {currentQ.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-black uppercase bg-yellow-200 text-black border border-black">
                    {currentQ.difficulty}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="py-2">
                <h4 className="text-base sm:text-lg font-extrabold leading-snug text-slate-950 dark:text-white">
                  {currentQ.question}
                </h4>
              </div>

              {/* 4 Options Grid */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  const isWrongSelected = isSelected && !isCorrect;

                  let cardStyle = isDark
                    ? "bg-slate-800 border-slate-700 hover:border-cyan-400 text-slate-100 shadow-[2px_2px_0px_#000]"
                    : "bg-white border-black hover:bg-yellow-50 text-slate-950 shadow-[2px_2px_0px_#000000]";

                  if (isOptionLocked) {
                    if (isCorrect) {
                      cardStyle = isDark
                        ? "bg-emerald-950 border-emerald-400 text-emerald-200 shadow-[3px_3px_0px_#10b981]"
                        : "bg-emerald-200 border-black text-emerald-950 shadow-[3px_3px_0px_#000]";
                    } else if (isWrongSelected) {
                      cardStyle = isDark
                        ? "bg-rose-950 border-rose-400 text-rose-200 shadow-[3px_3px_0px_#f43f5e]"
                        : "bg-rose-200 border-black text-rose-950 shadow-[3px_3px_0px_#000]";
                    } else {
                      cardStyle = "opacity-40 border-slate-400 bg-transparent text-slate-500";
                    }
                  }

                  const optionLetters = ["A", "B", "C", "D"];

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isOptionLocked}
                      className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all neo-press cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center font-anton text-xs shrink-0 ${
                            isOptionLocked && isCorrect
                              ? "bg-emerald-400 text-black"
                              : isOptionLocked && isWrongSelected
                              ? "bg-rose-400 text-black"
                              : isDark
                              ? "bg-cyan-400 text-black"
                              : "bg-yellow-300 text-black"
                          }`}
                        >
                          {optionLetters[idx]}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>

                      {isOptionLocked && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
                      )}
                      {isOptionLocked && isWrongSelected && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 stroke-[2.5]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next button when answered */}
              {isOptionLocked && (
                <div className="pt-2 space-y-3 animate-fadeIn">
                  <div
                    className={`p-3.5 rounded-xl border-2 text-xs space-y-1.5 shadow-[2px_2px_0px_#000] ${
                      selectedOption === currentQ.correctIndex
                        ? isDark
                          ? "bg-emerald-950 border-emerald-400 text-emerald-200"
                          : "bg-emerald-100 border-black text-emerald-950"
                        : isDark
                        ? "bg-rose-950 border-rose-400 text-rose-200"
                        : "bg-rose-100 border-black text-rose-950"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-black uppercase">
                      {selectedOption === currentQ.correctIndex ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                          <span>Jawaban Benar! +Poin ditambahkan</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.5]" />
                          <span>
                            {selectedOption === -1 ? "Waktu Habis!" : "Jawaban Kurang Tepat"}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="font-semibold leading-relaxed text-slate-900 dark:text-slate-200">
                      {currentQ.explanation}
                    </p>
                  </div>

                  <button
                    id="btn-next-question"
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-anton text-sm uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 border-2 border-black shadow-[3px_3px_0px_#000] dark:border-cyan-200 dark:shadow-[3px_3px_0px_#06b6d4] neo-press cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 < activeQuestions.length
                        ? "Lanjut ke Soal Berikutnya"
                        : "Lihat Hasil & Skor Kuis"}
                    </span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STATE 3: FINISHED SCREEN */}
          {gameState === "finished" && (
            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 border-black bg-yellow-400 flex items-center justify-center text-black shadow-[4px_4px_0px_#000] dark:border-cyan-300 dark:shadow-[4px_4px_0px_#06b6d4]">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-md text-xs font-anton uppercase tracking-wider bg-yellow-300 text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000] mb-1">
                  {currentRankTier}
                </span>
                <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-wider text-black dark:text-white">
                  Kuis Selesai!
                </h3>
                <p className="text-xs sm:text-sm font-bold text-black dark:text-slate-200 mt-0.5">
                  Luar biasa, <strong className="text-black dark:text-white">{playerName}</strong>! Kamu telah menyelesaikan tantangan anatomi rangka.
                </p>
              </div>

              {/* Student Identity Card in Results */}
              <div
                className={`w-full p-3.5 rounded-xl border-2 flex items-center justify-between text-xs shadow-[2.5px_2.5px_0px_#000] ${
                  isDark ? "bg-slate-800 border-cyan-400 text-slate-200" : "bg-white border-black text-black"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-yellow-300 text-black border border-black flex items-center justify-center font-bold">
                    <User className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-black text-black dark:text-white truncate">{playerName}</div>
                    <div className="text-[11px] font-bold text-black dark:text-slate-200 truncate">
                      {playerSchool} • {playerGrade}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-black uppercase text-emerald-950 bg-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 px-2 py-1 rounded-md border border-black dark:border-emerald-400 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Tersimpan</span>
                </div>
              </div>

              {/* Score Breakdown Cards */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div
                  className={`p-3 rounded-xl border-2 text-center shadow-[2px_2px_0px_#000] ${
                    isDark ? "bg-slate-800 border-cyan-400" : "bg-amber-100 border-black"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-wider text-black dark:text-slate-200">Total Skor</div>
                  <div className="font-anton text-xl text-amber-700 dark:text-amber-400 mt-0.5">
                    {score}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border-2 text-center shadow-[2px_2px_0px_#000] ${
                    isDark ? "bg-slate-800 border-cyan-400" : "bg-lime-100 border-black"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-wider text-black dark:text-slate-200">Akurasi</div>
                  <div className="font-anton text-xl text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {accuracy}%
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border-2 text-center shadow-[2px_2px_0px_#000] ${
                    isDark ? "bg-slate-800 border-cyan-400" : "bg-orange-100 border-black"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-wider text-black dark:text-slate-200">Max Streak</div>
                  <div className="font-anton text-xl text-orange-700 dark:text-orange-400 mt-0.5">
                    x{maxStreak}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border-2 text-center shadow-[2px_2px_0px_#000] ${
                    isDark ? "bg-slate-800 border-cyan-400" : "bg-sky-100 border-black"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-wider text-black dark:text-slate-200">Waktu</div>
                  <div className="font-anton text-xl text-cyan-700 dark:text-cyan-400 mt-0.5">
                    {totalTimeSpent}S
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  id="btn-play-again"
                  onClick={() => startQuiz(questionCountMode)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-anton text-xs sm:text-sm uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 border-2 border-black shadow-[3px_3px_0px_#000] dark:border-cyan-200 dark:shadow-[3px_3px_0px_#06b6d4] neo-press cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                  <span>Main Kuis Lagi</span>
                </button>

                <button
                  id="btn-open-leaderboard-finished"
                  onClick={() => {
                    onClose();
                    onOpenLeaderboard();
                  }}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-anton text-xs sm:text-sm uppercase tracking-wider border-2 transition-all neo-press cursor-pointer ${
                    isDark
                      ? "bg-slate-800 border-cyan-400 text-amber-400 shadow-[2px_2px_0px_#06b6d4]"
                      : "bg-yellow-200 border-black text-black shadow-[2px_2px_0px_#000000]"
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                  <span>Buka Papan Peringkat</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}

