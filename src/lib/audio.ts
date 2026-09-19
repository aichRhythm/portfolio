// Tiny Web Audio synth for the Off-the-Clock guitar strings.
// Karplus-Strong plucked-string model — no audio files needed.
export type ChordId = "A" | "B" | "C" | "D" | "E" | "F" | "G";

// Standard tuning, low E (index 0) → high e (index 5), in Hz.
const STRING_BASE = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

// Fret position per string (low E → high e); -1 = muted (not played).
// Ordered around the circle of fifths: F (one flat) → B (five sharps).
export const CHORDS: Record<ChordId, { name: string; frets: number[] }> = {
  F: { name: "F major", frets: [1, 3, 3, 2, 1, 1] },
  C: { name: "C major", frets: [-1, 3, 2, 0, 1, 0] },
  G: { name: "G major", frets: [3, 2, 0, 0, 0, 3] },
  D: { name: "D major", frets: [-1, -1, 0, 2, 3, 2] },
  A: { name: "A major", frets: [-1, 0, 2, 2, 2, 0] },
  E: { name: "E major", frets: [0, 2, 2, 1, 0, 0] },
  B: { name: "B major", frets: [-1, 2, 4, 4, 4, 2] },
};

export const CHORD_IDS = Object.keys(CHORDS) as ChordId[];

export function fretFrequency(string: number, fret: number): number {
  return STRING_BASE[string] * Math.pow(2, fret / 12);
}

let ctx: AudioContext | null = null;
let resumePromise: Promise<void> | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

/** Call from a user gesture (e.g. a click) to start/resume audio. */
export function unlockAudio(): boolean {
  const c = getContext();
  if (!c) return false;
  if (c.state === "suspended") resumePromise = c.resume();
  return true;
}

export async function pluckNote(
  frequency: number,
  volume = 0.3,
): Promise<void> {
  const c = getContext();
  if (!c) return;
  // If a resume was requested (a gesture happened) but hasn't finished yet, wait
  // for it so the first strum isn't silent. Hover alone can't unlock (no gesture).
  if (c.state === "suspended") {
    if (!resumePromise) return;
    try {
      await resumePromise;
    } catch {
      return;
    }
  }
  if (c.state !== "running") return;

  const sampleRate = c.sampleRate;
  const period = Math.max(2, Math.floor(sampleRate / frequency));
  const duration = 2.0;
  const length = Math.floor(sampleRate * duration);

  const buffer = c.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  // noise burst seeds the string
  for (let i = 0; i < period && i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  // Karplus-Strong: delay-line feedback with averaging (low-pass).
  // Start at period + 1 so `data[i - period - 1]` never reads data[-1] (NaN).
  const decay = 0.9999;
  for (let i = period + 1; i < length; i++) {
    data[i] = decay * 0.5 * (data[i - period] + data[i - period - 1]);
  }

  const source = c.createBufferSource();
  source.buffer = buffer;

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = Math.min(8000, Math.max(2500, frequency * 8));

  const gain = c.createGain();
  const now = c.currentTime;
  // Linear 2s decay envelope, matching all-guitar-chords.com's playback.
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.01);
  gain.gain.linearRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  source.start();
  source.stop(now + duration + 0.05);
}
