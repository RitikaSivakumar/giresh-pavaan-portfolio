import React, { useEffect } from 'react';

/** Global click feedback that emits a pooled particle burst without intercepting input. */
export const ClickSpark: React.FC = () => {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !(event.target instanceof Element)) return;
      if (!event.target.closest('a,button,[role="button"],.interactive-card,[data-project-simulation]')) return;
      window.dispatchEvent(new CustomEvent('portfolio-spark', { detail: { x: event.clientX, y: event.clientY, count: 16 } }));
    };
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, []);
  return null;
};
