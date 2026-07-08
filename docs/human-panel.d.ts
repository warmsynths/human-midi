import { LitElement } from 'lit';
export * from './shared-schema.js';
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
    bpm: number;
    arpMode: string;
    arpRate: string;
    arpRange: number;
}
/**
 * <human-panel>
 * A modular frontend sidebar/modal component that acts as a middleware control panel.
 * It intercepts text-based chord progressions, humanizes their attributes, and passes
 * the parsed data down to a host application's Web MIDI engine.
 *
 * @fires human-change - Fired whenever an input changes. The event detail contains the full `HumanState`.
 */
export declare class HumanPanel extends LitElement {
    static get styles(): import('lit').CSSResult;
    /**
     * Custom heading text displayed at the top of the panel.
     */
    heading: string;
    /**
     * The current space-separated text string of chord progressions.
     */
    chordSequence: string;
    /**
     * Whether to hide the chord sequence text input (useful when used as a middleware component).
     */
    hideInput: boolean;
    /**
     * Spread value (0.0 to 2.0)
     */
    spread: number;
    /**
     * Duration value (0.1 to 2.0)
     */
    duration: number;
    /**
     * Minimum velocity (0 to 127)
     */
    minVelocity: number;
    /**
     * Maximum velocity (0 to 127)
     */
    maxVelocity: number;
    /**
     * Humanized variance (0.0 to 1.0)
     */
    humanVariance: number;
    /**
     * Micro-timing variation (0.0 to 2.0)
     */
    microTiming: number;
    /**
     * Project tempo (BPM).
     */
    bpm: number;
    /**
     * Arpeggiator mode.
     */
    arpMode: string;
    /**
     * Arpeggiator rate (rhythmic division).
     */
    arpRate: string;
    /**
     * Arpeggiator range (octave extension).
     */
    arpRange: number;
    /**
     * Whether the debug section is expanded.
     */
    debugExpanded: boolean;
    /**
     * Whether the Arpeggiator section is expanded.
     */
    arpExpanded: boolean;
    /**
     * Whether to show explanations under settings and groups.
     */
    showInfo: boolean;
    /**
     * Mode of panel: 'basic' or 'advanced'
     */
    mode: string;
    /**
     * Single Human Feel slider for basic mode (0.0 to 1.0)
     */
    humanSlider: number;
    connectedCallback(): void;
    private loadFromLocalStorage;
    private saveToLocalStorage;
    /**
     * Emits the `human-change` custom event with the current state configuration.
     */
    private emitChange;
    private toggleInfo;
    /**
     * Handles changes from the text input field.
     */
    private handleTextChange;
    /**
     * Handles changes from the range sliders.
     * @param prop - The property name being updated
     * @param e - The input event
     * @param isInt - Whether the value should be parsed as an integer
     */
    private handleNumberChange;
    private handleBasicSliderChange;
    private setMode;
    private handleReset;
    private handleBpmChange;
    private handleArpModeChange;
    private handleArpRateChange;
    private handleArpRangeChange;
    /**
     * Emits the `human-preview` event to trigger playback in the host application.
     */
    private handlePreview;
    /**
     * Toggles the collapsed state of the debug section.
     */
    private toggleDebug;
    render(): import('lit-html').TemplateResult<1>;
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
