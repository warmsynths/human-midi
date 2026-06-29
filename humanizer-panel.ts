import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Encapsulates the entire state configuration for the HumanizerEngine.
 */
export interface HumanizerState {
  chordSequence: string;
  spread: number;
  duration: number;
  minVelocity: number;
  maxVelocity: number;
  humanizeVariance: number;
  microTiming: number;
}

/**
 * <humanizer-panel>
 * A modular frontend sidebar/modal component that acts as a middleware control panel.
 * It intercepts text-based chord progressions, humanizes their attributes, and passes
 * the parsed data down to a host application's Web MIDI engine.
 * 
 * @fires humanizer-change - Fired whenever an input changes. The event detail contains the full `HumanizerState`.
 */
@customElement('humanizer-panel')
export class HumanizerPanel extends LitElement {
  static get styles() {
    return css`
    :host {
      /* Theme Tokens - Host applications can override these CSS custom properties */
      --hp-bg: var(--humanizer-bg, #18181b);
      --hp-surface: var(--humanizer-surface, #27272a);
      --hp-border: var(--humanizer-border, #3f3f46);
      --hp-text-primary: var(--humanizer-text-primary, #f4f4f5);
      --hp-text-secondary: var(--humanizer-text-secondary, #a1a1aa);
      --hp-accent: var(--humanizer-accent, #3b82f6);
      --hp-accent-hover: var(--humanizer-accent-hover, #60a5fa);
      --hp-radius: var(--humanizer-radius, 8px);
      --hp-font-family: var(--humanizer-font, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);

      display: block;
      width: 100%;
      min-width: 360px;
      max-width: 400px;
      background: var(--hp-bg);
      color: var(--hp-text-primary);
      font-family: var(--hp-font-family);
      border-radius: var(--hp-radius);
      border: 1px solid var(--hp-border);
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    * {
      box-sizing: border-box;
    }

    .panel-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--hp-border);
      background: var(--hp-surface);
    }

    .panel-header h2 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .panel-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .group-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--hp-text-secondary);
      font-weight: 700;
      margin: 0;
      border-bottom: 1px solid var(--hp-border);
      padding-bottom: 8px;
    }

    .control-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .control-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 0.875rem;
    }

    .control-label {
      color: var(--hp-text-primary);
      font-weight: 500;
    }

    .control-value {
      color: var(--hp-accent);
      font-variant-numeric: tabular-nums;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(59, 130, 246, 0.1); /* Subtle accent bg */
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Text Input Styling */
    input[type="text"] {
      width: 100%;
      background: var(--hp-surface);
      border: 1px solid var(--hp-border);
      color: var(--hp-text-primary);
      padding: 10px 12px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 0.875rem;
      transition: all 0.2s ease-in-out;
    }

    input[type="text"]:focus {
      outline: none;
      border-color: var(--hp-accent);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    input[type="text"]::placeholder {
      color: var(--hp-text-secondary);
      opacity: 0.6;
    }

    /* Range Slider Styling */
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
      padding: 8px 0; /* Increase touch target area */
      cursor: pointer;
    }

    input[type="range"]:focus {
      outline: none;
    }

    /* Webkit Slider Track */
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      background: var(--hp-surface);
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Webkit Slider Thumb */
    input[type="range"]::-webkit-slider-thumb {
      border: 2px solid var(--hp-bg);
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: var(--hp-accent);
      -webkit-appearance: none;
      margin-top: -7px;
      transition: transform 0.1s, background-color 0.2s;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      background: var(--hp-accent-hover);
      transform: scale(1.1);
    }

    input[type="range"]:active::-webkit-slider-thumb {
      transform: scale(0.95);
    }

    /* Firefox Slider Track */
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 4px;
      background: var(--hp-surface);
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Firefox Slider Thumb */
    input[type="range"]::-moz-range-thumb {
      border: 2px solid var(--hp-bg);
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: var(--hp-accent);
      transition: transform 0.1s, background-color 0.2s;
    }

    input[type="range"]::-moz-range-thumb:hover {
      background: var(--hp-accent-hover);
      transform: scale(1.1);
    }

    input[type="range"]:active::-moz-range-thumb {
      transform: scale(0.95);
    }

    /* Button Styling */
    .preview-btn {
      width: 100%;
      background: var(--hp-accent);
      color: #ffffff;
      border: none;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .preview-btn:hover {
      background: var(--hp-accent-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
    }

    .preview-btn:active {
      transform: translateY(1px);
      box-shadow: 0 1px 5px rgba(59, 130, 246, 0.3);
    }

    .preview-btn svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  `;
  }

  /**
   * The current space-separated text string of chord progressions.
   */
  @property({ type: String, attribute: 'chord-sequence' })
  chordSequence = 'Cmaj7 Dm7 G7 Cmaj';

  /**
   * Whether to hide the chord sequence text input (useful when used as a middleware component).
   */
  @property({ type: Boolean })
  hideInput = false;

  /**
   * Spread value (0.0 to 1.0)
   */
  @property({ type: Number })
  spread = 0.5;

  /**
   * Duration value (0.1 to 2.0)
   */
  @property({ type: Number })
  duration = 1.0;

  /**
   * Minimum velocity (0 to 127)
   */
  @property({ type: Number })
  minVelocity = 64;

  /**
   * Maximum velocity (0 to 127)
   */
  @property({ type: Number })
  maxVelocity = 100;

  /**
   * Humanize variance (0.0 to 1.0)
   */
  @property({ type: Number })
  humanizeVariance = 0.5;

  /**
   * Micro-timing variation (0.0 to 1.0)
   */
  @property({ type: Number })
  microTiming = 0.2;

  /**
   * Emits the \`humanizer-change\` custom event with the current state configuration.
   */
  private emitChange() {
    const state: HumanizerState = {
      chordSequence: this.chordSequence,
      spread: this.spread,
      duration: this.duration,
      minVelocity: this.minVelocity,
      maxVelocity: this.maxVelocity,
      humanizeVariance: this.humanizeVariance,
      microTiming: this.microTiming,
    };

    this.dispatchEvent(
      new CustomEvent<HumanizerState>('humanizer-change', {
        detail: state,
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handles changes from the text input field.
   */
  private handleTextChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.chordSequence = input.value;
    this.emitChange();
  }

  /**
   * Handles changes from the range sliders.
   * @param prop - The property name being updated
   * @param e - The input event
   * @param isInt - Whether the value should be parsed as an integer
   */
  private handleNumberChange(prop: keyof HumanizerState, e: Event, isInt = false) {
    const input = e.target as HTMLInputElement;
    const value = isInt ? parseInt(input.value, 10) : parseFloat(input.value);
    
    (this as any)[prop] = value;
    
    // Maintain sensible bounds for min/max velocity
    if (prop === 'minVelocity' && this.minVelocity > this.maxVelocity) {
      this.maxVelocity = this.minVelocity;
    } else if (prop === 'maxVelocity' && this.maxVelocity < this.minVelocity) {
      this.minVelocity = this.maxVelocity;
    }

    this.emitChange();
  }

  /**
   * Emits the \`humanizer-preview\` event to trigger playback in the host application.
   */
  private handlePreview() {
    const state: HumanizerState = {
      chordSequence: this.chordSequence,
      spread: this.spread,
      duration: this.duration,
      minVelocity: this.minVelocity,
      maxVelocity: this.maxVelocity,
      humanizeVariance: this.humanizeVariance,
      microTiming: this.microTiming,
    };

    this.dispatchEvent(
      new CustomEvent<HumanizerState>('humanizer-preview', {
        detail: state,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="panel-header">
        <h2>Humanizer Engine</h2>
      </div>
      <div class="panel-content">
        
        <!-- Section: Chord Input -->
        ${!this.hideInput ? html`
        <div class="control-group">
          <h3 class="group-title">Chord Input</h3>
          <div class="control-row">
            <input 
              type="text" 
              .value=${this.chordSequence}
              @input=${this.handleTextChange}
              placeholder="e.g. Cmaj7 Dm7 G7 Cmaj"
              aria-label="Chord Sequence"
            />
          </div>
        </div>
        ` : ''}

        <!-- Section: Chord Gen Group -->
        <div class="control-group">
          <h3 class="group-title">Chord Gen Group</h3>
          
          <!-- Spread -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Spread</label>
              <span class="control-value">${this.spread.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              .value=${this.spread.toString()}
              @input=${(e: Event) => this.handleNumberChange('spread', e)}
              aria-label="Spread"
            />
          </div>

          <!-- Duration -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Duration</label>
              <span class="control-value">${this.duration.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0.1" max="2.0" step="0.01" 
              .value=${this.duration.toString()}
              @input=${(e: Event) => this.handleNumberChange('duration', e)}
              aria-label="Duration"
            />
          </div>
        </div>

        <!-- Section: Dynamics Group -->
        <div class="control-group">
          <h3 class="group-title">Dynamics Group</h3>
          
          <!-- Min Velocity -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Min Velocity</label>
              <span class="control-value">${this.minVelocity}</span>
            </div>
            <input 
              type="range" 
              min="0" max="127" step="1" 
              .value=${this.minVelocity.toString()}
              @input=${(e: Event) => this.handleNumberChange('minVelocity', e, true)}
              aria-label="Min Velocity"
            />
          </div>

          <!-- Max Velocity -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Max Velocity</label>
              <span class="control-value">${this.maxVelocity}</span>
            </div>
            <input 
              type="range" 
              min="0" max="127" step="1" 
              .value=${this.maxVelocity.toString()}
              @input=${(e: Event) => this.handleNumberChange('maxVelocity', e, true)}
              aria-label="Max Velocity"
            />
          </div>

          <!-- Humanize Variance -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Humanize Variance</label>
              <span class="control-value">${this.humanizeVariance.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              .value=${this.humanizeVariance.toString()}
              @input=${(e: Event) => this.handleNumberChange('humanizeVariance', e)}
              aria-label="Humanize Variance"
            />
          </div>
        </div>

        <!-- Section: Timing Grid Group -->
        <div class="control-group">
          <h3 class="group-title">Timing Grid Group</h3>
          
          <!-- Micro-timing / Variation -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Micro-timing (Variation)</label>
              <span class="control-value">${this.microTiming.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              .value=${this.microTiming.toString()}
              @input=${(e: Event) => this.handleNumberChange('microTiming', e)}
              aria-label="Micro-timing Variation"
            />
          </div>
        </div>

        <button class="preview-btn" @click=${this.handlePreview} aria-label="Preview Configuration">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Preview
        </button>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'humanizer-panel': HumanizerPanel;
  }

  interface HTMLElementEventMap {
    'humanizer-change': CustomEvent<HumanizerState>;
    'humanizer-preview': CustomEvent<HumanizerState>;
  }
}
