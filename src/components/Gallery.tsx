import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS } from '../data/portfolioData.ts';
import { GalleryPhoto } from '../types/index.ts';
import { Camera, X, ChevronLeft, ChevronRight, ExternalLink, RefreshCw, Eye } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [swirlKey, setSwirlKey] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const openLightbox = (photo: GalleryPhoto, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
    playCinemaChime();
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (selectedIndex + 1) % GALLERY_PHOTOS.length;
    setSelectedIndex(nextIdx);
    setSelectedPhoto(GALLERY_PHOTOS[nextIdx]);
    playCinemaChime();
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const prevIdx = (selectedIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    setSelectedIndex(prevIdx);
    setSelectedPhoto(GALLERY_PHOTOS[prevIdx]);
    playCinemaChime();
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, selectedIndex]);

  // Object position fine-tuning to preserve original proportions and avoid cropping faces
  const getObjectPosition = (id: string) => {
    switch (id) {
      case 'photo-checkered-outdoor':
        return 'center 12%';
      case 'photo-perspective-balcony':
        return 'center 14%';
      case 'photo-studio-headshot':
        return 'center 10%';
      case 'photo-executive-blazer':
        return 'center 16%';
      default:
        return 'center 15%';
    }
  };

  // 3D spiral / swirl entrance animation calculation for each card
  const getSpiralVariant = (idx: number): Variants => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: idx * 0.1 },
        },
      };
    }

    // Staggered spiral angular offset across the 4 cards
    const angleOffsets = [-18, 14, -14, 18];
    const xOffsets = [-35, -15, 15, 35];
    const yOffsets = [30, 45, 45, 30];

    return {
      hidden: {
        opacity: 0,
        x: xOffsets[idx] ?? 0,
        y: yOffsets[idx] ?? 40,
        z: -120,
        rotateY: angleOffsets[idx] ?? 0,
        rotateX: 10,
        rotateZ: (idx % 2 === 0 ? -1 : 1) * 3,
        scale: 0.92,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        scale: 1,
        transition: {
          type: 'spring' as const,
          stiffness: 70,
          damping: 14,
          delay: idx * 0.12,
        },
      },
    };
  };

  return (
    <section
      id="gallery"
      className="py-24 lg:py-32 relative bg-[#050505] border-t border-[#D4AF37]/20 overflow-hidden select-none"
    >
      {/* Background radial gold glow & subtle electric blue technical accent */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-[#24B8FF]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D4AF37]/20">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#D4AF37]/30 bg-[#111318] text-[11px] font-mono text-[#D4AF37] tracking-[0.25em] uppercase font-bold">
              <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
              07 / PHOTO GALLERY
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#E8DFD8] uppercase tracking-tight leading-[1.05]">
              PHOTOGRAPH{' '}
              <span className="font-serif italic font-normal text-gradient-gold">
                ARCHIVE.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#A8988B] leading-relaxed font-sans">
              Authentic photographs of Giresh Pavaan S K. Interactive gallery featuring smooth 3D swirl reveal motion and high-resolution fullscreen inspection.
            </p>
          </div>

          {/* Interactive Replay 3D Swirl & Collection Metadata */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSwirlKey((prev) => prev + 1);
                playCinemaChime();
              }}
              data-cursor-text="REPLAY"
              className="py-3 px-4 rounded-xs border border-[#D4AF37]/40 bg-[#14110E] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-mono text-[11px] tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REPLAY 3D SWIRL</span>
            </button>

            <div className="shrink-0 p-3.5 rounded-xs bg-[#111318] border border-[#D4AF37]/30 text-right">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">
                PHOTOGRAPHS
              </span>
              <span className="font-serif text-lg text-[#E8DFD8]">
                {String(GALLERY_PHOTOS.length).padStart(2, '0')} VERIFIED IMAGES
              </span>
            </div>
          </div>
        </div>

        {/* 3D Perspective Stage Container */}
        <div
          key={swirlKey}
          style={{ perspective: '1600px' }}
          className="mt-14"
        >
          {/* Responsive 4-Column Balanced Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch">
            {GALLERY_PHOTOS.map((photo, idx) => {
              const spiral = getSpiralVariant(idx);
              return (
                <motion.div
                  key={photo.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={spiral}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.03,
                          z: 35,
                          rotateY: (idx % 2 === 0 ? -2 : 2),
                          rotateX: 2,
                          transition: { duration: 0.3 },
                        }
                  }
                  onClick={() => openLightbox(photo, idx)}
                  style={{ transformStyle: 'preserve-3d' }}
                  data-cursor-text="EXPAND"
                  className="group relative rounded-sm bg-[#111318] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-500 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.3)] flex flex-col justify-between cursor-pointer"
                >
                  {/* Corner Metallic Clips */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37] z-20" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37] z-20" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37] z-20" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37] z-20" />

                  {/* Portrait Frame with Native Aspect Ratio */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#070709]">
                    <img
                      src={photo.src}
                      alt={`Photograph 0${idx + 1}`}
                      loading="eager"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (photo.fallbackSrc && target.src !== photo.fallbackSrc) {
                          target.src = photo.fallbackSrc;
                        }
                      }}
                      style={{ objectPosition: getObjectPosition(photo.id) }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 filter contrast-[1.02]"
                    />

                    {/* Gradient overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                    {/* Simple Top Number Indicator */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-xs bg-[#111318]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-xs">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-xs z-10">
                      <span className="px-3.5 py-1.5 rounded-xs border border-[#D4AF37] text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase bg-[#14110E]/95 flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        CLICK TO EXPAND
                      </span>
                    </div>
                  </div>

                  {/* Clean, Non-Fictional Bottom Bar */}
                  <div className="p-4 bg-[#111318] border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#E8DFD8] font-semibold tracking-wider">
                      PHOTOGRAPH 0{idx + 1}
                    </span>
                    <span className="text-[#A8988B] group-hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[11px]">
                      <span>EXPAND</span>
                      <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal with Zoom & Controls */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-6 md:p-8 animate-fade-in"
            onClick={closeLightbox}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', stiffness: 130, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[95vh] flex flex-col rounded-sm bg-[#111318] border border-[#D4AF37]/60 shadow-[0_25px_80px_rgba(0,0,0,0.98)] overflow-hidden"
            >
              {/* Corner Metallic Clips */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37] z-30" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37] z-30" />
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37] z-30" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37] z-30" />

              {/* Modal Top Header Bar */}
              <div className="p-4 sm:p-5 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#0B0B0D] z-20">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-xs bg-[#111318] border border-[#D4AF37]/50 text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest">
                    0{selectedIndex + 1} / 0{GALLERY_PHOTOS.length}
                  </span>
                  <span className="text-xs font-mono text-[#E8DFD8]">
                    PHOTOGRAPH 0{selectedIndex + 1}
                  </span>
                  {selectedPhoto.filename && (
                    <span className="text-[10px] font-mono text-[#A8988B] hidden md:inline truncate max-w-xs">
                      · {selectedPhoto.filename}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#A8988B] hidden md:inline">
                    NAVIGATE [←] [→] · CLOSE [ESC]
                  </span>
                  <button
                    onClick={closeLightbox}
                    aria-label="Close Lightbox"
                    className="p-1.5 rounded-xs border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#A8988B] hover:text-[#D4AF37] transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 bg-[#050505] p-2 sm:p-4 flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[460px] max-h-[64vh]">
                <motion.img
                  key={selectedPhoto.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  src={selectedPhoto.src}
                  alt={`Photograph 0${selectedIndex + 1}`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (selectedPhoto.fallbackSrc && target.src !== selectedPhoto.fallbackSrc) {
                      target.src = selectedPhoto.fallbackSrc;
                    }
                  }}
                  className="max-w-full max-h-[58vh] object-contain filter contrast-[1.02] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
                />

                {/* Previous Button */}
                <button
                  onClick={showPrev}
                  aria-label="Previous Photograph"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xs bg-black/85 hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/50 text-[#D4AF37] transition-all cursor-pointer shadow-xl z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  onClick={showNext}
                  aria-label="Next Photograph"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xs bg-black/85 hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/50 text-[#D4AF37] transition-all cursor-pointer shadow-xl z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Full Resolution Link */}
                <a
                  href={selectedPhoto.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3 py-1 rounded-xs bg-black/85 border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-1.5 shadow-lg z-20"
                >
                  <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                  FULL RESOLUTION
                </a>
              </div>

              {/* Bottom Filmstrip */}
              <div className="p-4 bg-[#0B0B0D] border-t border-[#D4AF37]/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm sm:text-base text-[#E8DFD8] uppercase tracking-wide">
                    GIRESH PAVAAN S K
                  </span>
                  <span className="text-xs font-mono text-[#D4AF37]">
                    PHOTOGRAPH 0{selectedIndex + 1}
                  </span>
                </div>

                {/* Filmstrip selector: all 4 portraits */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  {GALLERY_PHOTOS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPhoto(p);
                        setSelectedIndex(idx);
                        playCinemaChime();
                      }}
                      className={`relative shrink-0 w-12 h-12 rounded-xs overflow-hidden border transition-all cursor-pointer ${
                        selectedIndex === idx
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105'
                          : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={p.src}
                        alt={`Thumbnail 0${idx + 1}`}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (p.fallbackSrc && target.src !== p.fallbackSrc) {
                            target.src = p.fallbackSrc;
                          }
                        }}
                        style={{ objectPosition: getObjectPosition(p.id) }}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
