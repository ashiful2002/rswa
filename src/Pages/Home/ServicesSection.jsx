import React from "react";
import { ScrollRevealSection } from "../../hooks/useScrollReveal";
import {
  GraduationCap,
  Trophy,
  UserCheck,
  Trees,
  HeartHandshake,
  ShieldAlert,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: (
        <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Educational Support",
      description:
        "Providing educational assistance, guidance and opportunities to students in need.",
    },
    {
      icon: (
        <Trophy className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Competition & Events",
      description:
        "Organizing academic, cultural, sports and extracurricular competitions to encourage student participation and talent development.",
    },
    {
      icon: (
        <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Student Development",
      description:
        "Creating opportunities for students to develop leadership, teamwork, communication and organizational skills.",
    },
    {
      icon: (
        <Trees className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Blood Donation",
      description:
        "Our volunteers regularly contribute blood donation. Either they donate or search for possible donors ASAP. We also arrange Blood Group check campaigns and motivate them to donate blood.",
    },
    {
      icon: (
        <HeartHandshake className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Social Welfare",
      description:
        "Supporting disadvantaged and underprivileged people through various community initiatives.",
    },
    {
      icon: (
        <ShieldAlert className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Disaster Response",
      description:
        "Providing relief and emergency assistance to affected communities during floods, disasters and other crises.",
    },
  ];

  return (
    <ScrollRevealSection className="bg-slate-50/60 py-16 transition-colors duration-200 dark:bg-slate-950/60 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Our Service & Programs
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-400">
            We offer comprehensive programs designed to address the most
            pressing needs in our communities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="stagger-item shadow-xs flex flex-col justify-between rounded-2xl border border-slate-200/80 p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/50"
            >
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
};

export default ServicesSection;
