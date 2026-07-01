import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Encapsulates the entire state configuration for the HumanEngine.
 */
export interface HumanState {
  chordSequence: string;
  spread: number;
  duration: number;
  minVelocity: number;
  maxVelocity: number;
  humanVariance: number;
  microTiming: number;
}

/**
 * <human-panel>
 * A modular frontend sidebar/modal component that acts as a middleware control panel.
 * It intercepts text-based chord progressions, humanizes their attributes, and passes
 * the parsed data down to a host application's Web MIDI engine.
 * 
 * @fires human-change - Fired whenever an input changes. The event detail contains the full `HumanState`.
 */
@customElement('human-panel')
export class HumanPanel extends LitElement {
  static get styles() {
    return css`
    :host {
      /* Theme Tokens - Host applications can override these CSS custom properties */
      --hp-bg: var(--human-bg, #18181b);
      --hp-surface: var(--human-surface, #27272a);
      --hp-border: var(--human-border, #3f3f46);
      --hp-text-primary: var(--human-text-primary, #f4f4f5);
      --hp-text-secondary: var(--human-text-secondary, #a1a1aa);
      --hp-accent: var(--human-accent, #3b82f6);
      --hp-accent-hover: var(--human-accent-hover, #60a5fa);
      --hp-radius: var(--human-radius, 8px);
      --hp-font-family: var(--human-font, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);

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
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .panel-header h2 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .info-toggle-btn {
      background: transparent;
      border: 1px solid var(--hp-border);
      color: var(--hp-text-secondary);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.75rem;
      font-weight: 600;
      transition: all 0.2s;
      padding: 0;
      outline: none;
    }
    .info-toggle-btn:hover {
      color: var(--hp-accent);
      border-color: var(--hp-accent);
    }
    .info-toggle-btn.active {
      background: var(--hp-accent);
      color: #ffffff;
      border-color: var(--hp-accent);
    }

    .panel-subheader {
      padding: 12px 20px;
      background: rgba(0, 0, 0, 0.15);
      border-bottom: 1px solid var(--hp-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .mode-tabs {
      display: flex;
      background: var(--hp-surface);
      padding: 2px;
      border-radius: 6px;
      border: 1px solid var(--hp-border);
    }

    .tab-btn {
      background: transparent;
      border: none;
      color: var(--hp-text-secondary);
      padding: 6px 12px;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: var(--hp-text-primary);
    }

    .tab-btn.active {
      background: var(--hp-accent);
      color: #ffffff;
    }

    .reset-btn {
      background: transparent;
      border: 1px solid var(--hp-border);
      color: var(--hp-text-secondary);
      padding: 6px 12px;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .reset-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--hp-text-primary);
      border-color: var(--hp-text-secondary);
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

    .group-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      border-bottom: 1px solid var(--hp-border);
      padding-bottom: 8px;
      gap: 12px;
    }

    .group-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--hp-text-secondary);
      font-weight: 700;
      margin: 0;
    }

    .group-explanation {
      font-size: 0.7rem;
      color: var(--hp-text-secondary);
      opacity: 0.75;
      font-style: italic;
      font-weight: normal;
    }

    .setting-explanation {
      font-size: 0.72rem;
      color: var(--hp-text-secondary);
      opacity: 0.85;
      line-height: 1.35;
      margin-top: 4px;
      padding-left: 2px;
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
   * Custom heading text displayed at the top of the panel.
   */
  @property({ type: String })
  heading = 'Human Engine';

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
   * Humanized variance (0.0 to 1.0)
   */
  @property({ type: Number })
  humanVariance = 0.5;

  /**
   * Micro-timing variation (0.0 to 1.0)
   */
  @property({ type: Number })
  microTiming = 0.2;

  /**
   * Whether the debug section is expanded.
   */
  @property({ type: Boolean })
  debugExpanded = true;

  /**
   * Whether to show explanations under settings and groups.
   */
  @property({ type: Boolean })
  showInfo = false;

  /**
   * Mode of panel: 'basic' or 'advanced'
   */
  @property({ type: String })
  mode = 'advanced';

  /**
   * Single Human Feel slider for basic mode (0.0 to 1.0)
   */
  @property({ type: Number })
  humanSlider = 0.5;

  connectedCallback() {
    super.connectedCallback();
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('human-panel-state');
      if (saved) {
        const state = JSON.parse(saved);
        if (state.chordSequence !== undefined) this.chordSequence = state.chordSequence;
        if (state.spread !== undefined) this.spread = state.spread;
        if (state.duration !== undefined) this.duration = state.duration;
        if (state.minVelocity !== undefined) this.minVelocity = state.minVelocity;
        if (state.maxVelocity !== undefined) this.maxVelocity = state.maxVelocity;
        if (state.humanVariance !== undefined) this.humanVariance = state.humanVariance;
        if (state.microTiming !== undefined) this.microTiming = state.microTiming;
        if (state.mode !== undefined) this.mode = state.mode;
        if (state.humanSlider !== undefined) this.humanSlider = state.humanSlider;
        if (state.debugExpanded !== undefined) this.debugExpanded = state.debugExpanded;
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    }
  }

  private saveToLocalStorage() {
    try {
      const state = {
        chordSequence: this.chordSequence,
        spread: this.spread,
        duration: this.duration,
        minVelocity: this.minVelocity,
        maxVelocity: this.maxVelocity,
        humanVariance: this.humanVariance,
        microTiming: this.microTiming,
        mode: this.mode,
        humanSlider: this.humanSlider,
        debugExpanded: this.debugExpanded,
      };
      localStorage.setItem('human-panel-state', JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }

  /**
   * Emits the `human-change` custom event with the current state configuration.
   */
  private emitChange() {
    this.saveToLocalStorage();

    const state: HumanState = {
      chordSequence: this.chordSequence,
      spread: this.spread,
      duration: this.duration,
      minVelocity: this.minVelocity,
      maxVelocity: this.maxVelocity,
      humanVariance: this.humanVariance,
      microTiming: this.microTiming,
    };

    this.dispatchEvent(
      new CustomEvent<HumanState>('human-change', {
        detail: state,
        bubbles: true,
        composed: true,
      })
    );
  }

  private toggleInfo() {
    this.showInfo = !this.showInfo;
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
  private handleNumberChange(prop: keyof HumanState, e: Event, isInt = false) {
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

  private handleBasicSliderChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.humanSlider = value;
    
    // Auto-increase human elements
    this.spread = value;
    this.humanVariance = value;
    this.microTiming = value * 0.5;

    this.emitChange();
  }

  private setMode(mode: 'basic' | 'advanced') {
    this.mode = mode;
    if (mode === 'basic') {
      // Sync the basic slider with the average of current advanced settings
      this.humanSlider = (this.spread + this.humanVariance + (this.microTiming / 0.5)) / 3;
      if (this.humanSlider > 1) this.humanSlider = 1;
      if (this.humanSlider < 0) this.humanSlider = 0;
    }
    this.emitChange();
  }

  private handleReset() {
    this.chordSequence = 'Cmaj7 Dm7 G7 Cmaj';
    this.spread = 0.5;
    this.duration = 1.0;
    this.minVelocity = 64;
    this.maxVelocity = 100;
    this.humanVariance = 0.5;
    this.microTiming = 0.2;
    this.mode = 'advanced';
    this.humanSlider = 0.5;
    this.debugExpanded = true;

    this.emitChange();
  }

  /**
   * Emits the `human-preview` event to trigger playback in the host application.
   */
  private handlePreview() {
    const state: HumanState = {
      chordSequence: this.chordSequence,
      spread: this.spread,
      duration: this.duration,
      minVelocity: this.minVelocity,
      maxVelocity: this.maxVelocity,
      humanVariance: this.humanVariance,
      microTiming: this.microTiming,
    };

    this.dispatchEvent(
      new CustomEvent<HumanState>('human-preview', {
        detail: state,
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Toggles the collapsed state of the debug section.
   */
  private toggleDebug() {
    this.debugExpanded = !this.debugExpanded;
    this.saveToLocalStorage();
  }

  render() {
    return html`
      <div class="panel-header">
        <h2>${this.heading}</h2>
        <button 
          class="info-toggle-btn ${this.showInfo ? 'active' : ''}" 
          @click=${this.toggleInfo} 
          title="Toggle explanations"
          aria-label="Toggle explanations"
        >
          ?
        </button>
      </div>

      <div class="panel-subheader">
        <div class="mode-tabs">
          <button 
            class="tab-btn ${this.mode === 'basic' ? 'active' : ''}" 
            @click=${() => this.setMode('basic')}
          >
            Basic
          </button>
          <button 
            class="tab-btn ${this.mode === 'advanced' ? 'active' : ''}" 
            @click=${() => this.setMode('advanced')}
          >
            Advanced
          </button>
        </div>
        <button class="reset-btn" @click=${this.handleReset} title="Reset to default settings">
          Reset
        </button>
      </div>

      <div class="panel-content">
        
        <!-- Section: Debug -->
        <div class="control-group">
          <div class="group-header-row" @click=${this.toggleDebug} style="cursor: pointer; user-select: none;">
            <h3 class="group-title" style="display: flex; align-items: center; gap: 8px;">
              <span>debug</span>
              ${this.showInfo ? html`
                <span class="group-explanation" style="text-transform: none; font-weight: normal;">(test tools)</span>
              ` : ''}
            </h3>
            <span style="font-size: 0.65rem; color: var(--hp-text-secondary);">${this.debugExpanded ? '▼' : '▶'}</span>
          </div>
          
          ${this.debugExpanded ? html`
            ${!this.hideInput ? html`
              <div class="control-row">
                <input 
                  type="text" 
                  .value=${this.chordSequence}
                  @input=${this.handleTextChange}
                  placeholder="e.g. Cmaj7 Dm7 G7 Cmaj"
                  aria-label="Chord Sequence"
                />
                ${this.showInfo ? html`
                  <div class="setting-explanation">Type a space-separated sequence of chords to play and preview.</div>
                ` : ''}
              </div>
            ` : ''}
            
            <div class="control-row">
              <button class="preview-btn" @click=${this.handlePreview} aria-label="Preview Configuration">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Preview
              </button>
              ${this.showInfo ? html`
                <div class="setting-explanation">Triggers immediate chord playback using your humanized settings.</div>
              ` : ''}
            </div>
          ` : ''}
        </div>

        ${this.mode === 'basic' ? html`
          <!-- Section: Basic Controls -->
          <div class="control-group">
            <div class="group-header-row">
              <h3 class="group-title">Basic Controls</h3>
              ${this.showInfo ? html`
                <span class="group-explanation">(macro human feel)</span>
              ` : ''}
            </div>
            
            <!-- Human Feel -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Human Feel</label>
                <span class="control-value">${Math.round(this.humanSlider * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                .value=${this.humanSlider.toString()}
                @input=${this.handleBasicSliderChange}
                aria-label="Human Feel"
              />
              ${this.showInfo ? html`
                <div class="setting-explanation">Adjusts overall human elements (spread, variance, micro-timing) simultaneously.</div>
              ` : ''}
            </div>
          </div>
        ` : html`
          <!-- Section: Chord Gen Group -->
          <div class="control-group">
            <div class="group-header-row">
              <h3 class="group-title">Chord Gen Group</h3>
              ${this.showInfo ? html`
                <span class="group-explanation">(strum & note length)</span>
              ` : ''}
            </div>
            
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
              ${this.showInfo ? html`
                <div class="setting-explanation">Staggers the start times of notes in the chord for an arpeggiated or strummed feel.</div>
              ` : ''}
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
              ${this.showInfo ? html`
                <div class="setting-explanation">Controls the base length of the notes during playback.</div>
              ` : ''}
            </div>
          </div>

          <!-- Section: Dynamics Group -->
          <div class="control-group">
            <div class="group-header-row">
              <h3 class="group-title">Dynamics Group</h3>
              ${this.showInfo ? html`
                <span class="group-explanation">(velocity & randomness)</span>
              ` : ''}
            </div>
            
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
              ${this.showInfo ? html`
                <div class="setting-explanation">The minimum MIDI velocity (volume) for chord notes.</div>
              ` : ''}
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
              ${this.showInfo ? html`
                <div class="setting-explanation">The maximum MIDI velocity (volume) for chord notes.</div>
              ` : ''}
            </div>

            <!-- Human Variance -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Human Variance</label>
                <span class="control-value">${this.humanVariance.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                .value=${this.humanVariance.toString()}
                @input=${(e: Event) => this.handleNumberChange('humanVariance', e)}
                aria-label="Human Variance"
              />
              ${this.showInfo ? html`
                <div class="setting-explanation">Adds subtle random velocity and duration deviations.</div>
              ` : ''}
            </div>
          </div>

          <!-- Section: Timing Grid Group -->
          <div class="control-group">
            <div class="group-header-row">
              <h3 class="group-title">Timing Grid Group</h3>
              ${this.showInfo ? html`
                <span class="group-explanation">(onset timing offsets)</span>
              ` : ''}
            </div>
            
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
              ${this.showInfo ? html`
                <div class="setting-explanation">Shifts note onset times slightly early or late for human feel.</div>
              ` : ''}
            </div>
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'human-panel': HumanPanel;
  }

  interface HTMLElementEventMap {
    'human-change': CustomEvent<HumanState>;
    'human-preview': CustomEvent<HumanState>;
  }
}
