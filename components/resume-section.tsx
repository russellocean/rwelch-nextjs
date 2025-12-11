"use client";

import {
  Award,
  Check,
  Copy,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FadeInUp } from "@/components/motion-wrappers";

const experience = [
  {
    title: "Full Stack Developer",
    company: "Goldfinger Monitors",
    period: "May 2025 - Present",
    location: "Charleston, SC",
    current: true,
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
      tech: ["Next.js", "AWS RDS", "AWS EC2", "REST API"],
    },
    {
      name: "2D Game Engine",
      course: "2D Game Engine Development",
      tech: ["C++", "OpenGL", "Game Development"],
    },
    {
      name: "Portfolio Website",
      course: "Web Development",
      tech: ["PHP", "JavaScript", "HTML/CSS"],
    },
  ],
};

const certifications = [
  {
    name: "PC Pro Certification",
    issuer: "TestOut",
    date: "June 2021",
  },
];

const awards = ["CTE Department Coding Award (2021)", "CTE Completer (2021)"];

const contactInfo = {
  email: "russellwelch17@gmail.com",
  location: "Charleston, SC",
  linkedin: "linkedin.com/in/russelldoescode",
  github: "github.com/russellocean",
};

export function ResumeSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="resume" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp className="mb-16">
          <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">
            Resume
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Experience & Contact
          </h2>
        </FadeInUp>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column - Contact & Education */}
          <FadeInUp className="space-y-6 lg:col-span-1">
            {/* Contact Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Get In Touch</h3>

              {/* Email */}
              <button
                type="button"
                onClick={copyEmail}
                className="mb-3 flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3 text-left transition-colors hover:bg-muted/50"
              >
                <Mail className="size-4 text-muted-foreground" />
                <span className="flex-1 truncate text-sm">
                  {contactInfo.email}
                </span>
                {copiedEmail ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4 text-muted-foreground" />
                )}
              </button>

              {/* Location */}
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                <MapPin className="size-4 text-muted-foreground" />
                <span className="text-sm">{contactInfo.location}</span>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://${contactInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm transition-colors hover:bg-muted/50"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
                <a
                  href={`https://${contactInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm transition-colors hover:bg-muted/50"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
              </div>

              {/* Download Resume */}
              <a
                href="/RussellWelchResume.pdf"
                download="RussellWelchResume.pdf"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <Download className="size-4" />
                Download Resume
              </a>
            </div>

            {/* Education Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap className="size-5" />
                <h3 className="text-lg font-semibold">Education</h3>
              </div>

              <div className="mb-4">
                <p className="font-medium">{education.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {education.school}
                </p>
                <p className="text-sm text-muted-foreground">
                  {education.period}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="mb-2 text-sm font-medium">Key Projects</p>
                <div className="space-y-2">
                  {education.projects.map((project) => (
                    <div key={project.name} className="text-sm">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.course}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications & Awards Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Award className="size-5" />
                <h3 className="text-lg font-semibold">Recognition</h3>
              </div>

              {certifications.map((cert) => (
                <div key={cert.name} className="mb-3">
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              ))}

              <div className="border-t border-border pt-3">
                <p className="mb-2 text-sm font-medium">Awards</p>
                {awards.map((award) => (
                  <p key={award} className="text-sm text-muted-foreground">
                    {award}
                  </p>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Right Column - Experience */}
          <FadeInUp className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-6 text-lg font-semibold">
                Professional Experience
              </h3>

              <div className="space-y-8">
                {experience.map((job, index) => (
                  <motion.div
                    key={`${job.period}-${job.title}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-6"
                  >
                    {/* Timeline line */}
                    {index < experience.length - 1 && (
                      <div className="absolute left-[5px] top-3 h-full w-px bg-border" />
                    )}
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-0 top-1.5 size-3 rounded-full border-2 border-background ${
                        job.current ? "bg-foreground" : "bg-muted-foreground/40"
                      }`}
                    />

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="font-medium">{job.title}</h4>
                        {job.current && (
                          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {job.company} · {job.location}
                      </p>
                      <p className="text-sm text-muted-foreground/60">
                        {job.period}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {job.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
