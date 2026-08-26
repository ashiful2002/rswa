import React from "react";
import Section from "../../Components/shared/Section";
import { Button } from "../../components/ui/button";
import { Heart, Gift, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonateSection = () => {
  const navigate = useNavigate();

  const donationOptions = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "One-Time Gift",
      description: "Make a single donation to support our immediate needs",
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Monthly Support",
      description:
        "Become a sustaining donor with recurring monthly contributions",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Sponsor a Program",
      description:
        "Sponsor an entire program or initiative to amplify your impact",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Corporate Giving",
      description:
        "Partner with us through your business or corporate foundation",
    },
  ];

  return (
    <Section
      className="bg-gradient-to-br from-primary to-secondary text-white"
      title="Support Our Mission"
      subtitle="Your generosity directly impacts thousands of lives. Every contribution, no matter the size, helps us continue our vital work in communities that need us most."
      titleClassName="text-white dark:text-white"
      subtitleClassName="text-white/90 dark:text-white/90"
    >
      {/* Donation Methods */}
      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {donationOptions.map((option, index) => (
          <div
            key={index}
            className="stagger-item rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-smooth hover:bg-white/20"
          >
            <div className="mb-3 inline-block rounded-lg bg-white/20 p-3">
              {React.cloneElement(option.icon, {
                className: "h-6 w-6 text-white",
              })}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{option.title}</h3>
            <p className="text-sm opacity-90">{option.description}</p>
          </div>
        ))}
      </div>

      {/* Impact Stats */}
      <div className="mb-12 grid gap-6 md:grid-cols-3">
        <div className="text-center">
          <div className="text-3xl font-bold md:text-4xl">₨ 5M+</div>
          <p className="mt-2 text-sm opacity-90">Total Funds Distributed</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold md:text-4xl">95%</div>
          <p className="mt-2 text-sm opacity-90">Spent on Programs</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold md:text-4xl">100%</div>
          <p className="mt-2 text-sm opacity-90">Transparently Reported</p>
        </div>
      </div>

      {/* Primary CTA Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-gray-100"
          onClick={() => navigate("/donate")}
        >
          <Heart className="mr-2 h-5 w-5" />
          Donate Now
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white/10"
          onClick={() => navigate("/blood")}
        >
          Donate Blood
        </Button>
      </div>

      {/* Bottom Info */}
      <div className="mt-12 border-t border-white/20 pt-8 text-center text-sm opacity-90">
        <p>
          Your donation is secure and confidential. We are registered as a
          non-profit organization and all donations are tax-deductible.
        </p>
        <p className="mt-2">
          Questions?{" "}
          <a
            href="mailto:donate@rswa.org"
            className="font-semibold underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </Section>
  );
};

export default DonateSection;
