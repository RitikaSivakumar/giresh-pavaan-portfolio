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
      className="group relative rounded-sm bg-[#0B192B] border border-[#243B53] hover:border-[#3B82F6] transition-colors duration-500 overflow-hidden shadow-[0_15px_45px_rgba(7,17,31,0.9)] flex flex-col justify-between"
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#3B82F6] z-10" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#3B82F6] z-10" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#3B82F6] z-10" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#3B82F6] z-10" />

      <div>
        {/* Visual Header / Technical CAD Schematic */}
        <div className="relative w-full border-b border-[#243B53] overflow-hidden bg-[#10243A]">
          {renderVisual(project.id)}

          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xs bg-[#07111F]/90 border border-[#3B82F6]/50 text-[10px] font-mono text-[#60A5FA] font-semibold tracking-wider">
              PROJECT {project.projectNumber}
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#10243A]/90 border border-[#243B53] text-[10px] font-mono text-[#F1F5F9] tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-xs bg-[#07111F]/90 border border-[#22D3EE]/40 text-[10px] font-mono text-[#22D3EE] tracking-widest">
              {project.status}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F1F5F9] font-normal tracking-wide group-hover:text-[#60A5FA] transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-[#A7B4C7] leading-relaxed font-sans">
            {project.shortDescription}
          </p>

          {/* Planned Objectives Preview */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Key Engineering Objectives</span>
            </span>
            <ul className="space-y-1.5 text-xs text-[#F1F5F9]/85 font-sans">
              {project.objectives.slice(0, 2).map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-0.5">•</span>
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
                className="px-2.5 py-1 rounded-xs bg-[#10243A] border border-[#243B53] text-[10px] font-mono text-[#A7B4C7]"
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
            className="w-full py-3.5 px-4 rounded-xs border border-[#3B82F6]/40 bg-[#10243A] hover:bg-[#3B82F6] text-[#60A5FA] hover:text-[#07111F] font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
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
      className="py-24 lg:py-32 relative bg-[#07111F] border-t border-[#243B53] overflow-hidden"
    >
      {/* Background Blue Ambient */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#22D3EE]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#243B53]">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#243B53] bg-[#10243A] text-[11px] font-mono text-[#60A5FA] tracking-[0.25em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full shadow-[0_0_6px_#3B82F6]" />
              03 / SELECTED WORK
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F1F5F9] uppercase tracking-tight leading-[1.05]">
              ENGINEERING{' '}
              <span className="font-serif italic font-normal text-gradient-electric">
                IN MOTION.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#A7B4C7] leading-relaxed font-sans">
              Structured mechanical project concepts and analytical studies explored during second-year
              engineering coursework. Each project represents applied exploration in CAD modelling,
              kinematics, automotive mechanics, or precision manufacturing.
            </p>
          </div>

          {/* Project Type Badge */}
          <div className="shrink-0 p-3.5 rounded-xs bg-[#10243A] border border-[#243B53] text-right shadow-xs">
            <span className="text-[10px] font-mono text-[#22D3EE] uppercase tracking-widest block">
              STATUS CLASSIFICATION
            </span>
            <span className="font-serif text-base text-[#F1F5F9]">
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
                  ? 'bg-[#3B82F6] text-[#07111F] font-bold shadow-[0_0_18px_rgba(59,130,246,0.5)]'
                  : 'bg-[#0B192B] text-[#A7B4C7] border border-[#243B53] hover:border-[#3B82F6] hover:text-[#F1F5F9]'
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
