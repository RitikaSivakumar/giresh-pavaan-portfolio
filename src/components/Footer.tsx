import React from 'react';
import { ArrowUp, Mail, Linkedin, MapPin } from 'lucide-react';
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
    <footer className="bg-[#07111F] border-t border-[#243B53] text-[#A7B4C7] py-16 w-full select-none">
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#243B53]/70">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-2xl font-light text-gradient-electric tracking-tight">
                GP.
              </span>
              <span className="font-serif text-lg font-light text-[#F1F5F9] uppercase tracking-wider">
                {PERSONAL_INFO.fullName}
              </span>
            </div>

            <p className="text-xs font-mono text-[#60A5FA] uppercase tracking-wider">
              {PERSONAL_INFO.title} · {PERSONAL_INFO.institution}
            </p>

            <p className="font-serif italic text-sm text-[#A7B4C7] max-w-sm pt-1">
              &ldquo;DESIGNED WITH CURIOSITY. BUILT THROUGH LEARNING.&rdquo;
            </p>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-4 space-y-3">
            <span className="block font-mono text-[11px] font-bold text-[#22D3EE] uppercase tracking-[0.2em]">
              NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#60A5FA] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Details */}
          <div className="md:col-span-3 space-y-3">
            <span className="block font-mono text-[11px] font-bold text-[#22D3EE] uppercase tracking-[0.2em]">
              CONTACT DETAILS
            </span>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-[#F1F5F9] hover:text-[#60A5FA] transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 shrink-0 text-[#3B82F6]" />
                <span>{PERSONAL_INFO.email}</span>
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F1F5F9] hover:text-[#60A5FA] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 shrink-0 text-[#3B82F6]" />
                <span>LinkedIn Profile</span>
              </a>

              <div className="flex items-center gap-2 text-[#A7B4C7] text-[11px]">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#3B82F6]" />
                <span>Pollachi, Coimbatore - 642003</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A7B4C7]">
          <p>© {currentYear} Giresh Pavaan S K. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xs border border-[#243B53] hover:border-[#3B82F6] hover:text-[#60A5FA] bg-[#10243A]/80 text-[#F1F5F9] transition-all cursor-pointer text-[11px] shadow-xs"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
