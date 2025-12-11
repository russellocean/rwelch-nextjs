"use client";

import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { FadeInUp } from "@/components/motion-wrappers";

const projects = [
  {
    id: 1,
    title: "Personal Portfolio",
    description:
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
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp className="mb-16">
          <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">
            Work
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A showcase of my work spanning e-commerce platforms, internal tools,
            and interactive experiences.
          </p>
        </FadeInUp>

        {/* Project Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-muted-foreground/20 hover:shadow-lg"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={project.id <= 2}
                />
                {/* Overlay with links */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {project.links.live !== "#" && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105"
                    >
                      <ExternalLink className="size-4" />
                      View Live
                    </a>
                  )}
                  {project.links.github !== "#" && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-transform hover:scale-105"
                    >
                      <Github className="size-4" />
                      Code
                    </a>
                  )}
                </div>
                {/* Status badge */}
                <span className="absolute right-3 top-3 rounded-full bg-foreground/90 px-2.5 py-1 text-xs font-medium text-background">
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.category} · {project.year}
                    </p>
                  </div>
                  {project.links.live !== "#" && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-sm font-semibold">{value}</p>
                      <p className="text-xs capitalize text-muted-foreground">
                        {key}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <FadeInUp className="mt-16 text-center">
          <p className="mb-4 text-muted-foreground">
            Interested in working together?
          </p>
          <a
            href="#resume"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get In Touch
            <ArrowUpRight className="size-4" />
          </a>
        </FadeInUp>
      </div>
    </section>
  );
}
