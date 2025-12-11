"use client";

import {
  useRef,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";
import GradientMeshMaterial from "../materials/GradientMeshMaterial";

// Extend R3F with our custom material
extend({ GradientMeshMaterial });

// Theme-aware color palettes - Vercel-inspired flowing gradients
const themeColors = {
  light: {
    // "Arctic Precision" - Vibrant blues, no muddy grays
    color1: new THREE.Color("#2563EB"), // Rich blue
    color2: new THREE.Color("#0EA5E9"), // Bright sky blue
    color3: new THREE.Color("#06B6D4"), // Cyan
    background: new THREE.Color("#FFFFFF"), // Pure white (transparent base)
    intensity: 0.6,
    noiseScale: 3.5,
    speed: 0.25,
  },
  dark: {
    // "Midnight Ember" - Editorial, warm with terracotta accent
    color1: new THREE.Color("#F97316"), // Burnt orange/terracotta
    color2: new THREE.Color("#EA580C"), // Deep burnt orange
    color3: new THREE.Color("#D4A574"), // Warm sand/cream
    background: new THREE.Color("#0C0A09"), // Rich warm black
    intensity: 0.75,
    noiseScale: 3.0,
    speed: 0.2,
  },
};

// Performance configuration based on device capabilities
const getPerformanceConfig = () => {
  if (typeof window === "undefined")
    return { lowEnd: false, mobile: false, maxPixelRatio: 1.0 };

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isLowEnd = navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency <= 4
    : false;
  const hasLowMemory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory
    ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4
    : false;

  return {
    lowEnd: isLowEnd || hasLowMemory,
    mobile: isMobile,
    maxPixelRatio: isLowEnd ? 0.6 : isMobile ? 0.8 : 1.0,
  };
};

// Gradient mesh component - the core visual
function GradientMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const { theme, resolvedTheme } = useTheme();
  const [targetMousePosition, setTargetMousePosition] = useState(
    new THREE.Vector2(0.5, 0.5)
  );
  const [smoothMousePosition, setSmoothMousePosition] = useState(
    new THREE.Vector2(0.5, 0.5)
  );

  const performanceConfig = useMemo(() => getPerformanceConfig(), []);

  // Scale plane to fill viewport
  const scale = useMemo(() => {
    return [viewport.width, viewport.height, 1] as [number, number, number];
  }, [viewport.width, viewport.height]);

  // Get current theme colors
  const currentTheme = useMemo(() => {
    const activeTheme = resolvedTheme || theme || "dark";
    return (
      themeColors[activeTheme as keyof typeof themeColors] || themeColors.dark
    );
  }, [theme, resolvedTheme]);

  // Optimized mouse tracking
  const handleMouseMove = useCallback((event: MouseEvent) => {
    setTargetMousePosition(
      new THREE.Vector2(
        event.clientX / window.innerWidth,
        1.0 - event.clientY / window.innerHeight
      )
    );
  }, []);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;

    const throttledMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 50) return; // ~20fps throttling for mouse
      lastTime = now;

      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => handleMouseMove(event));
    };

    window.addEventListener("mousemove", throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [handleMouseMove]);

  // Animation loop
  useFrame((state, delta) => {
    // Skip if frame rate is too low
    if (delta > 0.1) return;

    // Smooth mouse interpolation
    const lerpRate = performanceConfig.lowEnd ? 0.03 : 0.05;
    smoothMousePosition.lerp(targetMousePosition, lerpRate);
    setSmoothMousePosition(smoothMousePosition.clone());

    if (materialRef.current) {
      const material = materialRef.current as THREE.ShaderMaterial & {
        uTime: number;
        uResolution: THREE.Vector2;
        uMouse: THREE.Vector2;
        uColor1: THREE.Color;
        uColor2: THREE.Color;
        uColor3: THREE.Color;
        uBackground: THREE.Color;
        uIntensity: number;
        uNoiseScale: number;
        uSpeed: number;
      };

      material.uTime = state.clock.elapsedTime;
      material.uResolution.set(size.width, size.height);
      material.uMouse.copy(smoothMousePosition);

      // Update theme colors
      material.uColor1.copy(currentTheme.color1);
      material.uColor2.copy(currentTheme.color2);
      material.uColor3.copy(currentTheme.color3);
      material.uBackground.copy(currentTheme.background);
      material.uIntensity = currentTheme.intensity;
      material.uNoiseScale = currentTheme.noiseScale;
      material.uSpeed = performanceConfig.lowEnd
        ? currentTheme.speed * 0.7
        : currentTheme.speed;
    }
  });

  const material = useMemo(() => new GradientMeshMaterial(), []);

  return (
    <mesh position={[0, 0, 0]} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <primitive
        object={material}
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}

// Main scene - clean and simple
function Scene() {
  return (
    <Suspense fallback={null}>
      <GradientMesh />
    </Suspense>
  );
}

export default function Hero3D() {
  const [pixelRatio, setPixelRatio] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const performanceConfig = useMemo(() => getPerformanceConfig(), []);

  useEffect(() => {
    const basePixelRatio = window.devicePixelRatio || 1;
    const optimizedRatio = Math.min(
      basePixelRatio,
      performanceConfig.maxPixelRatio || 1.0
    );

    setPixelRatio(optimizedRatio);

    // Lazy load the 3D scene when component comes into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("[data-hero-3d]");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [performanceConfig]);

  // Fallback gradient while loading or before visible
  if (!isVisible) {
    return (
      <div
        className="absolute inset-0 -z-10 size-full"
        data-hero-3d
        style={{
          background:
            resolvedTheme === "light"
              ? "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 60%, rgba(8, 145, 178, 0.1) 0%, transparent 50%)"
              : "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 60%, rgba(212, 165, 116, 0.06) 0%, transparent 50%)",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 -z-10 size-full" data-hero-3d>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{
          antialias: false, // Not needed for gradient effects
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: true,
        }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
        dpr={pixelRatio}
      >
        <Scene />
      </Canvas>

      {/* Mobile text readability overlay */}
      {performanceConfig.mobile && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              resolvedTheme === "light"
                ? "linear-gradient(135deg, rgba(245, 249, 252, 0.6) 0%, transparent 60%)"
                : "linear-gradient(135deg, rgba(12, 10, 9, 0.5) 0%, transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
