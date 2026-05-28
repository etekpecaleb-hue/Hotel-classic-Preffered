import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * RoyalDustScene — subtle, performant 3D gold-dust + rotating royal ring.
 * Designed for hero sections; transparent background, minimal GPU usage.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const setSize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();

    // Gold dust particles
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      velocities[i] = 0.002 + Math.random() * 0.005;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(geom, particleMat);
    scene.add(particles);

    // Rotating royal torus (ring)
    const ringGeom = new THREE.TorusGeometry(1.4, 0.012, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.55,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.position.set(0, 0, -1);
    scene.add(ring);

    const ring2Geom = new THREE.TorusGeometry(1.8, 0.008, 16, 140);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xb8935a,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.position.set(0, 0, -1.2);
    ring2.rotation.x = Math.PI / 2.5;
    scene.add(ring2);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let rafId = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      const posArr = geom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += velocities[i];
        posArr[i * 3 + 0] += Math.sin(t + i) * 0.001;
        if (posArr[i * 3 + 1] > 6) {
          posArr[i * 3 + 1] = -6;
          posArr[i * 3 + 0] = (Math.random() - 0.5) * 14;
        }
      }
      geom.attributes.position.needsUpdate = true;

      ring.rotation.z = t * 0.15;
      ring.rotation.x = Math.sin(t * 0.3) * 0.1;
      ring2.rotation.z = -t * 0.1;
      ring2.rotation.y = Math.sin(t * 0.2) * 0.15;

      particles.rotation.y = mouseX * 0.15;
      particles.rotation.x = mouseY * 0.1;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const ro = new ResizeObserver(setSize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      geom.dispose();
      particleMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}
