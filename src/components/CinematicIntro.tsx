import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { playInterfaceSound } from '../lib/interfaceSound.ts';

interface CinematicIntroProps {
  onComplete?: () => void;
  motionEnabled?: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, motionEnabled = true }) => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [stage, setStage] = useState(0);
  const dismissTimer = useRef<number | null>(null);
  const ringTickTimer = useRef<number | null>(null);
  const sequenceTimers = useRef<number[]>([]);

  const dismiss = () => {
    if (dismissTimer.current !== null) return;
    sequenceTimers.current.forEach(window.clearTimeout);
    sequenceTimers.current = [];
    if (ringTickTimer.current !== null) window.clearTimeout(ringTickTimer.current);
    setFading(true);
    try { window.sessionStorage.setItem('gp_engineering_core_intro_seen', 'true'); } catch { /* Optional session memory. */ }
    dismissTimer.current = window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 420);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !motionEnabled) {
      setVisible(false);
      return;
    }
    try {
      if (window.sessionStorage.getItem('gp_engineering_core_intro_seen') === 'true') return;
    } catch { /* Continue without session storage. */ }

    setVisible(true);
    // Sound cues are gated by the sound preference and an explicit user gesture.
    const t1 = window.setTimeout(() => {
      setStage(1);
      playInterfaceSound('core');
    }, 110);
    const t2 = window.setTimeout(() => {
      setStage(2);
      playInterfaceSound('ring-tick');
      ringTickTimer.current = window.setTimeout(() => playInterfaceSound('ring-tick'), 120);
    }, 560);
    const t3 = window.setTimeout(() => {
      setStage(3);
      playInterfaceSound('hero-reveal');
    }, 1050);
    const t4 = window.setTimeout(dismiss, 1850);
    sequenceTimers.current = [t1, t2, t3, t4];
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      sequenceTimers.current = [];
      if (ringTickTimer.current !== null) window.clearTimeout(ringTickTimer.current);
      if (dismissTimer.current !== null) {
        window.clearTimeout(dismissTimer.current);
        dismissTimer.current = null;
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [motionEnabled]);

  if (!visible) return null;

  const fullNameChars = PERSONAL_INFO.fullName.split('');
  return (
    <div
      role="dialog"
      aria-label="The Engineering Core introduction"
      aria-modal="true"
      className={`engineering-core-intro ${fading ? 'is-fading' : ''}`}
    >
      <div className="engineering-core-grid" aria-hidden="true" />
      <div className="engineering-core-corner core-corner-left">MECHANICAL SYSTEMS / PORTFOLIO</div>
      <div className="engineering-core-corner core-corner-right">GP — CORE SEQUENCE 01</div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Skip the Engineering Core introduction"
        className="engineering-core-skip"
      >
        SKIP INTRO <span aria-hidden="true">[ESC]</span>
      </button>

      <div className="engineering-core-content">
        <div className={`engineering-core-graphic ${stage >= 1 ? 'is-active' : ''} ${stage >= 2 ? 'is-aligned' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 200 200" className="engineering-core-rings">
            <circle className="core-ring core-ring-outer" cx="100" cy="100" r="88" />
            <circle className="core-ring core-ring-middle" cx="100" cy="100" r="69" />
            <circle className="core-ring core-ring-inner" cx="100" cy="100" r="48" />
            <circle className="core-core-seat" cx="100" cy="100" r="34" />
            {Array.from({ length: 24 }, (_, index) => (
              <line
                key={index}
                className="core-index-mark"
                x1="100"
                y1={index % 3 === 0 ? '5' : '9'}
                x2="100"
                y2={index % 3 === 0 ? '15' : '13'}
                transform={`rotate(${index * 15} 100 100)`}
              />
            ))}
            <path className="core-index-witness" d="M100 2v9M198 100h-9M100 198v-9M2 100h9" />
          </svg>
          <div className={`engineering-core-monogram ${stage >= 2 ? 'is-visible' : ''}`}>GP</div>
        </div>

        <p className="engineering-core-kicker">
          <span className="engineering-core-status-dot" />
          {stage >= 2 ? 'SYSTEM ONLINE' : 'ENGINEERING CORE / INITIALIZING'}
        </p>
        <p className="engineering-core-title">THE ENGINEERING CORE</p>
        <h1 className={`engineering-core-name ${stage >= 3 ? 'is-visible' : ''}`}>
          {fullNameChars.map((character, index) => (
            <span key={`${character}-${index}`} style={{ transitionDelay: `${index * 22}ms` }}>
              {character === ' ' ? '\u00a0' : character}
            </span>
          ))}
        </h1>
        <p className={`engineering-core-subtitle ${stage >= 3 ? 'is-visible' : ''}`}>
          MECHANICAL ENGINEERING · GIRESH PAVAAN S K
        </p>
      </div>

      <div className="engineering-core-footer">PRECISION · DESIGN · MOTION</div>
    </div>
  );
};
