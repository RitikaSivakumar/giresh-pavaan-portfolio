import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowDown,
  Compass,
  Layers,
  Terminal,
  GraduationCap,
  ArrowUpRight,
  Camera,
  Mail,
  ChevronDown,
  Award,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { CinematicBackgroundVideo, playCinemaChime } from './EngineeringVisuals.tsx';
import { Magnetic } from './Magnetic.tsx';

interface HeroProps {
  onExploreWorld: () => void;
  onViewProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWorld, onViewProjects }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [greeting, setGreeting] = useState('WELCOME');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      setGreeting('GOOD MORNING');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('GOOD AFTERNOON');
    } else {
      setGreeting('GOOD EVENING');
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // subtle 3D tilt angles (-8deg to +8deg)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
    // Subtle internal image parallax (-10px to +10px)
    setImageOffset({
      x: ((x - centerX) / centerX) * -8,
      y: ((y - centerY) / centerY) * -8,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setImageOffset({ x: 0, y: 0 });
  };

  const scrollToSection = (id: string) => {
    playCinemaChime();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickNav = [
    { number: '01', title: 'THE STORY', target: 'about', icon: Compass },
    { number: '02', title: 'PROJECT IDEAS', target: 'projects', icon: Layers },
    { number: '03', title: 'TECHNICAL ARSENAL', target: 'skills', icon: Terminal },
    { number: '04', title: 'ACHIEVEMENTS', target: 'achievements', icon: Award },
    { number: '05', title: 'EDUCATION PATH', target: 'journey', icon: GraduationCap },
    { number: '06', title: 'PHOTO ARCHIVE', target: 'gallery', icon: Camera },
  ];

  // Words for staggered reveal animation
  const nameWords = ['GIRESH', 'PAVAAN', 'S', 'K'];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-black text-[#E8DFD8] overflow-hidden pt-28 pb-10 lg:pt-36 lg:pb-12 select-none"
    >
      {/* Cinematic Fullscreen Background Video & Lighting Overlay */}
      <CinematicBackgroundVideo />

      {/* Subtle Antique Gold Ambient Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#8C6D4F]/5 blur-[160px] pointer-events-none" />

      {/* Main 60 / 40 Two-Column Hero Container */}
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column (~60% width) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 max-w-4xl">
            {/* Top Eyebrow / Classification with Live Greeting */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#D4AF37]/40 bg-[#14110E]/80 backdrop-blur-md text-[11px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                {greeting} · BE MECHANICAL
              </span>
              <span className="text-[11px] font-mono tracking-widest text-[#A8988B] uppercase">
                CLASS OF 2029
              </span>
            </div>

            {/* Staggered Name Heading with Cormorant Garamond */}
            <div className="space-y-1">
              <h1 className="font-serif text-[clamp(2.5rem,5vw,5.5rem)] font-light tracking-tight text-[#E8DFD8] leading-[1.04] uppercase flex flex-wrap gap-x-3.5 sm:gap-x-4">
                {nameWords.map((word, index) => (
                  <span
                    key={word}
                    className={`inline-block transition-all duration-700 ease-out transform ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    {index === 2 || index === 3 ? (
                      <span className="font-serif italic font-normal text-gradient-gold">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </h1>

              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#D4AF37] uppercase flex items-center gap-3 pt-1">
                <span>MECHANICAL ENGINEERING STUDENT</span>
                <span className="w-14 h-px bg-[#D4AF37]/40" />
              </p>
            </div>

            {/* Editorial Cinematic Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#E8DFD8]/95 font-light leading-snug">
              DESIGNING IDEAS.{' '}
              <span className="text-gradient-gold font-normal">
                UNDERSTANDING MACHINES.
              </span>{' '}
              BUILDING THE FUTURE.
            </h2>

            {/* Academic Credential Bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 border-y border-[#D4AF37]/20 text-xs font-mono text-[#A8988B]">
              <span className="text-[#D4AF37] font-semibold">B.E. MECHANICAL</span>
              <span className="text-[#D4AF37]/40">·</span>
              <span>2ND YEAR</span>
              <span className="text-[#D4AF37]/40">·</span>
              <span>DR. MAHALINGAM CET</span>
              <span className="text-[#D4AF37]/40">·</span>
              <span>POLLACHI, TAMIL NADU</span>
            </div>

            {/* Supporting Bio Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#A8988B] leading-relaxed max-w-2xl font-sans font-normal">
              {PERSONAL_INFO.supportingDescription}
            </p>

            {/* Magnetic Interactive CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => {
                    playCinemaChime();
                    onViewProjects();
                  }}
                  data-cursor-text="WORK"
                  className="btn-gold group cursor-pointer inline-flex items-center gap-3"
                >
                  <span>EXPLORE MY WORK</span>
                  <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <button
                  onClick={() => {
                    playCinemaChime();
                    scrollToSection('contact');
                  }}
                  data-cursor-text="CONTACT"
                  className="btn-gold-outline group cursor-pointer inline-flex items-center gap-3"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>GET IN TOUCH</span>
                </button>
              </Magnetic>
            </div>

            {/* Three Highlight Pillars */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {PERSONAL_INFO.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-sm bg-[#0E0C09] border border-[#D4AF37]/25 text-[11px] font-mono text-[#E8DFD8] tracking-wider uppercase hover:border-[#D4AF37]/60 transition-colors"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Tilt Profile Card (~40% width) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              data-cursor-text="PROFILE"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
                  isHovered ? 1.02 : 1
                }, ${isHovered ? 1.02 : 1}, 1)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
              }}
              className="relative w-72 sm:w-84 md:w-96 lg:w-[390px] xl:w-[430px] rounded-sm p-3 bg-gradient-to-b from-[#111318] via-[#0B0B0D] to-[#050505] border border-[#D4AF37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)] group cursor-pointer"
            >
              {/* Corner Accents */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />

              {/* Portrait Container: First uploaded photo (pink checkered shirt outdoors), perfectly framed with parallax */}
              <div
                className={`relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-[#050505] transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <img
                  src={PERSONAL_INFO.profilePhoto}
                  alt={PERSONAL_INFO.fullName}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('WhatsApp')) {
                      target.src = '/assets/aistudio/WhatsApp_Image_2026-10-23_at_6.38.32_PM_afd9bf78.jpeg';
                    }
                  }}
                  style={{
                    objectPosition: 'center 12%',
                    transform: `scale(${isHovered ? 1.05 : 1.02}) translate3d(${imageOffset.x}px, ${imageOffset.y}px, 0)`,
                    transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out',
                  }}
                  className="w-full h-full object-cover filter contrast-105"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-65 pointer-events-none" />

                {/* Blue Technical Accents inside the Profile Visual */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-xs bg-[#10233F]/85 border border-[#24B8FF]/40 text-[8.5px] font-mono text-[#24B8FF] tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#24B8FF] animate-pulse" />
                  <span>SYS: CAD // ME-01</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-xs bg-[#10233F]/85 border border-[#24B8FF]/40 text-[9px] font-mono text-[#24B8FF] tracking-widest backdrop-blur-xs">
                  GP-ME-2529
                </div>

                {/* Bottom Card Identity Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/85 backdrop-blur-md border border-[#D4AF37]/30 rounded-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-sm text-[#E8DFD8] tracking-wide font-normal">
                        GIRESH PAVAAN S K
                      </p>
                      <p className="font-mono text-[10px] text-[#D4AF37] tracking-wider uppercase">
                        Dr. Mahalingam College of Engineering
                      </p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                  </div>
                </div>
              </div>

              {/* Card Base Information */}
              <div className="mt-3 px-1 py-1 flex items-center justify-between text-[10px] font-mono text-[#A8988B]">
                <span>LOCATION: POLLACHI, TN</span>
                <span className="text-[#D4AF37]">BATCH: 2025–2029</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Animated Scroll Indicator */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-6 pb-2">
        <button
          onClick={() => scrollToSection('about')}
          data-cursor-text="SCROLL"
          aria-label="Scroll to explore"
          className="flex flex-col items-center gap-1.5 text-[10px] font-mono text-[#A8988B] hover:text-[#D4AF37] transition-colors cursor-pointer group"
        >
          <span className="tracking-[0.25em] uppercase">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
        </button>
      </div>

      {/* Quick Cinematic Chapter Jump Strip */}
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mt-4 lg:mt-6">
        <div className="pb-3 flex items-center justify-between border-b border-[#D4AF37]/20">
          <span className="text-[11px] font-mono text-[#D4AF37] tracking-[0.25em] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
            CINEMATIC CHAPTERS · QUICK JUMP
          </span>
          <span className="text-[10px] font-mono text-[#A8988B] tracking-wider hidden sm:inline">
            SELECT CHAPTER TO JUMP
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3">
          {quickNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.number}
                onClick={() => scrollToSection(item.target)}
                data-cursor-text={item.title}
                className="p-3.5 rounded-xs bg-[#0E0C09]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#1A1510] transition-all text-left group cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#D4AF37] tracking-wider block">
                    {item.number}
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#E8DFD8] group-hover:text-[#D4AF37] transition-colors tracking-wide uppercase">
                    {item.title}
                  </span>
                </div>
                <Icon className="w-4 h-4 text-[#A8988B] group-hover:text-[#D4AF37] group-hover:scale-110 transition-all shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
