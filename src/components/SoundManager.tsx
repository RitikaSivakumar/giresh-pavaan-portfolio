import React, { useEffect } from 'react';
import { hasPlayedWelcome, hasRecentInterfacePointer, markInterfacePointer, playInterfaceSound, playWelcomeOnce, readInterfaceSoundPreference, unlockInterfaceSound } from '../lib/interfaceSound.ts';

export const SoundManager: React.FC = () => {
  useEffect(() => {
    let modelPointer: { id: number; x: number; y: number; moved: boolean } | null = null;
    const getKind = (target: Element) => {
      const model = target.closest('[data-project-simulation]');
      const project = target.closest('.interactive-card');
      const navLink = target.closest('header nav a, header a');
      const transition = target.closest('[data-sound="transition"]');
      if (model) return 'model' as const;
      if (transition) return 'transition' as const;
      if (project) return 'project' as const;
      if (navLink) return 'navigation' as const;
      return 'click' as const;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest('a,button,[role="button"],.interactive-card,[data-project-simulation]')) return;
      markInterfacePointer();
      if (!readInterfaceSoundPreference()) return;
      unlockInterfaceSound();
      if (playWelcomeOnce()) return;
      const model = event.target.closest('[data-project-simulation]');
      if (model) {
        const isControl = event.target.closest('button,input,select,[role="slider"]');
        if (isControl) playInterfaceSound('model');
        else modelPointer = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
        return;
      }
      playInterfaceSound(getKind(event.target));
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!modelPointer || event.pointerId !== modelPointer.id) return;
      if (Math.hypot(event.clientX - modelPointer.x, event.clientY - modelPointer.y) > 4) modelPointer.moved = true;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!modelPointer || event.pointerId !== modelPointer.id) return;
      if (modelPointer.moved) playInterfaceSound('model');
      modelPointer = null;
    };
    const onClick = (event: MouseEvent) => {
      if (!readInterfaceSoundPreference() || !(event.target instanceof Element)) return;
      if (hasRecentInterfacePointer()) return;
      const target = event.target;
      if (target.closest('a,button,[role="button"],.interactive-card,[data-project-simulation]')) {
        unlockInterfaceSound();
        if (!playWelcomeOnce()) playInterfaceSound(getKind(target));
      }
    };
    const onPointerOver = (event: PointerEvent) => {
      if (!readInterfaceSoundPreference() || !(event.target instanceof Element)) return;
      const target = event.target.closest('button,a,[role="button"],.interactive-card,[data-project-simulation]');
      if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return;
      if (hasPlayedWelcome()) playInterfaceSound('hover');
    };
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('click', onClick);
      window.removeEventListener('pointerover', onPointerOver);
    };
  }, []);
  return null;
};
