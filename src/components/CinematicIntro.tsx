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
    const t1 = setTimeout(() => setStage(1), 250); // expanding gold line
    const t2 = setTimeout(() => {
      setStage(2); // GP. initials appear with metallic gold shimmer
      playCinemaChime();
    }, 900);
    const t3 = setTimeout(() => setStage(3), 1700); // GIRESH PAVAAN S K reveals letter-by-letter
    const t4 = setTimeout(() => {
      handleDismiss();
    }, 3600); // smooth clip-path mask exit

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
    }, 750);
  };

  if (!visible) return null;

  const fullNameChars = 'GIRESH PAVAAN S K'.split('');

  return (
    <div
      role="dialog"
      aria-label="Cinematic Introduction"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-all duration-700 ${
        fading
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        clipPath: fading ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)',
        transition: 'clip-path 0.75s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.75s ease',
      }}
    >
      {/* Background Blueprint Engineering Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      {/* Atmospheric gold & technical blue spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/6 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#24B8FF]/6 blur-[130px] pointer-events-none" />

      {/* Decorative Blueprint Crosshairs */}
      <div className="absolute top-8 left-8 text-[10px] font-mono text-[#24B8FF]/70 tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#24B8FF] animate-ping" />
        DATUM: +00.00 / 00.00 · CALIBRATING
      </div>
      <div className="absolute top-8 right-8 text-[10px] font-mono text-[#D4AF37]/70 tracking-widest hidden sm:block">
        SYS.REV: GP-2026-MECH
      </div>
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-[#24B8FF]/70 tracking-widest">
        POLLACHI · 10.66° N, 77.00° E
      </div>

      {/* Skip button */}
      <button
        onClick={handleDismiss}
        aria-label="Skip introduction"
        className="absolute bottom-8 right-8 px-3.5 py-1.5 rounded-xs border border-[#D4AF37]/35 hover:border-[#D4AF37] bg-[#111318]/90 text-[10px] font-mono text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.2)]"
      >
        SKIP INTRO [ESC]
      </button>

      {/* Main Intro Stage */}
      <div className="relative flex flex-col items-center text-center px-6 max-w-xl z-10">
        {/* Expanding Thin Gold Line with subtle blue core */}
        <div
          className={`h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_#D4AF37] transition-all duration-700 ease-out ${
            stage >= 1 ? 'w-56 sm:w-80 opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* Monogram Initials GP. with Metallic Gold Shimmer */}
        <div
          className={`mt-6 font-serif text-6xl sm:text-8xl font-bold tracking-tight transition-all duration-700 transform ${
            stage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <span className="text-gradient-gold drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]">
            GP.
          </span>
        </div>

        {/* Staggered Letter-by-Letter Reveal of Name */}
        <div
          className={`mt-5 space-y-2.5 transition-all duration-700 transform ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="font-serif text-xl sm:text-2xl text-[#E8DFD8] font-light tracking-[0.28em] uppercase flex items-center justify-center">
            {fullNameChars.map((char, idx) => (
              <span
                key={idx}
                className="inline-block transition-all duration-500 transform"
                style={{
                  transitionDelay: `${idx * 45}ms`,
                  opacity: stage >= 3 ? 1 : 0,
                  transform: stage >= 3 ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>

          <p className="font-mono text-xs text-[#D4AF37] tracking-[0.32em] uppercase font-semibold">
            MECHANICAL ENGINEERING
          </p>
        </div>

        {/* Lower expanding indicator */}
        <div
          className={`mt-8 h-px bg-gradient-to-r from-transparent via-[#24B8FF] to-transparent transition-all duration-700 delay-300 ${
            stage >= 3 ? 'w-40 opacity-70 shadow-[0_0_10px_#24B8FF]' : 'w-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};
