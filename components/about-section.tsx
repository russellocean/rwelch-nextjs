import { Calendar, MapPin, Award, Code, Database, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
} from "@/components/motion-wrappers";

const timeline = [
  {
    year: "May 2025-Present",
    title: "Full Stack Developer",
    company: "Goldfinger Monitors",
    location: "Charleston, SC",
    description:
      "Full-time role leading software development initiatives. Currently working on complete website redesign, expanding RMA portal for distributor network, and developing internal project management software.",
    type: "work",
    milestone: {
      title: "Graduated Computer Science",
      company: "Clemson University",
      description:
        "Bachelor of Science in Computer Science with focus on software engineering and web development.",
    },
  },
  {
    year: "Aug 2023-May 2025",
    title: "Full Stack Developer",
    company: "Goldfinger Monitors",
    location: "Charleston, SC (Hybrid)",
    description:
      "Promoted to full stack developer, built customer-facing RMA portal with QR code scanning and deep analytics, developed internal parts database for manufacturing synchronization, and created interactive marketing assets and touchscreen games.",
    type: "work",
    sideProject: {
      title: "Dare2Watch E-commerce Platform",
      year: "2024",
      description:
        "Built complete luxury watch e-commerce website with inventory management and Square payment integration as a side project.",
    },
    education: {
      title: "Computer Science Student",
      company: "Clemson University",
      description:
        "Pursuing Bachelor of Science in Computer Science while maintaining full-time development role.",
    },
  },
  {
    year: "Jun 2022-Aug 2023",
    title: "Software Engineer",
    company: "Goldfinger Monitors",
    location: "Charleston, SC (Hybrid)",
    description:
      "Started as software engineer with hybrid schedule. Built foundational systems for internal parts database, maintained legacy POS system, and created animated marketing assets for trade shows.",
    type: "work",
    education: {
      title: "Computer Science Student",
      company: "Clemson University",
      description:
        "Balancing computer science studies with professional software development experience.",
    },
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
    items: [
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
      "Prisma ORM",
      "Drizzle ORM",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS RDS", "AWS EC2", "Vercel", "Docker"],
  },
  {
    category: "Tools & Design",
    items: ["Git", "Figma", "Blender", "Unity", "C#"],
  },
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C#", "SQL"],
  },
];

const stats = [
  { label: "Years Experience", value: "3+", icon: Calendar },
  { label: "Projects Completed", value: "10+", icon: Code },
  { label: "Technologies Used", value: "20+", icon: Database },
  { label: "Happy Clients", value: "5+", icon: Award },
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
        <FadeInUp className="mb-16 text-center">
          <h2 className="gradient-text mb-4 text-4xl font-bold sm:text-5xl">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Passionate about creating digital experiences that make complex
            problems simple and enjoyable to solve.
          </p>
        </FadeInUp>

        {/* Stats Grid - Simplified animation, group together instead of individual items */}
        <FadeInUp className="mb-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <Card className="garden-card p-6 text-center">
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
          </div>
        </FadeInUp>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Timeline - Simplified to one motion wrapper */}
          <FadeInLeft>
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
                    <Card className="garden-card p-4">
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
                        {/* Milestone information (graduation) */}
                        {item.milestone && (
                          <div className="mt-3 border-l-2 border-green-500 pl-3">
                            <div className="mb-1 flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="border-green-500 bg-green-500/10 text-xs"
                              >
                                🎓 Milestone
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-green-600">
                              {item.milestone.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">
                                {item.milestone.company}
                              </span>{" "}
                              • {item.milestone.description}
                            </p>
                          </div>
                        )}
                        {/* Side project information */}
                        {item.sideProject && (
                          <div className="mt-3 border-l-2 border-[hsl(var(--portfolio-accent))] pl-3">
                            <div className="mb-1 flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="bg-[hsl(var(--portfolio-accent))]/10 text-xs"
                              >
                                🚀 Side Project • {item.sideProject.year}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-[hsl(var(--portfolio-accent))]">
                              {item.sideProject.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.sideProject.description}
                            </p>
                          </div>
                        )}
                        {/* Education information (concurrent schooling) */}
                        {item.education && (
                          <div className="mt-3 border-l-2 border-blue-500 pl-3">
                            <div className="mb-1 flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="border-blue-500 bg-blue-500/10 text-xs"
                              >
                                📚 Education
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-blue-600">
                              {item.education.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">
                                {item.education.company}
                              </span>{" "}
                              • {item.education.description}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </FadeInLeft>

          {/* Skills - Simplified to one motion wrapper */}
          <FadeInRight>
            <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold">
              <Palette className="size-6 text-[hsl(var(--portfolio-accent))]" />
              Skills & Technologies
            </h3>
            <div className="space-y-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <Card className="garden-card p-4">
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
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}
