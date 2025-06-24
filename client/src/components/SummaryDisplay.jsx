import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  FaCopy,
  FaFileExport,
  FaTrash,
  FaShareAlt,
  FaHashtag,
} from "react-icons/fa";
import toast from "react-hot-toast";

export const SummaryDisplay = ({ summary, onClear }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      toast.success("Summary copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Summary downloaded!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "VakilMate Summary",
          text: summary,
          url: window.location.href,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch(() => toast.error("Failed to share."));
    } else {
      toast.error("Sharing not supported in this browser.");
    }
  };

  const handleClear = () => {
    onClear();
  };

  const tokenCount = summary?.split(/\s+/).length || 0;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl mx-auto mt-10 relative"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">📄 AI Summary</h2>
        <span className="flex items-center text-sm text-gray-500">
          <FaHashtag className="mr-1" /> {tokenCount} words
        </span>
      </div>

      <div className="overflow-y-auto max-h-[400px] whitespace-pre-wrap text-gray-700 border p-4 rounded-md text-sm bg-gray-50">
        {summary || "No summary available."}
      </div>

      {summary && (
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
          >
            <FaCopy /> {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition"
          >
            <FaFileExport /> Download
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition"
          >
            <FaShareAlt /> Share
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition"
          >
            <FaTrash /> Clear
          </button>
        </div>
      )}
    </Motion.div>
  );
};
