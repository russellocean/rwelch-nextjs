"use client";

import { ExternalLink, Github, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeInUp, FadeInGrid } from "@/components/motion-wrappers";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Personal Portfolio",
    description:
      "Modern portfolio website built with Next.js 15, React 19, featuring 3D elements and glass morphism design.",
    longDescription:
      "This very portfolio you're viewing! Built with Next.js 15, React 19, and modern web technologies. Features 3D elements, smooth animations, and a glass morphism design language.",
    image: "/projects/personal-portfolio.webp",
    tech: ["Next.js", "React", "Three.js", "Motion", "Tailwind CSS"],
    category: "Portfolio",
    year: "2025",
    status: "Live",
    links: {
      live: "https://russellwelch.dev",
      github: "https://github.com/russellocean/rwelch-nextjs",
    },
    stats: {
      performance: "98/100",
      accessibility: "100/100",
      seo: "Modern",
    },
  },
  {
    id: 2,
    title: "Goldfinger Monitors Website",
    description:
      "Complete website redesign for touchscreen monitor manufacturer with modern responsive design and improved UX.",
    longDescription:
      "Led the complete redesign and development of the Goldfinger Monitors website, creating a modern, responsive platform that better showcases their touchscreen monitor products and attracts potential customers across multiple industries.",
    image: "/projects/goldfinger-monitors.webp",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Modern Design"],
    category: "Corporate Website",
    year: "2024-2025",
    status: "Live",
    links: {
      live: "https://goldfingermonitors.com",
      github: "#",
    },
    stats: {
      redesign: "Complete",
      responsive: "Mobile-First",
      performance: "Optimized",
    },
  },
  {
    id: 3,
    title: "RMA Portal System",
    description:
      "Full-stack customer portal with QR scanning, real-time analytics, and multi-location coordination for repair workflows.",
    longDescription:
      "Built a comprehensive RMA system that allows customers to initiate returns, track repair status, and communicate with support. Features real-time data analytics for actionable product insights, coordinating 9 technicians across 3 locations with QR code scanning capabilities.",
    image: "/projects/rma-portal.webp",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Analytics"],
    category: "Customer Portal",
    year: "2023-2025",
    status: "Live",
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      repairs: "700+",
      customers: "85",
      locations: "3",
    },
  },
  {
    id: 4,
    title: "Dare2Watch E-commerce",
    description:
      "Luxury watch e-commerce platform with inventory management and Square payment integration for premium watch retailer.",
    longDescription:
      "Built a comprehensive e-commerce solution for a luxury watch retailer featuring real-time inventory tracking, customer account management, and integrated Square payment processing. The platform includes an admin dashboard for inventory management and customer service tools.",
    image: "/projects/dare2watch.webp",
    tech: ["Next.js", "TypeScript", "Supabase", "Square", "Tailwind CSS"],
    category: "E-commerce",
    year: "2024",
    status: "Live",
    links: {
      live: "https://dare2watch.co",
      github: "#",
    },
    stats: {
      visitors: "20K+",
      sales: "65 watches",
      conversion: "Premium",
    },
  },
  {
    id: 5,
    title: "Interactive Trade Show Games",
    description:
      "Unity-based interactive games for touchscreen displays at trade shows, showcasing product capabilities through engaging gameplay.",
    longDescription:
      "Created three engaging interactive experiences for trade shows using Unity and C#: a roulette wheel game, a catch-them-all collection game with cart mechanics, and a fake slot machine demo. These games demonstrate the capabilities of Goldfinger's touchscreen monitors while entertaining visitors.",
    image: "/projects/trade-show-games.webp",
    tech: ["Unity", "C#", "TouchScript", "Game Design"],
    category: "Interactive Media",
    year: "2023",
    status: "Deployed",
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      games: "3",
      unity: "C#",
      touchscreen: "Optimized",
    },
  },
  {
    id: 6,
    title: "Goldfinger MANAGE",
    description:
      "Internal parts database system for touchscreen monitor manufacturing with vendor price tracking and international facility coordination.",
    longDescription:
      "Developed a comprehensive parts management system for Goldfinger Monitors, featuring over 1700+ unique part numbers with vendor price tracking. The system coordinates between engineering facilities in the US and manufacturing in Vietnam across multiple departments.",
    image: "/projects/goldfinger-manage.webp",
    tech: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "TypeScript",
      "Electron",
    ],
    category: "Internal Tool",
    year: "2022-2023",
    status: "Production",
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      parts: "1700+",
      countries: "US & Vietnam",
      active: "Production",
    },
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden">
      {/* Simplified background - remove animate-float for better performance */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 size-96 rounded-full bg-[hsl(var(--portfolio-primary))] opacity-10 mix-blend-multiply blur-xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - keep simple fade in */}
        <FadeInUp className="mb-16 text-center">
          <h2 className="gradient-text mb-4 text-4xl font-bold sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A showcase of my work spanning e-commerce platforms, internal tools,
            and interactive experiences.
          </p>
          <p className="sr-only">
            Use Tab to navigate through project cards. Press Enter or Space to
            expand a card and view full details.
          </p>
        </FadeInUp>

        {/* Dynamic Bento Grid - Cards expand smoothly to fit content */}
        <FadeInGrid className="mb-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-lg transition-all duration-700 ease-out focus-within:z-10 focus-within:scale-[1.02] hover:z-10 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--portfolio-primary))] focus:ring-offset-2"
                tabIndex={0}
                role="button"
                aria-expanded="false"
                aria-label={`View details for ${project.title}. Press Enter or Space to expand.`}
                aria-describedby={`project-${project.id}-description`}
                onFocus={(e) =>
                  e.currentTarget.setAttribute("aria-expanded", "true")
                }
                onBlur={(e) =>
                  e.currentTarget.setAttribute("aria-expanded", "false")
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.currentTarget.focus();
                  }
                }}
              >
                <Card className="garden-card transform-gpu overflow-hidden transition-all duration-700 ease-out focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-[hsl(var(--portfolio-primary))] focus-within:ring-offset-2 hover:shadow-2xl">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      width={600}
                      height={400}
                      className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={project.id <= 3}
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                      {project.links.live !== "#" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          asChild
                          className="border-0 bg-white/90 text-black hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--portfolio-primary))] focus:ring-offset-2"
                        >
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View live ${project.title} project`}
                          >
                            <ExternalLink className="mr-2 size-4" />
                            View
                          </a>
                        </Button>
                      )}
                      {project.links.github !== "#" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          asChild
                          className="border-0 bg-white/90 text-black hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--portfolio-primary))] focus:ring-offset-2"
                        >
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} source code on GitHub`}
                          >
                            <Github className="mr-2 size-4" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                    <Badge className="absolute right-3 top-3 border-0 bg-[hsl(var(--portfolio-accent))] text-white">
                      {project.status}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline">{project.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        {project.year}
                      </div>
                    </div>
                    <h3 className="group-hover:gradient-text text-xl font-bold transition-all">
                      {project.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Description with smooth height animation and fade effect */}
                      <div className="relative max-h-16 overflow-hidden transition-all duration-700 ease-out group-focus-within:max-h-96 group-hover:max-h-96">
                        <p
                          id={`project-${project.id}-description`}
                          className="leading-relaxed text-muted-foreground"
                        >
                          {project.longDescription}
                        </p>
                        {/* Fade overlay for seamless text cutoff */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent opacity-100 transition-opacity duration-700 ease-out group-focus-within:opacity-0 group-hover:opacity-0"></div>
                      </div>

                      {/* Tech Stack - smooth reveal */}
                      <div className="max-h-12 overflow-hidden transition-all duration-700 ease-out group-focus-within:max-h-40 group-hover:max-h-40">
                        <div
                          className="flex flex-wrap gap-1"
                          role="list"
                          aria-label="Technologies used"
                        >
                          {project.tech.map((tech, index) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs opacity-70 transition-all duration-700 ease-out hover:bg-[hsl(var(--portfolio-primary))] hover:text-white focus:bg-[hsl(var(--portfolio-primary))] focus:text-white group-focus-within:opacity-100 group-hover:opacity-100"
                              tabIndex={-1}
                              role="listitem"
                              style={{
                                transitionDelay: `${index * 50}ms`,
                              }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats - smooth reveal */}
                      <div className="mt-2 max-h-0 overflow-hidden transition-all duration-700 ease-out group-focus-within:max-h-24 group-hover:max-h-24">
                        <div
                          className="grid grid-cols-3 gap-2 pt-2 text-center text-xs"
                          aria-label="Project statistics"
                        >
                          {Object.entries(project.stats).map(
                            ([key, value], index) => (
                              <div
                                key={key}
                                className="rounded bg-muted/30 p-2 opacity-0 transition-all duration-700 ease-out group-focus-within:opacity-100 group-hover:opacity-100"
                                style={{
                                  transitionDelay: `${index * 100 + 200}ms`,
                                }}
                                aria-label={`${key}: ${value}`}
                              >
                                <div className="font-semibold text-[hsl(var(--portfolio-primary))]">
                                  {value}
                                </div>
                                <div className="capitalize text-muted-foreground">
                                  {key}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </FadeInGrid>

        {/* CTA Section - simplified animation */}
        <FadeInUp className="mt-16 text-center">
          <p className="mb-6 text-muted-foreground">
            Interested in working together or have questions about my projects?
          </p>
          <Button variant="gradient" size="lg" asChild>
            <a href="#resume">Contact Me</a>
          </Button>
        </FadeInUp>
      </div>
    </section>
  );
}
