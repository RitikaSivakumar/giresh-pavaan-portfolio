import React, { useState } from 'react';
import { EDUCATION_JOURNEY } from '../data/portfolioData.ts';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';
import { motion } from 'motion/react';

export const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="journey" className="py-24 lg:py-32 relative bg-[#0B0B0D] border-t border-[#D4AF37]/20 overflow-hidden select-none">
      {/* Ambient background gold glow & subtle blue accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#24B8FF]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#D4AF37]/30 bg-[#111318] text-[11px] font-mono text-[#D4AF37] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
            05 / ACADEMIC JOURNEY
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#E8DFD8] uppercase tracking-tight leading-[1.05]">
            BUILT ON{' '}
            <span className="font-serif italic font-normal text-gradient-gold">
              FUNDAMENTALS.
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#A8988B] leading-relaxed font-sans">
            A chronological timeline of secondary and collegiate milestones forming the academic and analytical foundation for mechanical engineering.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          {/* Central Connecting Gold Line with progressive scroll draw */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-0.5 origin-top bg-gradient-to-b from-[#D4AF37] via-[#8C6D4F] to-[#D4AF37]/20"
          />

          <div className="space-y-12 md:space-y-16">
            {EDUCATION_JOURNEY.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
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
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    data-cursor-text="ACADEMIC"
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'border-[#D4AF37] bg-[#111318] shadow-[0_0_20px_#D4AF37,0_0_10px_#24B8FF] scale-110'
                          : 'border-[#D4AF37]/50 bg-[#0B0B0D]'
                      }`}
                    >
                      <GraduationCap
                        className={`w-5 h-5 transition-colors ${
                          isActive ? 'text-[#D4AF37]' : 'text-[#8C6D4F]'
                        }`}
                      />
                    </div>
                  </motion.div>

                  {/* Content Card (Desktop: left or right of center) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div
                      className={`p-6 sm:p-7 rounded-sm transition-all duration-300 border relative ${
                        isActive
                          ? 'bg-[#111318] border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.18)]'
                          : 'bg-[#111318]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#D4AF37]" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#D4AF37]" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#D4AF37]" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#D4AF37]" />

                      {/* Period Badge & Type with Blue Technical Accent */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/15">
                        <span className="font-mono text-xs text-[#D4AF37] font-semibold tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-xs bg-[#10233F]/80 border border-[#24B8FF]/40 text-[10px] font-mono text-[#24B8FF] tracking-widest uppercase">
                          {item.type}
                        </span>
                      </div>

                      {/* Degree Title */}
                      <h3 className="font-serif text-xl sm:text-2xl text-[#E8DFD8] font-normal uppercase tracking-wide mt-3 group-hover:text-[#D4AF37] transition-colors">
                        {item.degree}
                      </h3>

                      {/* Institution */}
                      <p className="text-xs sm:text-sm font-mono text-[#D4AF37]/90 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{item.institution}</span>
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#A8988B] font-sans leading-relaxed mt-3">
                        {item.description}
                      </p>

                      {/* Verification Status with Blue Accent */}
                      <div className="mt-4 pt-3 border-t border-[#D4AF37]/10 flex items-center justify-between text-[10px] font-mono text-[#A8988B]">
                        <span className="flex items-center gap-1 text-[#24B8FF]">
                          <CheckCircle2 className="w-3 h-3 text-[#24B8FF]" />
                          <span>Dr. MCET & Viswadeepthi</span>
                        </span>
                        <span className="text-[#D4AF37]">
                          STEP 0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
