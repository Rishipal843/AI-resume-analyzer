import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// Icons used for the video look
import { CheckCircle2, XCircle, TrendingUp, AlertCircle, Target, Sparkles } from "lucide-react";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for the animated counter
  const [displayScore, setDisplayScore] = useState(0);

  const data = location.state?.resultData || (() => {
    try {
      const raw = sessionStorage.getItem("lastAnalysis");
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  })();

  useEffect(() => {
    if (location.state?.resultData) {
      try {
        sessionStorage.setItem("lastAnalysis", JSON.stringify(location.state.resultData));
      } catch (e) { /* ignore */ }
    }
  }, [location.state]);

  // Animated score counter effect
  useEffect(() => {
    if (data?.score) {
      const timer = setTimeout(() => {
        setDisplayScore(data.score);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0f18] text-white flex flex-col items-center justify-center">
        <p>No analysis data found</p>
        <button onClick={() => navigate("/dashboard")} className="mt-4 px-6 py-3 bg-[#2dd4bf] text-black rounded-lg">
          Go Back
        </button>
      </div>
    );
  }

  const { score, skillsFound, missingSkills, suggestions } = data;

  // Gauge sizing - smaller radius increases padding inside the container
  const GAUGE_VIEWBOX = 320;
  const GAUGE_CENTER = GAUGE_VIEWBOX / 2; // 160
  const GAUGE_RADIUS = 120; // reduced radius for padding
  const GAUGE_STROKE = 14;
  const CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

  return (
    <div className="min-h-screen bg-[#0a0f18] text-white overflow-x-hidden">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Analysis Results</h1>
          <p className="text-gray-400 text-lg">Here's how your resume matches the job requirements</p>
          
        </div>

        {/* ATS SCORE - Animated Gauge (Larger) */}
        <div className="flex justify-center mb-20 animate-in zoom-in duration-1000">
          <div className="relative w-70 h-70 md:w-80 md:h-80 bg-[#0d1420] border border-gray-800 rounded-2xl flex items-center justify-center shadow-2xl">
            <svg viewBox={`0 0 ${GAUGE_VIEWBOX} ${GAUGE_VIEWBOX}`} preserveAspectRatio="xMidYMid meet" className="absolute w-full h-full -rotate-90">
              <circle
                cx={GAUGE_CENTER} cy={GAUGE_CENTER} r={GAUGE_RADIUS}
                stroke="currentColor"
                strokeWidth={GAUGE_STROKE}
                fill="none"
                className="text-gray-800/30"
              />
              <circle
                cx={GAUGE_CENTER} cy={GAUGE_CENTER} r={GAUGE_RADIUS}
                stroke="currentColor"
                strokeWidth={GAUGE_STROKE}
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * displayScore) / 100}
                className="text-[#2dd4bf] transition-all duration-[1500ms] ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10">
              <p className="text-6xl md:text-6xl font-black text-[#2dd4bf]">{displayScore}</p>
              <p className="text-gray-400 text-sm md:text-xs font-bold uppercase tracking-widest mt-2">ATS Score</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <SkillBox 
            title="Skills Found" 
            items={skillsFound} 
            type="found" 
            icon={<CheckCircle2 className="w-5 h-5 text-[#2dd4bf]" />}
            delay="delay-150"
          />
          <SkillBox 
            title="Missing Skills" 
            items={missingSkills} 
            type="missing" 
            icon={<XCircle className="w-5 h-5 text-red-500" />}
            delay="delay-300"
          />
        </div>

        {/* Suggestions Section */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-[#2dd4bf]" />
            <h2 className="text-2xl font-bold tracking-tight">Improvement Suggestions</h2>
          </div>
          
          <div className="space-y-4">
            {suggestions.map((s, i) => (
              <div
                key={i}
                className="bg-[#0d1420] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {s.priority === "high" ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : s.priority === "medium" ? (
                      <Target className="w-5 h-5 text-orange-500" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white group-hover:text-[#2dd4bf] transition-colors">{s.title}</h4>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-xl border tracking-tighter ${
                        s.priority === "high" ? "text-red-400 border-red-500/30 bg-red-500/5" :
                        s.priority === "medium" ? "text-orange-400 border-orange-500/30 bg-orange-500/5" :
                        "text-gray-400 border-gray-500/30 bg-gray-500/5"
                      }`}>
                        {s.priority}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const SkillBox = ({ title, items, type, icon, delay }) => (
  <div className={`bg-[#0d1420] border border-gray-800 rounded-xl p-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ${delay}`}>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-bold text-2xl">{title}</h3>
      </div>
      <span className="bg-gray-900 px-3 py-2 rounded-xl text-sm font-bold text-gray-500 border border-gray-800">
        {items.length}
      </span>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((skill, idx) => (
        <span
          key={skill}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:scale-105 ${
            type === "found"
              ? "bg-teal-500/5 text-[#2dd4bf] border-teal-500/20"
              : "bg-red-500/5 text-red-400 border-red-500/20"
          }`}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default Analysis;