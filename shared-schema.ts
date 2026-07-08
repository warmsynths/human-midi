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

export interface ChordOption {
  label: string;
  value: string;
}

export const CHORD_CORES: ChordOption[] = [
  { label: 'Major', value: 'maj' },
  { label: 'Minor', value: 'm' },
  { label: 'Suspended (Sus)', value: 'sus4' },
  { label: 'Diminished', value: 'dim' }
];

export const CHORD_MODIFIERS: ChordOption[] = [
  { label: 'None', value: '' },
  { label: '6th', value: '6' },
  { label: '7th (dom / m7)', value: '7' },
  { label: 'Major 7th (M7)', value: 'maj7' },
  { label: '9th', value: '9' }
];

/**
 * Resolves a core and modifier to a Tonal.js compatible chord suffix.
 */
export function getChordSuffix(core: string, modifier: string): string {
  if (core === 'maj') {
    if (modifier === '') return '';
    if (modifier === '6') return '6';
    if (modifier === '7') return '7'; // Dominant 7
    if (modifier === 'maj7') return 'maj7';
    if (modifier === '9') return '9'; // Dominant 9
  }
  if (core === 'm') {
    if (modifier === '') return 'm';
    if (modifier === '6') return 'm6';
    if (modifier === '7') return 'm7'; // Minor 7
    if (modifier === 'maj7') return 'mM7'; // Minor Major 7
    if (modifier === '9') return 'm9'; // Minor 9
  }
  if (core === 'sus4') {
    if (modifier === '') return 'sus4';
    if (modifier === '6') return '6sus4'; // uncommon but supported by tonal
    if (modifier === '7') return '7sus4';
    if (modifier === 'maj7') return 'maj7sus4'; // uncommon
    if (modifier === '9') return '9sus4'; // suspended 9th
  }
  if (core === 'dim') {
    if (modifier === '') return 'dim';
    if (modifier === '6') return 'dim6';
    if (modifier === '7') return 'm7b5'; // Half-diminished
    if (modifier === 'maj7') return 'dimMaj7';
    if (modifier === '9') return 'dim9'; // usually dim7(add 9) but dim9 works in tonal
  }
  return core + modifier;
}
