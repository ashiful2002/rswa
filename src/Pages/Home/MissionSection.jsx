import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { ScrollRevealSection } from "../../hooks/useScrollReveal";

const MissionSection = () => {
  const stats = [
    { number: "10K+", label: "Lives Impacted" },
    { number: "500+", label: "Active Volunteers" },
    { number: "50+", label: "Communities Served" },
    { number: "100%", label: "Transparent Operations" },
  ];

  return (
    <ScrollRevealSection className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Mission Statement */}
          <Card className="mb-12 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl">
                Our Mission
              </CardTitle>
              <CardDescription className="mt-2 text-balance text-lg">
                To support students through educational assistance, skill
                development, and welfare initiatives while contributing to the
                well-being of the wider community.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="mb-12 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl">Our Vision</CardTitle>
              <CardDescription className="mt-2 text-balance text-lg">
                To build an educated, responsible, compassionate, and socially
                engaged generation of students who can contribute meaningfully
                to society.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stagger-item transition-smooth rounded-lg bg-card p-6 text-center shadow-sm hover:shadow-md"
            >
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stat.number}
              </div>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className="mb-8 text-center text-2xl font-bold">
            Our Core Values
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Integrity",
                description:
                  "We operate with transparency and accountability in all our actions",
              },
              {
                title: "Compassion",
                description:
                  "We understand and respond to the needs of those we serve with empathy",
              },
              {
                title: "Sustainability",
                description:
                  "We create long-term solutions that benefit communities for years to come",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="stagger-item transition-smooth border-primary/20 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
};

export default MissionSection;
