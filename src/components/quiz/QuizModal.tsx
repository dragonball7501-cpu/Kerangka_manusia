import { useState, useEffect, useRef, FormEvent } from "react";
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
    <div
      id="quiz-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="quiz-modal-content"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? "bg-slate-900/95 border-slate-700 text-slate-100 shadow-cyan-950/40"
            : "bg-white/95 border-slate-200 text-slate-800 shadow-sky-100"
        }`}
      >
        {/* Top Gradient Ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-inherit flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-600/30">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  Kuis Anatomi Rangka
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  Biologi SMA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Uji pemahaman osteologi & catat namamu di Leaderboard sekolah
              </p>
            </div>
          </div>

          <button
            id="btn-close-quiz"
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? "border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white"
                : "border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
            }`}
            aria-label="Tutup Kuis"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: State-dependent */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* STATE 1: IDLE / START SCREEN & REGISTRATION FORM */}
          {gameState === "idle" && (
            <div className="flex flex-col items-center text-center space-y-4 py-1">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-cyan-500 text-white border-2 border-slate-900 shadow">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Tantangan Kuis Rangka Manusia
                </h3>
                <p
                  className={`text-xs sm:text-sm mt-1 max-w-md ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Lengkapi data diri sebelum mulai untuk mencatat nama, asal sekolah, dan kelas Anda di papan skor!
                </p>
              </div>

              {/* STUDENT CREDENTIALS FORM */}
              <div
                className={`w-full max-w-md p-4 rounded-xl border text-left space-y-3.5 shadow-sm ${
                  isDark
                    ? "bg-slate-800/60 border-slate-700/80 text-slate-200"
                    : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2 border-inherit">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>Identitas Peserta Kuis</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Wajib Diisi</span>
                </div>

                {/* Validation Error Notice */}
                {formError && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* 1. Nama Lengkap */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold flex items-center gap-1 text-slate-300">
                    <span>Nama Lengkap:</span>
                    <span className="text-rose-400">*</span>
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
                      maxLength={32}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                        isDark
                          ? "bg-slate-900/90 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      }`}
                    />
                    <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                {/* 2. Asal Sekolah */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold flex items-center gap-1 text-slate-300">
                    <span>Asal Sekolah:</span>
                    <span className="text-rose-400">*</span>
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
                      maxLength={40}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                        isDark
                          ? "bg-slate-900/90 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      }`}
                    />
                    <School className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                {/* 3. Kelas Berapa */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold flex items-center gap-1 text-slate-300">
                    <span>Kelas:</span>
                    <span className="text-rose-400">*</span>
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
                      maxLength={24}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                        isDark
                          ? "bg-slate-900/90 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      }`}
                    />
                    <GraduationCap className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Mode Selection */}
              <div className="w-full max-w-md space-y-2">
                <label className="text-xs font-semibold text-slate-400 block text-left">
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
                      className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                        questionCountMode === mode.count
                          ? "bg-cyan-500/15 border-cyan-400 text-cyan-400 ring-2 ring-cyan-500/30 font-bold"
                          : isDark
                          ? "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{mode.label}</div>
                      <div className="text-[10px] text-slate-400">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-md flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  id="btn-start-quiz"
                  onClick={() => startQuiz(questionCountMode)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 shadow-lg shadow-cyan-950/40 hover:brightness-110 active:scale-98 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Mulai Kerjakan Kuis</span>
                </button>

                <button
                  id="btn-view-leaderboard-from-quiz"
                  onClick={() => {
                    onClose();
                    onOpenLeaderboard();
                  }}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs border transition-all ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                      : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Papan Skor</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: PLAYING QUESTION SCREEN */}
          {gameState === "playing" && currentQ && (
            <div className="space-y-4">
              {/* Active Student Badge */}
              <div className="flex items-center justify-between text-xs px-1">
                <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[280px]">
                  <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-bold text-slate-200 truncate">{playerName}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 truncate">{playerSchool} ({playerGrade})</span>
                </div>
                <div className="text-[11px] font-mono text-cyan-400 font-bold shrink-0">
                  {currentIndex + 1} / {activeQuestions.length}
                </div>
              </div>

              {/* Question Progress & Live Stats Bar */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400">
                    Soal {currentIndex + 1}
                  </span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-400">{activeQuestions.length}</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Streak Combo Pill */}
                  {streak > 1 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-extrabold animate-pulse">
                      <Flame className="w-3.5 h-3.5 text-orange-500 fill-current" />
                      <span>Streak x{streak}!</span>
                    </div>
                  )}

                  {/* Current Score */}
                  <div className="font-mono font-bold text-sm text-amber-400">
                    {score} pts
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-700/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
                  style={{
                    width: `${((currentIndex + (isOptionLocked ? 1 : 0)) / activeQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Timer Bar */}
              <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl border bg-slate-800/30 border-slate-700/50">
                <div className="flex items-center gap-2 text-xs">
                  <Clock
                    className={`w-4 h-4 ${
                      timeLeft <= 5 ? "text-rose-500 animate-bounce" : "text-cyan-400"
                    }`}
                  />
                  <span className="font-medium text-slate-300">Waktu:</span>
                  <span
                    className={`font-mono font-bold ${
                      timeLeft <= 5 ? "text-rose-400 font-extrabold" : "text-cyan-300"
                    }`}
                  >
                    {timeLeft}s
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {currentQ.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-slate-700/60 text-slate-300">
                    {currentQ.difficulty}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="py-2">
                <h4 className="text-base sm:text-lg font-bold leading-snug">
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
                    ? "bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/60 text-slate-200"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-sky-300 text-slate-800";

                  if (isOptionLocked) {
                    if (isCorrect) {
                      cardStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-2 ring-emerald-500/40";
                    } else if (isWrongSelected) {
                      cardStyle = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold ring-2 ring-rose-500/40";
                    } else {
                      cardStyle = "opacity-40 border-slate-700/40 bg-transparent";
                    }
                  }

                  const optionLetters = ["A", "B", "C", "D"];

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isOptionLocked}
                      className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all active:scale-99 ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            isOptionLocked && isCorrect
                              ? "bg-emerald-500 text-white"
                              : isOptionLocked && isWrongSelected
                              ? "bg-rose-500 text-white"
                              : isDark
                              ? "bg-slate-700 text-slate-300"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {optionLetters[idx]}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isOptionLocked && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isOptionLocked && isWrongSelected && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next button when answered */}
              {isOptionLocked && (
                <div className="pt-2 space-y-3 animate-fadeIn">
                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      selectedOption === currentQ.correctIndex
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                        : "bg-rose-950/20 border-rose-500/30 text-rose-200"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      {selectedOption === currentQ.correctIndex ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Jawaban Benar! +Poin ditambahkan</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span className="text-rose-400">
                            {selectedOption === -1 ? "Waktu Habis!" : "Jawaban Kurang Tepat"}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>

                  <button
                    id="btn-next-question"
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 shadow-lg shadow-cyan-950/40 hover:brightness-110 active:scale-98 transition-all"
                  >
                    <span>
                      {currentIndex + 1 < activeQuestions.length
                        ? "Lanjut ke Soal Berikutnya"
                        : "Lihat Hasil & Skor Kuis"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STATE 3: FINISHED SCREEN */}
          {gameState === "finished" && (
            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/30 animate-bounce">
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="absolute -top-1 -right-1 p-1 rounded-full bg-emerald-500 text-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-1">
                  {currentRankTier}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Kuis Selesai!
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Luar biasa, <strong>{playerName}</strong>! Kamu telah menyelesaikan tantangan anatomi rangka.
                </p>
              </div>

              {/* Student Identity Card in Results */}
              <div
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs ${
                  isDark ? "bg-slate-800/50 border-slate-700/60 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-bold text-slate-100 truncate">{playerName}</div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {playerSchool} • {playerGrade}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tersimpan di Leaderboard</span>
                </div>
              </div>

              {/* Score Breakdown Cards */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div
                  className={`p-3 rounded-xl border text-center ${
                    isDark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="text-[11px] text-slate-400">Total Skor</div>
                  <div className="text-lg font-black font-mono text-amber-400 mt-0.5">
                    {score}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border text-center ${
                    isDark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="text-[11px] text-slate-400">Akurasi</div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">
                    {accuracy}%
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border text-center ${
                    isDark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="text-[11px] text-slate-400">Max Streak</div>
                  <div className="text-lg font-black text-orange-400 mt-0.5">
                    🔥 x{maxStreak}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border text-center ${
                    isDark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="text-[11px] text-slate-400">Waktu</div>
                  <div className="text-lg font-black font-mono text-cyan-400 mt-0.5">
                    {totalTimeSpent}s
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  id="btn-play-again"
                  onClick={() => startQuiz(questionCountMode)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 shadow hover:brightness-110 active:scale-98 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Kuis Lagi</span>
                </button>

                <button
                  id="btn-open-leaderboard-finished"
                  onClick={() => {
                    onClose();
                    onOpenLeaderboard();
                  }}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs border transition-all ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                      : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Buka Papan Peringkat</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
