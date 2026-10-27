import React, { useState, useEffect } from 'react';
import { Menu, X, Clock, Volume2, VolumeX, Sparkles, Sparkle } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';
import { Magnetic } from './Magnetic.tsx';
import { readInterfaceSoundPreference, setInterfaceSoundEnabled, setInterfaceVolume } from '../lib/interfaceSound.ts';

interface NavbarProps {
  activeSection: string;
  motionEnabled: boolean;
  onToggleMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, motionEnabled, onToggleMotion }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [greeting, setGreeting] = useState('WELCOME');
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return readInterfaceSoundPreference();
  });
  const [soundVolume, setSoundVolume] = useState(() => {
    try {
      const saved = Number(window.localStorage.getItem('portfolio-sound-volume'));
      return Number.isFinite(saved) && saved > 0 && saved <= 1 ? saved : 0.45;
    } catch { return 0.45; }
  });

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setInterfaceSoundEnabled(next);
  };

  // Live Digital Clock & Time-based Greeting
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );

      const hour = now.getHours();
      if (hour >= 4 && hour < 12) {
        setGreeting('GOOD MORNING');
      } else if (hour >= 12 && hour < 17) {
        setGreeting('GOOD AFTERNOON');
      } else {
        setGreeting('GOOD EVENING');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EV PROJECT', href: '#ev-conversion' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'AWARDS', href: '#achievements' },
    { name: 'JOURNEY', href: '#journey' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playCinemaChime();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        isScrolled
          ? 'bg-black/92 backdrop-blur-md border-b border-[#D4AF37]/20 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.85)]'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Mark (Left) */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            data-cursor-text="GIRESH"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0"
          >
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-[#D4AF37] group-hover:text-white transition-colors">
              GP.
            </span>
            <span className="text-white/30 font-light text-xs sm:text-sm">—</span>
            <span className="font-sans text-[11px] sm:text-xs font-medium tracking-[0.22em] text-[#E8DFD8] uppercase group-hover:text-[#D4AF37] transition-colors">
              GIRESH PAVAAN
            </span>
          </a>

          {/* Live Visitor Time & Greeting Indicator (Center on desktop) */}
          <div className="hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#100D0A]/80 border border-[#D4AF37]/25 text-[10px] font-mono text-[#A8988B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] font-semibold">{greeting}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-[#E8DFD8]">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              <span>{timeString || 'LOCAL TIME'}</span>
            </span>
          </div>

          {/* Desktop Links (Right) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[11px] font-sans font-medium tracking-[0.2em] uppercase">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  data-cursor-text={link.name}
                  className={`transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-[#A8988B] hover:text-[#E8DFD8]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                  )}
                </a>
              );
            })}

            {/* Magnetic Connect CTA button */}
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                data-cursor-text="CONNECT"
                className="ml-2 px-4 py-2 rounded-xs border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[10px] font-sans font-semibold tracking-[0.2em] text-[#D4AF37] bg-[#14110E] hover:bg-[#D4AF37] hover:text-black transition-all uppercase shadow-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] block"
              >
                CONNECT
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={onToggleMotion}
              aria-label={motionEnabled ? 'Turn decorative animations off' : 'Turn decorative animations on'}
              aria-pressed={motionEnabled}
              title={motionEnabled ? 'Decorative motion on' : 'Decorative motion off'}
              className="inline-flex items-center gap-2 rounded-xs border border-[#D4AF37]/35 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#A8988B] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24B8FF]"
            >
              {motionEnabled ? <Sparkles className="h-3.5 w-3.5" /> : <Sparkle className="h-3.5 w-3.5" />}
              <span>{motionEnabled ? 'MOTION ON' : 'MOTION OFF'}</span>
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Turn interface sounds off' : 'Turn interface sounds on'}
              aria-pressed={soundEnabled}
              title={soundEnabled ? 'Sound on' : 'Sound off'}
              className="inline-flex items-center gap-2 rounded-xs border border-[#D4AF37]/35 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#A8988B] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24B8FF]"
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span>{soundEnabled ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>
            <label title={`Interface volume ${Math.round(soundVolume * 100)} percent`} className="inline-flex items-center gap-1 text-[#A8988B]">
              <Volume2 className="h-3 w-3 text-[#D4AF37]" />
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={soundVolume}
                aria-label="Interface sound volume"
                onChange={(event) => {
                  const next = Number(event.currentTarget.value);
                  setSoundVolume(next);
                  setInterfaceVolume(next);
                }}
                className="w-12 accent-[#D4AF37]"
              />
            </label>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onToggleMotion}
              aria-label={motionEnabled ? 'Turn decorative animations off' : 'Turn decorative animations on'}
              aria-pressed={motionEnabled}
              title={motionEnabled ? 'Decorative motion on' : 'Decorative motion off'}
              className="inline-flex items-center gap-1.5 rounded-xs border border-[#D4AF37]/35 px-2 py-2 text-[9px] font-mono uppercase tracking-wider text-[#A8988B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24B8FF]"
            >
              {motionEnabled ? <Sparkles className="h-3.5 w-3.5" /> : <Sparkle className="h-3.5 w-3.5" />}
              <span>{motionEnabled ? 'MOTION' : 'STATIC'}</span>
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Turn interface sounds off' : 'Turn interface sounds on'}
              aria-pressed={soundEnabled}
              title={soundEnabled ? 'Sound on' : 'Sound off'}
              className="inline-flex items-center gap-1.5 rounded-xs border border-[#D4AF37]/35 px-2 py-2 text-[9px] font-mono uppercase tracking-wider text-[#A8988B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24B8FF]"
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span>{soundEnabled ? 'ON' : 'SOUND'}</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-[#D4AF37] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24B8FF]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 px-4 bg-[#0A0806]/98 backdrop-blur-2xl rounded-sm border border-[#D4AF37]/30 shadow-2xl space-y-3 animate-fade-in">
            {/* Live Clock on Mobile */}
            <div className="pb-3 border-b border-[#D4AF37]/15 flex items-center justify-between text-[11px] font-mono text-[#D4AF37]">
              <span>{greeting}</span>
              <span>{timeString}</span>
            </div>

            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-3 py-2.5 rounded-xs text-xs font-sans font-semibold tracking-[0.2em] uppercase transition-colors ${
                    isActive
                      ? 'bg-[#14110E] text-[#D4AF37] border-l-2 border-[#D4AF37]'
                      : 'text-[#A8988B] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-2">
              <label className="mb-3 flex items-center justify-between rounded-xs border border-[#D4AF37]/20 bg-[#111318] px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#A8988B]">
                <span className="flex items-center gap-2"><Volume2 className="h-3.5 w-3.5 text-[#D4AF37]" /> SOUND LEVEL</span>
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  value={soundVolume}
                  aria-label="Interface sound volume"
                  onChange={(event) => {
                    const next = Number(event.currentTarget.value);
                    setSoundVolume(next);
                    setInterfaceVolume(next);
                  }}
                  className="w-24 accent-[#D4AF37]"
                />
              </label>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block text-center w-full py-2.5 rounded-xs border border-[#D4AF37] text-xs font-sans font-bold tracking-[0.2em] text-black bg-[#D4AF37] uppercase shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                LET&apos;S CONNECT
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
