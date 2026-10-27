import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { Terminal, Cpu, Users, Wrench, Flame, Check, Sparkles } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';
import { motion } from 'motion/react';

export const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'technical':
      case 'software':
        return <Terminal className="w-5 h-5 text-[#24B8FF]" />;
      case 'fundamentals':
        return <Cpu className="w-5 h-5 text-[#24B8FF]" />;
      case 'professional':
        return <Users className="w-5 h-5 text-[#D4AF37]" />;
      case 'interests':
        return <Flame className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <Wrench className="w-5 h-5 text-[#24B8FF]" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 relative bg-[#0B0B0D] border-t border-[#D4AF37]/20 overflow-hidden select-none">
      {/* Background radial gold & blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D4AF37]/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#24B8FF]/4 rounded-full blur-[140px] pointer-events-none" />

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
            03 / TECHNICAL ARSENAL
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#E8DFD8] uppercase tracking-tight leading-[1.05]">
            TOOLS OF{' '}
            <span className="font-serif italic font-normal text-gradient-gold">
              THE TRADE.
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#A8988B] leading-relaxed font-sans">
            A transparent and realistic inventory of technical competencies, professional problem-solving capabilities, and sporting pursuits acquired through collegiate study and practical exploration.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const isWide = category.id === 'technical';
            const isTechnical = category.id === 'technical';
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className={`${
                  isWide ? 'lg:col-span-12 xl:col-span-12' : 'lg:col-span-6'
                } p-5 sm:p-6 rounded-sm bg-[#111318] border border-[#D4AF37]/25 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative group flex flex-col`}
              >
                {/* Corner Metallic Clips */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#D4AF37]" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4AF37]" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xs border ${
                        isTechnical
                          ? 'bg-[#10233F]/80 border-[#24B8FF]/40 shadow-xs'
                          : 'bg-[#14110E] border-[#D4AF37]/30'
                      }`}>
                        {getCategoryIcon(category.id)}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#E8DFD8] uppercase font-normal tracking-wide">
                          {category.title}
                        </h3>
                        <p className="font-mono text-xs text-[#D4AF37] tracking-wider uppercase">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#A8988B] tracking-widest hidden sm:inline">
                      CAT 0{catIdx + 1}
                    </span>
                  </div>

                  {/* Skills Grid within Category */}
                  <div
                    className={`mt-4 grid grid-cols-1 ${
                      isWide
                        ? 'sm:grid-cols-2 lg:grid-cols-4'
                        : 'sm:grid-cols-2'
                    } gap-3`}
                  >
                    {category.skills.map((skill, skillIdx) => {
                      const isHovered = hoveredSkill === skill.name;
                      return (
                        <motion.div
                          key={skill.name}
                          data-cursor-text="SKILL"
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: skillIdx * 0.05 }}
                          onMouseEnter={() => {
                            setHoveredSkill(skill.name);
                            playCinemaChime();
                          }}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`p-3 rounded-xs transition-all duration-300 border flex flex-col gap-3 cursor-pointer ${
                            isHovered
                              ? 'bg-[#181B22] border-[#D4AF37] shadow-[0_5px_20px_rgba(212,175,55,0.18)] -translate-y-1'
                              : 'bg-[#0B0B0D] border-[#D4AF37]/15 hover:border-[#D4AF37]/45'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-sans font-bold text-sm text-[#E8DFD8] group-hover:text-[#D4AF37] transition-colors">
                                {skill.name}
                              </h4>
                              {skill.level && (
                                <span className="px-2 py-0.5 rounded-xs bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37] font-semibold tracking-wider shrink-0 uppercase">
                                  {skill.level}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-[#A8988B] mt-2 font-sans leading-relaxed">
                              {skill.focusArea}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-[#D4AF37]/10 flex items-center justify-between text-[10px] font-mono text-[#A8988B]">
                            <span className="flex items-center gap-1.5">
                              {category.id === 'interests' ? (
                                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                              ) : isTechnical ? (
                                <Check className="w-3 h-3 text-[#24B8FF]" />
                              ) : (
                                <Check className="w-3 h-3 text-[#D4AF37]" />
                              )}
                              <span>
                                {category.id === 'interests' ? 'Active Pursuit' : 'Core Competency'}
                              </span>
                            </span>
                            <span className={isTechnical ? 'text-[#24B8FF] font-mono text-[9px]' : 'text-[#D4AF37] opacity-60'}>
                              {isTechnical ? 'CAD · SPEC' : 'GP · ME'}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Category Footnote */}
                <div className="mt-4 pt-3 border-t border-[#D4AF37]/10 flex items-center justify-between text-xs font-mono text-[#A8988B]">
                  <span>
                    {category.id === 'interests'
                      ? 'Athletic discipline & mechanical balance'
                      : 'Focus: Hands-on laboratory & technical application'}
                  </span>
                  <span className="text-[#D4AF37]">{category.skills.length} competencies</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
