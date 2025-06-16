"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import RayMarchMaterial from "../materials/RayMarchMaterial";

// Extend R3F with our custom material
extend({ RayMarchMaterial });

// Ray-marched quad component
function RayMarchQuad() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, gl, size } = useThree();
  const [envMap, setEnvMap] = useState<THREE.CubeTexture | null>(null);
  const [targetMousePosition, setTargetMousePosition] = useState(
    new THREE.Vector2(0.5, 0.5)
  );
  const [smoothMousePosition, setSmoothMousePosition] = useState(
    new THREE.Vector2(0.5, 0.5)
  );

  // Load HDRI environment map
  useEffect(() => {
    const loader = new RGBELoader();
    loader.load("/textures/studio_small_09_1k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512);
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
    });
  }, [gl]);

  // Optimized mouse tracking with throttling
  useEffect(() => {
    let mouseTimeout: NodeJS.Timeout | undefined;

    const handleMouseMove = (event: MouseEvent) => {
      // Throttle mouse updates for better performance
      if (mouseTimeout) return;

      mouseTimeout = setTimeout(() => {
        setTargetMousePosition(
          new THREE.Vector2(
            event.clientX / window.innerWidth,
            event.clientY / window.innerHeight
          )
        );
        mouseTimeout = undefined;
      }, 16); // ~60fps throttling
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout) clearTimeout(mouseTimeout);
    };
  }, []);

  // Animation loop with smooth mouse interpolation
  useFrame((state) => {
    // Smooth mouse interpolation
    smoothMousePosition.lerp(targetMousePosition, 0.1);
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
      };

      material.uTime = state.clock.elapsedTime;
      material.uResolution.set(size.width, size.height);
      material.uMouse.copy(smoothMousePosition);
      material.uCameraPosition.copy(camera.position);
      material.uViewMatrix.copy(camera.matrixWorldInverse);
      material.uProjectionMatrix.copy(camera.projectionMatrix);

      if (envMap) {
        material.uEnvMap = envMap;
      }
    }
  });

  const material = new RayMarchMaterial();

  return (
    <mesh position={[0, 0, 0]} scale={[6, 6, 1]}>
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
        emissive="#7B5CFF"
        emissiveIntensity={0.03}
      />
    </mesh>
  );
}

// Main scene with post-processing
function Scene() {
  return (
    <>
      {/* Simple ambient lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#7B5CFF" />

      <Suspense fallback={<LoadingFallback />}>
        <RayMarchQuad />
      </Suspense>
    </>
  );
}

// Optimized post-processing effects
function Effects() {
  const [lowQuality, setLowQuality] = useState(false);

  useEffect(() => {
    // Detect if we should use lower quality effects
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setLowQuality(isMobile);
  }, []);

  if (lowQuality) {
    // Minimal effects for mobile/low-end devices
    return (
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.6}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.8}
        blendFunction={BlendFunction.ADD}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.001, 0.001)}
      />
    </EffectComposer>
  );
}

export default function Hero3D() {
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    // Performance-based pixel ratio
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isLowEnd =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    if (isMobile || isLowEnd) {
      setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } else {
      setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 65 }}
        gl={{
          antialias: false, // Disable expensive antialiasing
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ background: "transparent" }}
        dpr={pixelRatio}
        performance={{ min: 0.8 }} // Auto-adjust quality if FPS drops
      >
        <Scene />
        <Effects />
      </Canvas>
    </div>
  );
}
