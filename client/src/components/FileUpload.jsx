import React, { useState } from "react";
import axios from "axios";
import { motion as Motion } from "framer-motion";
import { FaFileUpload, FaRedo } from "react-icons/fa";
import toast from "react-hot-toast";

export const FileUpload = ({ onSummary }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadHistory, setUploadHistory] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleRetry = () => {
    if (file) handleUpload();
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(0);

    try {
      const uploadToast = toast.loading("Uploading file...");

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      toast.success("File uploaded!", { id: uploadToast });

      toast.loading("Getting summary...");

      const summaryRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/summarize`,
        {
          text: uploadRes.data.text,
        }
      );

      toast.dismiss();
      toast.success("Summary generated ✅");
      onSummary(summaryRes.data.summary || "No summary received.");
      setUploadHistory((prev) => [...prev, file.name]);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload or summary failed ❌");
      onSummary("⚠️ Failed to process the document.");
    }

    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* Drag and Drop Box */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full border-2 border-dashed border-blue-400 rounded-lg p-6 text-center bg-white hover:bg-blue-50 transition"
      >
        <p className="text-gray-700">Drag & drop your PDF or DOCX file here</p>
        <p className="text-sm text-gray-400">or choose a file below</p>
      </div>

      {/* File Input */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 w-full"
        />
      </Motion.div>

      {/* Upload Button */}
      <Motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!file || uploading}
        onClick={handleUpload}
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaFileUpload />
        {uploading ? "Uploading..." : "Upload & Summarize"}
      </Motion.button>

      {/* Retry Button */}
      {!uploading && file && (
        <button
          onClick={handleRetry}
          className="text-sm text-blue-500 hover:underline flex items-center gap-1"
        >
          <FaRedo className="text-xs" /> Retry Upload
        </button>
      )}

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Upload History */}
      {uploadHistory.length > 0 && (
        <div className="w-full mt-4">
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Upload History:
          </h3>
          <ul className="text-sm text-gray-500 list-disc list-inside">
            {uploadHistory.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
