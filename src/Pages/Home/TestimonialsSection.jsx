import React from "react";
import Section from "../../Components/shared/Section";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sohel Rana",
      role: "Advisor",
      initials: "SR",
      img: "https://i.ibb.co.com/MkCqYjKC/sohel.jpg",
      quote:
        "RSWA's collaborative approach to healthcare delivery in underserved communities is exemplary. They're true partners in our mission.",
      rating: 5,
    },
    {
      name: "Dr. Riad Arefin Biddut",
      role: "Adviser",
      initials: "RA",
      img: "https://i.ibb.co.com/HTTZwdsr/rd-biddut.jpg",
      quote:
        "The healthcare services provided by RSWA changed my life. The free clinic camps identified a critical health condition early, and their support helped me get the treatment I needed.",
      rating: 5,
    },
    {
      name: "Ruble Ahmed",
      role: "Advisor",
      initials: "RA",
      img: "https://i.ibb.co.com/Xr9SD1mc/ruble.jpg",
      quote:
        "I've been donating blood through RSWA for over 3 years. Their professional staff and transparent operations give me confidence that my donation is making a real difference.",
      rating: 5,
    },
    {
      name: "Walid Bin Bokul",
      role: "Advisor",
      initials: "WB",
      img: "https://i.ibb.co.com/0pS81696/walid.jpg",
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
            className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Section
      className="-mb-12 -mt-12 bg-slate-50/60 dark:bg-slate-950/60"
      title="Success Stories & Testimonials"
      subtitle="Hear from the people whose lives have been touched by our work"
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="stagger-item flex h-full flex-col justify-between overflow-hidden border-0 shadow-sm transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:border-emerald-500/40 dark:bg-slate-900/90"
          >
            <CardHeader className="pb-1">
              <div className="mb-3 flex gap-3">
                <Avatar className="h-12 w-12 border border-slate-200 dark:border-slate-800">
                  <AvatarImage src={testimonial.img} />
                  <AvatarFallback className="bg-emerald-600 font-bold text-white">
                    {testimonial.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <p className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="pt-1">{renderStars(testimonial.rating)}</div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm italic leading-relaxed text-slate-600 dark:text-slate-300">
                &quot;{testimonial.quote}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA for more stories */}
      <div className="mt-12 text-center">
        <p className="mb-4 text-lg text-slate-600 dark:text-slate-400">
          These are just a few of the many lives we&apos;ve been privileged to
          impact
        </p>
        <a
          href="/archives"
          className="inline-block rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white no-underline shadow-sm transition-all duration-200 hover:bg-emerald-700 active:scale-95 dark:bg-emerald-400"
        >
          Read More Stories
        </a>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
