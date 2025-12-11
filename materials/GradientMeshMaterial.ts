import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

/**
 * Vercel-inspired gradient mesh shader
 * Features:
 * - Flowing gradient blobs with smooth organic movement
 * - Simplex noise for natural-looking distortion
 * - High performance (no ray-marching)
 * - Theme-aware color palette
 * - Subtle mouse interactivity
 */

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackground;
uniform float uIntensity;
uniform float uNoiseScale;
uniform float uSpeed;

varying vec2 vUv;
varying vec3 vPosition;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractal Brownian Motion for layered noise
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for(int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value;
}

// Smooth blob shape function
float blob(vec2 uv, vec2 center, float radius, float softness) {
  float dist = length(uv - center);
  return smoothstep(radius + softness, radius - softness, dist);
}

void main() {
  vec2 uv = vUv;
  float t = uTime * uSpeed;

  // Mouse influence (subtle)
  vec2 mouse = uMouse * 2.0 - 1.0;
  vec2 mouseOffset = mouse * 0.05;

  // Create flowing, organic UV distortion
  vec2 distortedUv = uv;
  distortedUv.x += snoise(vec2(uv.y * 2.0 + t * 0.3, t * 0.2)) * 0.08;
  distortedUv.y += snoise(vec2(uv.x * 2.0 + t * 0.2, t * 0.3)) * 0.08;

  // Define blob centers - shifted to right side to keep text area clear
  vec2 center1 = vec2(
    0.65 + sin(t * 0.4) * 0.12 + mouseOffset.x,
    0.4 + cos(t * 0.3) * 0.2 + mouseOffset.y
  );

  vec2 center2 = vec2(
    0.85 + cos(t * 0.35) * 0.1 - mouseOffset.x * 0.5,
    0.6 + sin(t * 0.45) * 0.15 - mouseOffset.y * 0.5
  );

  vec2 center3 = vec2(
    0.7 + sin(t * 0.5 + 1.5) * 0.15,
    0.3 + cos(t * 0.4 + 2.0) * 0.2
  );

  vec2 center4 = vec2(
    0.55 + cos(t * 0.3 + 3.0) * 0.1,
    0.75 + sin(t * 0.35 + 1.0) * 0.12
  );

  // Create soft gradient blobs with noise-based edge variation
  float noiseScale = uNoiseScale;

  float blob1 = blob(
    distortedUv,
    center1,
    0.35 + fbm(distortedUv * noiseScale + t * 0.1) * 0.1,
    0.25
  );

  float blob2 = blob(
    distortedUv,
    center2,
    0.4 + fbm(distortedUv * noiseScale + t * 0.15 + 5.0) * 0.12,
    0.3
  );

  float blob3 = blob(
    distortedUv,
    center3,
    0.3 + fbm(distortedUv * noiseScale + t * 0.12 + 10.0) * 0.08,
    0.2
  );

  float blob4 = blob(
    distortedUv,
    center4,
    0.25 + fbm(distortedUv * noiseScale + t * 0.1 + 15.0) * 0.06,
    0.15
  );

  // Layer the blobs with different colors
  // Use smooth blending for that liquid gradient look
  float blend1 = blob1 * (0.7 + 0.3 * sin(t * 0.5));
  float blend2 = blob2 * (0.6 + 0.4 * cos(t * 0.4));
  float blend3 = blob3 * (0.8 + 0.2 * sin(t * 0.6 + 1.0));
  float blend4 = blob4 * (0.5 + 0.5 * cos(t * 0.35 + 2.0));

  // Calculate total blob presence for alpha
  float totalBlend = blend1 + blend2 + blend3 + blend4;

  // Pure color mixing between blob colors only (no background mixing)
  // Weight each color by its blob's contribution
  vec3 color = vec3(0.0);
  float colorWeight = 0.0;

  color += uColor1 * blend1;
  colorWeight += blend1;

  color += uColor2 * blend2;
  colorWeight += blend2;

  color += uColor3 * blend3;
  colorWeight += blend3;

  color += mix(uColor1, uColor2, 0.5) * blend4;
  colorWeight += blend4;

  // Normalize the color by total weight (avoid division by zero)
  color = colorWeight > 0.001 ? color / colorWeight : uColor1;

  // Add very subtle noise texture for that premium feel
  float grain = snoise(uv * 500.0 + t) * 0.01;
  color += grain;

  // Calculate alpha based on blob presence
  float alpha = max(max(max(blend1, blend2), blend3), blend4);
  alpha = smoothstep(0.0, 0.25, alpha) * uIntensity;

  // Fade out at the bottom for smooth transition to content below
  float bottomFade = smoothstep(0.0, 0.35, uv.y);
  alpha *= bottomFade;

  // Fade at the top for a floating effect
  float topFade = smoothstep(1.0, 0.9, uv.y);
  alpha *= topFade;

  // Fade on the left side to keep text area clear
  float leftFade = smoothstep(0.0, 0.5, uv.x);
  alpha *= leftFade;

  // Tone mapping for consistent color
  color = color / (color + vec3(1.0));
  color = pow(color, vec3(1.0 / 2.2));

  gl_FragColor = vec4(color, alpha);
}
`;

const GradientMeshMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uColor1: new THREE.Color("#3B82F6"),
    uColor2: new THREE.Color("#0891B2"),
    uColor3: new THREE.Color("#0EA5E9"),
    uBackground: new THREE.Color("#000000"),
    uIntensity: 1.0,
    uNoiseScale: 3.0,
    uSpeed: 0.3,
  },
  vertexShader,
  fragmentShader
);

export default GradientMeshMaterial;
