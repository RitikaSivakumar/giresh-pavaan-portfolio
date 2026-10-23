import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { Terminal, Cpu, Users, Wrench, Check } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

export const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'software':
        return <Terminal className="w-5 h-5 text-[#22D3EE]" />;
      case 'fundamentals':
        return <Cpu className="w-5 h-5 text-[#3B82F6]" />;
      case 'professional':
        return <Users className="w-5 h-5 text-[#60A5FA]" />;
      default:
        return <Wrench className="w-5 h-5 text-[#3B82F6]" />;
    }
  };

  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-[#07111F] border-t border-[#243B53] overflow-hidden">
      {/* Background radial blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#3B82F6]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#243B53] bg-[#10243A] text-[11px] font-mono text-[#60A5FA] tracking-[0.25em] uppercase shadow-xs">
            <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full shadow-[0_0_6px_#3B82F6]" />
            04 / TECHNICAL ARSENAL
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F1F5F9] uppercase tracking-tight leading-[1.05]">
            TOOLS OF{' '}
            <span className="font-serif italic font-normal text-gradient-electric">
              THE TRADE.
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#A7B4C7] leading-relaxed font-sans">
            A transparent and realistic inventory of software competencies, core mechanical sciences, and professional collaboration capabilities acquired through secondary schooling and foundational engineering study.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const isWide = catIdx === 0;
            return (
              <div
                key={category.id}
                className={`${
                  isWide ? 'lg:col-span-12 xl:col-span-12' : 'lg:col-span-6'
                } p-6 sm:p-8 rounded-sm bg-[#0B192B] border border-[#243B53] shadow-[0_15px_40px_rgba(7,17,31,0.9)] relative group flex flex-col justify-between`}
              >
                {/* Corner Metallic Clips */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#3B82F6]" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#3B82F6]" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#3B82F6]" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#3B82F6]" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-[#243B53]">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xs bg-[#10243A] border border-[#243B53]">
                        {getCategoryIcon(category.id)}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#F1F5F9] uppercase font-normal tracking-wide">
                          {category.title}
                        </h3>
                        <p className="font-mono text-xs text-[#60A5FA] tracking-wider uppercase">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#A7B4C7] tracking-widest hidden sm:inline">
                      CAT 0{catIdx + 1}
                    </span>
                  </div>

                  {/* Skills Grid within Category */}
                  <div
                    className={`mt-6 grid grid-cols-1 ${
                      isWide ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'
                    } gap-4`}
                  >
                    {category.skills.map((skill) => {
                      const isHovered = hoveredSkill === skill.name;
                      return (
                        <div
                          key={skill.name}
                          data-cursor-text="SKILL"
                          onMouseEnter={() => {
                            setHoveredSkill(skill.name);
                            playCinemaChime();
                          }}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`p-4 rounded-xs transition-all duration-300 border flex flex-col justify-between min-h-[140px] cursor-pointer ${
                            isHovered
                              ? 'bg-[#10243A] border-[#3B82F6] shadow-[0_5px_20px_rgba(59,130,246,0.25)] -translate-y-1'
                              : 'bg-[#07111F] border-[#243B53] hover:border-[#3B82F6]/60'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-sans font-bold text-sm text-[#F1F5F9] group-hover:text-[#60A5FA] transition-colors">
                                {skill.name}
                              </h4>
                              {skill.level && (
                                <span className="px-2 py-0.5 rounded-xs bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[10px] font-mono text-[#60A5FA] font-semibold tracking-wider shrink-0 uppercase">
                                  {skill.level}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-[#A7B4C7] mt-2 font-sans leading-relaxed">
                              {skill.focusArea}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#243B53]/70 flex items-center justify-between text-[10px] font-mono text-[#A7B4C7]">
                            <span className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-[#22D3EE]" />
                              <span>Verified on Resume</span>
                            </span>
                            <span className="text-[#3B82F6] opacity-70">
                              GP · ME
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Category Footnote */}
                <div className="mt-6 pt-4 border-t border-[#243B53]/70 flex items-center justify-between text-xs font-mono text-[#A7B4C7]">
                  <span>Focus: Hands-on laboratory & technical application</span>
                  <span className="text-[#22D3EE]">{category.skills.length} competencies</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
