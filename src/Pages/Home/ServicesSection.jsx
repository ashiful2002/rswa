import React from "react";
import Section from "../../Components/shared/Section";
import {
  GraduationCap,
  Trophy,
  Trees,
  Droplet,
  HeartHandshake,
  ShieldAlert,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: (
        <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Educational Support & Student Development",
      description:
        "Providing educational assistance, guidance, and opportunities to students in need while empowering them to develop essential skills in leadership, teamwork, communication, and organization.",
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
        <Trees className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Environmental Initiatives",
      description:
        "Conducting environmental awareness programs such as tree plantation and clean Rowmari campaigns.",
    },
    {
      icon: (
        <Droplet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
      className="-mt-12 bg-slate-50/60 dark:bg-slate-950/60"
      title="Our Service & Programs"
      subtitle="We offer comprehensive programs designed to address the most pressing needs in our communities"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="stagger-item shadow-xs flex flex-col justify-between rounded-xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="mb-4 inline-flex rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/50">
                {service.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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
