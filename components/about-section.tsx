"use client";

import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { FadeInUp } from "@/components/motion-wrappers";

const timeline = [
  {
    period: "May 2025 - Present",
    title: "Full Stack Developer",
    company: "Goldfinger Monitors",
    location: "Charleston, SC",
    description:
      "Full-time role leading software development initiatives. Currently working on complete website redesign, expanding RMA portal for distributor network, and developing internal project management software.",
    current: true,
    milestone: {
      title: "Graduated Computer Science",
      subtitle: "Clemson University",
      description:
        "B.S. in Computer Science with focus on software engineering and web development.",
    },
  },
  {
    period: "Aug 2023 - May 2025",
    title: "Full Stack Developer",
    company: "Goldfinger Monitors",
    location: "Charleston, SC (Hybrid)",
    description:
      "Promoted to full stack developer, built customer-facing RMA portal with QR code scanning and deep analytics, developed internal parts database for manufacturing synchronization, and created interactive marketing assets and touchscreen games.",
    sideProject: {
      title: "Dare2Watch E-commerce Platform",
      year: "2024",
      description:
        "Built complete luxury watch e-commerce website with inventory management and Square payment integration.",
    },
    education: {
      title: "Computer Science Student",
      subtitle: "Clemson University",
      description:
        "Pursuing B.S. in Computer Science while maintaining full-time development role.",
    },
  },
  {
    period: "Jun 2022 - Aug 2023",
    title: "Software Engineer",
    company: "Goldfinger Monitors",
    location: "Charleston, SC (Hybrid)",
    description:
      "Started as software engineer with hybrid schedule. Built foundational systems for internal parts database, maintained legacy POS system, and created animated marketing assets for trade shows.",
    education: {
      title: "Computer Science Student",
      subtitle: "Clemson University",
      description:
        "Balancing computer science studies with professional software development experience.",
    },
  },
  {
    period: "2021",
    title: "IT Specialist Intern",
    company: "James Island Charter High School",
    location: "Charleston, SC",
    description:
      "Provided IT support, managed network infrastructure, and maintained school systems.",
  },
];

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: [
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "REST APIs",
    "Prisma",
    "Drizzle",
  ],
  "Cloud & Tools": ["AWS RDS", "AWS EC2", "Vercel", "Docker", "Git", "Figma"],
  Other: ["Unity", "C#", "Blender", "Python", "Java"],
};

export function AboutSection() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp className="mb-16">
          <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">
            About
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Background & Skills
          </h2>
        </FadeInUp>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column - Journey */}
          <FadeInUp className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-background">
                <Briefcase className="size-4" />
              </div>
              <h3 className="text-lg font-semibold">My Journey</h3>
            </div>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={`${item.period}-${item.company}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative pl-6"
                >
                  {/* Timeline line */}
                  {index < timeline.length - 1 && (
                    <div className="absolute left-[5px] top-3 h-full w-px bg-border" />
                  )}
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 size-3 rounded-full border-2 border-background ${
                      item.current ? "bg-foreground" : "bg-muted-foreground/40"
                    }`}
                  />

                  <div className="space-y-2 rounded-xl border border-border bg-card/50 p-4">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-sm tabular-nums text-muted-foreground">
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium">
                          Current
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground/60">
                        {item.location}
                      </span>
                    </div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.company}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground/80">
                      {item.description}
                    </p>

                    {/* Milestone (Graduation) */}
                    {item.milestone && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                        <GraduationCap className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">
                            {item.milestone.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.milestone.subtitle} —{" "}
                            {item.milestone.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Side Project */}
                    {item.sideProject && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3">
                        <Rocket className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {item.sideProject.title}
                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                              {item.sideProject.year}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.sideProject.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Concurrent Education */}
                    {item.education && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3">
                        <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {item.education.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.education.subtitle} —{" "}
                            {item.education.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInUp>

          {/* Right Column - Skills */}
          <FadeInUp className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-background">
                <span className="text-sm font-semibold">{`</>`}</span>
              </div>
              <h3 className="text-lg font-semibold">Skills & Technologies</h3>
            </div>

            <div className="space-y-5">
              {Object.entries(skills).map(
                ([category, items], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="space-y-3"
                  >
                    <h4 className="text-sm font-medium text-muted-foreground">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ),
              )}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl border border-border bg-card/50 p-6">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "10+", label: "Projects Shipped" },
                { value: "20+", label: "Technologies" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-semibold tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
