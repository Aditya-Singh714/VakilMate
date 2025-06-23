import { motion as Motion } from "framer-motion";
import { FaFileUpload, FaRobot, FaListAlt, FaDownload } from "react-icons/fa";

const steps = [
  {
    icon: <FaFileUpload className="text-3xl text-blue-600" />,
    title: "Upload",
    description: "Submit your legal document in PDF or DOC format.",
  },
  {
    icon: <FaRobot className="text-3xl text-blue-600" />,
    title: "AI Processing",
    description: "VakilMate analyzes the content using GPT-4o.",
  },
  {
    icon: <FaListAlt className="text-3xl text-blue-600" />,
    title: "Summarization",
    description: "Generates a clear, concise summary with citations.",
  },
  {
    icon: <FaDownload className="text-3xl text-blue-600" />,
    title: "Download",
    description: "Export the summary in PDF or copy it for your notes.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white px-4">
      <div className="max-w-5xl mx-auto text-center">
        <Motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
        >
          How It Works
        </Motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-[#f9fbfe] rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
