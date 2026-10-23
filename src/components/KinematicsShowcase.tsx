import React from 'react';
import { MechanicalTurbine3D } from './MechanicalTurbine3D.tsx';
import { Cpu, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';

export const KinematicsShowcase: React.FC = () => {
  return (
    <section
      id="kinematics"
      className="py-20 lg:py-28 relative bg-[#07111F] border-t border-[#243B53] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22D3EE]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#243B53]">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#243B53] bg-[#10243A] text-[11px] font-mono text-[#60A5FA] tracking-[0.25em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-ping shadow-[0_0_6px_#3B82F6]" />
              02 / INTERACTIVE KINEMATICS & CAD
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F1F5F9] uppercase tracking-tight leading-[1.05]">
              AERODYNAMIC TURBINE{' '}
              <span className="font-serif italic font-normal text-gradient-electric">
                ROTOR DYNAMICS.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#A7B4C7] leading-relaxed max-w-2xl pt-1">
              Interactive 3D WebGL assembly of a high-bypass axial turbine rotor. Designed with electric blue titanium and cobalt aerospace PBR materials. Rotate and tilt with your pointer to inspect blade sweep angles and mechanical clearance.
            </p>
          </div>

          {/* Quick HUD indicator */}
          <div className="flex flex-col items-start md:items-end gap-2 text-[10px] font-mono text-[#60A5FA]">
            <span className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-[#3B82F6]" />
              360° POINTER ROTATION ACTIVE
            </span>
            <span className="text-[#A7B4C7] text-[9px]">
              ENGINEERED IN THREE.JS · ZERO JANK
            </span>
          </div>
        </div>

        {/* Centerpiece 3D Canvas + Technical Telemetry */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D WebGL Turbine Viewer (8 cols) */}
          <div className="lg:col-span-8">
            <MechanicalTurbine3D />
          </div>

          {/* Technical Specifications Spec-Sheet (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-sm bg-[#0B192B] border border-[#243B53] shadow-[0_15px_40px_rgba(7,17,31,0.9)] relative">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#243B53] text-xs font-mono text-[#60A5FA] tracking-wider uppercase font-semibold">
                <Cpu className="w-4 h-4 text-[#3B82F6]" />
                <span>ROTOR SPECIFICATION</span>
              </div>

              <div className="mt-4 space-y-3.5 text-xs font-mono">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A7B4C7]">Assembly ID</span>
                  <span className="text-[#F1F5F9] font-bold">AT-R16-GP</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A7B4C7]">Aerofoil Pitch</span>
                  <span className="text-[#22D3EE]">20.05° Variable</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A7B4C7]">Shaft Diam.</span>
                  <span className="text-[#F1F5F9]">Ø 35.00 mm (h7)</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A7B4C7]">Radial Clearance</span>
                  <span className="text-[#F1F5F9]">0.45 mm ±0.02</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A7B4C7]">Tolerance Standard</span>
                  <span className="text-[#60A5FA]">ISO 2768-m</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#243B53]/70 flex items-start gap-2.5 text-[11px] font-sans text-[#A7B4C7]">
                <Sparkles className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <span>
                  High-speed turbine design principles studied during Kinematics of Machinery and Finite Element Analysis coursework.
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xs bg-[#10243A] border border-[#243B53] flex items-center justify-between text-[11px] font-mono text-[#A7B4C7]">
              <span className="flex items-center gap-2 text-[#60A5FA]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>ROTATIONAL STRESS:</span>
              </span>
              <span className="text-[#F1F5F9] font-bold">FEA VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
