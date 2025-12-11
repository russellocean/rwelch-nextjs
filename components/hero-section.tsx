"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";

// Lazy load the morphing geometry for better performance
const MorphingGeometry = lazy(() => import("./morphing-geometry"));

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/russellocean",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/russelldoescode",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:russellwelch17@gmail.com",
    icon: Mail,
  },
];

// Performance detection for 3D rendering
const shouldDisable3D = () => {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) return true;

  const webglContext = gl as WebGLRenderingContext;
  const renderer = webglContext.getParameter(webglContext.RENDERER) as string;

  if (
    renderer &&
    (renderer.includes("SwiftShader") ||
      renderer.includes("Microsoft") ||
      renderer.includes("Software"))
  ) {
    return true;
  }

  const memoryInfo = webglContext.getExtension("WEBGL_debug_renderer_info");
  if (memoryInfo) {
    const unmaskedRenderer = webglContext.getParameter(
      memoryInfo.UNMASKED_RENDERER_WEBGL
    ) as string;
    if (unmaskedRenderer && unmaskedRenderer.includes("Intel HD")) {
      return true;
    }
  }

  return false;
};

function SimpleFallback() {
  return (
    <div className="absolute inset-0 -z-10 size-full">
      <div
        className="size-full bg-background"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, hsl(var(--portfolio-primary) / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, hsl(var(--portfolio-accent) / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, hsl(var(--portfolio-primary) / 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [disable3D, setDisable3D] = useState(false);

  useEffect(() => {
    setMounted(true);
    const shouldDisable = shouldDisable3D();
    setDisable3D(shouldDisable);
  }, []);

  if (!mounted) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <SimpleFallback />
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center">
            <div className="mx-auto mb-6 h-16 w-64 animate-pulse rounded-lg bg-muted/20" />
            <div className="mx-auto mb-8 h-6 w-96 animate-pulse rounded bg-muted/20" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center"
    >
      {/* Morphing Geometry Background */}
      {disable3D ? (
        <SimpleFallback />
      ) : (
        <Suspense fallback={<SimpleFallback />}>
          <MorphingGeometry />
        </Suspense>
      )}

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Greeting & Name */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground"
              >
                Hey there, I&apos;m
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              >
                Russell Welch
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-muted-foreground sm:text-2xl"
              >
                Full-Stack Developer
              </motion.p>
            </div>

            {/* Bio - more concise */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-lg text-pretty leading-relaxed text-muted-foreground"
            >
              I build thoughtful digital products at the intersection of design
              and engineering. Currently shipping inventory platforms,
              manufacturing tools, and interactive experiences at Goldfinger
              Monitors.
            </motion.p>

            {/* CTA Buttons - refined pill style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
              >
                View My Work
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="/RussellWelchResume.pdf"
                download="RussellWelchResume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-6 py-3 text-sm font-medium transition-all hover:bg-muted/50"
              >
                <FileText className="size-4" />
                Resume
              </a>
            </motion.div>

            {/* Social Links - minimal inline style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-1"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <link.icon className="size-[18px]" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Empty space for 3D background balance */}
          <div className="hidden lg:block" />
        </div>

        {/* Scroll Indicator - more subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground/60"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
