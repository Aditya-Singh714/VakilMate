import React, { useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { HowItWorks } from "../components/HowItWorks";
import { WhyVakilMate } from "../components/WhyVakilMate";
import { Footer } from "../components/Footer";
import { FileUpload } from "../components/FileUpload";
import { SummaryDisplay } from "../components/SummaryDisplay";

const Home = () => {
  const [summary, setSummary] = useState("");

  return (
    <div className="bg-gradient-to-br from-[#f5fafe] to-[#e9f1ff] min-h-screen text-gray-800">
      <HeroSection />

      {/* File Upload Section */}
      <section id="upload" className="py-16 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          📤 Upload Your Legal Document
        </h2>
        <FileUpload onSummary={setSummary} />
      </section>

      {/* Summary Display */}
      <SummaryDisplay summary={summary} />

      <HowItWorks />
      <WhyVakilMate />
      <Footer />
    </div>
  );
};

export default Home;
