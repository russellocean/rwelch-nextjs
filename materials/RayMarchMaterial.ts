import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  // Pass world position for ray direction calculation
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vNormal = normalMatrix * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uCameraPosition;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform samplerCube uEnvMap;
uniform vec3 uThemeColor1;
uniform vec3 uThemeColor2;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

#define MAX_STEPS 50
#define MAX_DIST 50.0
#define SURF_DIST 0.02

// Smooth minimum function for blending SDFs
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// SDF for sphere
float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

// SDF for torus
float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

// SDF for box
float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// SDF for capsule
float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

// Improved noise function
float noise(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
}

// Smooth noise
float smoothNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float a = noise(i);
  float b = noise(i + vec3(1.0, 0.0, 0.0));
  float c = noise(i + vec3(0.0, 1.0, 0.0));
  float d = noise(i + vec3(1.0, 1.0, 0.0));
  
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal noise
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  
  for(int i = 0; i < 3; i++) {
    value += amplitude * smoothNoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

// Twist operation
vec3 twist(vec3 p, float k) {
  float c = cos(k * p.y);
  float s = sin(k * p.y);
  mat2 m = mat2(c, -s, s, c);
  return vec3(m * p.xz, p.y);
}

// Bend operation
vec3 bend(vec3 p, float k) {
  float c = cos(k * p.x);
  float s = sin(k * p.x);
  mat2 m = mat2(c, -s, s, c);
  return vec3(p.x, m * p.yz);
}

// Metaball influence function with better falloff
float metaball(vec3 p, vec3 center, float radius) {
  float dist = length(p - center);
  return radius / (dist + 0.1);
}

// Main scene - Flowing metaballs inspired by Vercel's style
float map(vec3 p) {
  float t = uTime * 0.6;
  
  // Mouse influence
  vec2 mouse = (uMouse - 0.5) * 2.0;
  vec3 mouseInfluence = vec3(mouse.x * 1.5, -mouse.y * 1.0, mouse.x * 0.3);
  
  // Create flowing metaballs with more spread and varied timing
  vec3 center1 = vec3(
    0.2 + sin(t * 0.7) * 0.6 + mouseInfluence.x * 0.3,
    1.0 + cos(t * 0.5) * 0.8 + mouseInfluence.y * 0.3,
    sin(t * 0.3) * 0.5 + mouseInfluence.z * 0.2
  );
  
  vec3 center2 = vec3(
    1.2 + cos(t * 1.3) * 0.5 + mouseInfluence.x * 0.2,
    -0.5 + sin(t * 0.9) * 0.7 + mouseInfluence.y * 0.4,
    cos(t * 0.8) * 0.6 + mouseInfluence.z * 0.2
  );
  
  vec3 center3 = vec3(
    -0.3 + sin(t * 1.8) * 0.7 + mouseInfluence.x * 0.4,
    -0.8 + cos(t * 1.4) * 0.6 + mouseInfluence.y * 0.3,
    sin(t * 1.1) * 0.8 + mouseInfluence.z * 0.3
  );
  
  vec3 center4 = vec3(
    0.8 + cos(t * 0.4) * 0.8 + mouseInfluence.x * 0.3,
    0.3 + sin(t * 2.1) * 0.9 + mouseInfluence.y * 0.5,
    cos(t * 1.5) * 0.4 + mouseInfluence.z * 0.4
  );
  
  vec3 center5 = vec3(
    -0.8 + sin(t * 2.4) * 0.4 + mouseInfluence.x * 0.4,
    0.8 + cos(t * 1.7) * 1.1 + mouseInfluence.y * 0.2,
    sin(t * 0.6) * 0.9 + mouseInfluence.z * 0.3
  );
  
  // Calculate metaball influences with varied sizes for dynamic merging/splitting
  float influence = 0.0;
  influence += metaball(p, center1, 0.8 + sin(t * 1.5) * 0.2);
  influence += metaball(p, center2, 0.6 + cos(t * 1.8) * 0.15);
  influence += metaball(p, center3, 0.7 + sin(t * 2.1) * 0.18);
  influence += metaball(p, center4, 0.9 + cos(t * 1.2) * 0.25);
  influence += metaball(p, center5, 0.5 + sin(t * 2.5) * 0.12);
  
  // Convert metaball influence to distance field with balanced threshold
  float metaballField = 1.5 / influence - 0.6;
  
  // Just use the metaballs - no ribbon
  float result = metaballField;
  
  return result;
}

// Calculate normal using gradient
vec3 calcNormal(vec3 p) {
  const float eps = 0.001;
  vec2 h = vec2(eps, 0.0);
  return normalize(vec3(
    map(p + h.xyy) - map(p - h.xyy),
    map(p + h.yxy) - map(p - h.yxy),
    map(p + h.yyx) - map(p - h.yyx)
  ));
}

// Ray marching function
float rayMarch(vec3 ro, vec3 rd) {
  float dO = 0.0;
  
  for(int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * dO;
    float dS = map(p);
    dO += dS;
    
    if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
  }
  
  return dO;
}

// Fresnel calculation
float fresnel(vec3 I, vec3 N, float ior) {
  float cosi = clamp(-1.0, 1.0, dot(I, N));
  float etai = 1.0, etat = ior;
  if(cosi > 0.0) {
    float temp = etai;
    etai = etat;
    etat = temp;
  }
  float sint = etai / etat * sqrt(max(0.0, 1.0 - cosi * cosi));
  if(sint >= 1.0) {
    return 1.0;
  }
  float cost = sqrt(max(0.0, 1.0 - sint * sint));
  cosi = abs(cosi);
  float Rs = ((etat * cosi) - (etai * cost)) / ((etat * cosi) + (etai * cost));
  float Rp = ((etai * cosi) - (etat * cost)) / ((etai * cosi) + (etat * cost));
  return (Rs * Rs + Rp * Rp) / 2.0;
}

void main() {
  // Proper UV mapping from 0-1 to -1 to 1
  vec2 uv = (vUv - 0.5) * 2.0;
  
  // Shift the view to the right
  uv.x -= 0.25;
  
  // Correct aspect ratio - this ensures no distortion
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;
  
  // Camera setup with proper ray direction
  vec3 ro = uCameraPosition;
  
  // Create proper ray direction for ray marching
  // Use a focal length that matches the camera's field of view
  float focalLength = 1.0;
  vec3 rd = normalize(vec3(uv.x, uv.y, -focalLength));
  
  // Ray march
  float d = rayMarch(ro, rd);
  
  vec3 color = vec3(0.0);
  
  if(d < MAX_DIST) {
    vec3 p = ro + rd * d;
    vec3 n = calcNormal(p);
    
    // Lighting
    vec3 lightPos = vec3(2.0, 2.0, 2.0);
    vec3 lightDir = normalize(lightPos - p);
    float diff = max(dot(n, lightDir), 0.0);
    
    // Fresnel effect
    float F = fresnel(rd, n, 1.5);
    
    // Reflection
    vec3 reflectDir = reflect(rd, n);
    vec3 reflectColor = textureCube(uEnvMap, reflectDir).rgb;
    
    // Simple refraction
    vec3 refractDir = refract(rd, n, 1.0 / 1.5);
    vec3 refractColor = textureCube(uEnvMap, refractDir).rgb;
    
    // Mix reflection and refraction
    vec3 glassColor = mix(refractColor, reflectColor, F);
    
    // Metaball-style coloring with flowing gradients
    vec3 flowColor = vec3(
      0.3 + 0.7 * sin(p.x * 0.5 + uTime * 0.8),
      0.4 + 0.6 * cos(p.y * 0.7 + uTime * 0.6),
      0.6 + 0.4 * sin(p.z * 0.3 + uTime * 1.2)
    );
    
    // Blend with glass color
    glassColor = mix(glassColor, flowColor, 0.3);
    
    // Simple rim lighting
    float rim = 1.0 - max(dot(-rd, n), 0.0);
    rim = pow(rim, 2.0);
    glassColor += rim * vec3(0.8, 0.9, 1.0) * 0.4;
    
    // Distance-based glow
    float glow = exp(-d * 0.2) * 0.5;
    glassColor += glow * vec3(0.6, 0.8, 1.0);
    
    color = glassColor * uIntensity;
    
    // Tone mapping
    color = color / (color + vec3(1.0));
    color = pow(color, vec3(1.0 / 2.2));
    
    gl_FragColor = vec4(color, 1.0);
  } else {
    // Fully transparent background
    discard;
  }
}
`;

const RayMarchMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uCameraPosition: new THREE.Vector3(0, 0, 5),
    uViewMatrix: new THREE.Matrix4(),
    uProjectionMatrix: new THREE.Matrix4(),
    uEnvMap: null,
    uThemeColor1: new THREE.Color("#7B5CFF"),
    uThemeColor2: new THREE.Color("#FF5EDB"),
    uIntensity: 1.0,
  },
  vertexShader,
  fragmentShader
);

export default RayMarchMaterial;
