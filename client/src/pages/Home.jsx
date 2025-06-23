import React from "react";
import { HeroSection } from "../components/HeroSection";
import { HowItWorks } from "../components/HowItWorks";
import { WhyVakilMate } from "../components/WhyVakilMate";
import { Footer } from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-[#f5fafe] to-[#e9f1ff] min-h-screen text-gray-800">
      <HeroSection />
      <HowItWorks />
      <WhyVakilMate />
      <Footer />
    </div>
  );
};

export default Home;
