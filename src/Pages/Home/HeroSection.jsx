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
          <div className="transition-smooth animate-fadeIn rounded-lg border border-border bg-card/95 p-6 shadow-lg backdrop-blur-sm sm:p-8 md:p-10">
            <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Welcome to RSWA
            </h1>
            <p className="mb-6 text-base text-muted-foreground sm:text-lg">
              রৌমারী উপজেলার স্টুডেন্টদের নিয়ে গড়েওঠা সর্ব বৃহৎ প্লার্টফর্মে
              স্বাগতম। শিক্ষার্থীদের সহযোঘীতা প্রদানের লক্ষে শিক্ক্ররথীদের
              নানামুখী কল্যালে গোড়ে ওঠা একটি প্লার্টফর্ম। শিক্ষা মূলক বিভিন্ন
              কাজের পাশাপাশি সামাজিক দায়বদ্ধ্যতা থেকে বিভিন্ন সামাজিক কাজ করে
              আসছে এই সংগঠন। যার মাধ্যমে শিক্ষার্থী সহ সাধারণ জনগণ উপকৃত হয়ে
              আসছে।
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="bg-green-700 hover:bg-green-800 transition-smooth gap-2 hover:shadow-lg"
                onClick={() => navigate("/blood")}
              >
                <Droplet className="h-5 w-5" />
                RSWA Virtual Blood Bank
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="transition-smooth gap-2 hover:bg-green-700 hover:shadow-lg"
                onClick={() => navigate("/rcl")}
              >
                {/* <Heart className="h-5 w-5" /> */}
                RCL
                <span className="text-xs">
                  (Biggest cricket League in Rowmari)
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-smooth gap-2 hover:bg-green-700 hover:shadow-lg"
                onClick={() => navigate("/about")}
              >
                কৃতি শিক্ষার্থী সংবর্ধনা
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-smooth gap-2 hover:bg-green-700 hover:shadow-lg"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stagger-container mt-8 grid grid-cols-3 gap-4 md:gap-6">
            <div className="stagger-item transition-smooth rounded-lg bg-primary/10 p-4 text-center hover:bg-primary/20">
              <p className="text-sm font-semibold text-muted-foreground">
                Active
              </p>
              <p className="text-2xl font-bold text-primary">24/7</p>
              <p className="text-xs text-muted-foreground">Service Available</p>
            </div>
            <div className="stagger-item transition-smooth rounded-lg bg-secondary/10 p-4 text-center hover:bg-secondary/20">
              <p className="text-sm font-semibold text-muted-foreground">
                Volunteer
              </p>
              <p className="text-2xl font-bold text-secondary">500+</p>
              <p className="text-xs text-muted-foreground">Team Members</p>
            </div>
            <div className="stagger-item transition-smooth rounded-lg bg-accent/10 p-4 text-center hover:bg-accent/20">
              <p className="text-sm font-semibold text-muted-foreground">
                Communities
              </p>
              <p className="text-2xl font-bold text-accent">50+</p>
              <p className="text-xs text-muted-foreground">Served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
