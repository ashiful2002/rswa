import React from "react";
import { Button } from "../../components/ui/button";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import { Heart, Droplet } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* Image Slider */}
      <div className="animate-fadeIn">
        <Slider />
      </div>

      {/* Overlay CTA Section */}
      <div className="bg-gradient-to-b from-transparent via-transparent to-background px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="transition-smooth animate-fadeIn rounded-lg bg-card/95 p-6 shadow-lg backdrop-blur-sm sm:p-8 md:p-10">
            <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Welcome to RSWA
            </h1>
            <p className="mb-6 text-justify text-base text-muted-foreground sm:text-lg">
              Welcome to the largest student-led voluntary organization in
              Roumari Upazila, dedicated to the welfare and development of
              students. Founded in 2009, the{" "}
              <strong>Roumari Students Welfare Association (RSWA)</strong> began
              its journey with the aim of providing educational support and
              promoting the overall well-being of students. The organization is
              driven by student volunteers from Roumari who are currently
              pursuing their studies in different parts of the country and
              abroad. Since its establishment, the organization has been
              actively engaged not only in educational initiatives but also in
              organizing sports events and various academic and extracurricular
              competitions. As part of its social responsibility, the
              association also undertakes a wide range of community-oriented
              initiatives, including providing relief and emergency assistance
              during disasters, conducting tree-planting campaigns, supporting
              underprivileged and disadvantaged people, and implementing other
              humanitarian activities. Through these initiatives, the{" "}
              <strong>Roumari Students Welfare Association (RSWA)</strong>{" "}
              continues to make a meaningful and positive contribution to the
              lives of students, the local community, and society as a whole.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="transition-smooth gap-2 bg-red-700 text-white hover:bg-red-800 hover:shadow-lg"
                onClick={() => navigate("/blood")}
              >
                <Droplet className="h-5 w-5" />
                RSWA Virtual Blood Bank
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="transition-smooth gap-2 hover:bg-emerald-600 hover:text-white hover:shadow-lg dark:border-slate-700 dark:hover:bg-emerald-600 dark:hover:text-white"
                onClick={() => navigate("/rcl")}
              >
                RCL
                <span className="text-xs opacity-90">
                  (Biggest Cricket League in Rowmari)
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-smooth gap-2 hover:bg-emerald-600 hover:text-white hover:shadow-lg dark:border-slate-700 dark:hover:bg-emerald-600 dark:hover:text-white"
                onClick={() => navigate("/student-award")}
              >
                কৃতি শিক্ষার্থী সংবর্ধনা
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-smooth gap-2 hover:bg-emerald-600 hover:text-white hover:shadow-lg dark:border-slate-700 dark:hover:bg-emerald-600 dark:hover:text-white"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stagger-container mt-8 grid grid-cols-2 gap-4 md:gap-6">
            <div className="stagger-item transition-smooth rounded-lg bg-primary/10 p-4 text-center hover:bg-primary/20">
              <p className="text-sm font-semibold text-muted-foreground">
                Active
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                24/7
              </p>
              <p className="text-xs text-muted-foreground">Service Available</p>
            </div>
            <div className="stagger-item transition-smooth rounded-lg bg-secondary/10 p-4 text-center hover:bg-secondary/20">
              <p className="text-sm font-semibold text-muted-foreground">
                Volunteer
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                200+
              </p>
              <p className="text-xs text-muted-foreground">Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
