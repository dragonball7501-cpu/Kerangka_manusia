import { LeaderboardEntry } from "../types/quiz";
import { calculateRankTier } from "../data/quizQuestions";
import { db } from "../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

const LEADERBOARD_STORAGE_KEY = "skeletal_explorer_leaderboard_v2";
const STUDENT_PROFILE_STORAGE_KEY = "skeletal_explorer_student_profile_v1";
const FIRESTORE_COLLECTION = "leaderboard";

export interface StudentProfile {
  name: string;
  school: string;
  grade: string;
}

export function getStoredStudentProfile(): StudentProfile {
  if (typeof window === "undefined") {
    return { name: "", school: "", grade: "" };
  }
  try {
    const raw = localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        name: typeof parsed.name === "string" ? parsed.name : "",
        school: typeof parsed.school === "string" ? parsed.school : "",
        grade: typeof parsed.grade === "string" ? parsed.grade : "",
      };
    }
  } catch (e) {
    console.warn("Failed to load student profile", e);
  }
  return { name: "", school: "", grade: "" };
}

export function saveStudentProfile(profile: StudentProfile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STUDENT_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn("Failed to save student profile", e);
  }
}

// Fallback & Cache helper
export function getLocalCachedLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((e) => !e.id?.startsWith("init-"))
          .sort((a, b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds);
      }
    }
  } catch (e) {
    console.warn("Failed to load local cached leaderboard", e);
  }

  return [];
}

export function cacheLeaderboardLocally(entries: LeaderboardEntry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event("leaderboard-updated"));
  } catch (e) {
    console.warn("Failed to cache leaderboard locally", e);
  }
}

// Fetch all global leaderboard scores from Firestore with local fallback
export async function fetchGlobalLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const colRef = collection(db, FIRESTORE_COLLECTION);
    const q = query(colRef, orderBy("score", "desc"), limit(100));
    const snapshot = await getDocs(q);

    const remoteEntries: LeaderboardEntry[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      remoteEntries.push({
        id: docSnap.id,
        name: data.name || "Siswa",
        school: data.school || "",
        grade: data.grade || "",
        score: Number(data.score) || 0,
        totalQuestions: Number(data.totalQuestions) || 10,
        correctCount: Number(data.correctCount) || 0,
        timeSpentSeconds: Number(data.timeSpentSeconds) || 0,
        streakRecord: Number(data.streakRecord) || 0,
        timestamp: data.timestamp || new Date().toISOString(),
        rankTier: data.rankTier || calculateRankTier(Number(data.score) || 0, 100),
      });
    });

    // Sort by score desc, then timeSpentSeconds asc
    remoteEntries.sort(
      (a, b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds
    );

    if (remoteEntries.length > 0) {
      cacheLeaderboardLocally(remoteEntries);
      return remoteEntries;
    }
  } catch (error) {
    console.warn("Firestore fetch leaderboard failed, using local cache:", error);
  }

  return getLocalCachedLeaderboard();
}

// Subscribe to real-time updates across all online students
export function subscribeLeaderboard(
  callback: (entries: LeaderboardEntry[]) => void
): Unsubscribe {
  try {
    const colRef = collection(db, FIRESTORE_COLLECTION);
    const q = query(colRef, orderBy("score", "desc"), limit(100));

    return onSnapshot(
      q,
      (snapshot) => {
        const remoteEntries: LeaderboardEntry[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          remoteEntries.push({
            id: docSnap.id,
            name: data.name || "Siswa",
            school: data.school || "",
            grade: data.grade || "",
            score: Number(data.score) || 0,
            totalQuestions: Number(data.totalQuestions) || 10,
            correctCount: Number(data.correctCount) || 0,
            timeSpentSeconds: Number(data.timeSpentSeconds) || 0,
            streakRecord: Number(data.streakRecord) || 0,
            timestamp: data.timestamp || new Date().toISOString(),
            rankTier: data.rankTier || calculateRankTier(Number(data.score) || 0, 100),
          });
        });

        remoteEntries.sort(
          (a, b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds
        );

        cacheLeaderboardLocally(remoteEntries);
        callback(remoteEntries);
      },
      (error) => {
        console.warn("Realtime leaderboard subscription error:", error);
        callback(getLocalCachedLeaderboard());
      }
    );
  } catch (err) {
    console.warn("Could not initiate Firestore subscription:", err);
    callback(getLocalCachedLeaderboard());
    return () => {};
  }
}

// Save score globally to Firestore & locally
export async function saveLeaderboardScore(params: {
  name: string;
  school?: string;
  grade?: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  streakRecord: number;
}): Promise<LeaderboardEntry> {
  const accuracy = Math.round(
    (params.correctCount / Math.max(1, params.totalQuestions)) * 100
  );
  const rankTier = calculateRankTier(params.score, accuracy);

  const cleanName = params.name.trim() || "Anatomi Explorer";
  const cleanSchool = params.school?.trim() || "";
  const cleanGrade = params.grade?.trim() || "";

  // Update profile cache
  saveStudentProfile({
    name: cleanName,
    school: cleanSchool,
    grade: cleanGrade,
  });

  const entryId = "lb-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);

  const newEntry: LeaderboardEntry = {
    id: entryId,
    name: cleanName,
    school: cleanSchool,
    grade: cleanGrade,
    score: Math.round(params.score),
    totalQuestions: params.totalQuestions,
    correctCount: params.correctCount,
    timeSpentSeconds: params.timeSpentSeconds,
    streakRecord: params.streakRecord,
    timestamp: new Date().toISOString(),
    rankTier,
  };

  // 1. Update local cache immediately
  const localList = getLocalCachedLeaderboard();
  const updatedLocal = [newEntry, ...localList]
    .sort((a, b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds)
    .slice(0, 100);
  cacheLeaderboardLocally(updatedLocal);

  // 2. Persist to Firestore Cloud Database
  try {
    const docRef = doc(db, FIRESTORE_COLLECTION, entryId);
    await setDoc(docRef, {
      id: entryId,
      name: newEntry.name,
      school: newEntry.school,
      grade: newEntry.grade,
      score: newEntry.score,
      totalQuestions: newEntry.totalQuestions,
      correctCount: newEntry.correctCount,
      timeSpentSeconds: newEntry.timeSpentSeconds,
      streakRecord: newEntry.streakRecord,
      timestamp: newEntry.timestamp,
      rankTier: newEntry.rankTier,
    });
  } catch (error) {
    console.error("Failed to save score to Firestore Cloud:", error);
  }

  return newEntry;
}

export function resetLeaderboardToDefault(): LeaderboardEntry[] {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify([]));
      window.dispatchEvent(new Event("leaderboard-updated"));
    }
  } catch (e) {
    console.error("Failed to reset local leaderboard", e);
  }
  return [];
}
