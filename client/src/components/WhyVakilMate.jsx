import { motion as Motion } from "framer-motion";
import {
  FaGavel,
  FaClock,
  FaUserGraduate,
  FaCheckCircle,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaGavel className="text-3xl text-blue-600" />,
    title: "Made for Indian Law",
    description: "Understands IPC, CrPC, RTI and Indian court documents.",
  },
  {
    icon: <FaClock className="text-3xl text-blue-600" />,
    title: "Time Saver",
    description: "Summarizes long legal texts in seconds, not hours.",
  },
  {
    icon: <FaUserGraduate className="text-3xl text-blue-600" />,
    title: "For Everyone",
    description: "Built for lawyers, students, researchers, and citizens.",
  },
  {
    icon: <FaCheckCircle className="text-3xl text-blue-600" />,
    title: "Accurate & Reliable",
    description: "Powered by GPT-4o and optimized for legal clarity.",
  },
];

export const WhyVakilMate = () => {
  return (
    <section className="py-16 bg-[#f0f6fc] px-4">
      <div className="max-w-5xl mx-auto text-center">
        <Motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
        >
          Why VakilMate?
        </Motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((item, index) => (
            <Motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
