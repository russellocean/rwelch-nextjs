"use client";

import { motion } from "motion/react";
import { Calendar, MapPin, Award, Code, Database, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const timeline = [
  {
    year: "2025",
    title: "Computer Science Graduate",
    company: "Clemson University",
    location: "Clemson, SC",
    description:
      "Bachelor of Science in Computer Science with focus on software engineering and web development.",
    type: "education",
  },
  {
    year: "2022-Present",
    title: "Lead Software Engineer",
    company: "Goldfinger Monitors",
    location: "Charleston, SC",
    description:
      "Leading full-stack development of internal tools, customer platforms, and interactive marketing experiences.",
    type: "work",
  },
  {
    year: "2024",
    title: "Dare2Watch Developer",
    company: "Freelance Project",
    location: "Remote",
    description:
      "Built luxury e-commerce platform for watch retailer with inventory management and customer portal.",
    type: "project",
  },
  {
    year: "2021",
    title: "IT Specialist Intern",
    company: "James Island Charter High School",
    location: "Charleston, SC",
    description:
      "Provided IT support, managed network infrastructure, and maintained school systems.",
    type: "work",
  },
];

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion/Framer"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Supabase", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Vercel", "Figma", "Unity", "C#"],
  },
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C#", "SQL"],
  },
];

const stats = [
  { label: "Years Experience", value: "3+", icon: Calendar },
  { label: "Projects Completed", value: "25+", icon: Code },
  { label: "Technologies Used", value: "20+", icon: Database },
  { label: "Happy Clients", value: "10+", icon: Award },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20">
      {/* Simplified background - remove animate-float for better performance */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/3 size-72 rounded-full bg-[hsl(var(--portfolio-accent))] opacity-10 mix-blend-multiply blur-xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - keep simple fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="gradient-text mb-4 text-4xl font-bold sm:text-5xl">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Passionate about creating digital experiences that make complex
            problems simple and enjoyable to solve.
          </p>
        </motion.div>

        {/* Stats Grid - Simplified animation, group together instead of individual items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="group">
              <Card className="glass p-6 text-center transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <stat.icon className="mx-auto mb-3 size-8 text-[hsl(var(--portfolio-primary))]" />
                  <div className="gradient-text mb-1 text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Timeline - Simplified to one motion wrapper */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold">
              <Calendar className="size-6 text-[hsl(var(--portfolio-primary))]" />
              My Journey
            </h3>
            <div className="relative">
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-8">
                    {/* Timeline line segment - only show if not the last item */}
                    {index < timeline.length - 1 && (
                      <div className="absolute left-[7px] top-8 h-[calc(100%+1.5rem)] w-0.5 bg-[hsl(var(--portfolio-primary))]" />
                    )}
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-4 size-4 rounded-full border-2 border-background bg-[hsl(var(--portfolio-primary))]" />
                    <Card className="glass p-4 transition-shadow hover:shadow-md">
                      <CardContent className="p-0">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge
                            variant={
                              item.type === "work"
                                ? "default"
                                : item.type === "education"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {item.year}
                          </Badge>
                          <MapPin className="size-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {item.location}
                          </span>
                        </div>
                        <h4 className="mb-1 text-lg font-semibold">
                          {item.title}
                        </h4>
                        <p className="mb-2 font-medium text-[hsl(var(--portfolio-primary))]">
                          {item.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills - Simplified to one motion wrapper */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold">
              <Palette className="size-6 text-[hsl(var(--portfolio-accent))]" />
              Skills & Technologies
            </h3>
            <div className="space-y-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <Card className="glass p-4">
                    <CardContent className="p-0">
                      <h4 className="mb-3 font-semibold text-[hsl(var(--portfolio-accent))]">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="transition-colors hover:bg-[hsl(var(--portfolio-primary))] hover:text-white"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
