// Text-to-Speech audio service using standard Web Speech API

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSlow: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer English natural/friendly voices
    this.selectedVoice =
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) ||
      voices.find(v => v.lang.startsWith('en')) ||
      null;
  }

  public setSlow(slow: boolean) {
    this.isSlow = slow;
  }

  public getSlow(): boolean {
    return this.isSlow;
  }

  public speak(text: string, onEnd?: () => void, onError?: () => void) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported on this device/browser.');
      return;
    }

    this.stop();

    // Clean text of brackets or meta-annotations like [Loudly]
    const cleanText = text.replace(/\[.*?\]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = this.isSlow ? 0.72 : 0.95;
    utterance.pitch = 1.05;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      this.currentUtterance = null;
      if (onError) onError();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  public isSpeaking(): boolean {
    return Boolean(this.synth && this.synth.speaking);
  }
}

export const speechService = new SpeechService();
