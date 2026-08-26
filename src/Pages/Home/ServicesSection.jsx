import React from "react";
import Section from "../../Components/shared/Section";
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
    <Section
      className="bg-slate-50/60 dark:bg-slate-950/60 -mt-32"
      title="Our Service & Programs"
      subtitle="We offer comprehensive programs designed to address the most pressing needs in our communities"
    >

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="stagger-item flex h-full flex-col justify-between rounded-2xl border-slate-200/80 p-6 transition-all duration-300 hover:border-emerald-500/40 shadow hover:translate-y-1 hover:translate-x-1 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/50"
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
    </Section>
  );
};

export default ServicesSection;
