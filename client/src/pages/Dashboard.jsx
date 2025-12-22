import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!file || !jd.trim()) {
      setError("Please select a resume and enter job description");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jd);

    try {
      const res = await fetch("http://localhost:5000/api/resume/analyze", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Analysis failed");
        return;
      }

      navigate("/analysis", {
        state: { resultData: data.analysis }
      });

    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Analyze Your Resume
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Upload your resume and paste the job description to get an instant ATS compatibility analysis
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Resume Upload Card */}
            <div className="bg-[#0d1420] border border-gray-800 rounded-3xl p-8 shadow-2xl transition-all hover:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold">Upload Resume</h3>
              </div>

              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-700 rounded-2xl py-14 text-center cursor-pointer transition-all hover:border-[#2dd4bf]/50 hover:bg-teal-500/5 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept=".pdf,.docx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="bg-[#11212a] w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <p className="font-semibold text-lg">{file ? file.name : "Drop your resume here"}</p>
                <p className="text-gray-500 text-sm mt-1">or click to browse (PDF, DOCX)</p>
              </div>
            </div>

            {/* Job Description Card */}
            <div className="bg-[#0d1420] border border-gray-800 rounded-3xl p-8 shadow-2xl transition-all hover:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
                <h3 className="text-xl font-bold">Job Description</h3>
              </div>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-48 bg-[#0a0f18] border border-gray-800 rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/50 transition-all text-gray-200 placeholder-gray-600"
              />
              <p className="text-gray-500 text-sm mt-3">{jd.length} characters</p>
            </div>
          </div>

          {error && <p className="text-red-400 text-center font-medium">{error}</p>}

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-[#2dd4bf] text-[#0a0f18] font-black rounded-2xl shadow-[0_0_25px_rgba(45,212,191,0.3)] hover:shadow-[0_0_35px_rgba(45,212,191,0.5)] hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center gap-2 group"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
              {!loading && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;