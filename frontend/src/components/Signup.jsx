import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signupStyles } from "../assets/dummyStyles";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const Signup = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async (token) => {
    if (!token) return null;
    const res = await axios.get(`${API_BASE}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data?.user || res.data;
  };

  const persistAuth = (userObj, tokenStr) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    try {
      if (tokenStr) storage.setItem("token", tokenStr);
      if (userObj) storage.setItem("user", JSON.stringify(userObj));
    } catch (err) {
      console.error("Storage error:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!hasUppercase || !hasLowercase) {
        newErrors.password = "Password must contain both uppercase and lowercase letters";
      } else if (!hasSymbol) {
        newErrors.password = "Password must contain at least one symbol";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/user/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = res.data || {};
      const token = data.token ?? null;
      let profile = data.user ?? null;
      
      if (!profile) {
        const copy = { ...data };
        delete copy.token;
        delete copy.user;
        if (Object.keys(copy).length) profile = copy;
      }
      
      if (!profile && token) {
        try {
          profile = await fetchProfile(token);
        } catch (fetchErr) {
          console.warn("Could not fetch profile after signup token:", fetchErr);
          profile = null;
        }
      }
      
      if (!profile) profile = { name, email };
      
      persistAuth(profile, token);
      
      if (typeof onSignup === "function") {
        try {
          onSignup(profile, rememberMe, token);
        } catch (callErr) {
          console.warn("onSignup threw:", callErr);
          navigate("/");
        }
      } else {
        navigate("/");
      }
      setPassword("");
    } catch (err) {
      console.error("Signup error:", err?.response || err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors({ api: err.response.data.message });
      } else {
        setErrors({ api: err.message || "An unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#121212] text-zinc-100 font-sans overflow-hidden">
      
      {/* 🎨 Left Panel (Desktop only - 60% Width) */}
      <div className="hidden lg:flex flex-col justify-between w-[60%] p-12 bg-[#121212] select-none h-screen relative">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 z-10 cursor-pointer select-none" onClick={() => navigate("/")}>
          <div className="w-8 h-8 rounded-[9px] bg-[#C87830] flex items-center justify-center shadow-md shrink-0">
            <svg className="w-5 h-5 text-neutral-950" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
              <path d="M12 4 C16.42 4 20 7.58 20 12 L12 12 Z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            expensio
          </span>
        </div>

        {/* Premium Illustration Vector SVG */}
        <div className="flex-1 flex items-center justify-center z-10 py-6">
          <svg className="w-[85%] max-w-[520px] h-auto" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="300" cy="330" rx="220" ry="12" fill="#1b1b1b" />
            <path d="M120 280 L140 200 L180 200 L185 280 Z" fill="#0d9488" opacity="0.8" />
            <path d="M130 280 L110 350" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
            <path d="M175 280 L185 350" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
            
            <path d="M170 200 C170 170 140 170 140 200 L145 260 L180 260 Z" fill="#eab308" />
            <path d="M145 260 L110 290 L115 320" stroke="#1e293b" strokeWidth="18" strokeLinecap="round" />
            <path d="M175 260 L155 310 L180 320" stroke="#1e293b" strokeWidth="18" strokeLinecap="round" />
            <circle cx="155" cy="150" r="18" fill="#fbcfe8" />
            <path d="M150 135 C135 140 140 160 145 160 Z" fill="#475569" />
            <path d="M140 185 C115 170 95 145 105 130" stroke="#eab308" strokeWidth="10" strokeLinecap="round" />
            <circle cx="105" cy="130" r="6" fill="#fbcfe8" />

            <path d="M280 290 L260 220 L310 220 L320 290 Z" fill="#4b5563" />
            <path d="M275 290 L255 360" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
            <path d="M315 290 L325 360" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
            
            <path d="M260 220 C260 180 320 180 320 220 L310 280 L270 280 Z" fill="#c87830" />
            <path d="M270 280 L280 350" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
            <path d="M305 280 L315 350" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
            <circle cx="290" cy="165" r="18" fill="#ffedd5" />
            <path d="M285 150 C295 150 305 145 300 160 Z" fill="#1e293b" />
            <rect x="260" y="225" width="40" height="6" rx="2" fill="#fff" transform="rotate(-15 260 225)" />

            <path d="M430 190 C430 150 470 150 470 190 L460 250 L440 250 Z" fill="#2563eb" />
            <path d="M440 250 L425 340 C445 345 470 345 475 340 L460 250 Z" fill="#c87830" />
            <path d="M435 340 L435 360" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
            <path d="M465 340 L465 360" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
            <circle cx="450" cy="135" r="18" fill="#fed7aa" />
            <path d="M445 120 C465 115 470 135 465 145" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <path d="M435 180 C410 170 395 160 400 150" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" />
            <circle cx="400" cy="150" r="6" fill="#fed7aa" />
          </svg>
        </div>

        <div className="text-zinc-650 text-xs font-semibold select-none z-10">
          Powered by expensio v1.0.0
        </div>
      </div>

      {/* 🔒 Right Panel (Signup Form - 40% Width) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-between items-center p-8 lg:p-12 bg-[#181818] h-screen border-l border-zinc-900 relative">
        <div className="w-full flex justify-between items-center lg:hidden">
          {/* Small Screen Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-[9px] bg-[#C87830] flex items-center justify-center shadow-md shrink-0">
              <svg className="w-5 h-5 text-neutral-950" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
                <path d="M12 4 C16.42 4 20 7.58 20 12 L12 12 Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight text-white">expensio</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-[340px] py-6 overflow-y-auto custom-scrollbar">
          {/* Small centered vector illustration for Logon Box */}
          <div className="flex justify-center mb-6 select-none pointer-events-none">
            <svg className="w-[180px] h-auto" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background Floor Shadow */}
              <ellipse cx="300" cy="330" rx="220" ry="12" fill="#1b1b1b" />
              
              {/* Left Sitting Person (Yellow shirt, dark pants, sitting on teal chair) */}
              <path d="M120 280 L140 200 L180 200 L185 280 Z" fill="#0d9488" opacity="0.8" />
              <path d="M130 280 L110 350" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <path d="M175 280 L185 350" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <path d="M170 200 C170 170 140 170 140 200 L145 260 L180 260 Z" fill="#eab308" />
              <path d="M145 260 L110 290 L115 320" stroke="#1e293b" strokeWidth="18" strokeLinecap="round" />
              <path d="M175 260 L155 310 L180 320" stroke="#1e293b" strokeWidth="18" strokeLinecap="round" />
              <circle cx="155" cy="150" r="18" fill="#fbcfe8" />
              <path d="M150 135 C135 140 140 160 145 160 Z" fill="#475569" />
              <path d="M140 185 C115 170 95 145 105 130" stroke="#eab308" strokeWidth="10" strokeLinecap="round" />
              <circle cx="105" cy="130" r="6" fill="#fbcfe8" />

              {/* Middle sitting person (Orange sweater, slate chair, laptop) */}
              <path d="M280 290 L260 220 L310 220 L320 290 Z" fill="#4b5563" />
              <path d="M275 290 L255 360" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <path d="M315 290 L325 360" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <path d="M260 220 C260 180 320 180 320 220 L310 280 L270 280 Z" fill="#c87830" />
              <path d="M270 280 L280 350" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
              <path d="M305 280 L315 350" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
              <circle cx="290" cy="165" r="18" fill="#ffedd5" />
              <path d="M285 150 C295 150 305 145 300 160 Z" fill="#1e293b" />
              <rect x="260" y="225" width="40" height="6" rx="2" fill="#fff" transform="rotate(-15 260 225)" />

              {/* Right Standing Person (Blue shirt, orange skirt) */}
              <path d="M430 190 C430 150 470 150 470 190 L460 250 L440 250 Z" fill="#2563eb" />
              <path d="M440 250 L425 340 C445 345 470 345 475 340 L460 250 Z" fill="#c87830" />
              <path d="M435 340 L435 360" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
              <path d="M465 340 L465 360" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
              <circle cx="450" cy="135" r="18" fill="#fed7aa" />
              <path d="M445 120 C465 115 470 135 465 145" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <path d="M435 180 C410 170 395 160 400 150" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" />
              <circle cx="400" cy="150" r="6" fill="#fed7aa" />
            </svg>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1.5">
              Create Account
            </h2>
            <p className="text-xs text-zinc-400 font-semibold mb-6">
              Join expensio to manage your finances
            </p>
          </div>

          {errors.api && (
            <div className="mb-4 p-3 bg-red-950/20 text-red-400 border border-red-900/30 rounded-lg text-xs font-semibold">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full bg-[#1e1e1e] border ${errors.name ? "border-red-900/50" : "border-zinc-800"} rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-550 focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all font-semibold`}
                placeholder="Full Name"
              />
              {errors.name && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.name}</p>}
            </div>

            {/* Email Address Input */}
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-[#1e1e1e] border ${errors.email ? "border-red-900/50" : "border-zinc-800"} rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-550 focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all font-semibold`}
                placeholder="Email Address"
              />
              {errors.email && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-[#1e1e1e] border ${errors.password ? "border-red-900/50" : "border-zinc-800"} rounded-lg pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-zinc-550 focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all font-semibold`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-[#C87830] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.password}</p>}
              
              <div className="text-[10px] text-zinc-400 mt-2.5 space-y-1 bg-[#1e1e1e]/60 p-2.5 rounded-lg border border-zinc-800">
                <p className="font-bold text-zinc-300">Password requirements:</p>
                <ul className="list-disc pl-3.5 space-y-0.5 font-semibold text-zinc-450">
                  <li>Minimum 8 characters</li>
                  <li>Mixed case (uppercase & lowercase)</li>
                  <li>At least one symbol</li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C87830] hover:bg-[#b06020] text-white py-2.5 rounded-lg font-bold shadow transition-all flex items-center justify-center text-xs cursor-pointer active:scale-[0.98] select-none disabled:opacity-70 disabled:cursor-not-allowed border-none mt-2"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Already have an account */}
          <div className="mt-6 text-center text-xs font-semibold">
            <span className="text-zinc-500">Already have an account?</span>
            <Link to="/login" className="text-[#C87830] hover:underline ml-1 font-bold">
              Sign in
            </Link>
          </div>
        </div>

        {/* Mobile bottom lang */}
        <div className="w-full flex flex-col items-center gap-3 text-xs font-semibold text-zinc-500">
          <span className="text-zinc-650 cursor-pointer hover:underline">English</span>
          <span className="lg:hidden text-zinc-650 text-[10px] select-none">
            Powered by expensio v1.0.0
          </span>
        </div>
      </div>

    </div>
  );
};

export default Signup;
