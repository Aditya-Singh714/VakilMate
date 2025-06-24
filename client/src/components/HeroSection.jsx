import { motion as Motion } from "framer-motion";
import { FaBalanceScale } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../assets/img/indian-image-gavel.jpeg";
import img2 from "../assets/img/supreme-court.webp";
import img3 from "../assets/img/legal-books.jpg";
import img4 from "../assets/img/judge-gavel.jpeg";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          swipeable
          emulateTouch
          showArrows={false}
          className="w-full h-full"
        >
          <div>
            <img
              src={img1}
              alt="Gavel and Flag"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src={img2}
              alt="Supreme Court"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src={img3}
              alt="Law Books"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src={img4}
              alt="Judge at Work"
              className="w-full h-full object-cover"
            />
          </div>
        </Carousel>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />

      {/* Foreground Content */}
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-center max-w-2xl px-4"
      >
        <FaBalanceScale className="text-5xl text-black mb-4 mx-auto" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
          VakilMate
        </h1>
        <p className="text-lg text-white mb-6 backdrop-blur-sm bg-white/20 px-4 py-2 rounded-xl inline-block">
          Your AI-powered legal assistant for simplified Indian law documents.
        </p>
      </Motion.div>
    </section>
  );
};
