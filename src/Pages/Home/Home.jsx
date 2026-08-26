import React from "react";
import HeroSection from "./HeroSection";
import MissionSection from "./MissionSection";
import ServicesSection from "./ServicesSection";
import TeamSection from "./TeamSection";
import DonateSection from "./DonateSection";
import TestimonialsSection from "./TestimonialsSection";
import PageTitle from "../../Components/PageTitle";

const Home = () => {
  return (
    <div className="mx-auto w-full sm:w-11/12">
      <HeroSection />

      <MissionSection />

      <ServicesSection />

      <TeamSection />

      {/* <DonateSection /> */}

      <TestimonialsSection />
    </div>
  );
};

export default Home;
