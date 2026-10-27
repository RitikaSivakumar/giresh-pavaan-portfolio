import React from 'react';

/**
 * Fullscreen Cinematic Background Video with midnight overlay and golden lighting
 */
export const CinematicBackgroundVideo: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-90 scale-105 transition-transform duration-1000"
        poster="/images/video-poster.jpeg"
      >
        <source src="/images/engineering-cinematic-bg.mp4" type="video/mp4" />
        <source src="/assets/aistudio/WhatsApp_Video_2026-10-23_at_5.16.37_PM_7065274a.mp4" type="video/mp4" />
      </video>

      {/* Deep black (#050505) left gradient for maximum typography legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#050505]/80" />

      {/* Cinematic top & bottom fades to #050505 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

      {/* Subtle gold ambient glow & restrained technical spotlight */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#8C6D4F]/6 blur-[140px]" />
    </div>
  );
};

/**
 * 01 / CAD Component Blueprint in Coordinated Black & Gold Palette
 */
export const CadComponentVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 500 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    aria-label="CAD Component Modelling Blueprint"
  >
    <defs>
      <linearGradient id="goldCadGrad" x1="0" y1="0" x2="500" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#12100C" />
        <stop offset="1" stopColor="#080705" />
      </linearGradient>
      <linearGradient id="goldShine" x1="150" y1="60" x2="350" y2="240" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0.22" />
        <stop offset="1" stopColor="#8C6D4F" stopOpacity="0.06" />
      </linearGradient>
    </defs>

    <rect width="500" height="300" fill="url(#goldCadGrad)" />

    {/* Fine subtle gold blueprint grid */}
    <path d="M0 60 H500 M0 120 H500 M0 180 H500 M0 240 H500" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.8" />
    <path d="M100 0 V300 M200 0 V300 M300 0 V300 M400 0 V300" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.8" />

    {/* Registration Crosshairs */}
    <path d="M16 24 H32 M24 16 V32" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" />
    <path d="M484 24 H468 M476 16 V32" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" />
    <path d="M16 276 H32 M24 268 V284" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" />
    <path d="M484 276 H468 M476 268 V284" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" />

    {/* Technical Labels */}
    <text x="36" y="32" fill="#D4AF37" fillOpacity="0.9" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
      ISO-2768-m · CAD REVISION GP-2025-01
    </text>
    <text x="410" y="32" fill="#E5C158" fillOpacity="0.85" fontSize="9" fontFamily="JetBrains Mono, monospace">
      SCALE 1:1
    </text>

    {/* Machined Bracket Solid Contour */}
    <path
      d="M170 70 L330 70 L380 120 L380 200 L330 235 L190 235 L140 190 L140 100 Z"
      fill="url(#goldShine)"
      stroke="#D4AF37"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Inner pocket */}
    <path
      d="M185 90 L315 90 L350 125 L350 180 L315 210 L205 210 L170 175 L170 110 Z"
      stroke="#997D27"
      strokeWidth="1.2"
      strokeDasharray="4 2"
      fill="none"
    />

    {/* Central Precision Bearing Bore */}
    <circle cx="260" cy="150" r="38" stroke="#D4AF37" strokeWidth="1.8" />
    <circle cx="260" cy="150" r="22" stroke="#E5C158" strokeWidth="1.2" />
    <rect x="256" y="126" width="8" height="6" fill="#D4AF37" />

    {/* Mounting Holes */}
    <circle cx="170" cy="205" r="7" stroke="#D4AF37" strokeWidth="1.2" />
    <circle cx="350" cy="205" r="7" stroke="#D4AF37" strokeWidth="1.2" />
    <circle cx="170" cy="100" r="7" stroke="#D4AF37" strokeWidth="1.2" />
    <circle cx="350" cy="100" r="7" stroke="#D4AF37" strokeWidth="1.2" />

    {/* Centerline Axes */}
    <line x1="120" y1="150" x2="400" y2="150" stroke="#997D27" strokeWidth="0.8" strokeDasharray="10 3 2 3" />
    <line x1="260" y1="50" x2="260" y2="255" stroke="#997D27" strokeWidth="0.8" strokeDasharray="10 3 2 3" />

    {/* Dimension Line */}
    <line x1="170" y1="52" x2="330" y2="52" stroke="#E5C158" strokeWidth="0.8" />
    <line x1="170" y1="48" x2="170" y2="68" stroke="#E5C158" strokeWidth="0.5" />
    <line x1="330" y1="48" x2="330" y2="68" stroke="#E5C158" strokeWidth="0.5" />
    <text x="235" y="48" fill="#D4AF37" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
      160.00 ±0.02
    </text>
  </svg>
);

/**
 * 02 / Mechanical Gear Kinematics in Coordinated Black & Gold Palette
 */
export const MechanicalSystemVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 500 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    aria-label="Mechanical Gear Kinematics"
  >
    <defs>
      <linearGradient id="goldGearGrad" x1="0" y1="0" x2="500" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#12100C" />
        <stop offset="1" stopColor="#080705" />
      </linearGradient>
    </defs>

    <rect width="500" height="300" fill="url(#goldGearGrad)" />

    {/* Fine subtle gold blueprint grid */}
    <path d="M0 60 H500 M0 120 H500 M0 180 H500 M0 240 H500" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.8" />
    <path d="M100 0 V300 M200 0 V300 M300 0 V300 M400 0 V300" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.8" />

    <text x="36" y="32" fill="#D4AF37" fillOpacity="0.9" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
      KINEMATICS · COMPOUND SPUR REDUCTION 2.5:1
    </text>
    <text x="390" y="32" fill="#E5C158" fillOpacity="0.85" fontSize="9" fontFamily="JetBrains Mono, monospace">
      MODULE m=3.0
    </text>

    {/* Shaft centerline */}
    <line x1="160" y1="150" x2="340" y2="150" stroke="#997D27" strokeWidth="0.8" strokeDasharray="10 3 2 3" />

    {/* Primary Gear (Left) */}
    <circle cx="160" cy="150" r="86" stroke="#D4AF37" strokeWidth="2" />
    <circle cx="160" cy="150" r="72" stroke="#997D27" strokeWidth="1" strokeDasharray="4 2" />
    <circle cx="160" cy="150" r="30" stroke="#D4AF37" strokeWidth="1.5" />
    <circle cx="160" cy="150" r="14" stroke="#E5C158" strokeWidth="1" />
    <rect x="157" y="132" width="6" height="5" fill="#D4AF37" />

    {/* Gear teeth indicators */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 160 + 82 * Math.cos(rad);
      const y1 = 150 + 82 * Math.sin(rad);
      const x2 = 160 + 92 * Math.cos(rad);
      const y2 = 150 + 92 * Math.sin(rad);
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />;
    })}

    {/* Pinion Gear (Right) */}
    <circle cx="340" cy="150" r="50" stroke="#D4AF37" strokeWidth="2" />
    <circle cx="340" cy="150" r="40" stroke="#997D27" strokeWidth="1" strokeDasharray="4 2" />
    <circle cx="340" cy="150" r="18" stroke="#D4AF37" strokeWidth="1.5" />

    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 340 + 46 * Math.cos(rad);
      const y1 = 150 + 46 * Math.sin(rad);
      const x2 = 340 + 55 * Math.cos(rad);
      const y2 = 150 + 55 * Math.sin(rad);
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />;
    })}

    {/* Tangential Pitch Point */}
    <circle cx="246" cy="150" r="4" fill="#D4AF37" />
    <line x1="246" y1="150" x2="280" y2="100" stroke="#D4AF37" strokeWidth="0.8" />
    <text x="286" y="98" fill="#E5C158" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
      PITCH POINT (P)
    </text>
  </svg>
);

/**
 * 03 / Automotive Disc Brake Subsystem in Coordinated Black & Gold Palette
 */
export const AutomotiveSystemVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 500 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    aria-label="Automotive Disc Brake Subsystem"
  >
    <defs>
      <linearGradient id="goldAutoGrad" x1="0" y1="0" x2="500" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#12100C" />
        <stop offset="1" stopColor="#080705" />
      </linearGradient>
    </defs>

    <rect width="500" height="300" fill="url(#goldAutoGrad)" />

    {/* Fine subtle gold blueprint grid */}
    <path d="M0 60 H500 M0 120 H500 M0 180 H500 M0 240 H500" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.8" />
    <path d="M100 0 V300 M200 0 V300 M300 0 V300 M400 0 V300" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.8" />

    <text x="36" y="32" fill="#D4AF37" fillOpacity="0.9" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
      AUTOSYS · VENTILATED ROTOR & FLOATING CALIPER
    </text>
    <text x="390" y="32" fill="#E5C158" fillOpacity="0.85" fontSize="9" fontFamily="JetBrains Mono, monospace">
      DISC Ø290 MM
    </text>

    {/* Outer Friction Ring */}
    <circle cx="230" cy="150" r="102" stroke="#D4AF37" strokeWidth="2.2" />
    <circle cx="230" cy="150" r="96" stroke="#997D27" strokeWidth="0.8" strokeDasharray="4 3" />
    <circle cx="230" cy="150" r="62" stroke="#D4AF37" strokeWidth="1.5" />

    {/* Vane Ventilation Slots */}
    {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 230 + 66 * Math.cos(rad);
      const y1 = 150 + 66 * Math.sin(rad);
      const x2 = 230 + 94 * Math.cos(rad);
      const y2 = 150 + 94 * Math.sin(rad);
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#997D27" strokeWidth="1.2" strokeOpacity="0.85" />;
    })}

    {/* Center Hat and 5 Stud Holes */}
    <circle cx="230" cy="150" r="42" stroke="#997D27" strokeWidth="1.4" fill="#D4AF37" fillOpacity="0.06" />
    <circle cx="230" cy="150" r="18" stroke="#D4AF37" strokeWidth="1.2" />
    {[0, 72, 144, 216, 288].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const cx = 230 + 29 * Math.cos(rad);
      const cy = 150 + 29 * Math.sin(rad);
      return <circle key={deg} cx={cx} cy={cy} r="4.5" stroke="#D4AF37" strokeWidth="1.2" fill="#D4AF37" fillOpacity="0.25" />;
    })}

    {/* Caliper Housing */}
    <path
      d="M150 50 L310 50 L320 75 L315 116 L290 120 L285 86 L175 86 L170 120 L145 116 L140 75 Z"
      fill="#D4AF37"
      fillOpacity="0.12"
      stroke="#D4AF37"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="190" y="62" width="30" height="15" rx="3" stroke="#D4AF37" strokeWidth="1.2" />
    <rect x="240" y="62" width="30" height="15" rx="3" stroke="#D4AF37" strokeWidth="1.2" />
  </svg>
);

/**
 * 04 / Manufacturing CNC Spindle & Metrology in Coordinated Black & Gold Palette
 */
export const ManufacturingProcessVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 500 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    aria-label="CNC Precision Machining"
  >
    <defs>
      <linearGradient id="goldMfgGrad" x1="0" y1="0" x2="500" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#12100C" />
        <stop offset="1" stopColor="#080705" />
      </linearGradient>
    </defs>

    <rect width="500" height="300" fill="url(#goldMfgGrad)" />

    {/* Fine subtle gold blueprint grid */}
    <path d="M0 60 H500 M0 120 H500 M0 180 H500 M0 240 H500" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.8" />
    <path d="M100 0 V300 M200 0 V300 M300 0 V300 M400 0 V300" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.8" />

    <text x="36" y="32" fill="#D4AF37" fillOpacity="0.9" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
      MFG · CNC END MILLING & WORKSHOP METROLOGY
    </text>

    {/* CNC Milling Machine Spindle */}
    <rect x="228" y="45" width="44" height="48" rx="4" stroke="#D4AF37" strokeWidth="1.8" fill="#D4AF37" fillOpacity="0.1" />
    <rect x="242" y="93" width="16" height="38" stroke="#D4AF37" strokeWidth="1.8" fill="#D4AF37" fillOpacity="0.2" />
    <line x1="242" y1="108" x2="258" y2="114" stroke="#997D27" strokeWidth="1.5" />
    <line x1="242" y1="118" x2="258" y2="124" stroke="#997D27" strokeWidth="1.5" />

    {/* Workpiece on Fixture */}
    <rect x="140" y="131" width="220" height="80" rx="4" stroke="#997D27" strokeWidth="1.8" fill="#1C1812" />
    <path d="M210 131 V155 H290 V131" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 2" fill="none" />

    {/* Toolpath Vector */}
    <path d="M175 124 H325" stroke="#D4AF37" strokeWidth="1" strokeDasharray="6 3" />
    <text x="335" y="127" fill="#E5C158" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
      FEED (Vf)
    </text>

    {/* Clamps */}
    <rect x="115" y="180" width="25" height="32" stroke="#D4AF37" strokeWidth="1.4" fill="#0E0C09" />
    <rect x="360" y="180" width="25" height="32" stroke="#D4AF37" strokeWidth="1.4" fill="#0E0C09" />
  </svg>
);

/**
 * Golden chime for tactile interactive feedback (Web Audio API)
 */
export const playCinemaChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Harmonic frequencies in warm golden spectrum (C minor 9th shimmer)
    const freqs = [523.25, 783.99, 1046.5, 1318.51];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      
      const initialGain = 0.04 / (idx + 1);
      gain.gain.setValueAtTime(initialGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55 + idx * 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    });
  } catch {
    // Audio context may be restricted before user gesture
  }
};
