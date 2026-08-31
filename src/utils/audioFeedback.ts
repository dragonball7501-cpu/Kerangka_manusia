// Web Audio API & Speech Synthesis Feedback Utility

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (typeof window !== "undefined") {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        if (!audioCtx || audioCtx.state === "closed") {
          audioCtx = new AudioCtxClass();
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }
        return audioCtx;
      }
    }
  } catch (err) {
    console.warn("AudioContext not supported or blocked", err);
  }
  return null;
}

/**
 * Plays a soft, harmonic ascending chime indicating voice command success
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    // C5 (523.25Hz) to E5 (659.25Hz) sweet chord
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(523.25, now);
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1046.5, now + 0.08); // C6 sparkle

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.35);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);
  } catch {
    // Audio playback failed silently
  }
}

/**
 * Plays an upbeat positive double-tone for correct quiz answer
 */
export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Quick ascending major arpeggio G5 -> C6
    osc.frequency.setValueAtTime(783.99, now); // G5
    osc.frequency.setValueAtTime(1046.5, now + 0.08); // C6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch {
    // Audio error ignore
  }
}

/**
 * Plays a gentle, short buzzer for incorrect quiz answer
 */
export function playIncorrectSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.setValueAtTime(164.81, now + 0.09); // E3

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  } catch {
    // Audio error ignore
  }
}

/**
 * Plays a triumphant celebratory fanfare melody when finishing quiz
 */
export function playFanfareSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 523.25, t: 0, d: 0.1 },      // C5
      { f: 659.25, t: 0.1, d: 0.1 },    // E5
      { f: 783.99, t: 0.2, d: 0.12 },   // G5
      { f: 1046.5, t: 0.32, d: 0.35 },  // C6 (held)
    ];

    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0.001, now + n.t);
      gain.gain.linearRampToValueAtTime(0.14, now + n.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  } catch {
    // Audio error ignore
  }
}

/**
 * Plays a low double tap when voice listening starts
 */
export function playListeningStartTone() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch {
    // Ignore audio errors
  }
}

/**
 * Speaks text using browser SpeechSynthesis (TTS)
 */
export function speakText(text: string, lang: string = "id-ID") {
  try {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop prior speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  } catch (err) {
    console.warn("SpeechSynthesis error:", err);
  }
}

export function stopSpeaking() {
  try {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // Ignore
  }
}
