import React, { useState } from 'react';
import { ABOUT_CONTENT, PERSONAL_INFO } from '../data/portfolioData.ts';
import { MapPin, GraduationCap, Languages, Compass, ArrowRight, ShieldCheck, Mail, Phone, Linkedin, ExternalLink } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

export const About: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative bg-[#0B0B0D] border-t border-[#D4AF37]/20 overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#D4AF37]/30 bg-[#111318] text-[11px] font-mono text-[#D4AF37] tracking-[0.25em] uppercase font-bold shadow-xs">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
            {ABOUT_CONTENT.label}
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#E8DFD8] uppercase tracking-tight leading-[1.05]">
            THE MIND BEHIND{' '}
            <span className="font-serif italic font-normal text-gradient-gold">
              THE MACHINE.
            </span>
          </h2>

          <div className="pt-1">
            <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase font-bold block mb-1">
              CAREER OBJECTIVE
            </span>
            <p className="text-base sm:text-lg lg:text-xl text-[#E8DFD8] leading-relaxed font-sans max-w-3xl">
              {ABOUT_CONTENT.careerObjective}
            </p>
          </div>
        </div>

        {/* Two-Column Editorial Layout - Natural height flow without excessive void */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* Left Metadata & Personal Spec Sheet (~5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-sm bg-[#111318] border border-[#D4AF37]/25 shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex flex-col gap-4 relative group backdrop-blur-md">
            {/* Corner metallic clips */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4AF37]" />

            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-[#D4AF37]/20">
              <div className="w-16 h-16 rounded-xs p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#8C6D4F] shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
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
                <h3 className="font-serif text-lg sm:text-xl text-[#E8DFD8] font-normal uppercase tracking-wide">
                  {PERSONAL_INFO.fullName}
                </h3>
                <p className="font-mono text-xs text-[#D4AF37] tracking-wider uppercase mt-0.5 font-semibold">
                  {PERSONAL_INFO.title}
                </p>
                <p className="text-[11px] font-mono text-[#A8988B] mt-0.5">
                  {PERSONAL_INFO.institution}
                </p>
              </div>
            </div>

            {/* Education Spec */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2 font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Program & College</span>
              </span>
              <p className="text-sm font-semibold text-[#E8DFD8]">
                {PERSONAL_INFO.degree}
              </p>
              <p className="text-xs text-[#A8988B]">
                {PERSONAL_INFO.institution} ({PERSONAL_INFO.batch})
              </p>
            </div>

            {/* Residence & Location */}
            <div className="space-y-1 pt-3 border-t border-[#D4AF37]/15">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2 font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Residential Location</span>
              </span>
              <p className="text-xs text-[#E8DFD8] leading-relaxed">
                {PERSONAL_INFO.address}
              </p>
            </div>

            {/* Verified Languages */}
            <div className="space-y-1.5 pt-3 border-t border-[#D4AF37]/15">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2 font-bold">
                <Languages className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Languages Known</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {PERSONAL_INFO.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/20 text-center"
                  >
                    <span className="block text-xs font-semibold text-[#E8DFD8]">
                      {lang.split(' ')[0]}
                    </span>
                    <span className="block text-[10px] text-[#A8988B] font-mono">
                      {lang.match(/\((.*?)\)/)?.[1] || 'Fluent'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Quick Contact Information */}
            <div className="space-y-2 pt-3 border-t border-[#D4AF37]/15">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block font-bold">
                Direct Contact Channels
              </span>
              <div className="flex flex-col gap-2 text-xs font-mono text-[#A8988B]">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-2 hover:text-[#24B8FF] transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-2 hover:text-[#24B8FF] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#D4AF37] hover:text-[#24B8FF] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">linkedin.com/in/giresh-pavaan-38b58a235</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>

            {/* Availability Indicator - Aligned closely to preceding contact information */}
            <div className="mt-1 p-3.5 rounded-xs bg-[#10233F]/85 border border-[#24B8FF]/40 text-xs font-mono text-[#24B8FF] flex items-center gap-2.5 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#24B8FF] shrink-0" />
              <span>Seeking internship & practical mechanical engineering project collaborations.</span>
            </div>
          </div>

          {/* Right Areas of Interest (~7 cols) */}
          <div className="lg:col-span-7 space-y-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20">
              <span className="font-mono text-xs text-[#D4AF37] tracking-[0.2em] uppercase font-bold">
                AREAS OF INTEREST
              </span>
              <span className="font-mono text-[11px] text-[#A8988B]">
                Core Mechanical Engineering Focus
              </span>
            </div>
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
                  className={`p-5 sm:p-6 rounded-xs transition-all duration-300 relative cursor-pointer border ${
                    isActive
                      ? 'bg-[#111318] border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.18)] translate-x-1'
                      : 'bg-[#111318]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-[#D4AF37] tracking-[0.2em] font-bold">
                      FOCUS AREA 0{idx + 1}
                    </span>
                    <Compass className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-[#24B8FF] rotate-90 scale-110' : 'text-[#D4AF37]'}`} />
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl text-[#E8DFD8] font-normal uppercase tracking-wide mt-1.5">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#A8988B] mt-1.5 font-sans leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#E8DFD8]/90">{pillar.detail}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1.5 text-[#24B8FF]' : 'text-[#D4AF37]'}`} />
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
