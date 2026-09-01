"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero scene: a LiDAR-style point cloud that assembles itself into a built
 * site — scattered survey points settle into ground, structures and a service
 * corridor. It mirrors what the group actually does: raw spatial data becomes
 * a designed, built environment.
 *
 * Falls back to a static rendering when WebGL is unavailable, on small
 * screens, or when the visitor asked for reduced motion.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setFallback(true);
        return;
      }
      // Phones get the same scene, thinned out and with a lower pixel ratio,
      // rather than a flat stand-in that says nothing about the company.
      const small = window.matchMedia("(max-width: 639px)").matches;

      const THREE = await import("three");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        setFallback(true);
        return;
      }

      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(small ? 42 : 30, width / height, 0.1, 260);
      camera.position.set(0, small ? 11 : 13.5, small ? 28 : 30);
      camera.lookAt(small ? 0 : -2.6, small ? 3.9 : 0.3, 0.6);

      const group = new THREE.Group();
      group.rotation.y = -0.26;
      group.position.set(small ? 0 : -3.6, small ? -4.4 : -1.2, 0);
      // portrait viewports cannot fit a 20-unit-wide site plan at any sane
      // camera distance, so the model itself shrinks there
      if (small) group.scale.setScalar(0.52);
      scene.add(group);

      // ---- site model -------------------------------------------------
      const SPAN_X = 20;
      const SPAN_Z = 11;
      const COLS = 128;
      const ROWS = 74;

      type Block = { x0: number; x1: number; z0: number; z1: number; h: number };
      const blocks: Block[] = [
        { x0: -8.2, x1: -5.4, z0: -3.9, z1: -1.4, h: 1.75 },
        { x0: -4.6, x1: -2.6, z0: -3.4, z1: -2.0, h: 1.05 },
        { x0: -1.4, x1: 1.9, z0: -4.2, z1: -1.7, h: 2.45 },
        { x0: 2.9, x1: 5.1, z0: -3.6, z1: -1.9, h: 1.35 },
        { x0: 5.9, x1: 8.6, z0: -4.0, z1: -1.2, h: 2.0 },
        { x0: -7.4, x1: -5.0, z0: 1.8, z1: 3.7, h: 1.15 },
        { x0: -2.9, x1: 0.4, z0: 2.1, z1: 4.0, h: 1.6 },
        { x0: 3.4, x1: 6.4, z0: 1.9, z1: 3.8, h: 0.95 },
      ];

      const inBlock = (x: number, z: number) => {
        for (const b of blocks) {
          if (x >= b.x0 && x <= b.x1 && z >= b.z0 && z <= b.z1) return b;
        }
        return null;
      };
      // service corridor running across the site
      const inCorridor = (x: number, z: number) => Math.abs(z - x * 0.055) < 0.3;

      const positions: number[] = [];
      const starts: number[] = [];
      const colors: number[] = [];
      const delays: number[] = [];

      const cGround = new THREE.Color("#63737f");
      const cBlock = new THREE.Color("#dfe6ea");
      const cRoad = new THREE.Color("#cf3a30");

      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const x = (i / (COLS - 1) - 0.5) * SPAN_X;
          const z = (j / (ROWS - 1) - 0.5) * SPAN_Z;
          const b = inBlock(x, z);
          const road = !b && inCorridor(x, z);

          // thin the plain ground so structures and the corridor read clearly
          if (!b && !road && Math.random() > (small ? 0.18 : 0.34)) continue;

          let y = 0;
          let color = cGround;
          if (b) {
            const edgeX = Math.min(x - b.x0, b.x1 - x);
            const edgeZ = Math.min(z - b.z0, b.z1 - z);
            const edge = Math.min(edgeX, edgeZ);
            if (edge < 0.18) {
              // dense scatter down the facades, where a scanner sees most returns
              y = Math.random() * b.h;
            } else {
              // sparse on the roof, so the volume reads as scanned, not solid
              if (Math.random() > (small ? 0.15 : 0.26)) continue;
              y = b.h;
            }
            color = cBlock;
          } else if (road) {
            y = 0.015;
            color = cRoad;
          }

          positions.push(x, y, z);
          starts.push(
            x + (Math.random() - 0.5) * 16,
            y + Math.random() * 11 + 2,
            z + (Math.random() - 0.5) * 16
          );
          colors.push(color.r, color.g, color.b);
          delays.push(Math.random());
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute("aStart", new THREE.Float32BufferAttribute(starts, 3));
      geo.setAttribute("aColor", new THREE.Float32BufferAttribute(colors, 3));
      geo.setAttribute("aDelay", new THREE.Float32BufferAttribute(delays, 1));

      const uniforms = {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: small ? 1.0 : 1.15 },
      };

      const points = new THREE.Points(
        geo,
        new THREE.ShaderMaterial({
          uniforms,
          transparent: true,
          depthWrite: false,
          vertexShader: `
            attribute vec3 aStart;
            attribute vec3 aColor;
            attribute float aDelay;
            uniform float uProgress;
            uniform float uTime;
            uniform float uSize;
            varying vec3 vColor;
            varying float vFade;
            void main() {
              float d = clamp(uProgress * 1.4 - aDelay * 0.4, 0.0, 1.0);
              float e = 1.0 - pow(1.0 - d, 3.0);
              vec3 pos = mix(aStart, position, e);
              pos.y += sin(uTime * 0.5 + position.x * 0.7) * 0.015;
              vec4 mv = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = uSize * (620.0 / -mv.z);
              gl_Position = projectionMatrix * mv;
              vColor = aColor;
              vFade = e;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            varying float vFade;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float alpha = smoothstep(0.5, 0.16, dist) * (0.25 + 0.75 * vFade);
              gl_FragColor = vec4(vColor, alpha);
            }
          `,
        })
      );
      group.add(points);

      // ---- survey grid ------------------------------------------------
      const gridPts: number[] = [];
      const STEP = 1.25;
      for (let x = -SPAN_X / 2; x <= SPAN_X / 2 + 0.001; x += STEP) {
        gridPts.push(x, 0, -SPAN_Z / 2, x, 0, SPAN_Z / 2);
      }
      for (let z = -SPAN_Z / 2; z <= SPAN_Z / 2 + 0.001; z += STEP) {
        gridPts.push(-SPAN_X / 2, 0, z, SPAN_X / 2, 0, z);
      }
      const gridGeo = new THREE.BufferGeometry();
      gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridPts, 3));
      const gridMat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#3c4d59"),
        transparent: true,
        opacity: 0,
      });
      const grid = new THREE.LineSegments(gridGeo, gridMat);
      grid.position.y = -0.01;
      group.add(grid);

      // ---- block outlines ---------------------------------------------
      const edgePts: number[] = [];
      for (const b of blocks) {
        const corners: [number, number][] = [
          [b.x0, b.z0],
          [b.x1, b.z0],
          [b.x1, b.z1],
          [b.x0, b.z1],
        ];
        for (let k = 0; k < 4; k++) {
          const [ax, az] = corners[k];
          const [bx, bz] = corners[(k + 1) % 4];
          edgePts.push(ax, b.h, az, bx, b.h, bz);
          edgePts.push(ax, 0, az, ax, b.h, az);
        }
      }
      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgePts, 3));
      const edgeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#9fb0bb"),
        transparent: true,
        opacity: 0,
      });
      group.add(new THREE.LineSegments(edgeGeo, edgeMat));

      // ---- interaction & loop ------------------------------------------
      let targetX = 0;
      let targetY = 0;
      const onPointer = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
        targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      let inView = true;
      const io = new IntersectionObserver((entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      });
      io.observe(mount);

      const clock = new THREE.Clock();
      let raf = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!inView || document.hidden) return;

        const t = clock.getElapsedTime();
        uniforms.uTime.value = t;
        uniforms.uProgress.value = Math.min(1, t / 2.6);

        const settled = Math.max(0, Math.min(1, (t - 1.7) / 1.6));
        gridMat.opacity = settled * 0.62;
        edgeMat.opacity = settled * 0.6;

        group.rotation.y += (-0.28 + targetX * 0.1 - group.rotation.y) * 0.03;
        group.rotation.x += (targetY * 0.03 - group.rotation.x) * 0.03;

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        geo.dispose();
        gridGeo.dispose();
        edgeGeo.dispose();
        gridMat.dispose();
        edgeMat.dispose();
        (points.material as import("three").Material).dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  if (fallback) {
    // A receding survey grid with the service corridor cutting across it —
    // the same idea as the WebGL scene, drawn with two transforms.
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-x-[-40%] bottom-[-6%] h-[62%] opacity-[0.55]"
          style={{
            transform: "perspective(620px) rotateX(62deg)",
            transformOrigin: "50% 100%",
            backgroundImage:
              "linear-gradient(to right, #5b7182 1px, transparent 1px), linear-gradient(to bottom, #5b7182 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to top, #000 8%, transparent 82%)",
            WebkitMaskImage: "linear-gradient(to top, #000 8%, transparent 82%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-[31%] h-[3px] bg-brand/80"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 22%, #000 78%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 22%, #000 78%, transparent)",
          }}
        />
      </div>
    );
  }

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
