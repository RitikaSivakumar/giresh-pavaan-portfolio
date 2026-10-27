/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project } from './types/index.ts';
import { PERSONAL_INFO } from './data/portfolioData.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { KineticTicker } from './components/KineticTicker.tsx';
import { About } from './components/About.tsx';
import { Projects } from './components/Projects.tsx';
import { EarlyEvProject } from './components/EarlyEvProject.tsx';
import { Skills } from './components/Skills.tsx';
import { Achievements } from './components/Achievements.tsx';
import { Journey } from './components/Journey.tsx';
import { Gallery } from './components/Gallery.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { CinematicIntro } from './components/CinematicIntro.tsx';
import { SparkCursor } from './components/SparkCursor.tsx';
import { ClickSpark } from './components/ClickSpark.tsx';
import { SoundManager } from './components/SoundManager.tsx';

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      return window.sessionStorage.getItem('portfolio-motion-enabled') !== 'false';
    } catch {
      return true;
    }
  });
  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState<string>('home');

  // Selected project modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // LinkedIn URL verified from Giresh's resume
  const linkedinUrl = PERSONAL_INFO.linkedinUrl;

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || !motionEnabled;
    const sections = Array.from(document.querySelectorAll('main > section'));
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    sections.forEach((section) => section.classList.add('section-reveal'));
    document.body.classList.add('section-reveal-enabled');
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.body.classList.remove('section-reveal-enabled');
      sections.forEach((section) => section.classList.remove('section-reveal', 'is-visible'));
    };
  }, [motionEnabled]);

  useEffect(() => {
    document.body.classList.toggle('decorative-motion-off', !motionEnabled);
    try {
      window.sessionStorage.setItem('portfolio-motion-enabled', String(motionEnabled));
    } catch {
      // The preference remains active for this page even when storage is unavailable.
    }
    return () => document.body.classList.remove('decorative-motion-off');
  }, [motionEnabled]);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'ev-conversion', 'skills', 'achievements', 'journey', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-[#E8DFD8] selection:bg-[#D4AF37] selection:text-black overflow-x-hidden font-sans">
      {/* 1. Cinematic Session-Persisted Introduction with skip option */}
      <CinematicIntro motionEnabled={motionEnabled} />

      {/* 2. Precision Custom Cursor for Desktop Fine Pointers */}
      <SparkCursor motionEnabled={motionEnabled} />
      <ClickSpark />
      <SoundManager />

      {/* 3. Antique Gold Scroll Progress Line & Floating Back-To-Top Button */}
      <ScrollProgress />

      {/* 4. Cinematic Top Navigation with Live Visitor Clock & Greeting */}
      <Navbar activeSection={activeSection} motionEnabled={motionEnabled} onToggleMotion={() => setMotionEnabled((enabled) => !enabled)} />

      <main className="flex-1 w-full overflow-x-hidden">
        {/* 1. Cinematic Fullscreen Hero */}
        <Hero
          onExploreWorld={() => scrollToSection('about')}
          onViewProjects={() => scrollToSection('projects')}
        />

        {/* Kinetic Engineering Typography Ribbon */}
        <KineticTicker />

        {/* 2. 01 / About the Engineer */}
        <About />

        {/* 3. 02 / Selected Project Concepts & Schematics */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* 4. 03 / Early Electric Vehicle Conversion Project (Hands-On Engineering 2019–2023) */}
        <EarlyEvProject />

        {/* 5. 04 / Technical Arsenal Bento Grid */}
        <Skills />

        {/* 6. 05 / Achievements & Certifications Gallery */}
        <Achievements />

        {/* 7. 06 / Academic & Analytical Journey */}
        <Journey />

        {/* 8. Editorial Photo Gallery (All 5 verified photos, NO expand/fullscreen controls) */}
        <Gallery motionEnabled={motionEnabled} />

        {/* 9. 07 / Direct Contact & Transmission */}
        <Contact linkedinUrl={linkedinUrl} />
      </main>

      {/* Cinematic Footer */}
      <Footer linkedinUrl={linkedinUrl} />

      {/* Technical Blueprint Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
