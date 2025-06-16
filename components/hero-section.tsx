"use client";

import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero3D from "@/components/hero-3d";
import { Suspense } from "react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/russelldoescode",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/russellwelch",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:russellwelch17@gmail.com",
    icon: Mail,
  },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pb-20"
    >
      {/* 3D Background - Full Screen */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--portfolio-primary))] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--portfolio-accent))] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2"
            >
              <p className="text-lg text-muted-foreground">
                Hey there, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="gradient-text">Russell Welch</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl sm:text-2xl text-muted-foreground font-medium"
            >
              Building playful interfaces that power serious results.
            </motion.p>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                I&apos;m a full-stack developer who believes software can be
                both powerful and fun. At Clemson University I&apos;ve sharpened
                my CS foundations while leading real-world projects at
                Goldfinger Monitors—shipping inventory platforms, manufacturing
                dashboards, and interactive trade-show games that run on our
                touchscreen displays.
              </p>
              <p>
                Whether crafting a luxury e-commerce experience for Dare2Watch
                or streamlining internal logistics, I thrive at the intersection
                of design and engineering—turning complex workflows into
                delightful, efficient tools.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="glass-primary" size="lg">
                View My Work
              </Button>
              <Button variant="glass-outline" size="lg">
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass p-3 rounded-full hover:bg-[hsl(var(--portfolio-primary))] hover:text-white transition-colors group"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Empty space for layout balance */}
          <div className="hidden lg:block" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
