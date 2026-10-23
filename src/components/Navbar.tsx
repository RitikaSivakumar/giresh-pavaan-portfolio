import React, { useState, useEffect } from 'react';
import { Menu, X, Clock } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';
import { Magnetic } from './Magnetic.tsx';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [greeting, setGreeting] = useState('WELCOME');

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
    { name: 'SKILLS', href: '#skills' },
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
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        isScrolled
          ? 'bg-[#07111F]/92 backdrop-blur-md border-b border-[#243B53] py-3.5 shadow-[0_4px_30px_rgba(7,17,31,0.85)]'
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
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-[#3B82F6] group-hover:text-[#60A5FA] transition-colors">
              GP.
            </span>
            <span className="text-white/20 font-light text-xs sm:text-sm">—</span>
            <span className="font-sans text-[11px] sm:text-xs font-medium tracking-[0.22em] text-[#F1F5F9] uppercase group-hover:text-[#3B82F6] transition-colors">
              GIRESH PAVAAN
            </span>
          </a>

          {/* Live Visitor Time & Greeting Indicator (Center on desktop) */}
          <div className="hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#10243A]/80 border border-[#243B53] text-[10px] font-mono text-[#A7B4C7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_8px_#3B82F6]" />
            <span className="text-[#60A5FA] font-semibold">{greeting}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-[#F1F5F9]">
              <Clock className="w-3 h-3 text-[#22D3EE]" />
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
                      ? 'text-[#3B82F6] font-semibold'
                      : 'text-[#A7B4C7] hover:text-[#F1F5F9]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]" />
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
                className="ml-2 px-4 py-2 rounded-xs border border-[#3B82F6]/50 hover:border-[#60A5FA] text-[10px] font-sans font-semibold tracking-[0.2em] text-[#60A5FA] bg-[#10243A] hover:bg-[#3B82F6] hover:text-[#07111F] transition-all uppercase shadow-xs hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] block"
              >
                CONNECT
              </a>
            </Magnetic>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-[#3B82F6] hover:text-white transition-colors focus:outline-hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 px-4 bg-[#0B192B]/98 backdrop-blur-2xl rounded-sm border border-[#243B53] shadow-2xl space-y-3 animate-fade-in">
            {/* Live Clock on Mobile */}
            <div className="pb-3 border-b border-[#243B53] flex items-center justify-between text-[11px] font-mono text-[#60A5FA]">
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
                      ? 'bg-[#10243A] text-[#60A5FA] border-l-2 border-[#3B82F6]'
                      : 'text-[#A7B4C7] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block text-center w-full py-2.5 rounded-xs border border-[#3B82F6] text-xs font-sans font-bold tracking-[0.2em] text-[#07111F] bg-[#3B82F6] hover:bg-[#60A5FA] uppercase shadow-[0_0_15px_rgba(59,130,246,0.4)]"
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
