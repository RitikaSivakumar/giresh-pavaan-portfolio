import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export const MechanicalTurbine3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check device capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = !window.matchMedia('(pointer: fine)').matches;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isTouch,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Materials: Electric Blue Titanium, Deep Cobalt Alloy & Cyan Wireframe PBR
    const electricBlueMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.9,
      roughness: 0.18,
    });

    const cobaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a5f,
      metalness: 0.85,
      roughness: 0.3,
    });

    const midnightChromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x07111f,
      metalness: 0.95,
      roughness: 0.35,
    });

    const wireframeCyanMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    // Master Mechanical Group
    const rotorAssembly = new THREE.Group();
    scene.add(rotorAssembly);

    // 1. Central Drive Shaft & Hub
    const shaftGeo = new THREE.CylinderGeometry(0.35, 0.35, 3.2, 32);
    const shaftMesh = new THREE.Mesh(shaftGeo, cobaltMaterial);
    shaftMesh.rotation.x = Math.PI / 2;
    rotorAssembly.add(shaftMesh);

    const hubGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.5, 32);
    const hubMesh = new THREE.Mesh(hubGeo, midnightChromeMaterial);
    hubMesh.rotation.x = Math.PI / 2;
    rotorAssembly.add(hubMesh);

    const hubRingGeo = new THREE.TorusGeometry(1.02, 0.08, 16, 48);
    const hubRing = new THREE.Mesh(hubRingGeo, electricBlueMaterial);
    rotorAssembly.add(hubRing);

    // 2. 16 Radial Aerodynamic Turbine Blades
    const bladeGeo = new THREE.BoxGeometry(0.18, 1.4, 0.06);
    const bladeCount = 16;
    const bladesGroup = new THREE.Group();

    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const blade = new THREE.Mesh(bladeGeo, electricBlueMaterial);

      blade.position.x = Math.cos(angle) * 1.7;
      blade.position.y = Math.sin(angle) * 1.7;
      blade.rotation.z = angle + Math.PI / 2;
      // Aerodynamic pitch angle
      blade.rotation.x = 0.35;

      bladesGroup.add(blade);
    }
    rotorAssembly.add(bladesGroup);

    // 3. Outer Planetary Shroud Ring with Teeth
    const outerShroudGeo = new THREE.TorusGeometry(2.45, 0.08, 16, 64);
    const outerShroud = new THREE.Mesh(outerShroudGeo, electricBlueMaterial);
    rotorAssembly.add(outerShroud);

    const wireframeShroudGeo = new THREE.TorusGeometry(2.55, 0.12, 8, 32);
    const wireframeShroud = new THREE.Mesh(wireframeShroudGeo, wireframeCyanMaterial);
    rotorAssembly.add(wireframeShroud);

    // 4. Stator Measurement Ring
    const statorRingGeo = new THREE.RingGeometry(2.7, 2.73, 64);
    const statorRing = new THREE.Mesh(statorRingGeo, wireframeCyanMaterial);
    scene.add(statorRing);

    // Lighting Setup: Electric Blue + Ice Blue Rim + Cyan Depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const blueKeyLight = new THREE.DirectionalLight(0x3b82f6, 2.8);
    blueKeyLight.position.set(4, 5, 5);
    scene.add(blueKeyLight);

    const iceRimLight = new THREE.DirectionalLight(0x60a5fa, 2.2);
    iceRimLight.position.set(-5, -4, 4);
    scene.add(iceRimLight);

    const cyanBackLight = new THREE.DirectionalLight(0x22d3ee, 1.2);
    cyanBackLight.position.set(0, 0, -5);
    scene.add(cyanBackLight);

    // Pointer Interaction variables
    let targetRotationX = 0.3;
    let targetRotationY = 0.4;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        rotorAssembly.rotation.y += deltaX * 0.01;
        rotorAssembly.rotation.x += deltaY * 0.01;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      } else {
        targetRotationY = x * 1.2;
        targetRotationX = y * -0.9 + 0.3;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const speedMultiplier = isInteracting ? 2.5 : 1.0;

      if (!prefersReducedMotion) {
        // Continuous axial turbine rotation
        rotorAssembly.rotation.z += delta * 0.8 * speedMultiplier;
        statorRing.rotation.z -= delta * 0.15;

        // Smooth damping towards pointer
        if (!isDragging) {
          rotorAssembly.rotation.x += (targetRotationX - rotorAssembly.rotation.x) * 0.05;
          rotorAssembly.rotation.y += (targetRotationY - rotorAssembly.rotation.y) * 0.05;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Clean resource disposal on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      shaftGeo.dispose();
      hubGeo.dispose();
      hubRingGeo.dispose();
      bladeGeo.dispose();
      outerShroudGeo.dispose();
      wireframeShroudGeo.dispose();
      statorRingGeo.dispose();

      electricBlueMaterial.dispose();
      cobaltMaterial.dispose();
      midnightChromeMaterial.dispose();
      wireframeCyanMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`relative rounded-sm bg-[#0B192B]/90 border border-[#243B53] p-4 shadow-[0_20px_50px_rgba(7,17,31,0.95)] overflow-hidden select-none ${className}`}
    >
      {/* Corner Metallic Clips */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#3B82F6] z-10" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#3B82F6] z-10" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#3B82F6] z-10" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#3B82F6] z-10" />

      {/* Header Technical Annotation */}
      <div className="flex items-center justify-between pb-2 border-b border-[#243B53] z-10 relative">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse shadow-[0_0_8px_#22D3EE]" />
          <span className="text-[10px] font-mono text-[#60A5FA] tracking-[0.2em] uppercase font-bold">
            INTERACTIVE 3D KINEMATICS
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#A7B4C7] tracking-wider">
          POINTER DRAG ENABLED
        </span>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        data-cursor-text="INSPECT"
        className="w-full h-72 sm:h-80 md:h-96 cursor-grab active:cursor-grabbing relative flex items-center justify-center"
      />

      {/* Technical CAD HUD Overlay */}
      <div className="pt-3 border-t border-[#243B53]/70 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-[#A7B4C7] z-10 relative">
        <div className="p-2 rounded-xs bg-[#10243A] border border-[#243B53]">
          <span className="text-[#22D3EE] block text-[9px]">COMPONENT</span>
          <span className="text-[#F1F5F9]">AXIAL TURBINE ROTOR</span>
        </div>
        <div className="p-2 rounded-xs bg-[#10243A] border border-[#243B53]">
          <span className="text-[#22D3EE] block text-[9px]">DIAMETER</span>
          <span className="text-[#F1F5F9]">Ø 280.00 mm</span>
        </div>
        <div className="p-2 rounded-xs bg-[#10243A] border border-[#243B53]">
          <span className="text-[#22D3EE] block text-[9px]">BLADE COUNT</span>
          <span className="text-[#F1F5F9]">16 AEROFOIL UNITS</span>
        </div>
        <div className="p-2 rounded-xs bg-[#10243A] border border-[#243B53]">
          <span className="text-[#22D3EE] block text-[9px]">MATERIAL</span>
          <span className="text-[#F1F5F9]">TI-ELECTRIC BLUE SPEC</span>
        </div>
      </div>
    </div>
  );
};
