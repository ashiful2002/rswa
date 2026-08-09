import React from 'react';
import HeroSection from './HeroSection';
import MissionSection from './MissionSection';
import ServicesSection from './ServicesSection';
import TeamSection from './TeamSection';
import DonateSection from './DonateSection';
import TestimonialsSection from './TestimonialsSection';
import PageTitle from '../../Components/PageTitle';

const Home = () => {
  return (
    <div className="mx-auto w-full sm:w-11/12">
      {/* <PageTitle title="Home" heading="home page" /> */}

      {/* Hero Section with Slider */}
      <HeroSection />

      {/* Mission & Impact Section */}
      <MissionSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Team Section */}
      <TeamSection />

      {/* Donate Section */}
      {/* <DonateSection /> */}

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Bottom Spacer */}
      <div className="py-8" />
    </div>
  );
};

export default Home;
