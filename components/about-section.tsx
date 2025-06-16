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
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Simplified background - remove animate-float for better performance */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[hsl(var(--portfolio-accent))] rounded-full mix-blend-multiply filter blur-xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - keep simple fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating digital experiences that make complex
            problems simple and enjoyable to solve.
          </p>
        </motion.div>

        {/* Stats Grid - Simplified animation, group together instead of individual items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="group">
              <Card className="glass text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-[hsl(var(--portfolio-primary))]" />
                  <div className="text-3xl font-bold gradient-text mb-1">
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline - Simplified to one motion wrapper */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[hsl(var(--portfolio-primary))]" />
              My Journey
            </h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-2 border-[hsl(var(--portfolio-primary))] last:border-l-0"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-[hsl(var(--portfolio-primary))] rounded-full" />
                  <Card className="glass p-4 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-2 mb-2">
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
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {item.location}
                        </span>
                      </div>
                      <h4 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[hsl(var(--portfolio-primary))] font-medium mb-2">
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
          </motion.div>

          {/* Skills - Simplified to one motion wrapper */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Palette className="w-6 h-6 text-[hsl(var(--portfolio-accent))]" />
              Skills & Technologies
            </h3>
            <div className="space-y-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <Card className="glass p-4">
                    <CardContent className="p-0">
                      <h4 className="font-semibold mb-3 text-[hsl(var(--portfolio-accent))]">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="hover:bg-[hsl(var(--portfolio-primary))] hover:text-white transition-colors"
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
