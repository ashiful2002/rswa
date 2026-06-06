import React from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { ScrollRevealSection } from "../../hooks/useScrollReveal";
import { Mail, Share2 } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "আল ফারাজি মারুফ",
      role: "President",
      bio: "2026-27 Executive committee",
      initials: "MARUF",
      email: "ahmed@rswa.org",
    },
    {
      name: "Mehedi Hasan Pollob",
      role: "Generel Secreatary",
      bio: "2026-27 Executive committee",
      initials: "POLLOB",
      email: "sarah@rswa.org",
    },
    {
      name: "Rokon Ahmed",
      role: "Senior Vice President",
      bio: "2026-27 Executive committee",
      initials: "ROKON",
      email: "mohammed@rswa.org",
    },
    {
      name: "Nahid Iqbal Likhon",
      role: "Joined generel Secreatery",
      bio: "2026-27 Executive committee",
      initials: "NIL",
      email: "fatima@rswa.org",
    },
    {
      name: "Ashiful Islam Mukto",
      role: "Organizeing Secreatery",
      bio: "2026-27 Executive committee",
      initials: "MUKTO",
      email: "fatima@rswa.org",
    },
  ];

  return (
    <ScrollRevealSection className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Meet Our Team</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Dedicated professionals committed to making a difference in our
            communities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="stagger-item card-hover transition-smooth overflow-hidden border-0 shadow-sm"
            >
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 text-center">
                <Avatar className="mx-auto h-20 w-20">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.initials}`}
                  />
                  <AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardHeader className="pb-3">
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {member.role}
                </p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {member.bio}
                </p>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="transition-smooth inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <button
                    className="transition-smooth inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white"
                    title={`Connect on social media`}
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Info */}
        <div className="mt-12 rounded-lg bg-primary/5 p-6 md:p-8">
          <h3 className="mb-4 text-xl font-bold">Our Leadership Approach</h3>
          <p className="mb-4 text-foreground/80">
            Our team is composed of experienced professionals from healthcare,
            operations, and community development backgrounds. We believe in
            collaborative leadership where every team member contributes their
            expertise toward our shared mission of community empowerment.
          </p>
          <p className="text-foreground/80">
            Beyond our core team, we're supported by hundreds of dedicated
            volunteers and board members who help us extend our reach and impact
            throughout the communities we serve.
          </p>
        </div>
      </div>
    </ScrollRevealSection>
  );
};

export default TeamSection;
