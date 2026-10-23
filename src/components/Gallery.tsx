import React from 'react';
import { GALLERY_PHOTOS } from '../data/portfolioData.ts';
import { Camera, MapPin, Sparkles } from 'lucide-react';

export const Gallery: React.FC = () => {
  // Custom framing coordinates tailored to each original photo to ensure full face & upper body visibility
  const getObjectPosition = (id: string) => {
    switch (id) {
      case 'photo-hero':
        // Pink checkered shirt outdoors - ensure full head, hair, face, and shirt are centered
        return 'center 12%';
      case 'photo-blazer':
        // Full-length executive blazer - keep head and upper torso clearly framed without cutting forehead
        return 'center 15%';
      case 'photo-perspective':
        // Architectural balcony vignette - head and watch/railing visible
        return 'center 14%';
      case 'photo-waterfront':
        // Riverside veranda with beverage - head, smile, and table visible
        return 'center 22%';
      case 'photo-studio':
        // Clean studio headshot - top of curly hair down to shirt collar fully in frame
        return 'center 10%';
      default:
        return 'center 15%';
    }
  };

  const getAlternativeSource = (id: string) => {
    switch (id) {
      case 'photo-hero':
        return '/assets/aistudio/WhatsApp_Image_2026-10-23_at_6.38.32_PM_afd9bf78.jpeg';
      case 'photo-blazer':
        return '/assets/aistudio/WhatsApp_Image_2026-10-23_at_6.38.29_PM__1__c95024d0.jpeg';
      case 'photo-perspective':
        return '/assets/aistudio/WhatsApp_Image_2026-10-23_at_6.38.31_PM_dd664a0e.jpeg';
      case 'photo-waterfront':
        return '/assets/aistudio/WhatsApp_Image_2026-10-23_at_6.38.29_PM_40d04070.jpeg';
      case 'photo-studio':
        return '/assets/aistudio/WhatsApp_Image_2026-10-23_at_6.38.30_PM_27ef233c.jpeg';
      default:
        return '/images/giresh-hero-checkered.jpeg';
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 lg:py-32 relative bg-[#07111F] border-t border-[#243B53] overflow-hidden"
    >
      {/* Background radial blue glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#22D3EE]/6 rounded-full blur-[170px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#243B53]">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#243B53] bg-[#10243A] text-[11px] font-mono text-[#60A5FA] tracking-[0.25em] uppercase shadow-xs">
              <Camera className="w-3.5 h-3.5 text-[#22D3EE]" />
              PHOTO ARCHIVE · EDITORIAL GALLERY
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F1F5F9] uppercase tracking-tight leading-[1.05]">
              PERSPECTIVES IN{' '}
              <span className="font-serif italic font-normal text-gradient-electric">
                MOTION.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#A7B4C7] leading-relaxed font-sans">
              A curated photographic series reflecting life, engineering focus, and personal poise.
              All five original photographs displayed in an editorial layout with natural proportions
              and electric-blue framing.
            </p>
          </div>

          <div className="shrink-0 p-3.5 rounded-xs bg-[#10243A] border border-[#243B53] text-right shadow-xs">
            <span className="text-[10px] font-mono text-[#22D3EE] uppercase tracking-widest block">
              COLLECTION SIZE
            </span>
            <span className="font-serif text-lg text-[#F1F5F9]">
              05 ORIGINAL PHOTOGRAPHS
            </span>
          </div>
        </div>

        {/* Editorial Photo Grid: 2 Feature Cards on Row 1, 3 Cards on Row 2 */}
        <div className="mt-14 space-y-8">
          {/* Top Row: Two Primary Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {GALLERY_PHOTOS.slice(0, 2).map((photo, idx) => (
              <div
                key={photo.id}
                data-cursor-text="ARCHIVE"
                className="lg:col-span-6 group relative rounded-sm bg-[#0B192B] border border-[#243B53] hover:border-[#3B82F6] hover:-translate-y-1 transition-all duration-500 overflow-hidden shadow-[0_15px_45px_rgba(7,17,31,0.9)] flex flex-col justify-between cursor-default"
              >
                {/* Corner Metallic Clips */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#3B82F6] z-10" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#3B82F6] z-10" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#3B82F6] z-10" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#3B82F6] z-10" />

                {/* Portrait Frame (Preserving Entire Face & Upper Torso) */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#07111F]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    onError={(e) => {
                      const alt = getAlternativeSource(photo.id);
                      if (e.currentTarget.src !== alt) {
                        e.currentTarget.src = alt;
                      }
                    }}
                    style={{ objectPosition: getObjectPosition(photo.id) }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter contrast-[1.02]"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xs bg-[#10243A]/90 border border-[#3B82F6]/40 text-[#60A5FA] text-[10px] font-mono font-bold tracking-widest uppercase backdrop-blur-xs">
                      {photo.tag}
                    </span>
                    {photo.isPrimary && (
                      <span className="px-2.5 py-1 rounded-xs bg-[#3B82F6] text-[#07111F] text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 fill-[#07111F] text-[#07111F]" />
                        <span>PRIMARY PORTRAIT</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-0.5 rounded-xs bg-[#07111F]/85 border border-[#243B53] text-[10px] font-mono text-[#A7B4C7] tracking-widest">
                      0{idx + 1} / 05
                    </span>
                  </div>
                </div>

                {/* Dedicated Editorial Text Panel Below Image */}
                <div className="p-6 sm:p-7 space-y-2.5 bg-[#0B192B] border-t border-[#243B53]/70 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#22D3EE] tracking-wider uppercase mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                      <span>{photo.location}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F1F5F9] font-normal uppercase tracking-wide group-hover:text-[#60A5FA] transition-colors">
                      {photo.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A7B4C7] font-sans leading-relaxed pt-1">
                      {photo.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#243B53]/50 flex items-center justify-between text-[10px] font-mono text-[#A7B4C7]">
                    <span>ARCHIVE SERIES · ORIGINAL</span>
                    <span className="text-[#3B82F6]">VERIFIED PHOTOGRAPH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: Three Clean Editorial Portrait Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {GALLERY_PHOTOS.slice(2, 5).map((photo, idx) => (
              <div
                key={photo.id}
                data-cursor-text="ARCHIVE"
                className="group relative rounded-sm bg-[#0B192B] border border-[#243B53] hover:border-[#3B82F6] hover:-translate-y-1 transition-all duration-500 overflow-hidden shadow-[0_15px_45px_rgba(7,17,31,0.9)] flex flex-col justify-between cursor-default"
              >
                {/* Corner Metallic Clips */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#3B82F6] z-10" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#3B82F6] z-10" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#3B82F6] z-10" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#3B82F6] z-10" />

                {/* Portrait Frame (Preserving Entire Face & Upper Torso) */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#07111F]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    onError={(e) => {
                      const alt = getAlternativeSource(photo.id);
                      if (e.currentTarget.src !== alt) {
                        e.currentTarget.src = alt;
                      }
                    }}
                    style={{ objectPosition: getObjectPosition(photo.id) }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter contrast-[1.02]"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-xs bg-[#10243A]/90 border border-[#3B82F6]/40 text-[#60A5FA] text-[10px] font-mono font-bold tracking-widest uppercase backdrop-blur-xs">
                      {photo.tag}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-0.5 rounded-xs bg-[#07111F]/85 border border-[#243B53] text-[10px] font-mono text-[#A7B4C7] tracking-widest">
                      0{idx + 3} / 05
                    </span>
                  </div>
                </div>

                {/* Dedicated Editorial Text Panel Below Image */}
                <div className="p-5 sm:p-6 space-y-2.5 bg-[#0B192B] border-t border-[#243B53]/70 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#22D3EE] tracking-wider uppercase mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                      <span>{photo.location}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-[#F1F5F9] font-normal uppercase tracking-wide group-hover:text-[#60A5FA] transition-colors leading-snug">
                      {photo.title}
                    </h3>

                    <p className="text-xs text-[#A7B4C7] font-sans leading-relaxed pt-1">
                      {photo.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#243B53]/50 flex items-center justify-between text-[10px] font-mono text-[#A7B4C7]">
                    <span>ARCHIVE SERIES</span>
                    <span className="text-[#3B82F6]">VERIFIED</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
