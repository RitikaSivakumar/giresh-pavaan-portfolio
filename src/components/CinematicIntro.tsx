import React, { useState, useEffect } from 'react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Check if intro has already been viewed in this session
    const seen = sessionStorage.getItem('gp_cinematic_intro_seen');
    if (seen === 'true') {
      return;
    }

    setVisible(true);

    // Sequence timing
    const t1 = setTimeout(() => setStage(1), 300); // electric blue line expands
    const t2 = setTimeout(() => {
      setStage(2); // GP. initials appear
      playCinemaChime();
    }, 1000);
    const t3 = setTimeout(() => setStage(3), 1900); // GIRESH PAVAAN S K reveals
    const t4 = setTimeout(() => {
      handleDismiss();
    }, 3800); // smooth exit

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDismiss = () => {
    setFading(true);
    sessionStorage.setItem('gp_cinematic_intro_seen', 'true');
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 800);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cinematic Introduction"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07111F] transition-opacity duration-800 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#3B82F6]/10 blur-[160px] pointer-events-none" />

      {/* Decorative Blueprint Crosshairs */}
      <div className="absolute top-8 left-8 text-[10px] font-mono text-[#22D3EE]/50 tracking-widest">
        DATUM: +00.00 / 00.00
      </div>
      <div className="absolute top-8 right-8 text-[10px] font-mono text-[#3B82F6]/50 tracking-widest">
        SYS.REV: GP-2025
      </div>
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-[#22D3EE]/50 tracking-widest">
        POLLACHI · 10.66° N, 77.00° E
      </div>

      {/* Skip button */}
      <button
        onClick={handleDismiss}
        aria-label="Skip introduction"
        className="absolute bottom-8 right-8 px-3 py-1.5 rounded-xs border border-[#243B53] hover:border-[#3B82F6] bg-[#10243A]/80 text-[10px] font-mono text-[#A7B4C7] hover:text-[#60A5FA] transition-all cursor-pointer shadow-xs"
      >
        SKIP INTRO [ESC]
      </button>

      {/* Main Intro Stage */}
      <div className="relative flex flex-col items-center text-center px-6 max-w-xl">
        {/* Expanding Electric Blue Center Line */}
        <div
          className={`h-0.5 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent transition-all duration-700 ease-out shadow-[0_0_12px_#3B82F6] ${
            stage >= 1 ? 'w-48 sm:w-64 opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* Monogram Initials GP. */}
        <div
          className={`mt-6 font-serif text-5xl sm:text-7xl font-bold tracking-tight transition-all duration-700 transform ${
            stage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <span className="text-gradient-electric">GP.</span>
        </div>

        {/* Full Name & Discipline Staggered Reveal */}
        <div
          className={`mt-4 space-y-2 transition-all duration-700 transform ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="font-serif text-xl sm:text-2xl text-[#F1F5F9] font-light tracking-[0.25em] uppercase">
            GIRESH PAVAAN S K
          </h2>
          <p className="font-mono text-xs text-[#22D3EE] tracking-[0.3em] uppercase">
            MECHANICAL ENGINEERING
          </p>
        </div>

        {/* Lower expanding indicator */}
        <div
          className={`mt-8 h-px bg-gradient-to-r from-transparent via-[#243B53] to-transparent transition-all duration-700 delay-300 ${
            stage >= 3 ? 'w-32 opacity-80' : 'w-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};
