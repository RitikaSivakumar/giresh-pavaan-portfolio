import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Maximize2, Minimize2, Pause, Play, RotateCcw, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { playInterfaceSound } from '../lib/interfaceSound.ts';

type SimulationId = 'proj-01' | 'proj-02' | 'proj-03' | 'proj-04';

const makeMaterial = (color: number, metalness = 0.7, roughness = 0.3) =>
  new THREE.MeshStandardMaterial({ color, metalness, roughness });

function extrude(shape: THREE.Shape, depth: number, material: THREE.Material) {
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.025, bevelThickness: 0.025 });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function labelMesh<T extends THREE.Mesh>(mesh: T, label: string): T {
  mesh.userData.componentLabel = label;
  return mesh;
}

function createPlate(root: THREE.Group, materials: THREE.Material[]) {
  const shape = new THREE.Shape();
  shape.moveTo(-1.05, -0.65);
  shape.lineTo(1.05, -0.65);
  shape.lineTo(1.2, -0.5);
  shape.lineTo(1.2, 0.5);
  shape.lineTo(1.05, 0.65);
  shape.lineTo(-1.05, 0.65);
  shape.lineTo(-1.2, 0.5);
  shape.lineTo(-1.2, -0.5);
  shape.closePath();
  const holePositions: Array<[number, number, number]> = [
    [0, 0, 0.19], [-0.88, -0.43, 0.11], [0.88, -0.43, 0.11], [-0.88, 0.43, 0.11], [0.88, 0.43, 0.11],
  ];
  holePositions.forEach(([x, y, r]) => {
    const hole = new THREE.Path();
    hole.absarc(x, y, r, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  });
  const part = labelMesh(extrude(shape, 0.28, materials[0]), 'Mounting plate · central bore and four mounting holes');
  root.add(part);
}

function createGear(teeth: number, pitchRadius: number, material: THREE.Material) {
  const shape = new THREE.Shape();
  const outerRadius = pitchRadius * 1.08;
  const rootRadius = pitchRadius * 0.84;
  const pitch = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i += 1) {
    const center = i * pitch;
    const points = [
      [rootRadius, center - pitch * 0.46],
      [outerRadius, center - pitch * 0.25],
      [outerRadius, center + pitch * 0.25],
      [rootRadius, center + pitch * 0.46],
    ];
    points.forEach(([radius, angle], pointIndex) => {
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0 && pointIndex === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();
  const bore = new THREE.Path();
  bore.absarc(0, 0, pitchRadius * 0.18, 0, Math.PI * 2, true);
  shape.holes.push(bore);
  return extrude(shape, 0.16, material);
}

function createGearTrain(root: THREE.Group, materials: THREE.Material[], moving: THREE.Object3D[]) {
  // The tooth counts are geometry proportions for this illustrative kinematics view.
  const large = new THREE.Group();
  large.position.x = -0.61;
  large.add(labelMesh(createGear(24, 0.72, materials[0]), 'Drive gear'));
  const small = new THREE.Group();
  small.position.x = 0.61;
  small.add(labelMesh(createGear(16, 0.48, materials[1]), 'Driven gear'));
  [large, small].forEach((gear) => {
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.22, 32), materials[2]);
    hub.rotation.x = Math.PI / 2;
    hub.position.z = 0.08;
    gear.add(labelMesh(hub, 'Gear hub'));
    root.add(gear);
  });
  moving.push(large, small);
}

function createBrake(root: THREE.Group, materials: THREE.Material[], moving: THREE.Object3D[]) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, 0.92, 0, Math.PI * 2, false);
  const ring = new THREE.Path();
  ring.absarc(0, 0, 0.56, 0, Math.PI * 2, true);
  shape.holes.push(ring);
  const centerBore = new THREE.Path();
  centerBore.absarc(0, 0, 0.14, 0, Math.PI * 2, true);
  shape.holes.push(centerBore);
  for (let i = 0; i < 5; i += 1) {
    const angle = (i * Math.PI * 2) / 5;
    const hole = new THREE.Path();
    hole.absarc(Math.cos(angle) * 0.34, Math.sin(angle) * 0.34, 0.055, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const rotor = new THREE.Group();
  rotor.add(labelMesh(extrude(shape, 0.12, materials[0]), 'Brake rotor'));
  const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.1, 48), materials[1]);
  hat.rotation.x = Math.PI / 2;
  hat.position.z = -0.1;
  rotor.add(labelMesh(hat, 'Rotor hub'));
  for (let i = 0; i < 12; i += 1) {
    const vane = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.24, 0.08), materials[2]);
    const angle = (i * Math.PI * 2) / 12;
    vane.position.set(Math.cos(angle) * 0.49, Math.sin(angle) * 0.49, 0);
    vane.rotation.z = angle;
    rotor.add(labelMesh(vane, 'Cooling vane'));
  }
  root.add(rotor);
  moving.push(rotor);

  const caliperShape = new THREE.Shape();
  caliperShape.moveTo(0.63, -0.52);
  caliperShape.lineTo(0.93, -0.52);
  caliperShape.lineTo(1.1, -0.32);
  caliperShape.lineTo(1.1, 0.32);
  caliperShape.lineTo(0.93, 0.52);
  caliperShape.lineTo(0.63, 0.52);
  caliperShape.lineTo(0.63, 0.31);
  caliperShape.lineTo(0.88, 0.31);
  caliperShape.lineTo(0.94, 0.2);
  caliperShape.lineTo(0.94, -0.2);
  caliperShape.lineTo(0.88, -0.31);
  caliperShape.lineTo(0.63, -0.31);
  caliperShape.closePath();
  const caliper = labelMesh(extrude(caliperShape, 0.28, materials[3]), 'Brake caliper');
  caliper.position.x = 0.865;
  root.add(caliper);
  [-1, 1].forEach((side) => {
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.2), materials[4]);
    pad.position.set(0.59, side * 0.24, 0);
    root.add(labelMesh(pad, 'Brake pad'));
  });
}

function createMill(root: THREE.Group, materials: THREE.Material[], moving: THREE.Object3D[]) {
  const bed = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.14, 1.45), materials[0]);
  bed.position.y = -0.68;
  root.add(labelMesh(bed, 'Machine bed'));
  const workpiece = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.46, 0.92), materials[1]);
  workpiece.position.y = -0.36;
  root.add(labelMesh(workpiece, 'Workpiece'));
  const rail = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.13, 0.18), materials[2]);
  rail.position.set(0, 0.93, -0.62);
  root.add(labelMesh(rail, 'Guide rail'));
  const head = new THREE.Group();
  const housing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.42), materials[2]);
  housing.position.y = 0.62;
  head.add(labelMesh(housing, 'Milling head housing'));
  const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.5, 24), materials[3]);
  spindle.position.y = 0.16;
  head.add(labelMesh(spindle, 'Spindle'));
  const cutterGroup = new THREE.Group();
  const cutter = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.36, 16), materials[4]);
  cutter.position.y = -0.27;
  cutterGroup.add(labelMesh(cutter, 'Rotating cutter'));
  for (let i = 0; i < 6; i += 1) {
    const flute = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.27, 0.025), materials[5]);
    flute.position.set(i % 2 === 0 ? 0.065 : -0.065, -0.27, i < 3 ? 0.04 : -0.04);
    flute.rotation.z = i * 0.3;
    cutterGroup.add(labelMesh(flute, 'Cutter flute'));
  }
  head.add(cutterGroup);
  head.position.z = -0.15;
  root.add(head);
  moving.push(head, cutterGroup);
}

interface ModelSetup {
  root: THREE.Group;
  moving: THREE.Object3D[];
}

function buildModel(id: SimulationId, scene: THREE.Scene): ModelSetup {
  const root = new THREE.Group();
  scene.add(root);
  const moving: THREE.Object3D[] = [];
  if (id === 'proj-01') {
    createPlate(root, [makeMaterial(0xd4af37, 0.82, 0.24)]);
  } else if (id === 'proj-02') {
    createGearTrain(root, [makeMaterial(0xd4af37, 0.85, 0.24), makeMaterial(0x24b8ff, 0.75, 0.3), makeMaterial(0xe8dfd8, 0.8, 0.22)], moving);
  } else if (id === 'proj-03') {
    createBrake(root, [makeMaterial(0xb1b7c0, 0.82, 0.28), makeMaterial(0x8c6d4f, 0.78, 0.3), makeMaterial(0xd4af37, 0.65, 0.32), makeMaterial(0xd4af37, 0.78, 0.26), makeMaterial(0x24b8ff, 0.45, 0.4)], moving);
  } else {
    createMill(root, [makeMaterial(0x333943, 0.75, 0.35), makeMaterial(0x8c6d4f, 0.75, 0.3), makeMaterial(0x424956, 0.78, 0.28), makeMaterial(0xd4af37, 0.84, 0.2), makeMaterial(0xbfc5cc, 0.88, 0.2), makeMaterial(0x24b8ff, 0.6, 0.26)], moving);
  }
  return { root, moving };
}

const modelLabels: Record<SimulationId, string> = {
  'proj-01': 'COMPONENT / ROTATABLE VIEW',
  'proj-02': 'GEAR TRAIN / KINEMATICS',
  'proj-03': 'DISC BRAKE / ROTOR & CALIPER',
  'proj-04': 'MILLING / TOOLPATH VIEW',
};

/** Software projection of the same Three.js meshes for browsers with no usable WebGL context. */
function renderSoftwareModel(
  context: CanvasRenderingContext2D,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number,
  wireframe: boolean,
) {
  scene.updateMatrixWorld(true);
  camera.updateMatrixWorld(true);
  camera.matrixWorldInverse.copy(camera.matrixWorld).invert();

  context.clearRect(0, 0, width, height);
  context.fillStyle = '#090b0e';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = 'rgba(212, 175, 55, 0.075)';
  context.lineWidth = 1;
  context.beginPath();
  for (let x = width % 30; x < width; x += 30) { context.moveTo(x, 0); context.lineTo(x, height); }
  for (let y = height % 30; y < height; y += 30) { context.moveTo(0, y); context.lineTo(width, y); }
  context.stroke();

  const triangles: Array<{ points: Array<[number, number]>; depth: number; color: number; intensity: number }> = [];
  const view = new THREE.Vector3();
  const projected = new THREE.Vector3();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const light = new THREE.Vector3(-0.4, 0.8, 1).normalize();

  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const positions = object.geometry.getAttribute('position');
    if (!positions) return;
    const indices = object.geometry.index;
    const count = indices ? indices.count : positions.count;
    const material = Array.isArray(object.material) ? object.material[0] : object.material;
    const color = material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial
      ? material.color.getHex()
      : 0xd4af37;

    for (let i = 0; i + 2 < count; i += 3) {
      const ia = indices ? indices.getX(i) : i;
      const ib = indices ? indices.getX(i + 1) : i + 1;
      const ic = indices ? indices.getX(i + 2) : i + 2;
      a.fromBufferAttribute(positions, ia).applyMatrix4(object.matrixWorld);
      b.fromBufferAttribute(positions, ib).applyMatrix4(object.matrixWorld);
      c.fromBufferAttribute(positions, ic).applyMatrix4(object.matrixWorld);
      const vertices = [a, b, c];
      const screen: Array<[number, number]> = [];
      let depth = 0;
      let clipped = false;
      for (const vertex of vertices) {
        view.copy(vertex).applyMatrix4(camera.matrixWorldInverse);
        if (-view.z <= camera.near || -view.z >= camera.far) { clipped = true; break; }
        depth += -view.z;
        projected.copy(view).applyMatrix4(camera.projectionMatrix);
        screen.push([(projected.x * 0.5 + 0.5) * width, (-projected.y * 0.5 + 0.5) * height]);
      }
      if (clipped) continue;
      normal.copy(b).sub(a).cross(c.clone().sub(a)).normalize();
      triangles.push({ points: screen, depth: depth / 3, color, intensity: 0.27 + Math.max(0, normal.dot(light)) * 0.73 });
    }
  });

  triangles.sort((left, right) => right.depth - left.depth);
  triangles.forEach(({ points, color, intensity }) => {
    const red = Math.round(((color >> 16) & 255) * intensity);
    const green = Math.round(((color >> 8) & 255) * intensity);
    const blue = Math.round((color & 255) * intensity);
    context.beginPath();
    context.moveTo(points[0][0], points[0][1]);
    context.lineTo(points[1][0], points[1][1]);
    context.lineTo(points[2][0], points[2][1]);
    context.closePath();
    context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    context.fill();
    context.strokeStyle = wireframe ? 'rgba(245, 210, 100, 0.98)' : 'rgba(8, 11, 14, 0.32)';
    context.lineWidth = wireframe ? 0.95 : 0.45;
    context.shadowColor = wireframe ? 'rgba(212, 175, 55, 0.75)' : 'transparent';
    context.shadowBlur = wireframe ? 7 : 0;
    context.stroke();
    context.shadowBlur = 0;
  });
}

export const ProjectSimulation: React.FC<{ projectId: string }> = ({ projectId }) => {
  const id = projectId as SimulationId;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const softwareCanvasRef = useRef<HTMLCanvasElement>(null);
  const resetRef = useRef<() => void>(() => {});
  const zoomRef = useRef<(factor: number) => void>(() => {});
  const wireframeRef = useRef<(enabled: boolean) => void>(() => {});
  const startLoopRef = useRef<() => void>(() => {});
  const stopLoopRef = useRef<() => void>(() => {});
  const explodedRef = useRef<(enabled: boolean) => void>(() => {});
  const [isPlaying, setIsPlaying] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [speed, setSpeed] = useState(1);
  const [wireframe, setWireframe] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);
  const [softwareFallback, setSoftwareFallback] = useState(false);
  const [hoveredComponent, setHoveredComponent] = useState('');
  const [exploded, setExploded] = useState(false);
  const playingRef = useRef(isPlaying);
  const speedRef = useRef(speed);

  useEffect(() => { playingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const softwareCanvas = softwareCanvasRef.current;
    if (!container || !canvas || !softwareCanvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let softwareContext: CanvasRenderingContext2D | null = null;
    let softwareDpr = 1;
    let wireframeMode = false;
    let activeSurface: HTMLCanvasElement = canvas;
    let frameId: number | null = null;
    let inView = true;
    let disposed = false;
    let dragging = false;
    let dragX = 0;
    let dragY = 0;
    let baseX = 0;
    let baseY = 0;
    let lastFrame = 0;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let root: THREE.Group;
    let moving: THREE.Object3D[];
    let materials: THREE.Material[] = [];
    const originalColors = new Map<THREE.Material, THREE.Color>();
    const originalEmissive = new Map<THREE.MeshStandardMaterial, THREE.Color>();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;
    let selectedMesh: THREE.Mesh | null = null;
    let highlightedMesh: THREE.Mesh | null = null;
    let componentOutline: THREE.LineSegments | null = null;
    let dragMoved = false;

    const draw = () => {
      if (disposed || !camera || !scene || !container) return;
      if (renderer) renderer.render(scene, camera);
      else if (softwareContext) {
        renderSoftwareModel(softwareContext, scene, camera, container.clientWidth, container.clientHeight, wireframeMode);
      }
    };
    const stopLoop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    };
    const animate = (now: number) => {
      frameId = null;
      if (disposed || (!renderer && !softwareContext) || !playingRef.current || !inView || document.hidden) return;
      const delta = Math.min((now - (lastFrame || now)) / 1000, 0.05);
      lastFrame = now;
      const amount = delta * speedRef.current;
      if (id === 'proj-02') {
        moving[0].rotation.z += amount * 0.55;
        moving[1].rotation.z -= amount * 0.825;
      } else if (id === 'proj-03') {
        moving[0].rotation.z += amount * 0.7;
      } else if (id === 'proj-04') {
        moving[0].position.x = Math.sin(now * 0.00045 * speedRef.current) * 0.76;
        moving[1].rotation.y += amount * 5;
      } else {
        root.rotation.y += amount * 0.24;
      }
      draw();
      frameId = requestAnimationFrame(animate);
    };
    const startLoop = () => {
      if (!disposed && (renderer || softwareContext) && playingRef.current && inView && !document.hidden && frameId === null) {
        lastFrame = 0;
        frameId = requestAnimationFrame(animate);
      }
    };
    const setHoveredMesh = (nextMesh: THREE.Mesh | null) => {
      hoveredMesh = nextMesh;
      const activeMesh = nextMesh ?? selectedMesh;
      const label = activeMesh?.userData.componentLabel;
      setHoveredComponent(typeof label === 'string' ? label : '');
      if (highlightedMesh === activeMesh) return;
      if (componentOutline) {
        componentOutline.parent?.remove(componentOutline);
        componentOutline.geometry.dispose();
        (componentOutline.material as THREE.Material).dispose();
        componentOutline = null;
      }
      if (highlightedMesh) {
        const oldMats = Array.isArray(highlightedMesh.material) ? highlightedMesh.material : [highlightedMesh.material];
        oldMats.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            material.emissive.copy(wireframeMode ? new THREE.Color(0x4a3200) : originalEmissive.get(material) ?? material.emissive);
            material.emissiveIntensity = 1;
          }
          if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial) {
            material.color.copy(wireframeMode ? new THREE.Color(0xd4af37) : originalColors.get(material) ?? material.color);
          }
        });
      }
      highlightedMesh = activeMesh;
      if (activeMesh) {
        const nextMats = Array.isArray(activeMesh.material) ? activeMesh.material : [activeMesh.material];
        nextMats.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            material.emissive.set(0xffd66e);
            material.emissiveIntensity = wireframeMode ? 1.35 : 0.8;
          }
          if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial) {
            material.color.lerp(new THREE.Color(0xffd66e), wireframeMode ? 0.2 : 0.35);
          }
        });
        componentOutline = new THREE.LineSegments(
          new THREE.EdgesGeometry(activeMesh.geometry, 18),
          new THREE.LineBasicMaterial({ color: 0xffd66e, transparent: true, opacity: 0.92, depthTest: false }),
        );
        componentOutline.scale.setScalar(1.012);
        componentOutline.renderOrder = 20;
        activeMesh.add(componentOutline);
      }
      draw();
    };
    const updateHoveredMesh = (clientX: number, clientY: number) => {
      const rect = activeSurface.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(root.children, true).find((entry) => typeof entry.object.userData.componentLabel === 'string');
      setHoveredMesh(hit ? hit.object as THREE.Mesh : null);
    };
    startLoopRef.current = startLoop;
    stopLoopRef.current = stopLoop;

    try {
      const gl = canvas.getContext('webgl2', { alpha: true, antialias: true });
      const webGlAvailable = Boolean(gl && gl.getContextAttributes());
      setSoftwareFallback(!webGlAvailable);
      if (!webGlAvailable) {
        softwareContext = softwareCanvas.getContext('2d');
        activeSurface = softwareCanvas;
      }
      if (!webGlAvailable && !softwareContext) {
        setError(true);
        return;
      }
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 1.4, 5.1);
      camera.lookAt(0, 0, 0);
      if (webGlAvailable && gl) {
        renderer = new THREE.WebGLRenderer({ canvas, context: gl, alpha: true, antialias: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;
      }

      scene.add(new THREE.AmbientLight(0xe8dfd8, 1.4));
      const keyLight = new THREE.DirectionalLight(0xffe5ad, 2.3);
      keyLight.position.set(3, 4, 5);
      scene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(0x24b8ff, 1.1);
      rimLight.position.set(-4, -1, -3);
      scene.add(rimLight);
      ({ root, moving } = buildModel(id, scene));
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const materialList = Array.isArray(object.material) ? object.material : [object.material];
        materialList.forEach((material) => {
          materials.push(material);
          if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial) {
            originalColors.set(material, material.color.clone());
          }
          if (material instanceof THREE.MeshStandardMaterial) originalEmissive.set(material, material.emissive.clone());
        });
      });

      const resize = () => {
        if (!container) return;
        const width = Math.max(container.clientWidth, 1);
        const height = Math.max(container.clientHeight, 1);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (renderer) {
          renderer.setSize(width, height, false);
        } else if (softwareContext) {
          softwareDpr = Math.min(window.devicePixelRatio || 1, 1.5);
          softwareCanvas.width = Math.round(width * softwareDpr);
          softwareCanvas.height = Math.round(height * softwareDpr);
          softwareContext.setTransform(softwareDpr, 0, 0, softwareDpr, 0, 0);
        }
        draw();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) startLoop();
        else stopLoop();
      }, { threshold: 0.01 });
      intersectionObserver.observe(container);

      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        dragMoved = false;
        dragX = event.clientX;
        dragY = event.clientY;
        baseX = root.rotation.x;
        baseY = root.rotation.y;
        activeSurface.setPointerCapture(event.pointerId);
      };
      const onPointerMove = (event: PointerEvent) => {
        if (dragging) {
          if (Math.hypot(event.clientX - dragX, event.clientY - dragY) > 4) dragMoved = true;
          root.rotation.y = baseY + (event.clientX - dragX) * 0.009;
          root.rotation.x = THREE.MathUtils.clamp(baseX + (event.clientY - dragY) * 0.009, -1.35, 1.35);
          draw();
          return;
        }
        updateHoveredMesh(event.clientX, event.clientY);
      };
      const onPointerUp = () => {
        if (dragging && !dragMoved && hoveredMesh) {
          selectedMesh = hoveredMesh;
          setHoveredMesh(hoveredMesh);
          playInterfaceSound('model');
        }
        dragging = false;
      };
      const onPointerCancel = () => { dragging = false; dragMoved = false; };
      const onPointerLeave = () => { if (!dragging) setHoveredMesh(null); };
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        const distance = camera.position.length();
        camera.position.multiplyScalar(THREE.MathUtils.clamp(distance + Math.sign(event.deltaY) * 0.35, 3, 10) / distance);
        camera.lookAt(0, 0, 0);
        playInterfaceSound('model');
        draw();
      };
      const onVisibility = () => {
        if (document.hidden) stopLoop();
        else startLoop();
      };
      activeSurface.addEventListener('pointerdown', onPointerDown);
      activeSurface.addEventListener('pointermove', onPointerMove);
      activeSurface.addEventListener('pointerup', onPointerUp);
      activeSurface.addEventListener('pointercancel', onPointerCancel);
      activeSurface.addEventListener('pointerleave', onPointerLeave);
      activeSurface.addEventListener('wheel', onWheel, { passive: false });
      document.addEventListener('visibilitychange', onVisibility);

      resetRef.current = () => {
        root.rotation.set(0, 0, 0);
        selectedMesh = null;
        setHoveredMesh(null);
        explodedRef.current(false);
        setExploded(false);
        camera.position.set(0, 1.4, 5.1);
        camera.lookAt(0, 0, 0);
        setSpeed(1);
        draw();
      };
      zoomRef.current = (factor) => {
        const distance = camera.position.length();
        camera.position.multiplyScalar(THREE.MathUtils.clamp(distance * factor, 3, 10) / distance);
        camera.lookAt(0, 0, 0);
        draw();
      };
      wireframeRef.current = (enabled) => {
        wireframeMode = enabled;
        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial) {
            material.wireframe = enabled;
            material.color.copy(enabled ? new THREE.Color(0xd4af37) : originalColors.get(material) ?? material.color);
          }
          if (material instanceof THREE.MeshStandardMaterial) {
            material.emissive.copy(enabled ? new THREE.Color(0x4a3200) : originalEmissive.get(material) ?? material.emissive);
          }
        });
        draw();
      };
      explodedRef.current = (enabled) => {
        if (id !== 'proj-02') return;
        moving[0].position.x = enabled ? -0.94 : -0.61;
        moving[1].position.x = enabled ? 0.94 : 0.61;
        draw();
      };
      draw();
      startLoop();

      return () => {
        disposed = true;
        stopLoop();
        startLoopRef.current = () => {};
        stopLoopRef.current = () => {};
        explodedRef.current = () => {};
        if (componentOutline) {
          componentOutline.parent?.remove(componentOutline);
          componentOutline.geometry.dispose();
          (componentOutline.material as THREE.Material).dispose();
          componentOutline = null;
        }
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        activeSurface.removeEventListener('pointerdown', onPointerDown);
        activeSurface.removeEventListener('pointermove', onPointerMove);
        activeSurface.removeEventListener('pointerup', onPointerUp);
        activeSurface.removeEventListener('pointercancel', onPointerCancel);
        activeSurface.removeEventListener('pointerleave', onPointerLeave);
        activeSurface.removeEventListener('wheel', onWheel);
        document.removeEventListener('visibilitychange', onVisibility);
        scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();
          const materialList = Array.isArray(object.material) ? object.material : [object.material];
          materialList.forEach((material) => material.dispose());
        });
        renderer?.dispose();
        renderer?.forceContextLoss();
      };
    } catch (cause) {
      console.warn(`Unable to initialize ${id} project simulation`, cause);
      renderer?.dispose();
      setError(true);
      return;
    }
  }, [id]);

  useEffect(() => { wireframeRef.current(wireframe); }, [wireframe]);

  const togglePlayback = useCallback(() => {
    if (exploded) return;
    const next = !playingRef.current;
    playingRef.current = next;
    setIsPlaying(next);
    if (next) startLoopRef.current();
    else stopLoopRef.current();
  }, [exploded]);

  const toggleExploded = () => {
    const next = !exploded;
    setExploded(next);
    explodedRef.current(next);
    if (next && playingRef.current) {
      playingRef.current = false;
      setIsPlaying(false);
      stopLoopRef.current();
    }
  };

  return (
    <div
      ref={containerRef}
      data-project-simulation
      className={`relative w-full ${expanded ? 'h-[420px] sm:h-[500px]' : 'h-52 sm:h-60'} overflow-hidden bg-[#090b0e] transition-[height] duration-300`}
      style={{ touchAction: 'pan-y pinch-zoom' }}
      aria-label={`${modelLabels[id]} interactive 3D model`}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,.17) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.17) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
      <canvas ref={canvasRef} style={{ touchAction: 'pan-y pinch-zoom' }} className={`absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing ${softwareFallback ? 'hidden' : 'block'}`} aria-hidden="true" />
      <canvas ref={softwareCanvasRef} style={{ touchAction: 'pan-y pinch-zoom' }} className={`absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing ${softwareFallback ? 'block' : 'hidden'}`} aria-label={`${modelLabels[id]} software-rendered interactive model`} />
      {softwareFallback && (
        <span className="pointer-events-none absolute right-3 top-10 z-[1] text-[8px] font-mono tracking-wider text-[#24B8FF]/80">SOFTWARE 3D VIEW</span>
      )}
      {error && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#090b0e] p-5 text-center text-xs font-mono text-[#A8988B]">
          An interactive model could not be rendered in this browser.
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-3 pb-3 pt-8">
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={togglePlayback} disabled={exploded} aria-label={exploded ? 'Return to assembled view to play simulation' : isPlaying ? 'Pause simulation' : 'Play simulation'} title={exploded ? 'Assemble gears to play' : isPlaying ? 'Pause' : 'Play'} className="rounded border border-[#D4AF37]/45 bg-[#111318]/90 p-1.5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24B8FF]">
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button type="button" onClick={() => resetRef.current()} aria-label="Reset model view" title="Reset view" className="rounded border border-[#D4AF37]/35 bg-[#111318]/90 p-1.5 text-[#E8DFD8] hover:text-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24B8FF]">
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => zoomRef.current(0.82)} aria-label="Zoom in" title="Zoom in" className="rounded border border-[#D4AF37]/35 bg-[#111318]/90 p-1.5 text-[#E8DFD8] hover:text-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24B8FF]">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => zoomRef.current(1.22)} aria-label="Zoom out" title="Zoom out" className="rounded border border-[#D4AF37]/35 bg-[#111318]/90 p-1.5 text-[#E8DFD8] hover:text-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24B8FF]">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => setWireframe((value) => !value)} aria-label={wireframe ? 'Show solid model' : 'Show wireframe model'} aria-pressed={wireframe} title={wireframe ? 'Solid' : 'Wireframe'} className={`rounded border px-1.5 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24B8FF] ${wireframe ? 'border-[#24B8FF] bg-[#10233F] text-[#24B8FF]' : 'border-[#D4AF37]/35 bg-[#111318]/90 text-[#E8DFD8]'}`}>
            <Layers className="h-3.5 w-3.5" />
          </button>
        </div>
        {id === 'proj-02' && <button type="button" onClick={toggleExploded} aria-pressed={exploded} aria-label={exploded ? 'Assemble gear train' : 'Show exploded gear view'} title={exploded ? 'Assemble' : 'Explode'} className={`rounded border px-2 py-1.5 text-[8px] font-mono tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24B8FF] ${exploded ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-[#D4AF37]/35 bg-[#111318]/90 text-[#E8DFD8]'}`}>{exploded ? 'ASSEMBLE' : 'EXPLODE'}</button>}
        <label className="flex items-center gap-1.5 text-[9px] font-mono text-[#A8988B]" title="Animation speed">
          SPEED
          <input aria-label="Simulation speed" type="range" min="0.25" max="2" step="0.25" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="w-14 accent-[#D4AF37]" />
        </label>
        <button type="button" onClick={() => setExpanded((value) => !value)} aria-label={expanded ? 'Collapse model view' : 'Expand model view'} aria-pressed={expanded} title={expanded ? 'Collapse model' : 'Expand model'} className="rounded border border-[#D4AF37]/35 bg-[#111318]/90 p-1.5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24B8FF]">
          {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
      </div>
      <span className="pointer-events-none absolute left-3 top-10 z-[1] text-[9px] font-mono tracking-wider text-[#E8DFD8]/70">{modelLabels[id]} · DRAG TO ROTATE</span>
      {hoveredComponent && <span role="status" className="pointer-events-none absolute right-3 top-10 z-[1] max-w-[55%] rounded-xs border border-[#D4AF37]/30 bg-black/70 px-2 py-1 text-right text-[9px] font-mono text-[#F5E6B3] shadow-[0_0_14px_rgba(212,175,55,0.14)]">{hoveredComponent}</span>}
    </div>
  );
};
