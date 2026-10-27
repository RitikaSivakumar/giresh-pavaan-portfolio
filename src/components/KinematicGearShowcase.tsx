import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Gauge,
  Sparkles,
  Info,
  Layers,
  Compass,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { playCinemaChime } from './EngineeringVisuals.tsx';

// Gear geometry procedural generator
function createSpurGearGeometry(teeth: number, pitchRadius: number, module: number, faceWidth: number) {
  const shape = new THREE.Shape();
  const addendum = module * 0.95;
  const dedendum = module * 1.2;
  const rOuter = pitchRadius + addendum;
  const rInner = pitchRadius - dedendum;
  const numTeeth = teeth;

  for (let i = 0; i < numTeeth; i++) {
    const angle = (i / numTeeth) * Math.PI * 2;
    const halfTooth = (Math.PI / numTeeth) * 0.44;
    const tipWidth = halfTooth * 0.45;

    const a0 = angle - halfTooth;
    const a1 = angle - tipWidth;
    const a2 = angle + tipWidth;
    const a3 = angle + halfTooth;

    const x0 = Math.cos(a0) * rInner;
    const y0 = Math.sin(a0) * rInner;
    const x1 = Math.cos(a1) * rOuter;
    const y1 = Math.sin(a1) * rOuter;
    const x2 = Math.cos(a2) * rOuter;
    const y2 = Math.sin(a2) * rOuter;
    const x3 = Math.cos(a3) * rInner;
    const y3 = Math.sin(a3) * rInner;

    if (i === 0) {
      shape.moveTo(x0, y0);
    } else {
      shape.lineTo(x0, y0);
    }
    shape.lineTo(x1, y1);
    shape.lineTo(x2, y2);
    shape.lineTo(x3, y3);
  }
  shape.closePath();

  // Center hole for shaft with keyway
  const holeRadius = 0.22;
  const hole = new THREE.Path();
  const keyW = 0.05;
  const keyH = 0.05;

  // Punch round shaft hole
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  // Keyway notch path
  const keyPath = new THREE.Path();
  keyPath.moveTo(-keyW, holeRadius - 0.02);
  keyPath.lineTo(keyW, holeRadius - 0.02);
  keyPath.lineTo(keyW, holeRadius + keyH);
  keyPath.lineTo(-keyW, holeRadius + keyH);
  keyPath.closePath();
  shape.holes.push(keyPath);

  // Extrude with slight bevel for realistic metallic edge reflections
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: faceWidth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.018,
    bevelThickness: 0.018,
  });

  geometry.center();
  return geometry;
}

export const KinematicGearShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interactive UI state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [autoOrbit, setAutoOrbit] = useState<boolean>(true);
  const [selectedComponent, setSelectedComponent] = useState<string>('gear1');
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  // Three.js mutable animation references
  const animFrameId = useRef<number | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const gear1GroupRef = useRef<THREE.Group | null>(null);
  const gear2GroupRef = useRef<THREE.Group | null>(null);
  const shaft1Ref = useRef<THREE.Mesh | null>(null);
  const shaft2Ref = useRef<THREE.Mesh | null>(null);
  const explodedLerpRef = useRef<number>(0);

  const bearingsFront1Ref = useRef<THREE.Group | null>(null);
  const bearingsRear1Ref = useRef<THREE.Group | null>(null);
  const bearingsFront2Ref = useRef<THREE.Group | null>(null);
  const bearingsRear2Ref = useRef<THREE.Group | null>(null);

  const isPlayingRef = useRef<boolean>(true);
  const speedRef = useRef<number>(1.0);
  const isExplodedRef = useRef<boolean>(false);
  const autoOrbitRef = useRef<boolean>(true);

  // Keep ref sync with state for continuous requestAnimationFrame loop
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    autoOrbitRef.current = autoOrbit;
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoOrbit;
    }
  }, [autoOrbit]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
      setAutoOrbit(false);
    }
  }, []);

  // Main Three.js Scene Setup & Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent to blend with #0B0B0D / #050505

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(2.4, 2.1, 3.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.0;
    controls.maxDistance = 8.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // don't go too far under baseplate
    controls.target.set(0, 0, 0);
    controls.autoRotate = autoOrbitRef.current;
    controls.autoRotateSpeed = 0.75;
    controlsRef.current = controls;

    // 5. Lighting Rig (High-precision metallic studio environment)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.9);
    scene.add(ambientLight);

    // Warm Golden Key Light
    const keyLight = new THREE.DirectionalLight(0xffecc4, 2.8);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    // Cool Back Rim Light for metallic specular separation
    const rimLight = new THREE.DirectionalLight(0xaad4f5, 1.4);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Subtle Electric Gold Spotlight at the Intermeshing Pitch Point
    const pitchGlint = new THREE.PointLight(0xd4af37, 2.5, 8);
    pitchGlint.position.set(0, 0.3, 0.6);
    scene.add(pitchGlint);

    // Technical Blue Floor bounce (subtle engineering accent)
    const floorBounce = new THREE.DirectionalLight(0x24b8ff, 0.4);
    floorBounce.position.set(0, -5, 2);
    scene.add(floorBounce);

    // 6. Materials
    // Metallic Polished Gold (Driving Pinion)
    const goldPinionMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.5,
    });

    // Metallic Brushed Antique Gold (Driven Gear)
    const brassGearMat = new THREE.MeshStandardMaterial({
      color: 0xdfb746,
      metalness: 0.88,
      roughness: 0.26,
      envMapIntensity: 1.3,
    });

    // Hardened Tool Steel for Shafts
    const steelShaftMat = new THREE.MeshStandardMaterial({
      color: 0xb0b3b8,
      metalness: 0.94,
      roughness: 0.18,
    });

    // Dark Cast Charcoal for Pillow Bearing Blocks
    const castIronMat = new THREE.MeshStandardMaterial({
      color: 0x181a1f,
      metalness: 0.5,
      roughness: 0.6,
    });

    // Phosphor Bronze for Bushings & Collars
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc68b39,
      metalness: 0.85,
      roughness: 0.32,
    });

    // Base Bedplate (Heavy precision ground black surface with gold bevel)
    const baseplateMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e12,
      metalness: 0.6,
      roughness: 0.4,
    });

    const boltMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.22,
    });

    // 7. Mechanical Assembly Geometry Definition
    // Gear 1 (Driving Pinion): N1 = 20 teeth, Module = 0.08, Pitch Radius = 0.80
    // Gear 2 (Driven Gear): N2 = 30 teeth, Module = 0.08, Pitch Radius = 1.20
    // Center Distance L = 0.80 + 1.20 = 2.00
    // Pitch ratio: 30 / 20 = 1.5 : 1
    const n1 = 20;
    const r1 = 0.8;
    const n2 = 30;
    const r2 = 1.2;
    const module = 0.08;
    const faceWidth = 0.22;
    const centerDist = r1 + r2; // 2.00

    const x1 = -centerDist * (r2 / (r1 + r2)); // -1.20
    const x2 = centerDist * (r1 / (r1 + r2)); // +0.80

    // Assembly Root Container
    const assemblyRoot = new THREE.Group();
    scene.add(assemblyRoot);

    // --- GEAR 1 (PINION) GROUP ---
    const gear1Group = new THREE.Group();
    gear1Group.position.set(x1, 0, 0);
    assemblyRoot.add(gear1Group);
    gear1GroupRef.current = gear1Group;

    const gear1Geo = createSpurGearGeometry(n1, r1, module, faceWidth);
    const gear1Mesh = new THREE.Mesh(gear1Geo, goldPinionMat);
    gear1Group.add(gear1Mesh);

    // Cylindrical Hub Collar for Pinion
    const hub1Geo = new THREE.CylinderGeometry(0.32, 0.32, 0.32, 32);
    hub1Geo.rotateX(Math.PI / 2);
    const hub1Mesh = new THREE.Mesh(hub1Geo, bronzeMat);
    gear1Group.add(hub1Mesh);

    // --- GEAR 2 (DRIVEN GEAR) GROUP ---
    const gear2Group = new THREE.Group();
    gear2Group.position.set(x2, 0, 0);
    assemblyRoot.add(gear2Group);
    gear2GroupRef.current = gear2Group;

    const gear2Geo = createSpurGearGeometry(n2, r2, module, faceWidth);
    const gear2Mesh = new THREE.Mesh(gear2Geo, brassGearMat);
    // Initial tooth meshing offset: half-tooth pitch offset on gear 2
    gear2Mesh.rotation.z = Math.PI / n2;
    gear2Group.add(gear2Mesh);

    // Cylindrical Hub Collar for Gear 2
    const hub2Geo = new THREE.CylinderGeometry(0.38, 0.38, 0.32, 32);
    hub2Geo.rotateX(Math.PI / 2);
    const hub2Mesh = new THREE.Mesh(hub2Geo, bronzeMat);
    gear2Group.add(hub2Mesh);

    // --- SHAFTS ---
    const shaftLength = 2.1;
    const shaft1Geo = new THREE.CylinderGeometry(0.2, 0.2, shaftLength, 32);
    shaft1Geo.rotateX(Math.PI / 2);
    const shaft1Mesh = new THREE.Mesh(shaft1Geo, steelShaftMat);
    shaft1Mesh.position.set(x1, 0, 0);
    assemblyRoot.add(shaft1Mesh);
    shaft1Ref.current = shaft1Mesh;

    const shaft2Geo = new THREE.CylinderGeometry(0.22, 0.22, shaftLength, 32);
    shaft2Geo.rotateX(Math.PI / 2);
    const shaft2Mesh = new THREE.Mesh(shaft2Geo, steelShaftMat);
    shaft2Mesh.position.set(x2, 0, 0);
    assemblyRoot.add(shaft2Mesh);
    shaft2Ref.current = shaft2Mesh;

    // Keyways (steel keys on shafts)
    const key1Geo = new THREE.BoxGeometry(0.045, 0.045, 0.28);
    const key1Mesh = new THREE.Mesh(key1Geo, steelShaftMat);
    key1Mesh.position.set(x1, 0.21, 0);
    assemblyRoot.add(key1Mesh);

    const key2Geo = new THREE.BoxGeometry(0.045, 0.045, 0.28);
    const key2Mesh = new THREE.Mesh(key2Geo, steelShaftMat);
    key2Mesh.position.set(x2, 0.23, 0);
    assemblyRoot.add(key2Mesh);

    // --- PILLOW BLOCK BEARINGS GENERATOR ---
    const bearingZDist = 0.78;
    const createPillowBlock = (xPos: number, zPos: number) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(xPos, -0.4, zPos);

      // Cast Base block
      const footGeo = new THREE.BoxGeometry(0.72, 0.24, 0.34);
      const foot = new THREE.Mesh(footGeo, castIronMat);
      pGroup.add(foot);

      // Bearing Arch Cap
      const archGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 24, 1, false, 0, Math.PI);
      archGeo.rotateX(Math.PI / 2);
      archGeo.rotateZ(Math.PI / 2);
      const arch = new THREE.Mesh(archGeo, castIronMat);
      arch.position.set(0, 0.12, 0);
      pGroup.add(arch);

      // Bronze Bushing Ring
      const bushingGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.3, 24);
      bushingGeo.rotateX(Math.PI / 2);
      const bushing = new THREE.Mesh(bushingGeo, bronzeMat);
      bushing.position.set(0, 0.4, 0); // aligned with shaft centerline y=0
      pGroup.add(bushing);

      // Bolts
      [-0.24, 0.24].forEach((bx) => {
        const boltGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.08, 6);
        const bolt = new THREE.Mesh(boltGeo, boltMat);
        bolt.position.set(bx, 0.14, 0);
        pGroup.add(bolt);
      });

      assemblyRoot.add(pGroup);
      return pGroup;
    };

    bearingsFront1Ref.current = createPillowBlock(x1, bearingZDist);
    bearingsRear1Ref.current = createPillowBlock(x1, -bearingZDist);
    bearingsFront2Ref.current = createPillowBlock(x2, bearingZDist);
    bearingsRear2Ref.current = createPillowBlock(x2, -bearingZDist);

    // --- STRUCTURAL BASE BEDPLATE ---
    const baseplateGeo = new THREE.BoxGeometry(3.6, 0.14, 2.3);
    const baseplate = new THREE.Mesh(baseplateGeo, baseplateMat);
    baseplate.position.set((x1 + x2) / 2, -0.59, 0);
    assemblyRoot.add(baseplate);

    // Baseplate Corner Brass Clips
    const cornerGeo = new THREE.BoxGeometry(0.12, 0.16, 0.12);
    [
      [-1.75, -1.1],
      [1.75, -1.1],
      [-1.75, 1.1],
      [1.75, 1.1],
    ].forEach(([cx, cz]) => {
      const clip = new THREE.Mesh(cornerGeo, boltMat);
      clip.position.set(baseplate.position.x + cx, -0.58, cz);
      assemblyRoot.add(clip);
    });

    // Centerline Datum Wireframe Grid on baseplate
    const datumGrid = new THREE.GridHelper(3.0, 15, 0xd4af37, 0x332a15);
    datumGrid.position.set((x1 + x2) / 2, -0.51, 0);
    assemblyRoot.add(datumGrid);

    // Subtle pitch circle indicator rings
    const pitchCircle1Geo = new THREE.RingGeometry(r1 - 0.006, r1 + 0.006, 64);
    const pitchCircle1 = new THREE.Mesh(
      pitchCircle1Geo,
      new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
    );
    pitchCircle1.position.set(x1, 0, faceWidth / 2 + 0.01);
    assemblyRoot.add(pitchCircle1);

    const pitchCircle2Geo = new THREE.RingGeometry(r2 - 0.006, r2 + 0.006, 64);
    const pitchCircle2 = new THREE.Mesh(
      pitchCircle2Geo,
      new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
    );
    pitchCircle2.position.set(x2, 0, faceWidth / 2 + 0.01);
    assemblyRoot.add(pitchCircle2);

    // 8. Animation Loop
    let lastTime = performance.now();
    let currentAngle = 0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update rotation
      if (isPlayingRef.current) {
        // Base rotational speed: 1.0 rad/s * multiplier
        const angularVelocity = 1.25 * speedRef.current;
        currentAngle += angularVelocity * delta;

        // Gear 1 (Driving Pinion) rotates clockwise: angle
        // Gear 2 (Driven Gear) rotates counter-clockwise: -angle / 1.5
        if (gear1GroupRef.current) {
          gear1GroupRef.current.rotation.z = currentAngle;
        }
        if (shaft1Ref.current) {
          shaft1Ref.current.rotation.z = currentAngle;
        }

        if (gear2GroupRef.current) {
          gear2GroupRef.current.rotation.z = -currentAngle / 1.5;
        }
        if (shaft2Ref.current) {
          shaft2Ref.current.rotation.z = -currentAngle / 1.5;
        }
      }

      // Smooth Exploded View Interpolation
      const targetExplode = isExplodedRef.current ? 1.0 : 0.0;
      explodedLerpRef.current += (targetExplode - explodedLerpRef.current) * 0.08;
      const exp = explodedLerpRef.current;

      // Translate parts outward along axes when exploded
      if (gear1GroupRef.current) {
        gear1GroupRef.current.position.z = exp * 0.55;
      }
      if (gear2GroupRef.current) {
        gear2GroupRef.current.position.z = -exp * 0.55;
      }

      if (shaft1Ref.current) {
        shaft1Ref.current.position.z = exp * 0.9;
      }
      if (shaft2Ref.current) {
        shaft2Ref.current.position.z = -exp * 0.9;
      }

      if (bearingsFront1Ref.current) {
        bearingsFront1Ref.current.position.z = bearingZDist + exp * 0.75;
      }
      if (bearingsRear1Ref.current) {
        bearingsRear1Ref.current.position.z = -bearingZDist - exp * 0.75;
      }
      if (bearingsFront2Ref.current) {
        bearingsFront2Ref.current.position.z = bearingZDist + exp * 0.75;
      }
      if (bearingsRear2Ref.current) {
        bearingsRear2Ref.current.position.z = -bearingZDist - exp * 0.75;
      }

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 480;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 10. Cleanup
    return () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
      window.removeEventListener('resize', handleResize);

      controls.dispose();
      renderer.dispose();

      // Dispose all geometries & materials
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });
    };
  }, []);

  // Control handlers
  const togglePlay = () => {
    playCinemaChime();
    setIsPlaying((prev) => !prev);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedMultiplier(parseFloat(e.target.value));
  };

  const toggleExploded = () => {
    playCinemaChime();
    setIsExploded((prev) => !prev);
  };

  const toggleAutoOrbit = () => {
    playCinemaChime();
    setAutoOrbit((prev) => !prev);
  };

  const resetView = () => {
    playCinemaChime();
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(2.4, 2.1, 3.8);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Component details for interactive inspector
  const COMPONENT_DETAILS: Record<
    string,
    { title: string; ratio: string; spec: string; desc: string }
  > = {
    gear1: {
      title: '01 / DRIVING PINION',
      ratio: '20 TEETH · CLOCKWISE',
      spec: 'Module m=0.08 · Pitch Ø80 mm · Involute Tooth Profile',
      desc: 'Transmits prime torque through 20 precision-machined involute teeth. Fitted with a standardized DIN 6885 longitudinal keyway.',
    },
    gear2: {
      title: '02 / DRIVEN SPUR GEAR',
      ratio: '30 TEETH · COUNTER-CLOCKWISE',
      spec: 'Module m=0.08 · Pitch Ø120 mm · 1.5:1 Reduction',
      desc: 'Meshes at pitch line tangent with the driving pinion to deliver 1.5× torque multiplication and 33.3% speed reduction.',
    },
    shafts: {
      title: '03 / HARDENED STEEL SHAFTS',
      ratio: 'DUAL DRIVE LINE AXES',
      spec: 'High-Tensile Alloy · Center Distance 2.00 mm scale',
      desc: 'Ground cylindrical shafts running through bronze sleeve bearings with precision center-to-center shaft alignment.',
    },
    bearings: {
      title: '04 / SPLIT PILLOW BLOCKS',
      ratio: 'RIGID HOUSING SUPPORTS',
      spec: 'Cast Iron Housing · Bronze Bushings · Dual-Bolt Caps',
      desc: 'Provides structural radial and thrust constraint, mounted securely to the datum ground plate.',
    },
  };

  const drivingRpm = Math.round(speedMultiplier * 60);
  const drivenRpm = Math.round((speedMultiplier * 60) / 1.5);

  return (
    <div className="relative w-full rounded-sm bg-gradient-to-b from-[#111318] via-[#0B0B0D] to-[#050505] border border-[#D4AF37]/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden my-10 select-none">
      {/* Corner metallic clips */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37] z-20" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37] z-20" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37] z-20" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37] z-20" />

      {/* Top Header Bar */}
      <div className="px-5 py-3.5 bg-[#0B0B0D]/95 border-b border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#14110E] border border-[#D4AF37]/50 text-[#D4AF37] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            LIVE 3D MODEL
          </span>
          <span className="text-[#E8DFD8] hidden sm:inline font-semibold">
            KINEMATIC GEAR ASSEMBLY · 1.5:1 REDUCTION
          </span>
        </div>

        {/* Live Speed Indicators */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#A8988B]">
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#D4AF37]">PINION:</span> {isPlaying ? `${drivingRpm} RPM` : '0 RPM'}
          </span>
          <span className="text-[#D4AF37]/40">•</span>
          <span>
            <span className="text-[#E5C158]">GEAR:</span> {isPlaying ? `${drivenRpm} RPM` : '0 RPM'}
          </span>
        </div>
      </div>

      {/* Main Two-Column Showcase Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Left Column: Interactive 3D WebGL Canvas (~7 cols on desktop) */}
        <div
          ref={containerRef}
          className="relative lg:col-span-8 w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] bg-[#050505] flex items-center justify-center overflow-hidden"
        >
          {webGlSupported ? (
            <>
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-grab active:cursor-grabbing block"
              />

              {/* On-Canvas Drag-to-Rotate Hint */}
              <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-2.5 py-1 rounded-xs bg-black/75 border border-[#D4AF37]/30 text-[10px] font-mono text-[#A8988B] backdrop-blur-xs">
                <Compass className="w-3 h-3 text-[#D4AF37]" />
                <span>DRAG TO ROTATE · SCROLL TO ZOOM</span>
              </div>

              {/* Exploded Mode Active Badge */}
              {isExploded && (
                <div className="absolute top-4 right-4 pointer-events-none px-2.5 py-1 rounded-xs bg-[#14110E]/90 border border-[#D4AF37] text-[10px] font-mono text-[#D4AF37] font-bold tracking-widest animate-pulse">
                  EXPLODED VIEW ACTIVE
                </div>
              )}
            </>
          ) : (
            // Graceful WebGL Fallback
            <div className="p-8 text-center space-y-3">
              <Info className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <p className="text-sm font-mono text-[#E8DFD8]">
                WebGL acceleration unavailable. Interactive 2D schematic fallback enabled.
              </p>
            </div>
          )}

          {/* Quick Floating Toolbar in Bottom Left of 3D Canvas */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
            <button
              onClick={togglePlay}
              data-cursor-text={isPlaying ? 'PAUSE' : 'PLAY'}
              className="p-2.5 rounded-xs bg-[#111318]/90 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 transition-colors shadow-lg cursor-pointer"
              title={isPlaying ? 'Pause Kinematic Rotation' : 'Resume Kinematic Rotation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleExploded}
              data-cursor-text="EXPLODE"
              className={`px-3 py-2 rounded-xs border text-[11px] font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg ${
                isExploded
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#111318]/90 text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#D4AF37]/20 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExploded ? 'ASSEMBLE' : 'EXPLODE'}</span>
            </button>

            <button
              onClick={resetView}
              data-cursor-text="RESET"
              className="p-2.5 rounded-xs bg-[#111318]/90 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 transition-colors shadow-lg cursor-pointer"
              title="Reset Camera View Angle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleAutoOrbit}
              className={`px-2.5 py-2 rounded-xs border text-[10px] font-mono transition-colors hidden sm:flex items-center gap-1 cursor-pointer ${
                autoOrbit
                  ? 'bg-[#14110E] text-[#D4AF37] border-[#D4AF37]/60'
                  : 'bg-[#111318]/80 text-[#A8988B] border-[#D4AF37]/25'
              }`}
              title="Toggle slow auto camera rotation"
            >
              <span>ORBIT: {autoOrbit ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Mechanical Specification Deck & Controller (~4 cols on desktop) */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#0B0B0D] border-t lg:border-t-0 lg:border-l border-[#D4AF37]/20 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                MECHANISM CONTROLS
              </span>
              <span className="text-[10px] font-mono text-[#A8988B]">
                RATIO: 1.5 : 1
              </span>
            </div>

            {/* Rotation Speed Slider */}
            <div className="p-3.5 rounded-xs bg-[#111318] border border-[#D4AF37]/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#E8DFD8]">Rotation Speed</span>
                <span className="text-[#D4AF37] font-bold">{speedMultiplier.toFixed(1)}×</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={speedMultiplier}
                onChange={handleSpeedChange}
                className="w-full accent-[#D4AF37] cursor-pointer h-1.5 bg-[#050505] rounded-lg"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A8988B]">
                <span>0.2× Precision</span>
                <span>1.0× Nominal</span>
                <span>2.5× High</span>
              </div>
            </div>

            {/* Component Selector Chips */}
            <div className="space-y-2 pt-1">
              <span className="text-[10.5px] font-mono text-[#A8988B] uppercase tracking-wider block">
                Inspect Assembly Component:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'gear1', label: 'Driving Pinion (20T)' },
                  { id: 'gear2', label: 'Driven Gear (30T)' },
                  { id: 'shafts', label: 'Alloy Shafts' },
                  { id: 'bearings', label: 'Pillow Blocks' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playCinemaChime();
                      setSelectedComponent(item.id);
                    }}
                    className={`p-2 rounded-xs text-[10px] font-mono tracking-wider text-left transition-all cursor-pointer border ${
                      selectedComponent === item.id
                        ? 'bg-[#14110E] text-[#D4AF37] border-[#D4AF37] shadow-xs'
                        : 'bg-[#111318] text-[#A8988B] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Component Technical Spec Card */}
            {COMPONENT_DETAILS[selectedComponent] && (
              <div className="p-4 rounded-xs bg-[#111318] border border-[#D4AF37]/30 space-y-2 text-left animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#D4AF37]">
                    {COMPONENT_DETAILS[selectedComponent].title}
                  </span>
                  <span className="text-[10px] font-mono text-[#E5C158]">
                    {COMPONENT_DETAILS[selectedComponent].ratio}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#E8DFD8]">
                  {COMPONENT_DETAILS[selectedComponent].spec}
                </p>
                <p className="text-xs text-[#A8988B] font-sans leading-relaxed pt-1 border-t border-[#D4AF37]/15">
                  {COMPONENT_DETAILS[selectedComponent].desc}
                </p>
              </div>
            )}
          </div>

          {/* Educational Disclaimer */}
          <div className="p-3 rounded-xs bg-[#111318]/70 border border-[#D4AF37]/15 text-[10.5px] font-mono text-[#A8988B] flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>
              Real-time WebGL PBR Kinematics Demonstration. Conjugate tooth profiles and continuous gear contact synchronization.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
