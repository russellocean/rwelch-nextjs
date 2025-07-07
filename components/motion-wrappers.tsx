"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
}

export function FadeInUp({ children, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInLeft({ children, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInRight({ children, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInGrid({ children, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LayoutCard({ children, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LayoutContent({
  children,
  className = "",
}: MotionWrapperProps) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        bounce: 0.1,
      }}
      className={className}
      style={{
        willChange: "height, transform",
      }}
    >
      {children}
    </motion.div>
  );
}
