import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));

      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playCinemaChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Metallic Gold & Electric Blue Progress Indicator at top */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#050505] z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#8C6D4F] via-[#D4AF37] to-[#24B8FF] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(212,175,55,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        data-cursor-text="TOP"
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-xs bg-[#111318]/90 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.85)] cursor-pointer group ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
      </button>
    </>
  );
};
