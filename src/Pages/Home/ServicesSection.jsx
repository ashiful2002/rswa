import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ScrollRevealSection } from '../../hooks/useScrollReveal';
import { Heart, Users, Stethoscope, Droplet } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: 'Community Healthcare',
      description: 'Providing accessible healthcare services to underserved communities through mobile clinics and health camps.',
    },
    {
      icon: <Droplet className="h-10 w-10 text-primary" />,
      title: 'Blood Donation',
      description: 'Managing a comprehensive blood bank with quality assurance and convenient donation drives throughout the region.',
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Community Support',
      description: 'Building strong community networks through education, skill development, and social welfare programs.',
    },
    {
      icon: <Stethoscope className="h-10 w-10 text-primary" />,
      title: 'Medical Awareness',
      description: 'Conducting health awareness programs and workshops to promote preventive care and healthy living.',
    },
  ];

  return (
    <ScrollRevealSection className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Services & Programs</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We offer comprehensive programs designed to address the most pressing needs in our communities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="stagger-item card-hover border-0 bg-card shadow-sm transition-smooth"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 rounded-lg bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-4 text-xl font-bold">Why Choose Us?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-foreground/80">Certified and recognized healthcare professionals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-foreground/80">State-of-the-art medical equipment and technology</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-foreground/80">Transparent reporting and impact metrics</span>
            </li>
            {/* <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-foreground/80">Dedicated support team available 24/7</span>
            </li> */}
          </ul>
        </div>
      </div>
    </ScrollRevealSection>
  );
};

export default ServicesSection;
