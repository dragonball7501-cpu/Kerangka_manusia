export type QuestionCategory =
  | "Tengkorak & Wajah"
  | "Rangka Aksial"
  | "Rangka Apendikular"
  | "Persendian & Gerak"
  | "Kelainan & Kesehatan Tulang";

export type QuestionDifficulty = "Mudah" | "Sedang" | "Tantangan";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  relatedBoneId?: string;
}

export type RankTier =
  | "Grandmaster Anatomi 👑"
  | "Dokter Spesialis Rangka 🏆"
  | "Ahli Osteologi 🥇"
  | "Peneliti Biologi 🥈"
  | "Calon Dokter 🥉"
  | "Siswa Berprestasi ⭐"
  | "Pembelajar Anatomi 📚";

export interface LeaderboardEntry {
  id: string;
  name: string;
  school?: string;
  grade?: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  streakRecord: number;
  timestamp: string; // ISO date
  rankTier: RankTier;
}

export type QuizState = "idle" | "playing" | "answered" | "finished";
