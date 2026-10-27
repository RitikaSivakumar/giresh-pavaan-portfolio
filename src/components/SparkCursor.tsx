import React, { useEffect, useRef, useState } from 'react';
import { playInterfaceSound } from '../lib/interfaceSound.ts';

type Particle = { x: number; y: number; vx: number; vy: number; life: number; size: number; alpha: number };

export const SparkCursor: React.FC<{ motionEnabled?: boolean }> = ({ motionEnabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(finePointer.matches && !reducedMotion.matches && motionEnabled);
    sync();
    finePointer.addEventListener('change', sync);
    reducedMotion.addEventListener('change', sync);
    return () => {
      finePointer.removeEventListener('change', sync);
      reducedMotion.removeEventListener('change', sync);
    };
  }, [motionEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const orb = orbRef.current;
    if (!enabled || !canvas || !orb) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    document.body.classList.add('has-custom-cursor');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const pool: Particle[] = Array.from({ length: 72 }, () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0, size: 0, alpha: 0 }));
    let nextParticle = 0;
    let pointerX = -100;
    let pointerY = -100;
    let currentX = -100;
    let currentY = -100;
    let previousX = -100;
    let previousY = -100;
    let lastBurstAt = 0;
    let frameId: number | null = null;
    let lastTime = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const emit = (x: number, y: number, count: number, power = 1) => {
      for (let i = 0; i < count; i += 1) {
        const particle = pool[nextParticle];
        nextParticle = (nextParticle + 1) % pool.length;
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.35 + Math.random() * 1.8) * power;
        particle.x = x;
        particle.y = y;
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed - Math.random() * 0.6;
        particle.life = 0.35 + Math.random() * 0.35;
        particle.size = 0.65 + Math.random() * 1.7;
        particle.alpha = 0.5 + Math.random() * 0.45;
      }
    };
    const schedule = () => {
      if (frameId === null) frameId = requestAnimationFrame(tick);
    };
    const tick = (time: number) => {
      frameId = null;
      const delta = Math.min((time - (lastTime || time)) / 16.67, 2.5);
      lastTime = time;
      currentX += (pointerX - currentX) * 0.34;
      currentY += (pointerY - currentY) * 0.34;
      orb.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      context.clearRect(0, 0, width, height);
      let alive = false;
      for (const particle of pool) {
        if (particle.life <= 0) continue;
        particle.life -= delta / 60;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vx *= 0.985;
        particle.vy = particle.vy * 0.985 + 0.018 * delta;
        const opacity = Math.max(0, particle.life / 0.7) * particle.alpha;
        context.beginPath();
        context.fillStyle = `rgba(245, 210, 100, ${opacity})`;
        context.shadowColor = 'rgba(212, 175, 55, 0.75)';
        context.shadowBlur = 7;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
        alive = true;
      }
      context.shadowBlur = 0;
      const catchingUp = Math.abs(pointerX - currentX) > 0.7 || Math.abs(pointerY - currentY) > 0.7;
      if (alive || catchingUp) schedule();
    };
    const isInteractive = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest('a,button,[role="button"],input,textarea,select,.interactive-card,[data-project-simulation]'));
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      orb.style.opacity = '1';
      const targetHovered = isInteractive(event.target);
      setHovered((previous) => previous === targetHovered ? previous : targetHovered);
      if (previousX >= 0) {
        const dx = event.clientX - previousX;
        const dy = event.clientY - previousY;
        const distance = Math.hypot(dx, dy);
        if (distance > 8) emit(event.clientX, event.clientY, Math.min(3, Math.floor(distance / 18) + 1), 0.65);
        if (distance > 38 && event.timeStamp - lastBurstAt > 900) {
          emit(event.clientX, event.clientY, 5, 0.8);
          playInterfaceSound('sparkle');
          lastBurstAt = event.timeStamp;
        }
      }
      previousX = event.clientX;
      previousY = event.clientY;
      schedule();
    };
    const onLeave = () => { orb.style.opacity = '0'; };
    const onSpark = (event: Event) => {
      const detail = (event as CustomEvent<{ x: number; y: number; count?: number }>).detail;
      if (detail) emit(detail.x, detail.y, detail.count ?? 14, 1.6);
      schedule();
    };
    const onVisibility = () => { if (document.hidden && frameId !== null) { cancelAnimationFrame(frameId); frameId = null; } else schedule(); };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('portfolio-spark', onSpark);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('portfolio-spark', onSpark);
      document.removeEventListener('visibilitychange', onVisibility);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  return enabled ? <>
    <canvas ref={canvasRef} aria-hidden="true" className="spark-cursor-canvas" />
    <div ref={orbRef} aria-hidden="true" className={`spark-cursor-orb ${hovered ? 'is-hovered' : ''}`} />
  </> : null;
};
