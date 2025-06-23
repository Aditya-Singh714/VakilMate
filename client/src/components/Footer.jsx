import React from "react";
import { motion as Motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <Motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-gray-600 text-sm"
        >
          © {new Date().getFullYear()} VakilMate · All rights reserved.
        </Motion.p>

        <Motion.div
          className="flex gap-4 mt-4 md:mt-0"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <a
            href="https://github.com/Aditya-Singh714"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/adit-singh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="mailto:singhaaditya0406@gmail.com"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaEnvelope size={20} />
          </a>
          <a
            href="https://x.com/Aaditya_singh02"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaXTwitter size={20} />
          </a>
        </Motion.div>
      </div>
    </footer>
  );
};
