import React, { useState } from 'react';
import { ABOUT_CONTENT, PERSONAL_INFO } from '../data/portfolioData.ts';
import { MapPin, GraduationCap, Languages, Compass, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

export const About: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 lg:py-32 relative bg-[#07111F] border-t border-[#243B53] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#3B82F6]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#22D3EE]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#243B53] bg-[#10243A] text-[11px] font-mono text-[#60A5FA] tracking-[0.25em] uppercase shadow-xs">
            <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full shadow-[0_0_6px_#3B82F6]" />
            {ABOUT_CONTENT.label}
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F1F5F9] uppercase tracking-tight leading-[1.05]">
            THE MIND BEHIND{' '}
            <span className="font-serif italic font-normal text-gradient-electric">
              THE MACHINE.
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-[#A7B4C7] leading-relaxed font-sans max-w-3xl pt-2">
            {ABOUT_CONTENT.description}
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-stretch">
          {/* Left Metadata & Personal Spec Sheet (~5 cols) */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-sm bg-[#0B192B] border border-[#243B53] shadow-[0_15px_40px_rgba(7,17,31,0.9)] flex flex-col justify-between space-y-6 relative group">
            {/* Corner metallic clips */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#3B82F6]" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#3B82F6]" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#3B82F6]" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#3B82F6]" />

            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-5 border-b border-[#243B53]">
                <div className="w-16 h-16 rounded-xs p-0.5 bg-gradient-to-tr from-[#3B82F6] to-[#22D3EE] shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                  <img
                    src={PERSONAL_INFO.profilePhoto}
                    alt={PERSONAL_INFO.fullName}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('WhatsApp')) {
                        target.src = '/assets/aistudio/WhatsApp_Image_2026-10-23_at_6.38.32_PM_afd9bf78.jpeg';
                      }
                    }}
                    className="w-full h-full object-cover object-[center_18%] rounded-xs filter contrast-105"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#F1F5F9] font-normal uppercase tracking-wide">
                    {PERSONAL_INFO.fullName}
                  </h3>
                  <p className="font-mono text-xs text-[#60A5FA] tracking-wider uppercase mt-0.5">
                    {PERSONAL_INFO.title}
                  </p>
                  <p className="text-[11px] font-mono text-[#A7B4C7] mt-0.5">
                    Dr. Mahalingam College of Engineering
                  </p>
                </div>
              </div>

              {/* Education Spec */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Program & College</span>
                </span>
                <p className="text-sm font-semibold text-[#F1F5F9]">
                  {PERSONAL_INFO.degree}
                </p>
                <p className="text-xs text-[#A7B4C7]">
                  {PERSONAL_INFO.institution} ({PERSONAL_INFO.batch})
                </p>
              </div>

              {/* Residence & Location */}
              <div className="space-y-1.5 pt-3 border-t border-[#243B53]/70">
                <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Residential Location</span>
                </span>
                <p className="text-xs text-[#F1F5F9] leading-relaxed">
                  {PERSONAL_INFO.address}
                </p>
              </div>

              {/* Verified Languages */}
              <div className="space-y-2 pt-3 border-t border-[#243B53]/70">
                <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Languages Known</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {PERSONAL_INFO.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xs bg-[#10243A] border border-[#243B53] text-center"
                    >
                      <span className="block text-xs font-semibold text-[#F1F5F9]">
                        {lang.split(' ')[0]}
                      </span>
                      <span className="block text-[10px] text-[#A7B4C7] font-mono">
                        {lang.match(/\((.*?)\)/)?.[1] || 'Fluent'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Quick Contact */}
              <div className="space-y-2 pt-3 border-t border-[#243B53]/70">
                <div className="flex flex-col gap-1.5 text-xs font-mono text-[#A7B4C7]">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>{PERSONAL_INFO.email}</span>
                  </a>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Indicator */}
            <div className="p-3.5 rounded-xs bg-[#10243A] border border-[#3B82F6]/40 text-xs font-mono text-[#60A5FA] flex items-center gap-2.5 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#22D3EE] shrink-0" />
              <span>Seeking internship & practical mechanical engineering project collaborations.</span>
            </div>
          </div>

          {/* Right 3 Engineering Focus Pillars (~7 cols) */}
          <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
            {ABOUT_CONTENT.highlights.map((pillar, idx) => {
              const isActive = activeHighlight === idx;
              return (
                <div
                  key={pillar.title}
                  onMouseEnter={() => {
                    setActiveHighlight(idx);
                    playCinemaChime();
                  }}
                  onMouseLeave={() => setActiveHighlight(null)}
                  className={`p-6 sm:p-7 rounded-xs transition-all duration-300 relative cursor-pointer border ${
                    isActive
                      ? 'bg-[#10243A] border-[#3B82F6] shadow-[0_10px_35px_rgba(59,130,246,0.2)] translate-x-1'
                      : 'bg-[#0B192B] border-[#243B53] hover:border-[#3B82F6]/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-[#22D3EE] tracking-[0.2em] font-semibold">
                      FOCUS AREA 0{idx + 1}
                    </span>
                    <Compass className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-[#60A5FA] rotate-90' : 'text-[#243B53]'}`} />
                  </div>

                  <h4 className="font-serif text-2xl sm:text-3xl text-[#F1F5F9] font-normal uppercase tracking-wide mt-2">
                    {pillar.title}
                  </h4>

                  <p className="text-sm sm:text-base text-[#A7B4C7] mt-2 font-sans leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#243B53]/70 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F1F5F9]/90">{pillar.detail}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-[#60A5FA]' : 'text-[#243B53]'}`} />
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
