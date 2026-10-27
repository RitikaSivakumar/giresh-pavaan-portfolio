import React, { useEffect } from 'react';
import { X, CheckCircle2, Compass, AlertCircle, Wrench, Sparkles } from 'lucide-react';
import { Project } from '../types/index.ts';
import { playCinemaChime } from './EngineeringVisuals.tsx';

const ProjectSimulation = React.lazy(() =>
  import('./ProjectSimulation.tsx').then((module) => ({ default: module.ProjectSimulation }))
);

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#111318] border border-[#D4AF37]/35 rounded-sm shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-[#E8DFD8] transition-all"
      >
        {/* Corner metallic clips */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37] z-30" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37] z-30" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37] z-30" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37] z-30" />

        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0B0B0D]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-xs bg-[#D4AF37] text-black text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
              PROJECT {project.projectNumber}
            </span>
            <span className="text-xs font-mono text-[#A8988B] uppercase">
              {project.category}
            </span>
          </div>

          <button
            onClick={() => {
              playCinemaChime();
              onClose();
            }}
            data-sound="transition"
            aria-label="Close modal"
            className="p-1.5 rounded-xs text-[#A8988B] hover:text-[#D4AF37] hover:bg-[#14110E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Same interactive model used in the project card; no static blueprint fallback. */}
          <div className="rounded-xs bg-[#050505] overflow-hidden border border-[#D4AF37]/20 shadow-inner">
            <React.Suspense fallback={<div className="flex h-52 sm:h-60 items-center justify-center bg-[#090b0e] text-[10px] font-mono tracking-wider text-[#A8988B]">LOADING INTERACTIVE MODEL</div>}>
              <ProjectSimulation projectId={project.id} />
            </React.Suspense>
          </div>

          {/* Title and Full Description */}
          <div className="space-y-3">
            <h2
              id="modal-project-title"
              className="font-serif text-2xl sm:text-4xl text-[#E8DFD8] font-light uppercase tracking-wide leading-tight"
            >
              {project.title}
            </h2>

            <p className="text-sm sm:text-base text-[#A8988B] leading-relaxed font-sans">
              {project.fullDescription}
            </p>
          </div>

          {/* Objectives */}
          <div className="p-5 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/20 space-y-3">
            <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-[0.15em] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Project Objectives</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E8DFD8] font-sans">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-0.5 font-mono">0{i + 1}.</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & CAD Considerations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tools Planned */}
            <div className="p-5 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/20 space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-[0.15em] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#D4AF37]" />
                <span>Tools & Software</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.toolsPlanned.map((tool, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xs bg-[#14110E] border border-[#D4AF37]/35 text-xs font-mono text-[#E8DFD8]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CAD / Engineering Considerations */}
            <div className="p-5 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/20 space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-[0.15em] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Technical Considerations</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[#A8988B] font-sans">
                {project.cadConsiderations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D4AF37]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="p-5 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/20 space-y-3">
            <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-[0.15em] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Target Learning Outcomes</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.learningOutcomes.map((outcome, i) => (
                <div key={i} className="p-3 rounded-xs bg-[#111318] border border-[#D4AF37]/15">
                  <span className="font-mono text-[10px] text-[#D4AF37] block mb-1 font-bold">
                    OUTCOME 0{i + 1}
                  </span>
                  <p className="text-xs text-[#E8DFD8]">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Note */}
          <div className="p-4 rounded-xs bg-[#111318] border border-[#D4AF37]/20 text-xs font-mono text-[#A8988B] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>
              This project is part of Giresh Pavaan S K&apos;s academic exploration track at Dr. Mahalingam College of Engineering. Objectives and CAD schematics reflect coursework and study plans.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
