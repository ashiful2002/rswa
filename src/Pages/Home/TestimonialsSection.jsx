import React from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { ScrollRevealSection } from "../../hooks/useScrollReveal";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sohel Rana",
      role: "Sohel Rana",
      initials: "SR",
      quote:
        "RSWA's collaborative approach to healthcare delivery in underserved communities is exemplary. They're true partners in our mission.",
      rating: 5,
    },
    {
      name: "Dr. Riad Arefin Biddut",
      role: "Former President of RSWA",
      initials: "RA",
      quote:
        "The healthcare services provided by RSWA changed my life. The free clinic camps identified a critical health condition early, and their support helped me get the treatment I needed.",
      rating: 5,
    },
    {
      name: "Ruble Ahmed",
      role: "Advisor",
      initials: "RA",
      quote:
        "I've been donating blood through RSWA for over 3 years. Their professional staff and transparent operations give me confidence that my donation is making a real difference.",
      rating: 5,
    },
    {
      name: "Sayed Kakon",
      role: "Advisor",
      initials: "SK",
      quote:
        "Being part of the RSWA volunteer team has been incredibly fulfilling. The organization's commitment to community empowerment is genuine and inspiring.",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <ScrollRevealSection className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Success Stories & Testimonials
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Hear from the people whose lives have been touched by our work
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="stagger-item transition-smooth border-0 bg-white shadow-sm hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.initials}`}
                    />
                    <AvatarFallback className="bg-primary font-bold text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="pt-2">{renderStars(testimonial.rating)}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic leading-relaxed text-foreground/80">
                  &quot;{testimonial.quote}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA for more stories */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-lg text-muted-foreground">
            These are just a few of the many lives we&apos;ve been privileged to
            impact
          </p>
          <a
            href="/archives"
            className="transition-smooth inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
          >
            Read More Stories
          </a>
        </div>
      </div>
    </ScrollRevealSection>
  );
};

export default TestimonialsSection;
