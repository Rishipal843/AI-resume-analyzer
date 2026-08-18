const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey =
  process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY1;

if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY not found in environment variables");
  throw new Error("Gemini API key is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

const analyzeResumeWithGemini = async (resumeText, jobDescription) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
You are an advanced ATS (Applicant Tracking System).

Analyze the resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON in exactly this structure:

{
  "score": 0,
  "skillsFound": [],
  "missingSkills": [],
  "suggestions": [
    {
      "title": "",
      "priority": "high",
      "desc": ""
    }
  ],
  "keywordMatchPercentage": 0,
  "matchedKeywords": [
    {
      "keyword": "",
      "importance": "high",
      "count": 0
    }
  ],
  "missingKeywords": [
    {
      "keyword": "",
      "importance": "high"
    }
  ],
  "keywordOptimizationTips": []
}

Rules:
- Score must be between 0 and 100.
- keywordMatchPercentage must be between 0 and 100.
- Keywords must come strictly from the resume and job description.
- Count means the number of occurrences of the keyword in the resume.
- Importance depends on how important the keyword is in the job description.
- Suggestions must be actionable.
- Do not add explanations.
- Do not use markdown.
- Return JSON only.
`;

    const result = await model.generateContent(prompt);

    const rawText = result.response.text();

    if (!rawText) {
      throw new Error("No response from Gemini API");
    }

    const parsed = JSON.parse(rawText);

    return parsed;

  } catch (error) {
    console.error("Gemini API Error:", error);

    throw new Error(
      `Failed to analyze resume: ${error.message}`
    );
  }
};

module.exports = analyzeResumeWithGemini;