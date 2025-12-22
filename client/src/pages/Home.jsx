import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout as authLogout } from "../utils/auth";
import logo from "../assets/resume_logo-removebg-preview.png";
import { 
  FileText, Sparkles, Target, TrendingUp, ArrowRight, CheckCircle2,
  Zap, Shield, BarChart3, Users, Star, Quote, Mail, Github, 
  Twitter, Linkedin, Clock, Award, Brain
} from "lucide-react";

// --- Data ---
const features = [
  { icon: Target, title: "ATS Score Analysis", description: "Get an instant compatibility score showing how well your resume matches the job requirements with detailed breakdown." },
  { icon: Sparkles, title: "Skill Gap Detection", description: "Discover missing keywords and skills that could boost your chances of getting hired by top companies." },
  { icon: TrendingUp, title: "Smart Suggestions", description: "Receive actionable recommendations to optimize your resume for maximum impact and visibility." },
  { icon: Brain, title: "AI-Powered Insights", description: "Leverage advanced AI to understand exactly what recruiters and ATS systems are looking for." },
  { icon: Zap, title: "Instant Results", description: "Get comprehensive analysis in seconds, not hours. Perfect for last-minute job applications." },
  { icon: Shield, title: "Privacy First", description: "Your resume data is encrypted and never shared. We take your privacy seriously." },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "ResumeAI helped me identify critical keywords I was missing. I got callbacks from 5 top tech companies within a week!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager at Meta",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "The ATS score analysis was eye-opening. I improved my score from 45% to 92% and landed my dream job.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist at Amazon",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "Best investment I've made in my career. The AI suggestions were incredibly specific and actionable.",
    rating: 5,
  },
];

const stats = [
  { value: "50K+", label: "Resumes Analyzed" },
  { value: "85%", label: "Interview Success Rate" },
  { value: "200+", label: "Companies Trust Us" },
  { value: "4.9/5", label: "User Rating" },
];

const howItWorksSteps = [
  {
    step: "01",
    icon: FileText,
    title: "Upload Your Resume",
    description: "Simply drag and drop your resume in PDF or DOCX format. Our system accepts all standard formats."
  },
  {
    step: "02",
    icon: Target,
    title: "Add Job Description",
    description: "Paste the job posting you're applying for. Our AI will analyze the requirements."
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Get Instant Analysis",
    description: "Receive your ATS score, missing keywords, and actionable improvements in seconds."
  }
];

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(Boolean(getToken()));
  const navigate = useNavigate();

  const handleLogout = () => {
    authLogout();
    setIsAuth(false);
    navigate("/");
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-white overflow-hidden font-sans selection:bg-teal-500/30">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
      `}</style>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/[0.03] rounded-full blur-[150px]" />
      </div>

      {/* Navbar */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-2">
          <div className="w-15 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center border border-teal-500/20">
                              <img src={logo} alt="ResumeAI logo" className="w-25 h-25 object-contain" />

          </div>
          <span className="font-bold text-xl tracking-tight">InsightCV</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-gray-400">
          {["Features", "How it Works", "Testimonials"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-teal-400 transition-colors text-sm font-medium">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {isAuth ? (
            <button onClick={handleLogout} className="px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-[#0a0f18] rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)]">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign in</Link>
              <Link to="/signup" className="px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-[#0a0f18] rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-10 pb-32 z-10">
        <div className="container mx-auto px-4 text-center">
          {isVisible && (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-8 animate-fade-up stagger-1">
                <Sparkles className="w-4 h-4" />
                AI-Powered Resume Analysis
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight animate-fade-up stagger-2">
                Beat the ATS, <br />
                <span className="text-teal-400">Land Your Dream Job</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up stagger-3">
                Upload your resume and job description to get instant feedback on ATS compatibility, 
                missing keywords, and actionable improvements.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-4">
                <Link to="/dashboard" className="w-full sm:w-auto px-10 py-4 bg-teal-400 hover:bg-teal-300 text-[#0a0f18] rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(45,212,191,0.3)] hover:scale-[1.02]">
                  Analyze Your Resume <ArrowRight className="w-5 h-5" strokeWidth={3} />
                </Link>
                {!isAuth && (
                  <Link to="/login" className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-gray-800 text-white rounded-2xl text-lg font-bold backdrop-blur-sm transition-all text-center">
                    Sign In
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-900 bg-[#0d1420]/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center animate-fade-up stagger-${(i % 4) + 1}`}>
                <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Everything You Need to <span className="text-teal-400">Succeed</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Our AI analyzes your resume against job requirements to give you the competitive edge.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <div key={feature.title} className="group p-8 rounded-3xl bg-[#0d1420] border border-gray-800 hover:border-teal-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative z-10 bg-[#0a0f18]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4 animate-fade-up">
              <Clock className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight animate-fade-up stagger-1">
              How It <span className="text-teal-400">Works</span>
            </h2>
            <p className="text-gray-400 text-lg animate-fade-up stagger-2">
              Get your resume analyzed in three simple steps
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent z-0" />
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {howItWorksSteps.map((item, i) => (
                <div key={item.step} className="flex flex-col items-center text-center group animate-fade-up" style={{ animationDelay: `${0.2 * (i + 1)}s` }}>
                  <div className="relative mb-8">
                    <div className="w-32 h-32 rounded-full bg-[#0d1420] border border-gray-800 flex items-center justify-center transition-all duration-500 group-hover:border-teal-500/50 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.1)]">
                      <item.icon className="w-12 h-12 text-teal-400" />
                    </div>
                    <div className="absolute top-0 right-0 w-10 h-10 rounded-full bg-teal-400 text-[#0a0f18] font-bold flex items-center justify-center text-sm shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative z-10">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4 animate-fade-up">
              <Users className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-teal-400">Job Seekers</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              See what our users have to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <div 
                key={testimonial.name}
                className="p-8 bg-[#0d1420] border border-gray-800 rounded-3xl backdrop-blur-xl relative animate-fade-up"
                style={{ animationDelay: `${0.15 * i}s` }}
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-teal-500/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic relative z-10 text-sm">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/20"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">{testimonial.name}</div>
                    <div className="text-[11px] text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/20 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal-500/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-500/10 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                Ready to <span className="text-teal-400">Get Hired?</span>
              </h2>
              <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Join over 50,000 job seekers who've improved their resumes and landed interviews at top companies
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/dashboard" className="w-full sm:w-auto px-10 py-4 bg-teal-400 hover:bg-teal-300 text-[#0a0f18] rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal-500/25">
                  Start Free Analysis <ArrowRight className="w-5 h-5" strokeWidth={3} />
                </Link>
                {!isAuth && (
                  <Link to="/login" className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-gray-800 text-white rounded-2xl text-lg font-bold backdrop-blur-sm transition-all text-center">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

 {/* Footer Section */}
<footer className="py-20 border-t border-gray-900 bg-[#0a0f18] relative z-10">
  <div className="container mx-auto px-6">
    {/* Added justify-items-center to center the grid columns themselves */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 justify-items-center text-center">
      
      {/* Branding Column */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-15 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center border border-teal-500/20">
            <img src={logo} alt="InsightCV logo" className="w-25 h-25 object-contain" />
          </div>
          <span className="font-bold text-2xl text-white">InsightCV</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          AI-powered resume analysis to help you land your dream job faster. Optimize your application with data-driven insights.
        </p>
      </div>

      {/* Product Column */}
      <div>
        <h4 className="text-white font-bold mb-6 text-lg">Product</h4>
        <ul className="flex flex-col gap-4 text-gray-400 text-sm font-medium">
          <li><a href="#features" className="hover:text-teal-400 transition-colors">Features</a></li>
          <li><a href="#how-it-works" className="hover:text-teal-400 transition-colors">How It Works</a></li>
          <li><a href="#" className="hover:text-teal-400 transition-colors">Analyze Resume</a></li>
        </ul>
      </div>

      {/* Company Column */}
      <div>
        <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
        <ul className="flex flex-col gap-4 text-gray-400 text-sm font-medium">
          <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-teal-400 transition-colors">Our Blog</a></li>
          <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
        </ul>
      </div>
    </div>

    <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="text-gray-500 text-sm font-medium">
        © 2025 InsightCV. All rights reserved.
      </p>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Mail className="w-4 h-4 text-teal-400" />
        <span>hello@insightcv.com</span>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Index;