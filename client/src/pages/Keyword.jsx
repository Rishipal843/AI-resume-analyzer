import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Search, Hash, CheckCircle2, XCircle, Zap, ArrowLeft } from "lucide-react";

const Keywords = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const data = location.state?.resultData || (() => {
    try {
      const raw = sessionStorage.getItem("lastAnalysis");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  })();

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0f18] text-white flex flex-col items-center justify-center">
        <p className="mb-4 text-gray-400">No keyword analysis data found</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-[#2dd4bf] text-black font-bold rounded-xl hover:scale-105 transition-transform"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const keywordMatchPercentage = data.keywordMatchPercentage ?? data.score ?? 0;
  const matchedKeywords = data.matchedKeywords ?? (Array.isArray(data.skillsFound) ? data.skillsFound.map(k => ({ keyword: k, count: 1, importance: 'medium' })) : []);
  const missingKeywords = data.missingKeywords ?? (Array.isArray(data.missingSkills) ? data.missingSkills.map(k => ({ keyword: k, importance: 'high' })) : []);
  const keywordOptimizationTips = data.keywordOptimizationTips ?? (Array.isArray(data.suggestions) ? data.suggestions.map(s => s.desc || s.title || s) : []);

  const filteredMatched = matchedKeywords.filter(k =>
    k.keyword.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMissing = missingKeywords.filter(k =>
    k.keyword.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0f18] text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Keyword Optimization</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Optimize your resume with the right keywords for ATS systems
          </p>

        
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12 animate-in fade-in duration-1000">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#2dd4bf] transition-colors" />
            <input
              type="text"
              placeholder="Search keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0d1420] border border-gray-800 outline-none focus:ring-2 focus:ring-[#2dd4bf]/20 focus:border-[#2dd4bf]/50 transition-all text-gray-200"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <StatCard
            title="Keyword Match"
            value={`${keywordMatchPercentage}%`}
            color="teal"
            icon={<Hash className="w-5 h-5" />}
          />
          <StatCard
            title="Keywords Found"
            value={matchedKeywords.length}
            color="green"
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
          <StatCard
            title="Missing Keywords"
            value={missingKeywords.length}
            color="red"
            icon={<XCircle className="w-5 h-5" />}
          />
        </div>

        {/* Keywords Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <MatchedKeywordsSection data={filteredMatched} />
          <MissingKeywordsSection data={filteredMissing} />
        </div>

        {/* Optimization Tips */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-6 h-6 text-[#2dd4bf]" />
            <h2 className="text-2xl font-bold tracking-tight">Optimization Tips</h2>
          </div>
          
          <div className="grid gap-4">
            {keywordOptimizationTips.map((tip, i) => (
              <div key={i} className="bg-[#0d1420] border border-gray-800 rounded-2xl p-6 flex gap-5 items-start hover:border-gray-700 transition-all">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-500/10 text-[#2dd4bf] flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-gray-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

/* ---------------- RE-DESIGNED COMPONENTS ---------------- */

const StatCard = ({ title, value, color, icon }) => (
  <div className="bg-[#0d1420] border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-gray-700 transition-all group">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${
        color === "teal" ? "bg-teal-500/10 text-teal-400" : 
        color === "green" ? "bg-green-500/10 text-green-400" : 
        "bg-red-500/10 text-red-400"
      }`}>
        {icon}
      </div>
      <p className="text-gray-400 text-sm font-medium">{title}</p>
    </div>
    <p className={`text-4xl font-black tracking-tight ${
      color === "teal" ? "text-[#2dd4bf]" : 
      color === "green" ? "text-green-400" : 
      "text-red-400"
    }`}>
      {value}
    </p>
  </div>
);

const MatchedKeywordsSection = ({ data }) => (
  <div className="bg-[#0d1420] border border-gray-800 rounded-3xl p-8 shadow-2xl">
    <div className="flex items-center gap-3 mb-8">
      <CheckCircle2 className="w-6 h-6 text-[#2dd4bf]" />
      <h3 className="text-xl font-bold tracking-tight">Matched Keywords</h3>
    </div>

    <div className="grid grid-cols-1 gap-3">
      {data.map(({ keyword, count = 1, importance = 'medium' }) => (
        <div key={keyword} className="flex justify-between items-center bg-gray-900/40 border border-gray-800 rounded-xl px-4 py-3 hover:border-teal-500/30 transition-all group">
            <span className="text-gray-300 group-hover:text-white transition-colors font-medium">{keyword}</span>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border tracking-tighter ${
              importance === 'high' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' :
              importance === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
              'bg-gray-500/10 text-gray-400 border-gray-500/20'
            }`}>
              {importance}
            </span>
          
        </div>
      ))}
      {data.length === 0 && <p className="text-gray-600 italic text-sm">No matched keywords found.</p>}
    </div>
  </div>
);

const MissingKeywordsSection = ({ data }) => (
  <div className="bg-[#0d1420] border border-gray-800 rounded-3xl p-8 shadow-2xl">
    <div className="flex items-center gap-3 mb-8">
      <XCircle className="w-6 h-6 text-red-500" />
      <h3 className="text-xl font-bold tracking-tight">Missing Keywords</h3>
    </div>

    <div className="grid grid-cols-1 gap-3">
      {data.map(({ keyword, importance }) => (
        <div key={keyword} className="flex justify-between items-center bg-gray-900/40 border border-gray-800 rounded-xl px-4 py-3 hover:border-red-500/30 transition-all group">
          <span className="text-gray-300 group-hover:text-white transition-colors">{keyword}</span>
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border tracking-tighter ${
            importance === "high" ? "bg-red-500/10 text-red-400 border-red-500/20" :
            importance === "medium" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
            "bg-gray-500/10 text-gray-400 border-gray-500/20"
          }`}>
            {importance}
          </span>
        </div>
      ))}
      {data.length === 0 && <p className="text-gray-600 italic text-sm">Great! No missing keywords.</p>}
    </div>
  </div>
);

export default Keywords;