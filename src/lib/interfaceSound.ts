export type InterfaceSound = 'click' | 'navigation' | 'project' | 'transition' | 'hover' | 'model' | 'sparkle';

let audioContext: AudioContext | null = null;
let enabled = false;
let volume = 0.45;
let lastSoundAt = 0;
let lastPointerAt = 0;

export const markInterfacePointer = () => { lastPointerAt = performance.now(); };
export const hasRecentInterfacePointer = () => performance.now() - lastPointerAt < 450;

const getContext = () => {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ??= new AudioContextClass();
  return audioContext;
};

export const readInterfaceSoundPreference = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem('portfolio-sound-enabled') === 'true';
  } catch {
    return false;
  }
};

export const setInterfaceSoundEnabled = (next: boolean) => {
  enabled = next;
  try {
    window.localStorage.setItem('portfolio-sound-enabled', String(next));
  } catch {
    // Keep the preference in memory if storage is unavailable.
  }
  if (next) {
    const context = getContext();
    if (context?.state === 'suspended') void context.resume();
    playInterfaceSound('click', true);
  }
};

export const playInterfaceSound = (kind: InterfaceSound = 'transition', bypassThrottle = false) => {
  if (!enabled || (kind === 'hover' && readInterfaceSoundPreference() === false)) return;
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const minimumGap = kind === 'hover' ? 100 : 38;
  if (!bypassThrottle && nowMs - lastSoundAt < minimumGap) return;
  lastSoundAt = nowMs;

  try {
    const context = getContext();
    if (!context) return;
    if (context.state === 'suspended') void context.resume();
    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(Math.max(0.0001, volume * (kind === 'hover' ? 0.025 : 0.07)), now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + (kind === 'sparkle' || kind === 'transition' ? 0.18 : 0.1));
    master.connect(context.destination);

    const tone = (frequency: number, endFrequency: number, offset = 0, type: OscillatorType = 'sine') => {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now + offset);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + offset + 0.07);
      envelope.gain.setValueAtTime(0.8, now + offset);
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + offset + (kind === 'transition' ? 0.16 : 0.085));
      oscillator.connect(envelope);
      envelope.connect(master);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + (kind === 'transition' ? 0.17 : 0.09));
    };

    switch (kind) {
      case 'navigation': tone(610, 920); tone(920, 1220, 0.045); break;
      case 'project': tone(470, 710, 0, 'triangle'); tone(710, 510, 0.025); break;
      case 'transition': tone(390, 980, 0); tone(780, 1180, 0.045); break;
      case 'hover': tone(1050, 1250); break;
      case 'model': tone(220, 360, 0, 'triangle'); break;
      case 'sparkle': tone(1500, 2100); tone(1900, 2550, 0.035); break;
      default: tone(1250, 720, 0, 'triangle');
    }
  } catch {
    // Audio is optional; browser policy or missing Web Audio support stays silent.
  }
};

export const setInterfaceVolume = (next: number) => {
  volume = Math.max(0, Math.min(1, next));
  try { window.localStorage.setItem('portfolio-sound-volume', String(volume)); } catch { /* optional */ }
};

try {
  if (typeof window !== 'undefined') {
    const savedVolume = Number(window.localStorage.getItem('portfolio-sound-volume'));
    if (Number.isFinite(savedVolume) && savedVolume > 0 && savedVolume <= 1) volume = savedVolume;
    enabled = readInterfaceSoundPreference();
  }
} catch { /* Storage may be blocked. */ }
