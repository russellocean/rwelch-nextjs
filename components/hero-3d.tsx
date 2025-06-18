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
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useTheme } from "next-themes";
import * as THREE from "three";
import RayMarchMaterial from "../materials/RayMarchMaterial";

// Extend R3F with our custom material
extend({ RayMarchMaterial });

// Theme-aware color palettes
const themeColors = {
  light: {
    primary: new THREE.Color("#7B5CFF"),
    secondary: new THREE.Color("#FF5EDB"),
    accent: new THREE.Color("#00D9FF"),
    background: new THREE.Color("#F8FAFC"),
    rim: new THREE.Color("#4F46E5"),
    glow: new THREE.Color("#6366F1"),
    ambient: new THREE.Color("#E2E8F0"),
    directional: new THREE.Color("#7B5CFF"),
    intensity: 0.8,
    bloomIntensity: 0.4,
    glowIntensity: 0.3,
  },
  dark: {
    primary: new THREE.Color("#8B5DFF"),
    secondary: new THREE.Color("#FF6EEB"),
    accent: new THREE.Color("#10E9FF"),
    background: new THREE.Color("#0F0F23"),
    rim: new THREE.Color("#A855F7"),
    glow: new THREE.Color("#8B5CF6"),
    ambient: new THREE.Color("#1E293B"),
    directional: new THREE.Color("#8B5DFF"),
    intensity: 1.2,
    bloomIntensity: 0.8,
    glowIntensity: 0.6,
  },
};

// Performance configuration based on device capabilities
const getPerformanceConfig = () => {
  if (typeof window === "undefined") return { lowEnd: false, mobile: false };

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
    maxPixelRatio: isLowEnd ? 0.5 : isMobile ? 0.75 : 1.0,
    disablePostProcessing: isLowEnd || hasLowMemory,
  };
};

// Ray-marched quad component
function RayMarchQuad() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, gl, size } = useThree();
  const { theme, resolvedTheme } = useTheme();
  const [envMap, setEnvMap] = useState<THREE.CubeTexture | null>(null);
  const [targetMousePosition, setTargetMousePosition] = useState(
    new THREE.Vector2(0.5, 0.5)
  );
  const [smoothMousePosition, setSmoothMousePosition] = useState(
    new THREE.Vector2(0.5, 0.5)
  );

  const performanceConfig = useMemo(() => getPerformanceConfig(), []);

  // Get current theme colors
  const currentTheme = useMemo(() => {
    const activeTheme = resolvedTheme || theme || "dark";
    return (
      themeColors[activeTheme as keyof typeof themeColors] || themeColors.dark
    );
  }, [theme, resolvedTheme]);

  // Load HDRI environment map with error handling and performance consideration
  useEffect(() => {
    // Skip expensive HDRI loading on low-end devices
    if (performanceConfig.lowEnd) return;

    const loader = new RGBELoader();
    const abortController = new AbortController();

    // Use lower resolution for better performance
    const hdriUrl = performanceConfig.mobile
      ? "/textures/studio_small_09_512.hdr"
      : "/textures/studio_small_09_1k.hdr";

    loader.load(
      hdriUrl,
      (texture) => {
        if (abortController.signal.aborted) return;

        texture.mapping = THREE.EquirectangularReflectionMapping;
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
          performanceConfig.mobile ? 256 : 512
        );
        const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);

        // Convert HDRI to cube map
        const scene = new THREE.Scene();
        const geometry = new THREE.SphereGeometry(100, 32, 16);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        cubeCamera.update(gl, scene);
        setEnvMap(cubeRenderTarget.texture);
      },
      undefined,
      (error) => {
        console.warn("Failed to load HDRI:", error);
      }
    );

    return () => {
      abortController.abort();
    };
  }, [gl, performanceConfig]);

  // Optimized mouse tracking with better throttling
  const handleMouseMove = useCallback((event: MouseEvent) => {
    setTargetMousePosition(
      new THREE.Vector2(
        event.clientX / window.innerWidth,
        event.clientY / window.innerHeight
      )
    );
  }, []);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;

    const throttledMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 32) return; // ~30fps throttling instead of 60fps
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

  // Animation loop with performance monitoring
  useFrame((state, delta) => {
    // Skip updates if frame rate is too low (performance throttling)
    if (delta > 0.1) return; // Skip if frame took longer than 100ms

    // Smooth mouse interpolation with adaptive lerp rate
    const lerpRate = performanceConfig.lowEnd ? 0.05 : 0.1;
    smoothMousePosition.lerp(targetMousePosition, lerpRate);
    setSmoothMousePosition(smoothMousePosition.clone());

    if (materialRef.current) {
      const material = materialRef.current as THREE.ShaderMaterial & {
        uTime: number;
        uResolution: THREE.Vector2;
        uMouse: THREE.Vector2;
        uCameraPosition: THREE.Vector3;
        uViewMatrix: THREE.Matrix4;
        uProjectionMatrix: THREE.Matrix4;
        uEnvMap: THREE.CubeTexture | null;
        uQuality: number;
        uThemeColor1: THREE.Color;
        uThemeColor2: THREE.Color;
        uThemeAccent: THREE.Color;
        uThemeBackground: THREE.Color;
        uThemeRim: THREE.Color;
        uThemeGlow: THREE.Color;
        uIntensity: number;
        uGlowIntensity: number;
      };

      material.uTime = state.clock.elapsedTime;
      material.uResolution.set(size.width, size.height);
      material.uMouse.copy(smoothMousePosition);
      material.uCameraPosition.copy(camera.position);
      material.uViewMatrix.copy(camera.matrixWorldInverse);
      material.uProjectionMatrix.copy(camera.projectionMatrix);

      // Set quality based on device performance
      material.uQuality = performanceConfig.lowEnd
        ? 0.0
        : performanceConfig.mobile
        ? 0.5
        : 1.0;

      // Update theme colors
      material.uThemeColor1.copy(currentTheme.primary);
      material.uThemeColor2.copy(currentTheme.secondary);
      material.uThemeAccent.copy(currentTheme.accent);
      material.uThemeBackground.copy(currentTheme.background);
      material.uThemeRim.copy(currentTheme.rim);
      material.uThemeGlow.copy(currentTheme.glow);
      material.uIntensity = currentTheme.intensity;
      material.uGlowIntensity = currentTheme.glowIntensity;

      if (envMap) {
        material.uEnvMap = envMap;
      }
    }
  });

  const material = useMemo(() => new RayMarchMaterial(), []);

  return (
    <mesh
      position={[0, 0, 0]}
      scale={performanceConfig.mobile ? [4, 4, 1] : [6, 6, 1]}
    >
      <planeGeometry args={[1, 1]} />
      <primitive
        object={material}
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Fallback component for loading
function LoadingFallback() {
  const { theme, resolvedTheme } = useTheme();

  const currentTheme = useMemo(() => {
    const activeTheme = resolvedTheme || theme || "dark";
    return (
      themeColors[activeTheme as keyof typeof themeColors] || themeColors.dark
    );
  }, [theme, resolvedTheme]);

  return (
    <mesh position={[0, 0, 0]} scale={2.5}>
      <coneGeometry args={[1.2, 2, 4]} />
      <meshPhysicalMaterial
        metalness={0}
        roughness={0.02}
        transmission={0.98}
        thickness={0.5}
        transparent
        opacity={0.95}
        color="#ffffff"
        emissive={currentTheme.primary}
        emissiveIntensity={0.03}
      />
    </mesh>
  );
}

// Main scene with post-processing
function Scene() {
  const { theme, resolvedTheme } = useTheme();

  const currentTheme = useMemo(() => {
    const activeTheme = resolvedTheme || theme || "dark";
    return (
      themeColors[activeTheme as keyof typeof themeColors] || themeColors.dark
    );
  }, [theme, resolvedTheme]);

  return (
    <>
      {/* Theme-aware lighting */}
      <ambientLight intensity={0.2} color={currentTheme.ambient} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.4}
        color={currentTheme.directional}
      />

      <Suspense fallback={<LoadingFallback />}>
        <RayMarchQuad />
      </Suspense>
    </>
  );
}

// Optimized post-processing effects
function Effects() {
  const { theme, resolvedTheme } = useTheme();
  const performanceConfig = useMemo(() => getPerformanceConfig(), []);

  const currentTheme = useMemo(() => {
    const activeTheme = resolvedTheme || theme || "dark";
    return (
      themeColors[activeTheme as keyof typeof themeColors] || themeColors.dark
    );
  }, [theme, resolvedTheme]);

  // Disable effects entirely on low-end devices
  if (performanceConfig.disablePostProcessing) {
    return null;
  }

  if (performanceConfig.mobile) {
    // Minimal effects for mobile
    return (
      <EffectComposer>
        <Bloom
          intensity={currentTheme.bloomIntensity}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.4}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Bloom
        intensity={currentTheme.bloomIntensity * 2}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.6}
        blendFunction={BlendFunction.ADD}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0005, 0.0005)}
      />
    </EffectComposer>
  );
}

export default function Hero3D() {
  const [pixelRatio, setPixelRatio] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const performanceConfig = useMemo(() => getPerformanceConfig(), []);

  useEffect(() => {
    // For blob effects, we can use very low resolution
    const basePixelRatio = window.devicePixelRatio || 1;
    const optimizedRatio = Math.min(
      basePixelRatio,
      performanceConfig.maxPixelRatio || 1.0
    );

    // Even more aggressive: Cap at 0.8 for desktop, 0.6 for mobile, 0.4 for low-end
    const blobOptimizedRatio = performanceConfig.lowEnd
      ? 0.4
      : performanceConfig.mobile
      ? 0.6
      : 0.8;

    setPixelRatio(Math.min(optimizedRatio, blobOptimizedRatio));

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

  if (!isVisible) {
    return (
      <div
        className="absolute inset-0 -z-10 size-full"
        data-hero-3d
        style={{
          background:
            resolvedTheme === "light"
              ? "linear-gradient(135deg, rgba(123, 92, 255, 0.05) 0%, rgba(255, 123, 92, 0.05) 100%)"
              : "linear-gradient(135deg, rgba(123, 92, 255, 0.1) 0%, rgba(255, 123, 92, 0.1) 100%)",
        }}
      />
    );
  }

  // Mobile-optimized positioning and sizing
  const canvasStyle = performanceConfig.mobile
    ? {
        // Position on mobile: smaller, offset to right side, less opacity
        position: "absolute" as const,
        top: "0",
        right: "0",
        width: "60%", // Reduced width on mobile
        height: "60%", // Reduced height on mobile
        opacity: resolvedTheme === "light" ? "0.2" : "0.3", // Lower opacity in light mode
        zIndex: "-10",
        pointerEvents: "none" as const,
      }
    : {
        // Desktop: full coverage
        position: "absolute" as const,
        inset: "0",
        width: "100%",
        height: "100%",
        zIndex: "-10",
      };

  return (
    <div className="absolute inset-0 -z-10 size-full">
      <div style={canvasStyle}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 65 }}
          gl={{
            antialias: !performanceConfig.lowEnd,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: resolvedTheme === "light" ? 0.8 : 1.1,
            // Reduce context creation overhead
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: true,
          }}
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
          }}
          dpr={pixelRatio}
          performance={{ min: 0.7, max: 1 }} // More aggressive performance management
        >
          <Scene />
          <Effects />
        </Canvas>
      </div>

      {/* Theme-aware mobile text readability overlay */}
      {performanceConfig.mobile && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              resolvedTheme === "light"
                ? "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 70%)"
                : "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
