const express = require("express");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const analyzeResumeWithGemini = require("../services/geminiService");

const router = express.Router();

// Upload resume and extract text
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Extract text from PDF
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      const text = pdfData.text;

      if (!text.trim()) {
        return res.status(400).json({ message: "Empty resume text" });
      }

      res.json({
        message: "Resume uploaded successfully",
        text
      });

    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      res.status(500).json({ message: "File upload failed" });
    }
  }
);

// Analyze resume with Gemini
router.post(
  "/analyze",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const jobDescription = req.body.jobDescription;

      if (!jobDescription || !jobDescription.trim()) {
        return res.status(400).json({ message: "Job description is required" });
      }

      // Extract text from PDF
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      const resumeText = pdfData.text;

      if (!resumeText.trim()) {
        return res.status(400).json({ message: "Empty resume text" });
      }

      // Send text to Gemini
      const analysis = await analyzeResumeWithGemini(
        resumeText,
        jobDescription
      );

      res.json({
        message: "Resume analyzed successfully",
        analysis
      });

    } catch (error) {
      console.error("GEMINI ERROR:", error);
      res.status(500).json({ message: "AI analysis failed", error: error.message });
    }
  }
);

module.exports = router;
