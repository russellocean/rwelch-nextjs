"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Resume", href: "#resume" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`glass rounded-2xl px-6 py-3 transition-all duration-300 ${
            isScrolled ? "backdrop-blur-xl" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo - code-themed design */}
            <motion.div
              className="flex items-center space-x-3 transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--portfolio-primary))] to-[hsl(var(--portfolio-accent))] shadow-lg">
                  <div className="flex flex-col space-y-0.5">
                    <div className="flex space-x-0.5">
                      <div className="size-1 rounded-full bg-white/90"></div>
                      <div className="size-1 rounded-full bg-white/70"></div>
                    </div>
                    <div className="flex space-x-0.5">
                      <div className="size-1 rounded-full bg-white/70"></div>
                      <div className="size-1 rounded-full bg-white/90"></div>
                    </div>
                  </div>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[hsl(var(--portfolio-primary))] to-[hsl(var(--portfolio-accent))] opacity-20 blur-md"></div>
              </div>
              <div className="flex flex-col">
                <span className="gradient-text text-lg font-bold tracking-tight">
                  Russell Welch
                </span>
                <span className="font-mono text-xs text-muted-foreground/80">
                  russellwelch.dev
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation - enhanced with code-inspired styling */}
            <div className="hidden items-center space-x-1 md:flex">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="group relative rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover background */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[hsl(var(--portfolio-primary))]/10 to-[hsl(var(--portfolio-accent))]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  {/* Bottom accent line */}
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[hsl(var(--portfolio-primary))] to-[hsl(var(--portfolio-accent))] transition-all group-hover:w-3/4" />
                  {/* Code-inspired dots */}
                  <div className="absolute -left-1 top-1/2 flex -translate-y-1/2 flex-col space-y-0.5 opacity-0 transition-opacity group-hover:opacity-50">
                    <div className="size-0.5 rounded-full bg-[hsl(var(--portfolio-primary))]" />
                    <div className="size-0.5 rounded-full bg-[hsl(var(--portfolio-accent))]" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="size-4" />
                ) : (
                  <Menu className="size-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - keep AnimatePresence for functionality */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 md:hidden"
          >
            <div className="glass rounded-2xl p-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:translate-x-1 hover:text-foreground"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
