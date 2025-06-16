"use client";

import { motion } from "motion/react";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const contactInfo = {
  email: "russellwelch17@gmail.com",
  phone: "(843) 754-2302",
  location: "Charleston, SC",
  website: "russellwelch.dev",
  linkedin: "linkedin.com/in/russellwelch",
  github: "github.com/russelldoescode",
};

const experience = [
  {
    title: "Lead Software Engineer",
    company: "Goldfinger Monitors",
    period: "May 2023 - Present",
    location: "Charleston, SC",
    achievements: [
      "Lead design, development, and deployment of full-stack web applications using React, Next.js, TypeScript, and Supabase",
      "Architect internal software solutions for inventory management, production tracking, and manufacturing data collection",
      "Collaborate with cross-functional teams to develop interactive marketing materials using Unity and C#",
      "Oversee customer-facing platforms including RMA portal, improving customer satisfaction and reducing response times",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Goldfinger Monitors",
    period: "June 2022 - May 2023",
    location: "Charleston, SC",
    achievements: [
      "Developed internal tools using C# and .NET Framework for LED controller boards and hardware automation",
      "Built and maintained Java-based Point of Sale (POS) systems on Linux environments",
      "Transitioned from RMA technician role, bringing hardware troubleshooting expertise to software development",
      "Utilized databases and spreadsheets for comprehensive inventory tracking and repair documentation",
    ],
  },
  {
    title: "IT Specialist Intern",
    company: "James Island Charter High School",
    period: "June 2021 - August 2021",
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
  gpa: "3.7/4.0",
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
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      {/* Simplified background - remove animate-float for better performance */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[hsl(var(--portfolio-accent))] rounded-full mix-blend-multiply filter blur-xl opacity-10" />
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
            Resume & Contact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch or download my resume to learn more about my experience
            and skills.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Card - simplified animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="glass p-6 sticky top-24">
              <CardHeader className="p-0 mb-6">
                <h3 className="text-2xl font-bold gradient-text">
                  Get In Touch
                </h3>
                <p className="text-muted-foreground">
                  Let&apos;s discuss opportunities and collaborations.
                </p>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3 p-3 glass rounded-lg hover:shadow-md transition-shadow">
                  <Mail className="w-5 h-5 text-[hsl(var(--portfolio-primary))]" />
                  <div className="flex-1">
                    <div className="font-medium">{contactInfo.email}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyEmail}
                    className="p-2"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <Phone className="w-5 h-5 text-[hsl(var(--portfolio-primary))]" />
                  <div className="font-medium">{contactInfo.phone}</div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <MapPin className="w-5 h-5 text-[hsl(var(--portfolio-primary))]" />
                  <div className="font-medium">{contactInfo.location}</div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-[hsl(var(--portfolio-glass-border))]">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="glass-outline"
                      size="sm"
                      className="justify-start"
                      asChild
                    >
                      <a
                        href={`https://${contactInfo.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button
                      variant="glass-outline"
                      size="sm"
                      className="justify-start"
                      asChild
                    >
                      <a
                        href={`https://${contactInfo.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Download Resume */}
                <Button variant="glass-primary" size="lg" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resume Content - simplified animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Experience */}
            <Card className="glass p-6">
              <CardHeader className="p-0 mb-6">
                <h3 className="text-2xl font-bold text-[hsl(var(--portfolio-primary))]">
                  Professional Experience
                </h3>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-[hsl(var(--portfolio-primary))] pl-6 relative"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-[hsl(var(--portfolio-primary))] rounded-full" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="text-lg font-semibold">{job.title}</h4>
                      <Badge variant="outline">{job.period}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-medium text-[hsl(var(--portfolio-accent))]">
                        {job.company}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        • {job.location}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="w-2 h-2 bg-[hsl(var(--portfolio-accent))] rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education & Certifications */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              <Card className="glass p-6">
                <CardHeader className="p-0 mb-4">
                  <h3 className="text-xl font-bold text-[hsl(var(--portfolio-accent))]">
                    Education
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div>
                    <h4 className="font-semibold mb-1">{education.degree}</h4>
                    <p className="text-[hsl(var(--portfolio-primary))] font-medium">
                      {education.school}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <span>{education.period}</span>
                      <span>•</span>
                      <span>{education.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      GPA: {education.gpa}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications & Awards */}
              <Card className="glass p-6">
                <CardHeader className="p-0 mb-4">
                  <h3 className="text-xl font-bold text-[hsl(var(--portfolio-accent))]">
                    Certifications & Awards
                  </h3>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
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

                  <div className="pt-4 border-t border-[hsl(var(--portfolio-glass-border))]">
                    <h4 className="font-semibold mb-2">Awards</h4>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
