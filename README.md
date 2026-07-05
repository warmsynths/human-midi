# Human MIDI Engine

A modular, lightweight middleware frontend component (`<human-panel>`) and engine designed to intercept text-based chord progressions, apply realistic performance humanization, and output expressive parameters to feed into Web MIDI engines. 

It is designed to bridge the gap between mechanical, grid-aligned digital sequencing and the organic micro-timing, velocity variation, and phrasing of a live keyboardist.

---

## Key Features

- **Performance Humanization Middleware**: Applies sub-millisecond micro-timing offsets, natural velocity drift, and realistic note duration variation.
- **Chord Spreading**: Simulates human hands rolling or strumming notes rather than striking them at the exact same millisecond.
- **Built-in Arpeggiator**: Provides dynamic `up`, `down`, `up-down`, and `random` arpeggiation patterns with configurable rhythmic divisions (rates) and octave extensions.
- **Dual-Mode UI Layout**:
  - **Basic Mode**: A single, intuitive "Human Feel" slider that auto-tunes all humanization attributes under the hood.
  - **Advanced Mode**: Granular control over velocity bounds (`minVelocity`/`maxVelocity`), spread, duration, human variance, microtiming, and arpeggiation.
- **Local Persistence**: Automatically stores and resumes the user's parameter configuration using `localStorage`.
- **Customizable Styling**: Entirely styled using CSS custom property tokens, allowing it to seamlessly blend with the host application's design language.

---

## Integrations

The Human MIDI Engine is built to serve as a drop-in modifier panel for music creation apps. It is officially integrated into:

### 🪐 Chord Voyager
In **Chord Voyager**, a space-themed modular chord exploration utility, the `<human-panel>` acts as a sidebar overlay. 
- When users trigger ambient chord progressions, the progression is intercepted by the Human MIDI Engine.
- The engine applies micro-timing delays and velocity offsets to create lush, drifting pad sounds.
- It helps turn digital synths into organic, cinematic soundscapes by breaking up the rigid rhythm.

### 🎹 Circuit Chords
In **Circuit Chords**, a grid-based step sequencer and chord pad application, the engine is used to breathe expression into synth-pop and electronic patterns.
- Chord progressions generated on the grid are piped through the engine's built-in arpeggiator.
- Rhythmic rates (`1/8`, `1/16`, etc.) sync with the host sequencer's master BPM.
- By tweaking the "Human Variance" and "Micro-timing", users can mimic the subtle imperfections of a keyboard player performing live on top of their electronic drum loops.

---

## Installation & Getting Started

### 1. Installation
Include the component in your project. If you are importing the package:
```bash
npm install human-engine
```

Or reference the bundle directly in your HTML:
```html
<script type="module" src="./docs/human-engine.js"></script>
```

### 2. Standard Usage
Declare the custom element in your markup:
```html
<human-panel chord-sequence="Cmaj7 Dm7 G7 Cmaj"></human-panel>
```

Listen for changes and use the state data to configure your MIDI player:
```javascript
const panel = document.querySelector('human-panel');

// Fired whenever any setting or slider changes
panel.addEventListener('human-change', (event) => {
  const { chordSequence, spread, duration, minVelocity, maxVelocity, humanVariance, microTiming, bpm, arpMode, arpRate, arpRange } = event.detail;
  
  console.log('Update MIDI Playback Engine with:', event.detail);
});

// Fired when the preview button is clicked
panel.addEventListener('human-preview', (event) => {
  console.log('Play preview chord progression:', event.detail);
});
```

---

## API Reference

### Properties & Attributes

| Property | Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `heading` | `heading` | `String` | `'Human Engine'` | Title shown at the top of the panel header. |
| `chordSequence` | `chord-sequence` | `String` | `'Cmaj7 Dm7 G7 Cmaj'` | The space-separated list of chords to process. |
| `hideInput` | `hide-input` | `Boolean` | `false` | Hides the chord sequence text field (useful if controlled externally). |
| `spread` | `spread` | `Number` | `0.6` | Strum/spread delay multiplier (0.0 to 2.0). |
| `duration` | `duration` | `Number` | `1.0` | Global note length multiplier (0.1 to 2.0). |
| `minVelocity` | `min-velocity` | `Number` | `60` | Minimum velocity bounds for MIDI notes (0 to 127). |
| `maxVelocity` | `max-velocity` | `Number` | `110` | Maximum velocity bounds for MIDI notes (0 to 127). |
| `humanVariance` | `human-variance` | `Number` | `0.6` | Intensity of random humanization variation (0.0 to 1.0). |
| `microTiming` | `micro-timing` | `Number` | `0.3` | Fine timing offset range in milliseconds (0.0 to 2.0). |
| `bpm` | `bpm` | `Number` | `80` | Current host/project tempo. |
| `arpMode` | `arp-mode` | `String` | `'off'` | Arpeggiation pattern: `'off'`, `'up'`, `'down'`, `'updown'`, `'random'`. |
| `arpRate` | `arp-rate` | `String` | `'1/16'` | Arpeggiator speed: `'1/4'`, `'1/8'`, `'1/16'`, `'1/32'`. |
| `arpRange` | `arp-range` | `Number` | `1` | Number of octaves the arpeggio extends over (1 to 3). |
| `mode` | `mode` | `String` | `'advanced'` | Layout configuration: `'basic'` or `'advanced'`. |
| `humanSlider` | `human-slider` | `Number` | `0.5` | Macro human feel slider used in basic mode. |

---

## Styling Customization

Host applications can override the default colors and layout by providing CSS custom properties to target the `<human-panel>` tag:

```css
human-panel {
  --human-bg: #0f0f15;            /* Main background color */
  --human-surface: #171821;       /* Input backgrounds & headers */
  --human-border: #2b2c3a;        /* Inner boundaries */
  --human-text-primary: #ffffff;  /* Primary labels */
  --human-text-secondary: #8e92b2;/* Detailed hints and instructions */
  --human-accent: #6c5ce7;        /* Sliders, buttons, active elements */
  --human-accent-hover: #8073e9;  /* Hover state for buttons/sliders */
  --human-radius: 8px;            /* Corner rounding */
  --human-font: 'Inter', sans-serif;
}
```
