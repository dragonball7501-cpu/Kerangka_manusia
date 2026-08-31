import { useState, useEffect, useRef, useCallback } from "react";
import { matchSpokenCommand, VoiceMatchResult } from "../utils/voiceMatcher";
import { playSuccessChime, playListeningStartTone, speakText } from "../utils/audioFeedback";
import { BoneData, CameraPreset } from "../types/bone";

// Standard TypeScript definitions for Web Speech API
interface SpeechRecognitionEventLike extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognitionLike, ev: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((this: SpeechRecognitionLike, ev: SpeechRecognitionEventLike) => void) | null;
}

interface VoiceAssistantCallbacks {
  onSelectBone: (boneId: string) => void;
  onResetView: () => void;
  onToggleXRay?: () => void;
  onToggleAutoRotate?: () => void;
  onToggleLabels?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onPanUp?: () => void;
  onPanDown?: () => void;
  onSelectPreset?: (preset: CameraPreset) => void;
  onFocusRegion?: (region: "full" | "head" | "torso" | "pelvis" | "legs" | "feet") => void;
}

export interface VoiceAssistantFeedback {
  type: "success" | "info" | "error" | "listening";
  message: string;
  matchedBone?: BoneData;
  matchedAction?: string;
  spokenQuery?: string;
}

export function useVoiceAssistant(callbacks: VoiceAssistantCallbacks) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [transcript, setTranscript] = useState<string>("");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [feedback, setFeedback] = useState<VoiceAssistantFeedback | null>(null);
  const [language, setLanguage] = useState<"id-ID" | "en-US">("id-ID");
  const [enableTtsFeedback, setEnableTtsFeedback] = useState<boolean>(true);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const isManuallyStoppedRef = useRef<boolean>(false);
  const callbacksRef = useRef<VoiceAssistantCallbacks>(callbacks);
  callbacksRef.current = callbacks;

  // Clear feedback after timeout
  const feedbackTimeoutRef = useRef<number | null>(null);
  const setTemporaryFeedback = useCallback((newFeedback: VoiceAssistantFeedback, duration: number = 4000) => {
    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }
    setFeedback(newFeedback);
    if (duration > 0) {
      feedbackTimeoutRef.current = window.setTimeout(() => {
        setFeedback(null);
      }, duration);
    }
  }, []);

  // Process any speech query text (from mic or simulation chip)
  const processSpokenText = useCallback((text: string): boolean => {
    if (!text || !text.trim()) return false;

    const match: VoiceMatchResult | null = matchSpokenCommand(text);

    if (match) {
      playSuccessChime();

      if (match.type === "bone" && match.boneId) {
        callbacksRef.current.onSelectBone(match.boneId);

        const boneName = match.bone?.commonName || match.boneId;
        const latinName = match.bone?.latinName ? ` (${match.bone.latinName})` : "";

        if (enableTtsFeedback) {
          const ttsPhrase = `${match.bone?.latinName || boneName}. ${boneName}`;
          speakText(ttsPhrase, language);
        }

        setTemporaryFeedback({
          type: "success",
          message: `Menemukan: ${boneName}${latinName}`,
          matchedBone: match.bone,
          spokenQuery: text,
        }, 5000);
        return true;
      } else if (match.type === "action" && match.action) {
        switch (match.action) {
          case "reset":
            callbacksRef.current.onResetView();
            break;
          case "xray":
            if (callbacksRef.current.onToggleXRay) callbacksRef.current.onToggleXRay();
            break;
          case "rotate":
            if (callbacksRef.current.onToggleAutoRotate) callbacksRef.current.onToggleAutoRotate();
            break;
          case "labels":
            if (callbacksRef.current.onToggleLabels) callbacksRef.current.onToggleLabels();
            break;
          case "zoom-in":
            if (callbacksRef.current.onZoomIn) callbacksRef.current.onZoomIn();
            break;
          case "zoom-out":
            if (callbacksRef.current.onZoomOut) callbacksRef.current.onZoomOut();
            break;
          case "pan-up":
            if (callbacksRef.current.onPanUp) callbacksRef.current.onPanUp();
            break;
          case "pan-down":
            if (callbacksRef.current.onPanDown) callbacksRef.current.onPanDown();
            break;
          case "region-head":
            if (callbacksRef.current.onFocusRegion) callbacksRef.current.onFocusRegion("head");
            break;
          case "region-torso":
            if (callbacksRef.current.onFocusRegion) callbacksRef.current.onFocusRegion("torso");
            break;
          case "region-pelvis":
            if (callbacksRef.current.onFocusRegion) callbacksRef.current.onFocusRegion("pelvis");
            break;
          case "region-legs":
            if (callbacksRef.current.onFocusRegion) callbacksRef.current.onFocusRegion("legs");
            break;
          case "region-full":
            if (callbacksRef.current.onFocusRegion) callbacksRef.current.onFocusRegion("full");
            break;
        }

        setTemporaryFeedback({
          type: "success",
          message: `Perintah Dijalankan: ${match.matchedTerm}`,
          matchedAction: match.matchedTerm,
          spokenQuery: text,
        }, 4000);
        return true;
      }
    } else {
      setTemporaryFeedback({
        type: "info",
        message: `Suara terdengar: "${text}" (Katakan nama tulang seperti 'Cranium' atau 'Femur')`,
        spokenQuery: text,
      }, 4000);
    }
    return false;
  }, [enableTtsFeedback, language, setTemporaryFeedback]);

  // Check browser SpeechRecognition support on mount
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsSupported(false);
      return;
    }

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListening(true);
        playListeningStartTone();
        setFeedback({
          type: "listening",
          message: "Mendengarkan suara... Ucapkan nama tulang (contoh: 'Cranium', 'Femur', 'Tulang Belikat')",
        });
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let finalStr = "";
        let interimStr = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalStr += item[0].transcript;
          } else {
            interimStr += item[0].transcript;
          }
        }

        if (interimStr) {
          setInterimTranscript(interimStr);
        }

        if (finalStr) {
          const clean = finalStr.trim();
          setTranscript(clean);
          setInterimTranscript("");
          processSpokenText(clean);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setIsListening(false);
          setTemporaryFeedback({
            type: "error",
            message: "Izin mikrofon ditolak. Izinkan akses mikrofon di browser untuk fitur suara.",
          }, 6000);
        } else if (event.error === "no-speech") {
          // Normal timeout when quiet
        } else if (event.error !== "aborted") {
          setTemporaryFeedback({
            type: "info",
            message: `Pemberitahuan audio: ${event.error}`,
          }, 3000);
        }
      };

      recognition.onend = () => {
        if (!isManuallyStoppedRef.current && isListening) {
          // Attempt restart if still in listening mode (continuous voice assistant)
          try {
            recognition.start();
          } catch {
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn("Failed to initialize SpeechRecognition:", err);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
      }
    };
  }, [language, processSpokenText, setTemporaryFeedback]);

  // Start voice listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setTemporaryFeedback({
        type: "error",
        message: "Pengenalan suara tidak didukung oleh peramban ini. Anda dapat menggunakan tombol contoh kata di bawah.",
      }, 5000);
      return;
    }

    isManuallyStoppedRef.current = false;
    try {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
    } catch {
      // If already started, ignore or restart
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current?.start();
        }, 150);
      } catch {
        // Ignore
      }
    }
  }, [language, setTemporaryFeedback]);

  // Stop voice listening
  const stopListening = useCallback(() => {
    isManuallyStoppedRef.current = true;
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }
    setFeedback(null);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Direct simulation / click-to-say tester
  const testVoiceCommand = useCallback((commandText: string) => {
    setTranscript(commandText);
    setInterimTranscript("");
    processSpokenText(commandText);
  }, [processSpokenText]);

  return {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    feedback,
    language,
    setLanguage,
    enableTtsFeedback,
    setEnableTtsFeedback,
    startListening,
    stopListening,
    toggleListening,
    testVoiceCommand,
    clearFeedback: () => setFeedback(null),
  };
}
