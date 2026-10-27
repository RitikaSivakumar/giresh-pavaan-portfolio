import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, Copy, Check, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { playCinemaChime } from './EngineeringVisuals.tsx';
import { Magnetic } from './Magnetic.tsx';

interface ContactProps {
  linkedinUrl: string;
}

export const Contact: React.FC<ContactProps> = ({ linkedinUrl }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCopied, setIsCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message (at least 10 characters)';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    playCinemaChime();

    const subjectEncoded = encodeURIComponent(`[Engineering Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Hello Giresh,\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\n---\nSent via Giresh Pavaan S K Engineering Portfolio`
    );

    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    setIsSent(true);
  };

  const handleCopyEmail = () => {
    playCinemaChime();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-14 sm:py-16 lg:py-20 relative bg-[#0B0B0D] border-t border-[#D4AF37]/20 overflow-hidden">
      {/* Background radial gold glow & subtle blue accent */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#24B8FF]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#D4AF37]/30 bg-[#111318] text-[11px] font-mono text-[#D4AF37] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
            08 / TRANSMISSION & INQUIRY
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#E8DFD8] uppercase tracking-tight leading-[1.05]">
            LET&apos;S BUILD{' '}
            <span className="font-serif italic font-normal text-gradient-gold">
              SOMETHING MEANINGFUL.
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#A8988B] leading-relaxed font-sans">
            Have an internship opportunity, academic collaboration, or mechanical inquiry? I am always eager to connect with engineering professionals, professors, and mentors.
          </p>
        </div>

        {/* Content Layout */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Left Column: Direct Info Card (~5 cols) - natural content height */}
          <div className="interactive-card lg:col-span-5 p-5 sm:p-6 rounded-sm bg-[#111318] border border-[#D4AF37]/25 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative flex flex-col gap-4">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4AF37]" />

            <div className="space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-[#E8DFD8] uppercase font-normal tracking-wide pb-4 border-b border-[#D4AF37]/20">
                DIRECT CHANNELS
              </h3>

              {/* Email */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Email Inquiries</span>
                </span>
                <p className="font-mono text-sm text-[#E8DFD8] break-all">
                  {PERSONAL_INFO.email}
                </p>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor-text="COPY"
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#10233F]/70 border border-[#24B8FF]/40 text-[10px] font-mono text-[#24B8FF] hover:bg-[#24B8FF] hover:text-black transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="space-y-1.5 pt-3 border-t border-[#D4AF37]/15">
                <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Telephone</span>
                </span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  data-cursor-text="CALL"
                  className="font-mono text-sm text-[#E8DFD8] hover:text-[#24B8FF] transition-colors block"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              {/* Location */}
              <div className="space-y-1.5 pt-3 border-t border-[#D4AF37]/15">
                <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Location & Postal</span>
                </span>
                <p className="text-xs text-[#E8DFD8] leading-relaxed font-sans">
                  {PERSONAL_INFO.address}
                </p>
              </div>

              {/* Professional LinkedIn */}
              <div className="space-y-1.5 pt-3 border-t border-[#D4AF37]/15">
                <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Professional Network</span>
                </span>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="LINKEDIN"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] hover:text-[#24B8FF] transition-colors"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Live Interactive Status Indicator with Blue Accent */}
            <div className="p-3.5 rounded-xs bg-[#10233F]/85 border border-[#24B8FF]/40 flex flex-col gap-1.5 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-[#24B8FF]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#24B8FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#24B8FF]" />
                </span>
                <span className="font-semibold tracking-wider">CHANNEL ACTIVE</span>
              </div>
              <span className="text-[#A8988B] text-[10px]">
                Direct inbox monitored for academic and technical inquiries.
              </span>
            </div>
          </div>

          {/* Right Column: Transmission / Contact Form (~7 cols) */}
          <div className="interactive-card lg:col-span-7 p-6 sm:p-7 rounded-sm bg-[#111318] border border-[#D4AF37]/25 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative">
            <h3 className="font-serif text-xl sm:text-2xl text-[#E8DFD8] uppercase font-normal tracking-wide pb-4 border-b border-[#D4AF37]/20">
              SEND A TRANSMISSION
            </h3>

            {isSent && (
              <div className="my-4 p-4 rounded-xs bg-[#10233F]/80 border border-[#24B8FF] text-xs font-mono text-[#24B8FF] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#24B8FF]" />
                <span>Email client opened with formatted transmission. You may proceed to send!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Kumar"
                    className="w-full px-4 py-3 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/25 focus:border-[#24B8FF] focus:ring-1 focus:ring-[#24B8FF]/40 focus:outline-hidden text-sm text-[#E8DFD8] placeholder-[#706458] font-sans transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1 text-[10px] font-mono text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/25 focus:border-[#24B8FF] focus:ring-1 focus:ring-[#24B8FF]/40 focus:outline-hidden text-sm text-[#E8DFD8] placeholder-[#706458] font-sans transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1 text-[10px] font-mono text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship / CAD Collaboration / Project Inquiry"
                  className="w-full px-4 py-3 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/25 focus:border-[#24B8FF] focus:ring-1 focus:ring-[#24B8FF]/40 focus:outline-hidden text-sm text-[#E8DFD8] placeholder-[#706458] font-sans transition-colors"
                />
                {errors.subject && (
                  <p className="mt-1 text-[10px] font-mono text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                  TRANSMISSION MESSAGE *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your inquiry, technical challenge, or internship role..."
                  className="w-full px-4 py-3 rounded-xs bg-[#0B0B0D] border border-[#D4AF37]/25 focus:border-[#24B8FF] focus:ring-1 focus:ring-[#24B8FF]/40 focus:outline-hidden text-sm text-[#E8DFD8] placeholder-[#706458] font-sans resize-none transition-colors"
                />
                {errors.message && (
                  <p className="mt-1 text-[10px] font-mono text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Gold Button with Magnetic Hover */}
              <Magnetic strength={0.15} className="w-full">
                <button
                  type="submit"
                  data-cursor-text="TRANSMIT"
                  className="btn-gold w-full py-4 px-6 rounded-xs font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                >
                  <span>TRANSMIT MESSAGE</span>
                  <Send className="w-4 h-4 text-black" />
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
