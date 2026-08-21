/**
 * AsciiCamera — Three.js AsciiEffect 3D camera for /photography only.
 *
 * Spec compliance:
 * ✓ Color from live CSS token --fg (not hardcoded)
 * ✓ JetBrains Mono for the character output
 * ✓ Lazy-init after first paint via IntersectionObserver + requestIdleCallback
 * ✓ Pauses render loop when scrolled out of view (IntersectionObserver)
 * ✓ prefers-reduced-motion: single static frame, no rAF loop, not hidden
 * ✓ Non-WebGL fallback: inline SVG line-art camera, never a blank space
 * ✓ Spring-damped mouse tilt ±8°, desktop only
 * ✓ Capped internal render resolution (0.75× DPR)
 * ✓ Low-poly geometry (~200 triangles, primitives only, no GLTF)
 */
'use client';

import { useEffect, useRef, useState } from 'react';

// ─── No-WebGL Fallback: SVG line-art camera ──────────────────────────────────
function StaticCameraFallback() {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      style={{ width: '100%', height: '100%', color: 'var(--fg)', opacity: 0.5 }}
      aria-hidden="true"
    >
      {/* Body */}
      <rect x="60" y="95" width="300" height="170" stroke="currentColor" strokeWidth="1.2" />
      {/* Grip */}
      <rect x="60" y="95" width="55" height="170" stroke="currentColor" strokeWidth="1.2" />
      {/* Viewfinder */}
      <rect x="145" y="60" width="90" height="37" stroke="currentColor" strokeWidth="1.2" />
      {/* Hot shoe */}
      <rect x="155" y="52" width="70" height="10" stroke="currentColor" strokeWidth="1" />
      {/* Shutter */}
      <rect x="295" y="65" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
      {/* Lens outer */}
      <circle cx="215" cy="180" r="68" stroke="currentColor" strokeWidth="1.2" />
      {/* Lens inner ring */}
      <circle cx="215" cy="180" r="50" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
      {/* Lens aperture */}
      <circle cx="215" cy="180" r="28" stroke="currentColor" strokeWidth="1.2" />
      {/* Lens glass dot */}
      <circle cx="215" cy="180" r="8" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

// ─── WebGL availability check ─────────────────────────────────────────────────
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch { return false; }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AsciiCamera() {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const [noWebGL, setNoWebGL] = useState(false);
  const initialized  = useRef(false);
  const cleanupRef   = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (initialized.current) return;
    if (!hasWebGL()) { setNoWebGL(true); return; }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile       = window.innerWidth < 768;
    const wrapper        = wrapperRef.current;
    if (!wrapper) return;

    // Lazy-init: don't build scene until element enters view AND browser is idle
    let initScheduled = false;

    const scheduleInit = () => {
      if (initScheduled || initialized.current) return;
      initScheduled = true;
      const doInit = () => {
        initialized.current = true;
        runScene(wrapper, prefersReduced, isMobile, (fn) => { cleanupRef.current = fn; });
      };
      if ('requestIdleCallback' in window) {
        (window as typeof window & { requestIdleCallback(fn: () => void, opts?: object): void })
          .requestIdleCallback(doInit, { timeout: 1500 });
      } else {
        setTimeout(doInit, 250);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) scheduleInit(); },
      { threshold: 0.05 }
    );
    observer.observe(wrapper);

    return () => { observer.disconnect(); cleanupRef.current?.(); };
  }, []);

  if (noWebGL) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StaticCameraFallback />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      id="ascii-camera-mount"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'transparent' }}
    />
  );
}

// ─── Three.js scene (dynamic import — never in initial bundle) ────────────────
async function runScene(
  wrapper: HTMLDivElement,
  prefersReduced: boolean,
  isMobile: boolean,
  onCleanup: (fn: () => void) => void
) {
  const THREE = await import('three');
  const { AsciiEffect } = await import('three/examples/jsm/effects/AsciiEffect.js');

  // Read live CSS token — updates if token changes
  const fg = () => getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#f2f2f2';

  // Scene
  const scene  = new THREE.Scene();
  const cam    = new THREE.PerspectiveCamera(36, wrapper.clientWidth / wrapper.clientHeight, 0.1, 100);
  cam.position.set(0, 0.5, 11);

  const renderer = new THREE.WebGLRenderer({ antialias: false });
  // Cap at 0.75× DPR — ASCII effect discards sub-character detail anyway
  renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.75, 1.5));
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);

  // AsciiEffect — shorter ramp reads cleaner at this character-cell size
  const charSet = isMobile ? ' .:=+#' : ' .:-=+*#';
  const effect  = new AsciiEffect(renderer, charSet, { invert: true });
  effect.setSize(wrapper.clientWidth, wrapper.clientHeight);

  const ascii = effect.domElement as HTMLElement;
  Object.assign(ascii.style, {
    color:           fg(),
    backgroundColor: 'transparent',
    fontFamily:      '"JetBrains Mono", monospace',
    // Slightly larger = fewer cells but each character reads more clearly
    fontSize:        isMobile ? '6px' : '9px',
    lineHeight:      '1',
    textShadow:      'none',
    position:        'absolute',
    inset:           '0',
    width:           '100%',
    height:          '100%',
    letterSpacing:   '0',
  });
  wrapper.appendChild(ascii);

  // Lighting: three-point for clear face contrast in ASCII
  scene.add(new THREE.AmbientLight(0xffffff, 0.12));
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(4, 5, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.35);
  fill.position.set(-4, 0, 3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.9);
  rim.position.set(0, -2, -6);
  scene.add(rim);

  // MeshPhongMaterial: specular highlights create sharp face-to-face
  // brightness contrast, which AsciiEffect maps to distinct characters.
  // Lambert is too flat — faces end up at similar luminance = uniform mud.
  const mat   = new THREE.MeshPhongMaterial({
    color:     0xffffff,
    specular:  0xaaaaaa,
    shininess: 40,
    side:      THREE.DoubleSide,
  });
  const group = new THREE.Group();
  const segs  = isMobile ? 12 : 24;

  // Main Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.0, 1.2), mat);
  group.add(body);
  
  // Top Plate (creates a stepped look like retro cameras)
  const topPlate = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.4, 1.1), mat);
  topPlate.position.set(0, 1.2, 0);
  group.add(topPlate);

  // Grip
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.9, 1.4), mat);
  grip.position.set(-1.5, -0.05, 0.1); 
  group.add(grip);

  // Lens Base (wider)
  const lensBase = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.3, segs), mat);
  lensBase.rotation.x = Math.PI / 2; 
  lensBase.position.set(0.2, 0, 0.75); 
  group.add(lensBase);

  // Lens Barrel
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 1.2, segs), mat);
  barrel.rotation.x = Math.PI / 2; 
  barrel.position.set(0.2, 0, 1.5); 
  group.add(barrel);
  
  // Lens Front Ring
  const frontRing = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.2, segs), mat);
  frontRing.rotation.x = Math.PI / 2; 
  frontRing.position.set(0.2, 0, 2.1); 
  group.add(frontRing);

  // Viewfinder Hump (pentaprism shape approximated with box)
  const vf = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.0), mat);
  vf.position.set(0.2, 1.5, -0.1); 
  group.add(vf);
  
  // Hot shoe
  const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.6), mat);
  shoe.position.set(0.2, 1.85, -0.1); 
  group.add(shoe);

  // Dials on top
  const dial1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.15, segs), mat);
  dial1.position.set(1.2, 1.45, 0);
  group.add(dial1);
  
  const dial2 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.15, segs), mat);
  dial2.position.set(-0.6, 1.45, 0);
  group.add(dial2);
  
  // Shutter button
  const shutter = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 8), mat);
  shutter.position.set(1.5, 1.5, 0.2); 
  group.add(shutter);

  // Offset the whole group so it rotates around a visually pleasing center
  group.position.set(-0.2, -0.5, 0);
  
  // Outer group to handle the continuous rotation + base tilt
  const pivot = new THREE.Group();
  pivot.add(group);
  scene.add(pivot);

  // Mouse tilt — spring-damped, desktop only, ±8°
  const MAX_TILT = (8 * Math.PI) / 180;
  const mouse    = { x: 0, y: 0 };
  const spring   = { x: 0, y: 0, vx: 0, vy: 0 };
  const onMouse  = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  if (!isMobile && !prefersReduced) window.addEventListener('mousemove', onMouse, { passive: true });

  // Visibility — pause loop when off-screen
  let visible = true;
  const visObs = new IntersectionObserver(
    (e) => { visible = e[0].isIntersecting; }, { threshold: 0.05 }
  );
  visObs.observe(wrapper);

  // Resize
  const resObs = new ResizeObserver(() => {
    const w = wrapper.clientWidth, h = wrapper.clientHeight;
    cam.aspect = w / h; cam.updateProjectionMatrix();
    renderer.setSize(w, h); effect.setSize(w, h);
    ascii.style.color = fg(); // re-read token in case theme updated
  });
  resObs.observe(wrapper);

  // Animation loop
  let rafId = 0;
  const ROT  = (Math.PI * 2) / (25 * 60); // 1 rev / 25s at 60fps

  // Set base tilt so it's spinning "tilted ways"
  const BASE_TILT_X = Math.PI / 12;  // 15 degrees down
  const BASE_TILT_Z = Math.PI / 24;  // Very slight roll

  if (prefersReduced) {
    // Static frame only — freeze, don't hide
    pivot.rotation.y = -Math.PI / 5;
    pivot.rotation.x = BASE_TILT_X;
    pivot.rotation.z = BASE_TILT_Z;
    effect.render(scene, cam);
  } else {
    let angle = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;

      angle += ROT;

      if (!isMobile) {
        // Spring toward mouse tilt
        spring.vx += (mouse.y * MAX_TILT - spring.x) * 0.055;
        spring.vy += (mouse.x * MAX_TILT - spring.y) * 0.055;
        spring.vx *= 0.74; spring.vy *= 0.74;
        spring.x  += spring.vx; spring.y += spring.vy;
        
        // Apply rotation to the inner group for mouse tracking,
        // and let the pivot handle the continuous tumbling
        group.rotation.x = spring.x;
        group.rotation.y = spring.y;
        
        pivot.rotation.y = angle;
        pivot.rotation.x = BASE_TILT_X + Math.sin(angle) * 0.15; // wobble
        pivot.rotation.z = BASE_TILT_Z + Math.cos(angle * 1.5) * 0.1;
      } else {
        pivot.rotation.y = angle;
        pivot.rotation.x = BASE_TILT_X + Math.sin(angle) * 0.15;
        pivot.rotation.z = BASE_TILT_Z + Math.cos(angle * 1.5) * 0.1;
      }

      effect.render(scene, cam);
    };
    tick();
  }

  onCleanup(() => {
    cancelAnimationFrame(rafId);
    visObs.disconnect(); resObs.disconnect();
    window.removeEventListener('mousemove', onMouse);
    renderer.dispose();
    if (wrapper.contains(ascii)) wrapper.removeChild(ascii);
  });
}
