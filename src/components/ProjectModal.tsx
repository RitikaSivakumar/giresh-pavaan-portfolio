import React, { useEffect } from 'react';
import { X, CheckCircle2, Compass, AlertCircle, Wrench, Sparkles } from 'lucide-react';
import { Project } from '../types/index.ts';
import {
  CadComponentVisual,
  MechanicalSystemVisual,
  AutomotiveSystemVisual,
  ManufacturingProcessVisual,
  playCinemaChime,
} from './EngineeringVisuals.tsx';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderVisual = () => {
    if (project.customImage) {
      return (
        <img
          src={project.customImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      );
    }
    switch (project.id) {
      case 'proj-01':
        return <CadComponentVisual className="h-full w-full" />;
      case 'proj-02':
        return <MechanicalSystemVisual className="h-full w-full" />;
      case 'proj-03':
        return <AutomotiveSystemVisual className="h-full w-full" />;
      case 'proj-04':
        return <ManufacturingProcessVisual className="h-full w-full" />;
      default:
        return <CadComponentVisual className="h-full w-full" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07111F]/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0B192B] border border-[#243B53] rounded-sm shadow-[0_20px_60px_rgba(7,17,31,0.95)] text-[#F1F5F9] transition-all"
      >
        {/* Corner metallic clips */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#3B82F6] z-30" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#3B82F6] z-30" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#3B82F6] z-30" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#3B82F6] z-30" />

        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0B192B]/95 backdrop-blur-md border-b border-[#243B53]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-xs bg-[#3B82F6] text-[#07111F] text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
              PROJECT {project.projectNumber}
            </span>
            <span className="text-xs font-mono text-[#A7B4C7] uppercase">
              {project.category}
            </span>
          </div>

          <button
            onClick={() => {
              playCinemaChime();
              onClose();
            }}
            aria-label="Close modal"
            className="p-1.5 rounded-xs text-[#A7B4C7] hover:text-[#60A5FA] hover:bg-[#10243A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Visual Schematic */}
          <div className="relative aspect-video w-full rounded-xs bg-[#07111F] overflow-hidden border border-[#243B53] shadow-inner">
            {renderVisual()}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192B] via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#60A5FA]">
              <span>TECHNICAL BLUEPRINT VIEW</span>
              <span className="px-2 py-0.5 bg-[#07111F]/85 rounded-xs border border-[#22D3EE]/40 text-[#22D3EE]">
                {project.status}
              </span>
            </div>
          </div>

          {/* Title and Full Description */}
          <div className="space-y-3">
            <h2
              id="modal-project-title"
              className="font-serif text-2xl sm:text-4xl text-[#F1F5F9] font-light uppercase tracking-wide leading-tight"
            >
              {project.title}
            </h2>

            <p className="text-sm sm:text-base text-[#A7B4C7] leading-relaxed font-sans">
              {project.fullDescription}
            </p>
          </div>

          {/* Objectives */}
          <div className="p-5 rounded-xs bg-[#10243A] border border-[#243B53] space-y-3">
            <h3 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-[0.15em] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
              <span>Project Objectives</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F1F5F9] font-sans">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#22D3EE] mt-0.5 font-mono">0{i + 1}.</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & CAD Considerations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tools Planned */}
            <div className="p-5 rounded-xs bg-[#10243A] border border-[#243B53] space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-[0.15em] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#3B82F6]" />
                <span>Tools & Software</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.toolsPlanned.map((tool, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xs bg-[#0B192B] border border-[#243B53] text-xs font-mono text-[#F1F5F9]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CAD / Engineering Considerations */}
            <div className="p-5 rounded-xs bg-[#10243A] border border-[#243B53] space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-[0.15em] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#3B82F6]" />
                <span>Technical Considerations</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[#A7B4C7] font-sans">
                {project.cadConsiderations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#3B82F6]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="p-5 rounded-xs bg-[#10243A] border border-[#243B53] space-y-3">
            <h3 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-[0.15em] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3EE]" />
              <span>Target Learning Outcomes</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.learningOutcomes.map((outcome, i) => (
                <div key={i} className="p-3 rounded-xs bg-[#0B192B] border border-[#243B53]">
                  <span className="font-mono text-[10px] text-[#22D3EE] block mb-1 font-bold">
                    OUTCOME 0{i + 1}
                  </span>
                  <p className="text-xs text-[#F1F5F9]">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Note */}
          <div className="p-4 rounded-xs bg-[#10243A] border border-[#243B53] text-xs font-mono text-[#A7B4C7] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
            <span>
              This project is part of Giresh Pavaan S K&apos;s academic exploration track at Dr. Mahalingam College of Engineering. Objectives and CAD schematics reflect coursework and study plans.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
