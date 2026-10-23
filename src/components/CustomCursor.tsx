import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device supports fine pointer and respects reduced-motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for contextual text attribute
      const cursorTarget = target.closest('[data-cursor-text]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor-text'));
        setIsHovering(true);
        return;
      } else {
        setCursorText(null);
      }

      // Check standard interactive targets
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('[role="button"]') !== null;

      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing animation loop with slight easing
    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Electric Blue Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#3B82F6] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_10px_rgba(59,130,246,0.9)]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Trailing Outer Ring with contextual label expand and Cyan glow */}
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out ${
          cursorText
            ? 'w-18 h-18 bg-[#10243A]/90 border-[#3B82F6] shadow-[0_0_22px_rgba(34,211,238,0.45)] backdrop-blur-xs'
            : isHovering
            ? 'w-12 h-12 bg-[#3B82F6]/15 border-[#22D3EE] shadow-[0_0_16px_rgba(34,211,238,0.35)]'
            : 'w-6 h-6 bg-transparent border-[#3B82F6]/40'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#22D3EE] uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
