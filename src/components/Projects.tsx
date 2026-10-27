import React, { useState, useRef } from 'react';
import { Project } from '../types/index.ts';
import { PROJECTS_DATA } from '../data/portfolioData.ts';
import {
  CadComponentVisual,
  MechanicalSystemVisual,
  AutomotiveSystemVisual,
  ManufacturingProcessVisual,
  playCinemaChime,
} from './EngineeringVisuals.tsx';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic.tsx';
import { KinematicGearShowcase } from './KinematicGearShowcase.tsx';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

// Interactive 3D Tilt Project Card
const ProjectCard: React.FC<{
  project: Project;
  onSelect: (p: Project) => void;
  renderVisual: (id: string) => React.ReactNode;
}> = ({ project, onSelect, renderVisual }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // subtle 3D tilt angles (-5deg to +5deg)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="BLUEPRINT"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
          isHovered ? 1.01 : 1
        }, ${isHovered ? 1.01 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative rounded-sm bg-[#111318] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-colors duration-500 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between"
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37] z-10" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37] z-10" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37] z-10" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37] z-10" />

      <div>
        {/* Visual Header / Technical CAD Schematic */}
        <div className="relative w-full border-b border-[#D4AF37]/20 overflow-hidden bg-[#0B0B0D]">
          {renderVisual(project.id)}

          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xs bg-[#050505]/90 border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37] font-semibold tracking-wider">
              PROJECT {project.projectNumber}
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#111318]/90 border border-[#D4AF37]/30 text-[10px] font-mono text-[#E8DFD8] tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-xs bg-[#14110E]/95 border border-[#D4AF37]/50 text-[10px] font-mono text-[#D4AF37] tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              {project.status}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#E8DFD8] font-normal tracking-wide group-hover:text-[#D4AF37] transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-[#A8988B] leading-relaxed font-sans">
            {project.shortDescription}
          </p>

          {/* Planned Objectives Preview */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Key Engineering Objectives</span>
            </span>
            <ul className="space-y-1.5 text-xs text-[#E8DFD8]/80 font-sans">
              {project.objectives.slice(0, 2).map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-0.5">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Planned */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {project.toolsPlanned.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xs bg-[#14110E] border border-[#D4AF37]/30 text-[10px] font-mono text-[#E8DFD8] hover:border-[#D4AF37]/60 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer with Magnetic Button */}
      <div className="p-6 sm:p-8 pt-0 mt-4">
        <Magnetic strength={0.15} className="w-full">
          <button
            onClick={() => {
              playCinemaChime();
              onSelect(project);
            }}
            data-cursor-text="OPEN"
            className="w-full py-3.5 px-4 rounded-xs border border-[#D4AF37]/35 bg-[#14110E] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <span>EXPLORE TECHNICAL BLUEPRINT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </Magnetic>
      </div>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'MECHANICAL DESIGN',
    'ENGINEERING FUNDAMENTALS',
    'AUTOMOTIVE SYSTEMS',
    'MANUFACTURING',
  ];

  const filteredProjects =
    activeCategory === 'ALL'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const renderVisual = (id: string) => {
    switch (id) {
      case 'proj-01':
        return <CadComponentVisual className="h-48 sm:h-56 md:h-64 object-cover" />;
      case 'proj-02':
        return <MechanicalSystemVisual className="h-48 sm:h-56 md:h-64 object-cover" />;
      case 'proj-03':
        return <AutomotiveSystemVisual className="h-48 sm:h-56 md:h-64 object-cover" />;
      case 'proj-04':
        return <ManufacturingProcessVisual className="h-48 sm:h-56 md:h-64 object-cover" />;
      default:
        return <CadComponentVisual className="h-48 sm:h-56 md:h-64 object-cover" />;
    }
  };

  return (
    <section
      id="projects"
      className="py-24 lg:py-32 relative bg-[#050505] border-t border-[#D4AF37]/20 overflow-hidden"
    >
      {/* Background Gold Ambient */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#8C6D4F]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D4AF37]/20">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#D4AF37]/30 bg-[#111318] text-[11px] font-mono text-[#D4AF37] tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              02 / SELECTED WORK
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#E8DFD8] uppercase tracking-tight leading-[1.05]">
              ENGINEERING{' '}
              <span className="font-serif italic font-normal text-gradient-gold">
                IN MOTION.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#A8988B] leading-relaxed font-sans">
              Structured mechanical project concepts and analytical studies explored during second-year
              engineering coursework. Each project represents applied exploration in CAD modelling,
              kinematics, automotive mechanics, or precision manufacturing.
            </p>
          </div>

          {/* Project Type Badge */}
          <div className="shrink-0 p-3.5 rounded-xs bg-[#111318] border border-[#D4AF37]/30 text-right">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">
              STATUS CLASSIFICATION
            </span>
            <span className="font-serif text-base text-[#E8DFD8]">
              ACADEMIC PROJECT IDEAS
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-8 pb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playCinemaChime();
                setActiveCategory(cat);
              }}
              data-cursor-text={cat.split(' ')[0]}
              className={`px-4 py-2 rounded-xs text-xs font-mono tracking-wider transition-all cursor-pointer uppercase ${
                activeCategory === cat
                  ? 'bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#111318] text-[#A8988B] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:text-[#E8DFD8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with Interactive 3D Tilt Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              renderVisual={renderVisual}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
