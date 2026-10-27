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
import { CustomCursor } from './components/CustomCursor.tsx';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { CinematicIntro } from './components/CinematicIntro.tsx';

export default function App() {
  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState<string>('home');

  // Selected project modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // LinkedIn URL verified from Giresh's resume
  const linkedinUrl = PERSONAL_INFO.linkedinUrl;

  // Scroll spy to highlight active section in Navbar
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
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-[#E8DFD8] selection:bg-[#D4AF37] selection:text-black overflow-x-hidden font-sans">
      {/* 1. Cinematic Session-Persisted Introduction with skip option */}
      <CinematicIntro />

      {/* 2. Precision Custom Cursor for Desktop Fine Pointers */}
      <CustomCursor />

      {/* 3. Antique Gold Scroll Progress Line & Floating Back-To-Top Button */}
      <ScrollProgress />

      {/* 4. Cinematic Top Navigation with Live Visitor Clock & Greeting */}
      <Navbar activeSection={activeSection} />

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
        <Gallery />

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
