import React, { useState, useEffect } from 'react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData.ts';
import { AchievementCertificate } from '../types/index.ts';
import { Award, Trophy, Calendar, Building, Sparkles, X, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';
import { motion, AnimatePresence } from 'motion/react';

export const Achievements: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<AchievementCertificate | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openModal = (cert: AchievementCertificate, index: number) => {
    setSelectedCert(cert);
    setSelectedIndex(index);
    playCinemaChime();
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (selectedIndex + 1) % ACHIEVEMENTS_DATA.length;
    setSelectedIndex(nextIdx);
    setSelectedCert(ACHIEVEMENTS_DATA[nextIdx]);
    playCinemaChime();
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const prevIdx = (selectedIndex - 1 + ACHIEVEMENTS_DATA.length) % ACHIEVEMENTS_DATA.length;
    setSelectedIndex(prevIdx);
    setSelectedCert(ACHIEVEMENTS_DATA[prevIdx]);
    playCinemaChime();
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCert) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert, selectedIndex]);

  return (
    <section
      id="achievements"
      className="py-24 lg:py-32 relative bg-[#050505] border-t border-[#D4AF37]/20 overflow-hidden select-none"
    >
      {/* Background radial gold glow */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-[#D4AF37]/4 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D4AF37]/20">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#D4AF37]/30 bg-[#111318] text-[11px] font-mono text-[#D4AF37] tracking-[0.25em] uppercase">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              04 / ACHIEVEMENTS & CERTIFICATIONS
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#E8DFD8] uppercase tracking-tight leading-[1.05]">
              PROVEN MERIT &{' '}
              <span className="font-serif italic font-normal text-gradient-gold">
                CREDENTIALS.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#A8988B] leading-relaxed font-sans">
              Verified symposium paper presentations, industrial workshop certifications, and competition accolades across collegiate engineering milestones.
            </p>
          </div>

          <div className="shrink-0 p-3.5 rounded-xs bg-[#111318] border border-[#D4AF37]/30 text-right">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">
              TOTAL ACCREDITATIONS
            </span>
            <span className="font-serif text-lg text-[#E8DFD8]">
              07 VERIFIED CERTIFICATIONS
            </span>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {ACHIEVEMENTS_DATA.map((cert, idx) => {
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => openModal(cert, idx)}
                data-cursor-text="VIEW"
                className={`group relative rounded-sm bg-[#111318] border transition-all duration-400 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between cursor-pointer ${
                  cert.isFirstPlace
                    ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2)]'
                    : 'border-[#D4AF37]/25 hover:border-[#D4AF37] hover:-translate-y-1'
                }`}
              >
                {/* Corner Metallic Clips */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4AF37] z-10" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#D4AF37] z-10" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#D4AF37] z-10" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4AF37] z-10" />

                {/* Certificate Thumbnail Preview */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#070709] border-b border-[#D4AF37]/15 flex items-center justify-center p-3">
                  <img
                    src={cert.imageSrc}
                    alt={cert.title}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-103 filter contrast-[1.03] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
                  />

                  {/* Gradient overlay for subtle edge blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    {/* Blue technical indicator */}
                    <span className="px-2.5 py-1 rounded-xs bg-[#10233F]/90 border border-[#24B8FF]/40 text-[#24B8FF] text-[9px] font-mono font-bold tracking-widest uppercase backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#24B8FF] animate-pulse" />
                      {cert.category}
                    </span>
                    {cert.isFirstPlace && (
                      <span className="px-2.5 py-1 rounded-xs bg-[#D4AF37] text-black text-[9px] font-mono font-bold tracking-widest uppercase flex items-center gap-1 shadow-md">
                        <Trophy className="w-3 h-3 fill-black text-black" />
                        <span>FIRST PRIZE</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-0.5 rounded-xs bg-[#050505]/90 border border-[#D4AF37]/30 text-[9px] font-mono text-[#A8988B] tracking-widest">
                      {cert.number} / 07
                    </span>
                  </div>

                  {/* Click to inspect prompt on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/65 backdrop-blur-xs z-10">
                    <span className="px-3.5 py-1.5 rounded-xs border border-[#D4AF37] text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase bg-[#14110E]/95 flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      <ExternalLink className="w-3 h-3 text-[#24B8FF]" />
                      INSPECT CERTIFICATE
                    </span>
                  </div>
                </div>

                {/* Editorial Details Below Thumbnail */}
                <div className="p-5 sm:p-6 space-y-3 bg-[#111318] flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase">
                      <Calendar className="w-3 h-3 text-[#D4AF37] shrink-0" />
                      <span>{cert.date}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl text-[#E8DFD8] font-normal uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-[#D4AF37]/90 font-mono flex items-start gap-1.5 leading-relaxed">
                      <Building className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{cert.organizer}</span>
                    </p>

                    <p className="text-xs text-[#A8988B] font-sans leading-relaxed pt-1 line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D4AF37]/10 flex items-center justify-between text-[10px] font-mono text-[#A8988B]">
                    <span className="flex items-center gap-1 text-[#24B8FF]">
                      <ShieldCheck className="w-3 h-3 text-[#24B8FF]" />
                      <span>{cert.badge}</span>
                    </span>
                    <span className="text-[#D4AF37]">
                      CERTIFIED · VERIFIED
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Certificate Inspection Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6 md:p-10 animate-fade-in"
            onClick={closeModal}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-sm bg-[#111318] border border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
            >
              {/* Corner Metallic Clips */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37] z-20" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37] z-20" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37] z-20" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37] z-20" />

              {/* Modal Header Bar */}
              <div className="p-4 sm:p-5 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#0B0B0D] z-10">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-xs bg-[#10233F] border border-[#24B8FF]/40 text-[10px] font-mono text-[#24B8FF] uppercase font-bold tracking-widest">
                    {selectedCert.category}
                  </span>
                  <span className="text-xs font-mono text-[#A8988B] hidden sm:inline">
                    CREDENTIAL {selectedCert.number} OF 07
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#A8988B] hidden md:inline">
                    USE [←] [→] KEYS OR [ESC] TO CLOSE
                  </span>
                  <button
                    onClick={closeModal}
                    aria-label="Close Certificate Modal"
                    className="p-1.5 rounded-xs border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#A8988B] hover:text-[#D4AF37] transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Scrollable Image + Metadata */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Full Aspect Certificate View with Navigation Controls */}
                <div className="relative w-full rounded-xs overflow-hidden border border-[#D4AF37]/30 bg-[#070709] min-h-[300px] sm:min-h-[420px] max-h-[65vh] flex items-center justify-center p-3 sm:p-5">
                  <img
                    src={selectedCert.imageSrc}
                    alt={selectedCert.title}
                    className="max-w-full max-h-[58vh] object-contain filter contrast-[1.02] drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]"
                  />

                  {/* Previous / Next Arrow Controls */}
                  <button
                    onClick={showPrev}
                    aria-label="Previous Certificate"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xs bg-black/85 hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/50 text-[#D4AF37] transition-all cursor-pointer shadow-xl z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={showNext}
                    aria-label="Next Certificate"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xs bg-black/85 hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/50 text-[#D4AF37] transition-all cursor-pointer shadow-xl z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Open in full tab button */}
                  <a
                    href={selectedCert.imageSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xs bg-black/85 border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-1.5 shadow-lg z-10"
                  >
                    <ExternalLink className="w-3 h-3 text-[#24B8FF]" />
                    VIEW ORIGINAL FULL-RES
                  </a>
                </div>

                {/* Metadata Sheet */}
                <div className="space-y-4 p-5 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/20">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#E8DFD8] font-normal uppercase tracking-wide">
                      {selectedCert.title}
                    </h3>
                    {selectedCert.badge && (
                      <span className="px-3 py-1 rounded-xs bg-[#10233F]/80 border border-[#24B8FF]/50 text-xs font-mono text-[#24B8FF] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#24B8FF]" />
                        {selectedCert.badge}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-[#D4AF37]/15">
                    <div>
                      <span className="text-[#A8988B] block text-[10px]">EVENT & SYMPOSIUM</span>
                      <span className="text-[#E8DFD8]">{selectedCert.event}</span>
                    </div>
                    <div>
                      <span className="text-[#A8988B] block text-[10px]">ORGANIZING ENTITY</span>
                      <span className="text-[#D4AF37]">{selectedCert.organizer}</span>
                    </div>
                    <div>
                      <span className="text-[#A8988B] block text-[10px]">CONFERRAL DATE</span>
                      <span className="text-[#E8DFD8]">{selectedCert.date}</span>
                    </div>
                    <div>
                      <span className="text-[#A8988B] block text-[10px]">RECIPIENT & STATUS</span>
                      <span className="text-[#24B8FF] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#24B8FF]" />
                        Giresh Pavaan S K · Verified
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#A8988B] font-sans leading-relaxed pt-2 border-t border-[#D4AF37]/10">
                    {selectedCert.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
