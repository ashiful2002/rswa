import React from "react";
import Section from "../../Components/shared/Section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

const MissionSection = () => {
  return (
    <Section className="-mt-10">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Mission Statement */}
        <Card className="mb-12 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl">Our Mission</CardTitle>
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
              engaged generation of students who can contribute meaningfully to
              society.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Core Values */}
      <div className="mt-16">
        <h3 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl text-center">Our Core Values</h3>
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
              className="stagger-item transition-smooth border-0"
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
    </Section>
  );
};

export default MissionSection;
