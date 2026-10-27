import React, { useEffect } from 'react';
import { hasRecentInterfacePointer, markInterfacePointer, playInterfaceSound, readInterfaceSoundPreference } from '../lib/interfaceSound.ts';

export const SoundManager: React.FC = () => {
  useEffect(() => {
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
      if (!readInterfaceSoundPreference() || !(event.target instanceof Element)) return;
      if (!event.target.closest('a,button,[role="button"],.interactive-card,[data-project-simulation]')) return;
      markInterfacePointer();
      playInterfaceSound(getKind(event.target));
    };
    const onClick = (event: MouseEvent) => {
      if (!readInterfaceSoundPreference() || !(event.target instanceof Element)) return;
      if (hasRecentInterfacePointer()) return;
      const target = event.target;
      if (target.closest('a,button,[role="button"],.interactive-card,[data-project-simulation]')) playInterfaceSound(getKind(target));
    };
    const onPointerOver = (event: PointerEvent) => {
      if (!readInterfaceSoundPreference() || !(event.target instanceof Element)) return;
      const target = event.target.closest('button,a,[role="button"],.interactive-card,[data-project-simulation]');
      if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return;
      playInterfaceSound('hover');
    };
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('click', onClick);
      window.removeEventListener('pointerover', onPointerOver);
    };
  }, []);
  return null;
};
