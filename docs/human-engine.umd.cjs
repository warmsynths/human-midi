(function(e,t){typeof exports==`object`&&typeof module<`u`?t(exports,require("lit"),require("lit/decorators.js")):typeof define==`function`&&define.amd?define([`exports`,`lit`,`lit/decorators.js`],t):(e=typeof globalThis<`u`?globalThis:e||self,t(e.HumanEngine={},e.lit,e.lit.decorators))})(this,function(e,t,n){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});function r(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var i=class extends t.LitElement{constructor(...e){super(...e),this.heading=`Human Engine`,this.chordSequence=`Cmaj7 Dm7 G7 Cmaj`,this.hideInput=!1,this.spread=.5,this.duration=1,this.minVelocity=64,this.maxVelocity=100,this.humanVariance=.5,this.microTiming=.2,this.debugExpanded=!0,this.showInfo=!1}static get styles(){return t.css`
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
  `}emitChange(){let e={chordSequence:this.chordSequence,spread:this.spread,duration:this.duration,minVelocity:this.minVelocity,maxVelocity:this.maxVelocity,humanVariance:this.humanVariance,microTiming:this.microTiming};this.dispatchEvent(new CustomEvent(`human-change`,{detail:e,bubbles:!0,composed:!0}))}toggleInfo(){this.showInfo=!this.showInfo}handleTextChange(e){let t=e.target;this.chordSequence=t.value,this.emitChange()}handleNumberChange(e,t,n=!1){let r=t.target,i=n?parseInt(r.value,10):parseFloat(r.value);this[e]=i,e===`minVelocity`&&this.minVelocity>this.maxVelocity?this.maxVelocity=this.minVelocity:e===`maxVelocity`&&this.maxVelocity<this.minVelocity&&(this.minVelocity=this.maxVelocity),this.emitChange()}handlePreview(){let e={chordSequence:this.chordSequence,spread:this.spread,duration:this.duration,minVelocity:this.minVelocity,maxVelocity:this.maxVelocity,humanVariance:this.humanVariance,microTiming:this.microTiming};this.dispatchEvent(new CustomEvent(`human-preview`,{detail:e,bubbles:!0,composed:!0}))}toggleDebug(){this.debugExpanded=!this.debugExpanded}render(){return t.html`
      <div class="panel-header">
        <h2>${this.heading}</h2>
        <button 
          class="info-toggle-btn ${this.showInfo?`active`:``}" 
          @click=${this.toggleInfo} 
          title="Toggle explanations"
          aria-label="Toggle explanations"
        >
          ?
        </button>
      </div>
      <div class="panel-content">
        
        <!-- Section: Debug -->
        <div class="control-group">
          <div class="group-header-row" @click=${this.toggleDebug} style="cursor: pointer; user-select: none;">
            <h3 class="group-title" style="display: flex; align-items: center; gap: 8px;">
              <span>debug</span>
              ${this.showInfo?t.html`
                <span class="group-explanation" style="text-transform: none; font-weight: normal;">(test tools)</span>
              `:``}
            </h3>
            <span style="font-size: 0.65rem; color: var(--hp-text-secondary);">${this.debugExpanded?`▼`:`▶`}</span>
          </div>
          
          ${this.debugExpanded?t.html`
            ${this.hideInput?``:t.html`
              <div class="control-row">
                <input 
                  type="text" 
                  .value=${this.chordSequence}
                  @input=${this.handleTextChange}
                  placeholder="e.g. Cmaj7 Dm7 G7 Cmaj"
                  aria-label="Chord Sequence"
                />
                ${this.showInfo?t.html`
                  <div class="setting-explanation">Type a space-separated sequence of chords to play and preview.</div>
                `:``}
              </div>
            `}
            
            <div class="control-row">
              <button class="preview-btn" @click=${this.handlePreview} aria-label="Preview Configuration">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Preview
              </button>
              ${this.showInfo?t.html`
                <div class="setting-explanation">Triggers immediate chord playback using your humanized settings.</div>
              `:``}
            </div>
          `:``}
        </div>

        <!-- Section: Chord Gen Group -->
        <div class="control-group">
          <div class="group-header-row">
            <h3 class="group-title">Chord Gen Group</h3>
            ${this.showInfo?t.html`
              <span class="group-explanation">(strum & note length)</span>
            `:``}
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
              @input=${e=>this.handleNumberChange(`spread`,e)}
              aria-label="Spread"
            />
            ${this.showInfo?t.html`
              <div class="setting-explanation">Staggers the start times of notes in the chord for an arpeggiated or strummed feel.</div>
            `:``}
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
              @input=${e=>this.handleNumberChange(`duration`,e)}
              aria-label="Duration"
            />
            ${this.showInfo?t.html`
              <div class="setting-explanation">Controls the base length of the notes during playback.</div>
            `:``}
          </div>
        </div>

        <!-- Section: Dynamics Group -->
        <div class="control-group">
          <div class="group-header-row">
            <h3 class="group-title">Dynamics Group</h3>
            ${this.showInfo?t.html`
              <span class="group-explanation">(velocity & randomness)</span>
            `:``}
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
              @input=${e=>this.handleNumberChange(`minVelocity`,e,!0)}
              aria-label="Min Velocity"
            />
            ${this.showInfo?t.html`
              <div class="setting-explanation">The minimum MIDI velocity (volume) for chord notes.</div>
            `:``}
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
              @input=${e=>this.handleNumberChange(`maxVelocity`,e,!0)}
              aria-label="Max Velocity"
            />
            ${this.showInfo?t.html`
              <div class="setting-explanation">The maximum MIDI velocity (volume) for chord notes.</div>
            `:``}
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
              @input=${e=>this.handleNumberChange(`humanVariance`,e)}
              aria-label="Human Variance"
            />
            ${this.showInfo?t.html`
              <div class="setting-explanation">Adds subtle random velocity and duration deviations.</div>
            `:``}
          </div>
        </div>

        <!-- Section: Timing Grid Group -->
        <div class="control-group">
          <div class="group-header-row">
            <h3 class="group-title">Timing Grid Group</h3>
            ${this.showInfo?t.html`
              <span class="group-explanation">(onset timing offsets)</span>
            `:``}
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
              @input=${e=>this.handleNumberChange(`microTiming`,e)}
              aria-label="Micro-timing Variation"
            />
            ${this.showInfo?t.html`
              <div class="setting-explanation">Shifts note onset times slightly early or late for human feel.</div>
            `:``}
          </div>
        </div>

      </div>
    `}};r([(0,n.property)({type:String})],i.prototype,`heading`,void 0),r([(0,n.property)({type:String,attribute:`chord-sequence`})],i.prototype,`chordSequence`,void 0),r([(0,n.property)({type:Boolean})],i.prototype,`hideInput`,void 0),r([(0,n.property)({type:Number})],i.prototype,`spread`,void 0),r([(0,n.property)({type:Number})],i.prototype,`duration`,void 0),r([(0,n.property)({type:Number})],i.prototype,`minVelocity`,void 0),r([(0,n.property)({type:Number})],i.prototype,`maxVelocity`,void 0),r([(0,n.property)({type:Number})],i.prototype,`humanVariance`,void 0),r([(0,n.property)({type:Number})],i.prototype,`microTiming`,void 0),r([(0,n.property)({type:Boolean})],i.prototype,`debugExpanded`,void 0),r([(0,n.property)({type:Boolean})],i.prototype,`showInfo`,void 0),i=r([(0,n.customElement)(`human-panel`)],i),Object.defineProperty(e,"HumanPanel",{enumerable:!0,get:function(){return i}})});