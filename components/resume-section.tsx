import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
} from "@/components/motion-wrappers";
import { ContactCard } from "@/components/contact-card";

const experience = [
  {
    title: "Full Stack Developer",
    company: "Goldfinger Monitors",
    period: "May 2025 - Present",
    location: "Charleston, SC",
    achievements: [
      "Lead software development initiatives in full-time office role, managing website redesign and internal tool development",
      "Expand RMA portal functionality for distributor network with real-time analytics and multi-location coordination",
      "Develop internal project management software to streamline company workflows and processes",
      "Collaborate with cross-functional teams to deliver scalable web applications using Next.js, TypeScript, and Supabase",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Goldfinger Monitors",
    period: "Aug 2023 - May 2025",
    location: "Charleston, SC (Hybrid)",
    achievements: [
      "Promoted to full stack developer, built customer-facing RMA portal with QR code scanning and deep analytics",
      "Developed internal parts database (Goldfinger MANAGE) with 1700+ unique parts, coordinating US and Vietnam facilities",
      "Created interactive Unity games for trade shows including roulette wheel, collection, and slot machine demos",
      "Led complete website redesign for Goldfinger Monitors, improving user experience and modern responsive design",
      "Built Dare2Watch luxury e-commerce platform as side project, handling 20K+ visitors and 65 watch sales",
    ],
  },
  {
    title: "Software Engineer",
    company: "Goldfinger Monitors",
    period: "Jun 2022 - Aug 2023",
    location: "Charleston, SC (Hybrid)",
    achievements: [
      "Started as software engineer with hybrid schedule, working in-office during school breaks and remote during academic year",
      "Built foundational systems for internal parts database and manufacturing synchronization tools",
      "Maintained legacy POS system and provided critical updates for customer stability",
      "Created animated marketing assets for trade shows, showcasing touchscreen monitor capabilities",
    ],
  },
  {
    title: "IT Specialist Intern",
    company: "James Island Charter High School",
    period: "2021",
    location: "Charleston, SC",
    achievements: [
      "Provided comprehensive IT support for faculty across Windows and macOS systems",
      "Set up and maintained network infrastructure and server hardware",
      "Troubleshot complex hardware and software issues ensuring smooth school operations",
    ],
  },
];

const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "Clemson University",
  period: "August 2021 - May 2025",
  location: "Clemson, SC",
  projects: [
    {
      name: "Driver Incentive Program",
      course: "Senior Practicum",
      description:
        "Built comprehensive driver incentive system with team using Next.js, AWS RDS, and AWS EC2",
      tech: ["Next.js", "AWS RDS", "AWS EC2", "REST API"],
    },
    {
      name: "2D Game Engine",
      course: "2D Game Engine Development",
      description:
        "Developed complete 2D game engine from scratch with custom rendering and physics",
      tech: ["C++", "OpenGL", "Game Development"],
    },
    {
      name: "Portfolio Website",
      course: "Web Development",
      description:
        "Created original portfolio website demonstrating full-stack web development skills",
      tech: ["PHP", "JavaScript", "HTML/CSS"],
    },
  ],
};

const certifications = [
  {
    name: "PC Pro Certification",
    issuer: "TestOut",
    date: "June 2021",
    description: "Proficiency in computer hardware and OS maintenance",
  },
];

const awards = [
  "CTE Department Coding Award - James Island Charter High School (2021)",
  "CTE Completer - James Island Charter High School (2021)",
];

export function ResumeSection() {
  return (
    <section id="resume" className="relative overflow-hidden py-20">
      {/* Simplified background - remove animate-float for better performance */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 right-1/3 size-80 rounded-full bg-[hsl(var(--portfolio-accent))] opacity-10 mix-blend-multiply blur-xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - keep simple fade in */}
        <FadeInUp className="mb-16 text-center">
          <h2 className="gradient-text mb-4 text-4xl font-bold sm:text-5xl">
            Resume & Contact
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Get in touch or download my resume to learn more about my experience
            and skills.
          </p>
        </FadeInUp>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Card - simplified animation */}
          <FadeInLeft className="lg:col-span-1">
            <ContactCard />
          </FadeInLeft>

          {/* Resume Content - simplified animation */}
          <FadeInRight className="space-y-8 lg:col-span-2">
            {/* Experience */}
            <Card className="garden-card p-6">
              <CardHeader className="mb-6 p-0">
                <h3 className="text-2xl font-bold text-[hsl(var(--portfolio-primary))]">
                  Professional Experience
                </h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <div className="space-y-6">
                    {experience.map((job, index) => (
                      <div key={index} className="relative pl-8">
                        {/* Timeline line segment - only show if not the last item */}
                        {index < experience.length - 1 && (
                          <div className="absolute left-[7px] top-4 h-[calc(100%+1.5rem)] w-0.5 bg-[hsl(var(--portfolio-primary))]" />
                        )}
                        {/* Timeline dot - aligned with job title */}
                        <div className="absolute left-0 top-0 size-4 rounded-full border-2 border-background bg-[hsl(var(--portfolio-primary))]" />
                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-lg font-semibold">{job.title}</h4>
                          <Badge variant="outline">{job.period}</Badge>
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                          <span className="font-medium text-[hsl(var(--portfolio-accent))]">
                            {job.company}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            • {job.location}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {job.achievements.map(
                            (achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-2 size-2 shrink-0 rounded-full bg-[hsl(var(--portfolio-accent))]" />
                                {achievement}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education & Certifications */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Education */}
              <Card className="garden-card p-6">
                <CardHeader className="mb-4 p-0">
                  <h3 className="text-xl font-bold text-[hsl(var(--portfolio-accent))]">
                    Education & Academic Projects
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="mb-1 font-semibold">{education.degree}</h4>
                      <p className="font-medium text-[hsl(var(--portfolio-primary))]">
                        {education.school}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{education.period}</span>
                        <span>•</span>
                        <span>{education.location}</span>
                      </div>
                    </div>

                    <div className="border-t border-[hsl(var(--portfolio-glass-border))] pt-3">
                      <h4 className="mb-2 font-semibold text-sm">
                        Key Academic Projects
                      </h4>
                      <div className="space-y-2">
                        {education.projects.map((project, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className="font-medium text-sm">
                                {project.name}
                              </h5>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {project.course}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications & Awards */}
              <Card className="garden-card p-6">
                <CardHeader className="mb-4 p-0">
                  <h3 className="text-xl font-bold text-[hsl(var(--portfolio-accent))]">
                    Certifications & Awards
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4 p-0">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-[hsl(var(--portfolio-primary))]">
                        {cert.issuer} • {cert.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {cert.description}
                      </p>
                    </div>
                  ))}

                  <div className="border-t border-[hsl(var(--portfolio-glass-border))] pt-4">
                    <h4 className="mb-2 font-semibold">Awards</h4>
                    <ul className="space-y-1">
                      {awards.map((award, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          • {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}
