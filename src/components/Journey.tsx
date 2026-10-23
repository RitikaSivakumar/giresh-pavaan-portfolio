import React, { useState } from 'react';
import { EDUCATION_JOURNEY } from '../data/portfolioData.ts';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

export const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="journey" className="py-24 lg:py-32 relative bg-[#07111F] border-t border-[#243B53] overflow-hidden">
      {/* Ambient background blue glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#243B53] bg-[#10243A] text-[11px] font-mono text-[#60A5FA] tracking-[0.25em] uppercase shadow-xs">
            <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full shadow-[0_0_6px_#3B82F6]" />
            05 / THE JOURNEY
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F1F5F9] uppercase tracking-tight leading-[1.05]">
            BUILT ON{' '}
            <span className="font-serif italic font-normal text-gradient-electric">
              FUNDAMENTALS.
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#A7B4C7] leading-relaxed font-sans">
            A chronological timeline of secondary and collegiate milestones forming the academic and analytical foundation for mechanical engineering.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          {/* Central Connecting Blue Line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#3B82F6] via-[#243B53] to-[#22D3EE]/20 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />

          <div className="space-y-12 md:space-y-16">
            {EDUCATION_JOURNEY.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStep === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    setActiveStep(idx);
                    playCinemaChime();
                  }}
                  onMouseLeave={() => setActiveStep(null)}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8 md:gap-0 group`}
                >
                  {/* Timeline Glowing Node */}
                  <div
                    data-cursor-text="ACADEMIC"
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'border-[#3B82F6] bg-[#10243A] shadow-[0_0_20px_#3B82F6] scale-110'
                          : 'border-[#243B53] bg-[#0B192B]'
                      }`}
                    >
                      <GraduationCap
                        className={`w-5 h-5 transition-colors ${
                          isActive ? 'text-[#60A5FA]' : 'text-[#3B82F6]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Content Card (Desktop: left or right of center) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div
                      className={`p-6 sm:p-7 rounded-sm transition-all duration-300 border relative ${
                        isActive
                          ? 'bg-[#10243A] border-[#3B82F6] shadow-[0_10px_35px_rgba(59,130,246,0.2)]'
                          : 'bg-[#0B192B] border-[#243B53] hover:border-[#3B82F6]/50'
                      }`}
                    >
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#3B82F6]" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#3B82F6]" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#3B82F6]" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#3B82F6]" />

                      {/* Period Badge & Type */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#243B53]/70">
                        <span className="font-mono text-xs text-[#60A5FA] font-semibold tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-xs bg-[#07111F] border border-[#243B53] text-[10px] font-mono text-[#F1F5F9] tracking-widest uppercase">
                          {item.type}
                        </span>
                      </div>

                      {/* Degree Title */}
                      <h3 className="font-serif text-xl sm:text-2xl text-[#F1F5F9] font-normal uppercase tracking-wide mt-3 group-hover:text-[#60A5FA] transition-colors">
                        {item.degree}
                      </h3>

                      {/* Institution */}
                      <p className="text-xs sm:text-sm font-mono text-[#22D3EE] mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                        <span>{item.institution}</span>
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#A7B4C7] font-sans leading-relaxed mt-3">
                        {item.description}
                      </p>

                      {/* Verification Status */}
                      <div className="mt-4 pt-3 border-t border-[#243B53]/50 flex items-center justify-between text-[10px] font-mono text-[#A7B4C7]">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#22D3EE]" />
                          <span>Dr. MCET & Viswadeepthi</span>
                        </span>
                        <span className="text-[#60A5FA]">
                          {idx === 2 ? 'CURRENT PROGRAM' : 'COMPLETED'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
