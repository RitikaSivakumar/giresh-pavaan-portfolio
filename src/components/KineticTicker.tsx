import React from 'react';

export const KineticTicker: React.FC = () => {
  const engineeringMantras = [
    'DESIGN',
    '·',
    'ENGINEER',
    '·',
    'INNOVATE',
    '·',
    'KINEMATICS',
    '·',
    'PRECISION',
    '·',
    'THERMODYNAMICS',
    '·',
    'CAD MODELLING',
    '·',
    'MANUFACTURING',
    '·',
  ];

  return (
    <div
      aria-label="Kinetic Engineering Ticker"
      className="w-full py-8 sm:py-10 bg-[#0B0B0D] border-y border-[#D4AF37]/20 overflow-hidden relative select-none"
    >
      {/* Decorative Blueprint Technical Crossbars in Electric Blue */}
      <div className="absolute top-2 left-6 text-[9px] font-mono text-[#24B8FF]/75 tracking-widest">
        COORDINATE REFERENCE: 10° 39′ 39″ N, 77° 0′ 17″ E · POLLACHI [TN]
      </div>
      <div className="absolute top-2 right-6 text-[9px] font-mono text-[#24B8FF]/65 tracking-widest hidden sm:inline">
        CALIBRATION: ISO-2768-m · KINEMATIC TOLERANCE
      </div>

      {/* Kinetic Infinite Ribbon */}
      <div className="flex w-max animate-ticker items-center space-x-6 sm:space-x-8 mt-2">
        {[...engineeringMantras, ...engineeringMantras, ...engineeringMantras].map((word, i) => (
          <span
            key={i}
            className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-wider uppercase transition-colors ${
              word === '·'
                ? 'text-[#24B8FF] font-bold text-xl sm:text-3xl'
                : i % 4 === 0
                ? 'text-gradient-gold font-normal italic'
                : 'text-[#E8DFD8]/85 hover:text-[#D4AF37]'
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
