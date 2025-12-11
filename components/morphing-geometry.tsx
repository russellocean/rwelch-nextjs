"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Theme colors
const themeColors = {
  light: {
    primary: "#2563EB",
    secondary: "#0EA5E9",
    accent: "#06B6D4",
  },
  dark: {
    primary: "#F97316",
    secondary: "#EA580C",
    accent: "#D4A574",
  },
};

// Morphing geometry: flat plane → terrain → torus knot → flat plane (loop)
function MorphingTerrain() {
  const meshRef = useRef<THREE.LineSegments>(null);
  const { resolvedTheme } = useTheme();
  const { viewport } = useThree();

  const gridSize = 40;
  const gridSpacing = 0.06;

  // Torus knot parameters
  const p = 2; // winds around the torus
  const q = 3; // winds through the hole
  const torusRadius = 0.8;
  const tubeRadius = 0.35;

  // DNA helix parameters
  const helixRadius = 0.5;
  const helixHeight = 2.5;
  const helixTurns = 3;

  // Store base grid positions and pre-calculate shape positions
  const { basePositions, knotPositions, helixPositions } = useMemo(() => {
    const base: number[] = [];
    const knot: number[] = [];
    const helix: number[] = [];

    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        // Flat grid position
        const x = (i - gridSize / 2) * gridSpacing;
        const z = (j - gridSize / 2) * gridSpacing;
        base.push(x, 0, z);

        // Torus knot parametric equations
        const u = (i / gridSize) * Math.PI * 2 * p;
        const v = (j / gridSize) * Math.PI * 2;

        // Calculate point on torus knot
        const r = torusRadius + tubeRadius * Math.cos((q * u) / p + v);
        const knotX = r * Math.cos(u);
        const knotY = r * Math.sin(u);
        const knotZ = tubeRadius * Math.sin((q * u) / p + v);

        knot.push(knotX, knotY, knotZ);

        // DNA double helix - two strands offset by PI
        const helixU = (i / gridSize) * Math.PI * 2 * helixTurns;
        const helixV = (j / gridSize) * Math.PI * 2;
        const strandOffset = Math.floor(j / (gridSize / 2)) * Math.PI; // Split into two strands

        const helixX =
          helixRadius *
          Math.cos(helixU + strandOffset) *
          (1 + 0.3 * Math.cos(helixV));
        const helixY = (i / gridSize - 0.5) * helixHeight;
        const helixZ =
          helixRadius *
          Math.sin(helixU + strandOffset) *
          (1 + 0.3 * Math.cos(helixV));

        helix.push(helixX, helixY, helixZ);
      }
    }
    return { basePositions: base, knotPositions: knot, helixPositions: helix };
  }, []);

  // Create grid geometry
  const { positions, indices } = useMemo(() => {
    const idx: number[] = [];

    // Create line indices (horizontal lines)
    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const a = i * (gridSize + 1) + j;
        const b = a + 1;
        idx.push(a, b);
      }
    }

    // Create line indices (vertical lines)
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const a = i * (gridSize + 1) + j;
        const b = a + (gridSize + 1);
        idx.push(a, b);
      }
    }

    return {
      positions: new Float32Array(basePositions),
      indices: new Uint16Array(idx),
    };
  }, [basePositions]);

  const color = useMemo(() => {
    const colors =
      resolvedTheme === "light" ? themeColors.light : themeColors.dark;
    return new THREE.Color(colors.primary);
  }, [resolvedTheme]);

  // Noise function for terrain
  const noise = (x: number, y: number, t: number) => {
    const s1 = Math.sin(x * 1.5 + t * 0.3) * Math.cos(y * 1.2 + t * 0.2);
    const s2 = Math.sin(x * 3 - t * 0.2) * Math.sin(y * 2.5 + t * 0.15);
    const s3 = Math.cos(x * 0.8 + y * 1.1 + t * 0.1);
    return (s1 + s2 * 0.5 + s3 * 0.25) / 1.75;
  };

  // Smooth easing functions
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
  };

  // Animate morphing cycle
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const positionAttribute = meshRef.current.geometry.attributes.position;
    const currentPositions = positionAttribute.array as Float32Array;

    // Cycle duration: 30 seconds total (3 shapes)
    // 0-1s: flat → terrain (quick rise)
    // 1-5s: terrain (hold with noise)
    // 5-8s: terrain → torus knot
    // 8-14s: torus knot (rotating)
    // 14-17s: torus knot → DNA helix
    // 17-25s: DNA helix (rotating)
    // 25-28s: DNA helix → flat
    // 28-30s: flat (brief pause)
    const cycleDuration = 30;
    const cycleTime = time % cycleDuration;

    let flatToTerrain = 0;
    let terrainToKnot = 0;
    let knotToHelix = 0;

    if (cycleTime < 1) {
      // Flat → Terrain (quick)
      flatToTerrain = easeInOutCubic(cycleTime / 1);
      terrainToKnot = 0;
      knotToHelix = 0;
    } else if (cycleTime < 5) {
      // Hold terrain
      flatToTerrain = 1;
      terrainToKnot = 0;
      knotToHelix = 0;
    } else if (cycleTime < 8) {
      // Terrain → Torus Knot
      flatToTerrain = 1;
      terrainToKnot = easeInOutCubic((cycleTime - 5) / 3);
      knotToHelix = 0;
    } else if (cycleTime < 14) {
      // Hold torus knot
      flatToTerrain = 1;
      terrainToKnot = 1;
      knotToHelix = 0;
    } else if (cycleTime < 17) {
      // Torus Knot → DNA Helix
      flatToTerrain = 1;
      terrainToKnot = 1;
      knotToHelix = easeInOutCubic((cycleTime - 14) / 3);
    } else if (cycleTime < 25) {
      // Hold DNA helix
      flatToTerrain = 1;
      terrainToKnot = 1;
      knotToHelix = 1;
    } else if (cycleTime < 28) {
      // DNA Helix → Flat (collapse all)
      const t = easeInOutCubic((cycleTime - 25) / 3);
      flatToTerrain = 1 - t;
      terrainToKnot = 1 - t;
      knotToHelix = 1 - t;
    } else {
      // Brief flat pause before restart
      flatToTerrain = 0;
      terrainToKnot = 0;
      knotToHelix = 0;
    }

    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const idx = (i * (gridSize + 1) + j) * 3;

        // Base flat position
        const baseX = basePositions[idx];
        const baseZ = basePositions[idx + 2];

        // Terrain height (perlin-like noise)
        const terrainHeight =
          noise(baseX * 3, baseZ * 3, time * 0.5) * 0.25 * flatToTerrain;

        // Pre-calculated torus knot position
        const knotX = knotPositions[idx];
        const knotY = knotPositions[idx + 1];
        const knotZ = knotPositions[idx + 2];

        // Pre-calculated DNA helix position
        const helixX = helixPositions[idx];
        const helixY = helixPositions[idx + 1];
        const helixZ = helixPositions[idx + 2];

        // Add subtle noise displacement to knot surface
        const knotNoise =
          noise(knotX * 3, knotY * 3, time * 0.3) * 0.08 * flatToTerrain;
        const noisedKnotX = knotX * (1 + knotNoise);
        const noisedKnotY = knotY * (1 + knotNoise);
        const noisedKnotZ = knotZ * (1 + knotNoise);

        // Add subtle pulsing to helix
        const helixPulse = 1 + Math.sin(time * 2 + i * 0.1) * 0.05;
        const pulsedHelixX = helixX * helixPulse;
        const pulsedHelixY = helixY;
        const pulsedHelixZ = helixZ * helixPulse;

        // Interpolate between terrain and torus knot
        const terrainX = baseX;
        const terrainY = terrainHeight;
        const terrainZ = baseZ;

        // First interpolate terrain → knot
        const midX = terrainX + (noisedKnotX - terrainX) * terrainToKnot;
        const midY = terrainY + (noisedKnotY - terrainY) * terrainToKnot;
        const midZ = terrainZ + (noisedKnotZ - terrainZ) * terrainToKnot;

        // Then interpolate knot → helix
        currentPositions[idx] = midX + (pulsedHelixX - midX) * knotToHelix;
        currentPositions[idx + 1] = midY + (pulsedHelixY - midY) * knotToHelix;
        currentPositions[idx + 2] = midZ + (pulsedHelixZ - midZ) * knotToHelix;
      }
    }

    positionAttribute.needsUpdate = true;

    // Rotate - dynamic based on current shape
    const isHelix = knotToHelix > 0.5;
    const baseRotationX = -0.8 + terrainToKnot * 0.5 + (isHelix ? 0.3 : 0);
    const rotationY = time * 0.08;
    const rotationZ = terrainToKnot * Math.sin(time * 0.1) * 0.1;

    meshRef.current.rotation.x = baseRotationX;
    meshRef.current.rotation.y = rotationY;
    meshRef.current.rotation.z = rotationZ;
  });

  // Position and scale
  const scale = Math.min(viewport.width, viewport.height) * 0.22;

  return (
    <group position={[viewport.width * 0.22, 0, -1]}>
      <lineSegments ref={meshRef} scale={scale}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[indices, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.7} />
      </lineSegments>
    </group>
  );
}

// Floating code-like particles - spread across full viewport
function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const { viewport } = useThree();

  const elementCount = 25;

  const elements = useMemo(() => {
    return Array.from({ length: elementCount }, (_, i) => ({
      id: `element-${i}`,
      position: [
        (Math.random() - 0.5) * 8, // Full width spread
        (Math.random() - 0.5) * 5, // Full height spread
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      rotation: Math.random() * Math.PI,
      speed: 0.2 + Math.random() * 0.3,
      size: 0.03 + Math.random() * 0.04,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const color = useMemo(() => {
    const colors =
      resolvedTheme === "light" ? themeColors.light : themeColors.dark;
    return new THREE.Color(colors.secondary);
  }, [resolvedTheme]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const el = elements[i];
      child.position.y =
        el.position[1] + Math.sin(time * el.speed + el.phase) * 0.3;
      child.rotation.z = time * 0.2 + el.rotation;
    });
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.25;

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={scale}>
      {elements.map((el) => (
        <mesh key={el.id} position={el.position}>
          <octahedronGeometry args={[el.size, 0]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <MorphingTerrain />
      <FloatingElements />
    </>
  );
}

export default function MorphingGeometry() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!mounted) return null;

  // Show static fallback for users who prefer reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{
          background: `
            radial-gradient(circle at 70% 50%, hsl(var(--portfolio-primary) / 0.1) 0%, transparent 40%),
            radial-gradient(circle at 30% 70%, hsl(var(--portfolio-accent) / 0.05) 0%, transparent 30%)
          `,
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 -z-10 hidden lg:block">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
