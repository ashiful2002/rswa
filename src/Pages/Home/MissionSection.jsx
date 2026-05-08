import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { ScrollRevealSection } from '../../hooks/useScrollReveal';

const MissionSection = () => {
  const stats = [
    { number: '10K+', label: 'Lives Impacted' },
    { number: '500+', label: 'Active Volunteers' },
    { number: '50+', label: 'Communities Served' },
    { number: '100%', label: 'Transparent Operations' },
  ];

  return (
    <ScrollRevealSection className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Mission Statement */}
        <Card className="mb-12 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl">Our Mission</CardTitle>
            <CardDescription className="mt-2 text-lg">
              Empowering communities through compassionate service and sustainable development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-foreground/80">
              We believe in the power of collective action to create meaningful change. Our organization
              is dedicated to addressing critical social issues through innovative programs, community
              engagement, and transparent operations. Every initiative we undertake is designed to create
              lasting impact and sustainable improvements in the lives of those we serve.
            </p>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stagger-item rounded-lg bg-card p-6 text-center shadow-sm transition-smooth hover:shadow-md"
            >
              <div className="text-3xl font-bold text-primary md:text-4xl">
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
          <h3 className="mb-8 text-center text-2xl font-bold">Our Core Values</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Integrity',
                description: 'We operate with transparency and accountability in all our actions',
              },
              {
                title: 'Compassion',
                description: 'We understand and respond to the needs of those we serve with empathy',
              },
              {
                title: 'Sustainability',
                description: 'We create long-term solutions that benefit communities for years to come',
              },
            ].map((value, index) => (
              <Card key={index} className="stagger-item border-primary/20 transition-smooth hover:shadow-lg">
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
