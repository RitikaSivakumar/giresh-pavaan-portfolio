import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Compass,
  ShieldCheck,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

interface EvPhoto {
  id: string;
  src: string;
  fallbackSrc: string;
  title: string;
  caption: string;
  phase: string;
}

const EV_PHOTOS: EvPhoto[] = [
  {
    id: 'ev-street-trial',
    src: '/images/ev-project/ev-ride.jpeg',
    fallbackSrc: '/assets/aistudio/WhatsApp_Image_2026-10-26_at_10.16.08_PM_14ab10ed.jpeg',
    title: 'Street Road Trial & Operational Run',
    caption: 'Giresh Pavaan conducting an outdoor test ride on the converted green two-wheeler chassis, validating mechanical balance and drivetrain operation.',
    phase: 'Road Trial · 2019–2023',
  },
  {
    id: 'ev-workshop-assembly',
    src: '/images/ev-project/ev-workshop.jpeg',
    fallbackSrc: '/assets/aistudio/WhatsApp_Image_2026-10-26_at_10.16.08_PM__1__440adf62.jpeg',
    title: 'Hands-On Fabrication & Assembly',
    caption: 'Component mounting, electrical wiring routing, sprocket alignment, and practical mechanical troubleshooting in the home workshop.',
    phase: 'Fabrication & Integration',
  },
];

const FOCUS_AREAS = [
  {
    title: 'Electric Vehicle Conversion',
    icon: Zap,
    description: 'Practical exploration of replacing an internal combustion powertrain with an electric motor setup.',
    color: '#24B8FF',
  },
  {
    title: 'Mechanical and Electrical Component Integration',
    icon: Cpu,
    description: 'Understanding component layout, controller connections, drivetrain chain routing, and mechanical brackets.',
    color: '#D4AF37',
  },
  {
    title: 'Existing Chassis Conversion Concept',
    icon: Layers,
    description: 'Adapting an existing two-wheeler moped chassis structure without permanent structural alteration.',
    color: '#24B8FF',
  },
  {
    title: 'Affordable Electric Mobility',
    icon: Compass,
    description: 'Developing practical, low-cost engineering solutions for accessible, budget-conscious electric transportation.',
    color: '#D4AF37',
  },
  {
    title: 'Hands-On Engineering & Vehicle Modification',
    icon: Wrench,
    description: 'Developing direct physical fabrication skills, mechanical assembly, wiring safety, and practical debugging.',
    color: '#24B8FF',
  },
];

export const EarlyEvProject: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [failedPhotos, setFailedPhotos] = useState<Set<string>>(() => new Set());
  const touchStartX = useRef<number | null>(null);

  const handlePhotoError = (photo: EvPhoto, image: HTMLImageElement) => {
    if (image.dataset.fallbackAttempted !== 'true') {
      image.dataset.fallbackAttempted = 'true';
      image.src = photo.fallbackSrc;
      return;
    }
    setFailedPhotos((previous) => new Set(previous).add(photo.id));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    const endX = e.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined || Math.abs(endX - startX) < 50) return;
    if (endX < startX) showNext();
    else showPrev();
  };

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    playCinemaChime();
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % EV_PHOTOS.length);
      playCinemaChime();
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + EV_PHOTOS.length) % EV_PHOTOS.length);
      playCinemaChime();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  return (
    <section
      id="ev-conversion"
      className="relative py-16 sm:py-20 bg-[#050505] border-t border-[#D4AF37]/20 overflow-hidden text-[#E8DFD8]"
    >
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #24B8FF 1px, transparent 1px),
                            linear-gradient(to bottom, #24B8FF 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient gradient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#24B8FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111318] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono tracking-wider mb-5">
            <Zap className="w-3.5 h-3.5 text-[#24B8FF] animate-pulse" />
            <span>03 / EARLY ENGINEERING SPOTLIGHT · 2019 – SEPTEMBER 2023</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4">
            Early Electric Vehicle <span className="text-[#D4AF37]">Conversion Project</span>
          </h2>

          <p className="text-lg sm:text-xl font-sans italic text-[#24B8FF] tracking-wide font-light">
            An Early Hands-On Engineering Project
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs font-mono text-[#A8988B]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> 2019 – September 2023
            </span>
            <span>•</span>
            <span className="text-[#24B8FF]">Self-Initiated Practical Journey</span>
          </div>
        </div>

        {/* Hero Card: Two-Column Showcase (Editorial Narrative + 2 Authentic Photographs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start mb-10">
          {/* Left Column: Authentic Project Narrative & Core Engineering Genesis */}
          <div className="interactive-card lg:col-span-5 flex flex-col bg-[#0B0B0D] border border-[#D4AF37]/25 rounded-sm p-5 sm:p-6 relative shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />

            <div>
              <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-3 mb-4">
                <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#24B8FF]" /> FOUNDATIONAL GENESIS
                </span>
                <span className="px-2 py-0.5 rounded bg-[#10233F] border border-[#24B8FF]/40 text-[10px] font-mono text-[#24B8FF]">
                  ORIGINAL BUILD
                </span>
              </div>

              {/* Exact user-provided description */}
              <div className="relative pl-4 border-l-2 border-[#D4AF37]/60 mb-4">
                <p className="text-base sm:text-lg leading-relaxed text-[#E8DFD8]/95 font-sans font-light">
                  &ldquo;This project represents an early hands-on engineering journey focused on converting a conventional two-wheeler into an electric vehicle. The work involved exploring an electric conversion using the existing vehicle chassis, understanding the arrangement of electrical and mechanical components, and working toward an affordable conversion concept. This early experience helped develop an interest in mechanical systems, electric mobility, practical engineering, and vehicle modification.&rdquo;
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <p className="text-xs uppercase font-mono tracking-widest text-[#A8988B]">Key Engineering Milestones:</p>
                <ul className="space-y-2.5 text-xs text-[#C5B8AC] font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Conceived and fabricated during his school years starting in 2019 through September 2023.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#24B8FF] shrink-0 mt-0.5" />
                    <span>Transformed theoretical curiosities into tangible workshop experiments and physical assembly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Served as the direct catalyst for choosing Mechanical Engineering and Automotive/CAD design at MCET.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-mono text-[#A8988B]">
              <span>VERIFIED ORIGINAL PHOTOGRAPHS</span>
              <span className="text-[#D4AF37]">CLICK PHOTO TO ENLARGE</span>
            </div>
          </div>

          {/* Right Column: 2 Authentic Uploaded Photographs with interactive viewer */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {EV_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                data-sound="transition"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${photo.title} photograph fullscreen`}
                style={{ '--reveal-index': idx } as React.CSSProperties}
                className="interactive-card reveal-card group relative bg-[#111318] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-500 rounded-sm overflow-hidden flex flex-col cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Photo container */}
                <div className="relative w-full overflow-hidden bg-black">
                  {failedPhotos.has(photo.id) ? (
                    <div className="p-5 text-center text-xs font-mono text-[#D4AF37]" role="img" aria-label={`${photo.title} photograph unavailable`}>
                      PHOTOGRAPH UNAVAILABLE
                    </div>
                  ) : <img
                    src={photo.src}
                    alt={photo.title}
                    onError={(e) => handlePhotoError(photo, e.currentTarget)}
                    className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />}

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Top badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-sm border border-[#D4AF37]/50 text-[10px] font-mono text-[#D4AF37]">
                      {photo.phase}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-black/80 backdrop-blur-sm border border-[#24B8FF]/50 flex items-center justify-center text-[#24B8FF] group-hover:bg-[#24B8FF] group-hover:text-black transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {photo.title}
                    </h3>
                  </div>
                </div>

                {/* Card Description */}
                <div className="p-3 sm:p-4 bg-[#0B0B0D] border-t border-[#D4AF37]/15">
                  <p className="text-xs text-[#A8988B] leading-relaxed line-clamp-3">
                    {photo.caption}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#24B8FF]">
                    <span>PHOTO 0{idx + 1} OF 02</span>
                    <span className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      VIEW FULLSCREEN &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Focus Areas Grid (The 5 exact core domains) */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-[#24B8FF] tracking-widest uppercase">
              // CORE ENGINEERING PILLARS
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Project Focus Areas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FOCUS_AREAS.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className={`bg-[#0B0B0D] border border-[#D4AF37]/20 hover:border-[#D4AF37] p-5 sm:p-6 rounded-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.08)] ${
                    idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center border"
                      style={{
                        backgroundColor: `${area.color}15`,
                        borderColor: `${area.color}50`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: area.color }} />
                    </div>
                    <span className="text-[10px] font-mono text-[#A8988B]">0{idx + 1} // AREA</span>
                  </div>

                  <h4 className="text-base font-semibold text-white mb-2 leading-snug">
                    {area.title}
                  </h4>

                  <p className="text-xs text-[#A8988B] leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Notice on Exploratory Nature */}
        <div className="mt-12 p-4 rounded-sm bg-[#111318] border border-[#24B8FF]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A8988B]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#24B8FF] shrink-0" />
            <span>Documented as an authentic personal early engineering exploration (2019 – September 2023).</span>
          </div>
          <span className="text-[#D4AF37] shrink-0 font-medium">Hands-On Foundation</span>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-[#111318] border border-[#D4AF37]/50 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={showPrev}
            aria-label="Previous photograph"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#111318]/90 border border-[#D4AF37]/40 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={showNext}
            aria-label="Next photograph"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#111318]/90 border border-[#D4AF37]/40 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center bg-[#0B0B0D] border border-[#D4AF37]/35 rounded-sm overflow-hidden shadow-2xl"
          >
            <div className="w-full max-h-[70vh] flex items-center justify-center bg-black/80 overflow-hidden">
              {failedPhotos.has(EV_PHOTOS[selectedPhotoIndex].id) ? (
                <div className="p-6 text-center text-sm font-mono text-[#D4AF37]">PHOTOGRAPH UNAVAILABLE</div>
              ) : <img
                src={EV_PHOTOS[selectedPhotoIndex].src}
                alt={EV_PHOTOS[selectedPhotoIndex].title}
                onError={(e) => handlePhotoError(EV_PHOTOS[selectedPhotoIndex], e.currentTarget)}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />}
            </div>

            {/* Modal Caption Footer */}
            <div className="w-full p-4 sm:p-6 bg-[#0B0B0D] border-t border-[#D4AF37]/20 text-left">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#10233F] border border-[#24B8FF]/40 text-[10px] font-mono text-[#24B8FF]">
                  {EV_PHOTOS[selectedPhotoIndex].phase}
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">
                  PHOTO 0{selectedPhotoIndex + 1} OF 0{EV_PHOTOS.length}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {EV_PHOTOS[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A8988B] mt-1 font-sans">
                {EV_PHOTOS[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
