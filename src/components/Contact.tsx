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
    <section id="contact" className="py-24 lg:py-32 relative bg-[#07111F] border-t border-[#243B53] overflow-hidden">
      {/* Background radial blue glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#3B82F6]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm border border-[#243B53] bg-[#10243A] text-[11px] font-mono text-[#60A5FA] tracking-[0.25em] uppercase shadow-xs">
            <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full shadow-[0_0_6px_#3B82F6]" />
            06 / CONTACT
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F1F5F9] uppercase tracking-tight leading-[1.05]">
            LET&apos;S BUILD{' '}
            <span className="font-serif italic font-normal text-gradient-electric">
              SOMETHING MEANINGFUL.
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#A7B4C7] leading-relaxed font-sans">
            Have an internship opportunity, academic collaboration, or mechanical inquiry? I am always eager to connect with engineering professionals, professors, and mentors.
          </p>
        </div>

        {/* Content Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-stretch">
          {/* Left Column: Direct Info Card (~5 cols) */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-sm bg-[#0B192B] border border-[#243B53] shadow-[0_15px_40px_rgba(7,17,31,0.9)] relative flex flex-col justify-between space-y-6">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#3B82F6]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#3B82F6]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#3B82F6]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#3B82F6]" />

            <div className="space-y-6">
              <h3 className="font-serif text-xl sm:text-2xl text-[#F1F5F9] uppercase font-normal tracking-wide pb-4 border-b border-[#243B53]">
                DIRECT CHANNELS
              </h3>

              {/* Email */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Email Inquiries</span>
                </span>
                <p className="font-mono text-sm text-[#F1F5F9] break-all">
                  {PERSONAL_INFO.email}
                </p>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor-text="COPY"
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#10243A] border border-[#3B82F6]/40 text-[10px] font-mono text-[#60A5FA] hover:bg-[#3B82F6] hover:text-[#07111F] transition-colors cursor-pointer shadow-xs"
                >
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="space-y-1.5 pt-4 border-t border-[#243B53]/70">
                <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Telephone</span>
                </span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  data-cursor-text="CALL"
                  className="font-mono text-sm text-[#F1F5F9] hover:text-[#60A5FA] transition-colors block"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              {/* Location */}
              <div className="space-y-1.5 pt-4 border-t border-[#243B53]/70">
                <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Location & Postal</span>
                </span>
                <p className="text-xs text-[#F1F5F9] leading-relaxed font-sans">
                  {PERSONAL_INFO.address}
                </p>
              </div>

              {/* Professional LinkedIn */}
              <div className="space-y-1.5 pt-4 border-t border-[#243B53]/70">
                <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Professional Network</span>
                </span>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="LINKEDIN"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-[#22D3EE] hover:underline"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Live Interactive Status Indicator */}
            <div className="p-3.5 rounded-xs bg-[#10243A] border border-[#243B53] flex flex-col gap-1.5 text-[11px] font-mono shadow-xs">
              <div className="flex items-center gap-2 text-[#22D3EE]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]" />
                </span>
                <span className="font-semibold tracking-wider">CHANNEL ACTIVE</span>
              </div>
              <span className="text-[#A7B4C7] text-[10px]">
                Direct inbox monitored for academic and technical inquiries.
              </span>
            </div>
          </div>

          {/* Right Column: Transmission / Contact Form (~7 cols) */}
          <div className="lg:col-span-7 p-7 sm:p-8 rounded-sm bg-[#0B192B] border border-[#243B53] shadow-[0_15px_40px_rgba(7,17,31,0.9)] relative">
            <h3 className="font-serif text-xl sm:text-2xl text-[#F1F5F9] uppercase font-normal tracking-wide pb-4 border-b border-[#243B53]">
              SEND A TRANSMISSION
            </h3>

            {isSent && (
              <div className="my-4 p-4 rounded-xs bg-[#10243A] border border-[#3B82F6] text-xs font-mono text-[#60A5FA] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22D3EE]" />
                <span>Email client opened with formatted transmission. You may proceed to send!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Kumar"
                    className="w-full px-4 py-3 rounded-xs bg-[#10243A] border border-[#243B53] focus:border-[#3B82F6] focus:outline-hidden text-sm text-[#F1F5F9] placeholder-[#A7B4C7]/40 font-sans"
                  />
                  {errors.name && (
                    <p className="mt-1 text-[10px] font-mono text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded-xs bg-[#10243A] border border-[#243B53] focus:border-[#3B82F6] focus:outline-hidden text-sm text-[#F1F5F9] placeholder-[#A7B4C7]/40 font-sans"
                  />
                  {errors.email && (
                    <p className="mt-1 text-[10px] font-mono text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship / CAD Collaboration / Project Inquiry"
                  className="w-full px-4 py-3 rounded-xs bg-[#10243A] border border-[#243B53] focus:border-[#3B82F6] focus:outline-hidden text-sm text-[#F1F5F9] placeholder-[#A7B4C7]/40 font-sans"
                />
                {errors.subject && (
                  <p className="mt-1 text-[10px] font-mono text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
                  TRANSMISSION MESSAGE *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your inquiry, technical challenge, or internship role..."
                  className="w-full px-4 py-3 rounded-xs bg-[#10243A] border border-[#243B53] focus:border-[#3B82F6] focus:outline-hidden text-sm text-[#F1F5F9] placeholder-[#A7B4C7]/40 font-sans resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-[10px] font-mono text-red-400">{errors.message}</p>
                )}
              </div>

              <Magnetic strength={0.15} className="w-full">
                <button
                  type="submit"
                  data-cursor-text="TRANSMIT"
                  className="w-full py-4 px-6 rounded-xs bg-[#3B82F6] hover:bg-[#60A5FA] text-[#07111F] font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                >
                  <span>TRANSMIT MESSAGE</span>
                  <Send className="w-4 h-4 text-[#07111F]" />
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
