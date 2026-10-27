import React from 'react';
import { ArrowUp, Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { playCinemaChime } from './EngineeringVisuals.tsx';

interface FooterProps {
  linkedinUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ linkedinUrl }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    playCinemaChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Journey', href: '#journey' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playCinemaChime();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-[#D4AF37]/20 text-[#A8988B] py-16 w-full select-none">
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF37]/15">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-2xl font-light text-gradient-gold tracking-tight">
                GP.
              </span>
              <span className="font-serif text-lg font-light text-[#E8DFD8] uppercase tracking-wider">
                {PERSONAL_INFO.fullName}
              </span>
            </div>

            <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              {PERSONAL_INFO.title} · {PERSONAL_INFO.institution}
            </p>

            <p className="font-serif italic text-sm text-[#A8988B] max-w-sm pt-1">
              &ldquo;DESIGNED WITH CURIOSITY. BUILT THROUGH LEARNING.&rdquo;
            </p>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-4 space-y-3">
            <span className="block font-mono text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
              NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#24B8FF] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Details */}
          <div className="md:col-span-3 space-y-3">
            <span className="block font-mono text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
              CONTACT DETAILS
            </span>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-[#E8DFD8] hover:text-[#24B8FF] transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                <span>{PERSONAL_INFO.email}</span>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-2 text-[#E8DFD8] hover:text-[#24B8FF] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#E8DFD8] hover:text-[#24B8FF] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                <span>LinkedIn Profile</span>
              </a>

              <div className="flex items-center gap-2 text-[#A8988B] text-[11px]">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A8988B]">
          <p>© {currentYear} Giresh Pavaan S K. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xs border border-[#D4AF37]/30 hover:border-[#24B8FF] hover:text-[#24B8FF] bg-[#111318] text-[#E8DFD8] transition-all cursor-pointer text-[11px] shadow-xs"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
