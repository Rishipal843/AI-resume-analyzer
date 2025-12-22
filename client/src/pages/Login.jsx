import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveToken } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://ai-resume-analyzer3.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      saveToken(data.token);
      // alert("Login successful");
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-[#0a0f18] text-white">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-80 md:h-80 bg-teal-500/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10 bg-[#0d1420] border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl transition-all duration-500 hover:border-gray-700">
        {/* Header section */}
        <div className="text-center mb-8 space-y-4">
          <div className="mx-auto w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#2dd4bf]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-gray-400">Sign in to analyze your resume</p>
          </div>
        </div>

        {/* Form section */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#161d2a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#161d2a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {/* Dynamic Eye Icon based on showPassword state */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={showPassword 
                      ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"}
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#2dd4bf] hover:bg-[#26bba8] text-[#0a0f18] font-bold rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.25)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-300 transform active:scale-[0.98] mt-2"
          >
            Sign in
          </button>
        </form>

        {/* Footer section */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?
          <Link
            to="/signup"
            className="text-[#2dd4bf] hover:underline font-semibold ml-1"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;