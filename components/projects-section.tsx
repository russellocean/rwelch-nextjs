"use client";

import { motion } from "motion/react";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Dare2Watch E-commerce",
    description:
      "Luxury watch e-commerce platform with inventory management, customer portal, and seamless checkout experience.",
    longDescription:
      "Built a comprehensive e-commerce solution for a luxury watch retailer featuring real-time inventory tracking, customer account management, and integrated payment processing. The platform includes an admin dashboard for inventory management and customer service tools.",
    image: "/api/placeholder/600/400",
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    category: "E-commerce",
    year: "2024",
    status: "Live",
    links: {
      live: "https://dare2watch.co",
      github: "#",
    },
    stats: {
      users: "500+",
      rating: "4.9",
      sales: "$50K+",
    },
  },
  {
    id: 2,
    title: "Goldfinger Inventory System",
    description:
      "Internal inventory management system for touchscreen monitor manufacturing with real-time tracking and analytics.",
    longDescription:
      "Developed a comprehensive inventory management system for Goldfinger Monitors, featuring real-time stock tracking, automated reorder points, manufacturing workflow integration, and detailed analytics dashboard for business intelligence.",
    image: "/api/placeholder/600/400",
    tech: ["React", "Node.js", "PostgreSQL", "Express", "Chart.js"],
    category: "Internal Tool",
    year: "2023",
    status: "Production",
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      users: "25+",
      efficiency: "+40%",
      uptime: "99.9%",
    },
  },
  {
    id: 3,
    title: "Interactive Trade Show Games",
    description:
      "Unity-based interactive games for touchscreen displays at trade shows, showcasing product capabilities.",
    longDescription:
      "Created engaging interactive experiences for trade shows using Unity and C#. These games demonstrate the capabilities of Goldfinger's touchscreen monitors while entertaining visitors and generating leads.",
    image: "/api/placeholder/600/400",
    tech: ["Unity", "C#", "TouchScript", "Analytics"],
    category: "Interactive Media",
    year: "2023",
    status: "Deployed",
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      interactions: "10K+",
      engagement: "85%",
      leads: "200+",
    },
  },
  {
    id: 4,
    title: "RMA Portal System",
    description:
      "Customer-facing return merchandise authorization portal with tracking and automated workflows.",
    longDescription:
      "Built a comprehensive RMA system that allows customers to initiate returns, track repair status, and communicate with support. Includes automated workflows for technicians and integration with inventory systems.",
    image: "/api/placeholder/600/400",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    category: "Customer Portal",
    year: "2023",
    status: "Live",
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      tickets: "1K+",
      satisfaction: "4.8/5",
      resolution: "2 days",
    },
  },
  {
    id: 5,
    title: "Personal Portfolio v2",
    description:
      "Modern portfolio website with 3D elements, animations, and responsive design showcasing development skills.",
    longDescription:
      "This very portfolio you're viewing! Built with Next.js 15, React 19, and modern web technologies. Features 3D elements, smooth animations, and a glass morphism design language.",
    image: "/api/placeholder/600/400",
    tech: ["Next.js", "React", "Three.js", "Motion", "Tailwind CSS"],
    category: "Portfolio",
    year: "2024",
    status: "Live",
    links: {
      live: "https://russellwelch.dev",
      github: "https://github.com/russelldoescode/portfolio",
    },
    stats: {
      performance: "98/100",
      accessibility: "100/100",
      seo: "95/100",
    },
  },
  {
    id: 6,
    title: "Manufacturing Dashboard",
    description:
      "Real-time manufacturing dashboard with production metrics, quality control, and team management.",
    longDescription:
      "Comprehensive dashboard for monitoring manufacturing processes, tracking production metrics, managing quality control checkpoints, and coordinating team activities across multiple production lines.",
    image: "/api/placeholder/600/400",
    tech: ["React", "D3.js", "WebSocket", "Node.js", "MongoDB"],
    category: "Dashboard",
    year: "2022",
    status: "Production",
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      efficiency: "+35%",
      downtime: "-60%",
      quality: "99.2%",
    },
  },
];

const categories = [
  "All",
  "E-commerce",
  "Internal Tool",
  "Interactive Media",
  "Customer Portal",
  "Portfolio",
  "Dashboard",
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-[hsl(var(--portfolio-primary))] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work spanning e-commerce platforms, internal tools,
            and interactive experiences.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "glass-primary" : "glass-outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="glass overflow-hidden h-full hover:animate-glow transition-all">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-[hsl(var(--portfolio-primary))] to-[hsl(var(--portfolio-accent))] flex items-center justify-center">
                    <div className="text-white text-lg font-semibold">
                      {project.title}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="sm" variant="glass">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="glass">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-[hsl(var(--portfolio-accent))] text-white">
                    {project.status}
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="glass p-2 rounded">
                        <div className="font-semibold text-[hsl(var(--portfolio-primary))]">
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="glass-outline">
            <Github className="w-4 h-4 mr-2" />
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
