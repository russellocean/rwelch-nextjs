"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Copy,
  Check,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactInfo = {
  email: "russellwelch17@gmail.com",
  phone: "(843) 754-2302",
  location: "Charleston, SC",
  website: "russellwelch.dev",
  linkedin: "linkedin.com/in/russelldoescode",
  github: "github.com/russellocean",
};

export function ContactCard() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <Card className="sticky top-24 border-2 border-[hsl(var(--portfolio-primary))]/20 bg-gradient-to-br from-background/95 to-background/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[hsl(var(--portfolio-primary))]/40">
      <CardHeader className="mb-6 p-0">
        <h3 className="gradient-text text-2xl font-bold">Get In Touch</h3>
        <p className="text-muted-foreground">
          Let&apos;s discuss opportunities and collaborations.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        {/* Email */}
        <div className="flex items-center gap-3 rounded-lg border border-[hsl(var(--portfolio-primary))]/10 bg-background/60 p-3 transition-all hover:border-[hsl(var(--portfolio-primary))]/30 hover:bg-background/80">
          <Mail className="size-5 text-[hsl(var(--portfolio-primary))]" />
          <div className="flex-1">
            <div className="font-medium">{contactInfo.email}</div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyEmail}
            className="p-2 hover:bg-[hsl(var(--portfolio-primary))]/10"
          >
            {copiedEmail ? (
              <Check className="size-4 text-green-500" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 rounded-lg border border-[hsl(var(--portfolio-primary))]/10 bg-background/60 p-3 transition-all hover:border-[hsl(var(--portfolio-primary))]/30 hover:bg-background/80">
          <Phone className="size-5 text-[hsl(var(--portfolio-primary))]" />
          <div className="font-medium">{contactInfo.phone}</div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 rounded-lg border border-[hsl(var(--portfolio-primary))]/10 bg-background/60 p-3 transition-all hover:border-[hsl(var(--portfolio-primary))]/30 hover:bg-background/80">
          <MapPin className="size-5 text-[hsl(var(--portfolio-primary))]" />
          <div className="font-medium">{contactInfo.location}</div>
        </div>

        {/* Social Links */}
        <div className="border-t border-[hsl(var(--portfolio-primary))]/20 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              className="justify-start border-[hsl(var(--portfolio-primary))]/20 hover:border-[hsl(var(--portfolio-primary))]/40 hover:bg-[hsl(var(--portfolio-primary))]/5"
              asChild
            >
              <a
                href={`https://${contactInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 size-4" />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="justify-start border-[hsl(var(--portfolio-primary))]/20 hover:border-[hsl(var(--portfolio-primary))]/40 hover:bg-[hsl(var(--portfolio-primary))]/5"
              asChild
            >
              <a
                href={`https://${contactInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 size-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Download Resume */}
        <Button
          variant="default"
          size="lg"
          className="w-full border-0 bg-gradient-to-r from-[hsl(var(--portfolio-primary))] to-[hsl(var(--portfolio-accent))] shadow-none hover:from-[hsl(var(--portfolio-primary))]/90 hover:to-[hsl(var(--portfolio-accent))]/90"
        >
          <Download className="mr-2 size-4" />
          Download Resume
        </Button>
      </CardContent>
    </Card>
  );
}
