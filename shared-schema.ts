import type { HumanState } from './human-panel.js';

export interface SharedChord {
  /** Chord symbol (e.g. Cmaj7) */
  symbol: string;
  /** Root note (e.g. C) */
  root: string;
  /** Chord quality (e.g. maj7) */
  quality: string;
  /** Exact MIDI notes array for accurate playback and voicing (e.g. [60, 64, 67, 71]) */
  midiNotes: number[];
  /** Optional inversion index */
  inversion?: number;
}

export interface SharedProgression {
  /** The sequence of chords */
  chords: SharedChord[];
  /** The global tempo */
  bpm: number;
  /** Global time signature */
  timeSignature?: [number, number];
  /** The humanization configuration state */
  humanState?: Partial<HumanState>;
}

/**
 * Encodes the shared progression configuration into a Base64 URL-safe string
 */
export function encodeProgression(state: SharedProgression): string {
  try {
    const jsonStr = JSON.stringify(state);
    // Use btoa and make it URL-safe (replace + with -, / with _, remove =)
    return btoa(jsonStr).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (err) {
    console.error('Failed to encode progression', err);
    return '';
  }
}

/**
 * Decodes a Base64 URL-safe string into a SharedProgression object
 */
export function decodeProgression(encodedUrlSafe: string): SharedProgression | null {
  try {
    // Revert URL-safe replacements
    let b64 = encodedUrlSafe.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with = to make it valid base64
    while (b64.length % 4) {
      b64 += '=';
    }
    const jsonStr = atob(b64);
    return JSON.parse(jsonStr) as SharedProgression;
  } catch (err) {
    console.error('Failed to decode progression', err);
    return null;
  }
}
