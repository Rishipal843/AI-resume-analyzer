import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Validation logic helpers
  const validations = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-[#0a0f18] text-white">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-80 md:h-80 bg-teal-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Registration Card */}
      <div className="w-full max-w-md relative z-10 bg-[#0d1420] border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl">
        <div className="text-center mb-8 space-y-4">
          <div className="mx-auto w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Create account</h1>
            <p className="mt-2 text-gray-400">Get started with your ATS analysis</p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#161d2a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#161d2a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#161d2a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Validation Checklist */}
          <div className="space-y-2 px-1 text-xs">
            <div className={`flex items-center gap-2 ${validations.length ? "text-teal-400" : "text-gray-500"}`}>
              <div className={`w-3.5 h-3.5 rounded-full border ${validations.length ? "bg-teal-400/20 border-teal-400" : "border-gray-600"} flex items-center justify-center`}>
                {validations.length && <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
              </div>
              At least 8 characters
            </div>
            <div className={`flex items-center gap-2 ${validations.number ? "text-teal-400" : "text-gray-500"}`}>
              <div className={`w-3.5 h-3.5 rounded-full border ${validations.number ? "bg-teal-400/20 border-teal-400" : "border-gray-600"} flex items-center justify-center`}>
                {validations.number && <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
              </div>
              Contains a number
            </div>
            <div className={`flex items-center gap-2 ${validations.uppercase ? "text-teal-400" : "text-gray-500"}`}>
              <div className={`w-3.5 h-3.5 rounded-full border ${validations.uppercase ? "bg-teal-400/20 border-teal-400" : "border-gray-600"} flex items-center justify-center`}>
                {validations.uppercase && <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
              </div>
              Contains uppercase letter
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#2dd4bf] hover:bg-[#26bba8] text-[#0a0f18] font-bold rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.25)] transition-all duration-300 transform active:scale-[0.98]"
          >
            Create account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account? 
          <Link to="/login" className="text-[#2dd4bf] hover:underline font-semibold ml-1">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;