import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, Mail, Eye, EyeOff, Laptop } from "lucide-react";
import { loginStyles } from "../assets/dummyStyles";
import loginIllustration from "../assets/login_illustration.png";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${API_BASE}/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = res.data || {};
      const token = data.token || null;
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
          console.warn("Could not fetch profile after login token:", fetchErr);
          profile = { email };
        }
      }
      
      if (!profile) profile = { email };
      
      persistAuth(profile, token);
      
      if (typeof onLogin === "function") {
        try {
          onLogin(profile, rememberMe, token);
        } catch (callErr) {
          console.warn("onLogin threw:", callErr);
          navigate("/");
        }
      } else {
        navigate("/");
      }
      setPassword("");
    } catch (err) {
      console.error("Login error:", err?.response || err);
      const serverMsg =
        err.response?.data?.message ||
        (err.response?.data ? JSON.stringify(err.response.data) : null) ||
        err.message ||
        "Login failed";
      setError(serverMsg);
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

        {/* Premium Conversation Illustration Mockup Window */}
        <div className="flex-1 flex items-center justify-center z-10 py-6">
          <div className="relative group p-2.5 rounded-3xl bg-[#1a1a1a]/50 border border-zinc-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] max-w-[480px] w-[85%] transition-all duration-500 hover:scale-[1.01] hover:border-zinc-700/50">
            {/* Top Bar Controls for Software Vibe */}
            <div className="flex items-center gap-1.5 px-3 pb-3 pt-1 border-b border-zinc-900/50 mb-3 select-none">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/35"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/35"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/35"></div>
            </div>
            {/* Actual Illustration Image */}
            <img 
              src={loginIllustration} 
              alt="Login Illustration" 
              className="w-full h-auto object-contain rounded-2xl select-none pointer-events-none border border-zinc-900/30 shadow-inner" 
            />
          </div>
        </div>

        {/* Powered Footer */}
        <div className="text-zinc-650 text-xs font-semibold select-none z-10">
          Powered by expensio v1.0.0
        </div>
      </div>

      {/* 🔒 Right Panel (Login Form - 40% Width) */}
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

        {/* Centered Login Content Container */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-[340px] py-8">
          {/* Small centered illustration mockup window for Logon Box */}
          <div className="flex justify-center mb-6 select-none pointer-events-none">
            <div className="p-1.5 rounded-xl bg-[#1a1a1a]/50 border border-zinc-800/60 shadow-lg max-w-[130px]">
              <div className="flex items-center gap-1 px-1.5 pb-1.5 pt-0.5 border-b border-zinc-900/30 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/25"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/25"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/25"></div>
              </div>
              <img 
                src={loginIllustration} 
                alt="Login Illustration" 
                className="w-full h-auto object-contain rounded-lg border border-zinc-900/20" 
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1.5">
              Welcome to expensio
            </h2>
            <p className="text-xs text-zinc-400 font-semibold mb-8">
              Please log in with your expensio account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-950/20 text-red-400 border border-red-900/30 rounded-lg flex items-center gap-2 text-xs">
              <span className="font-semibold break-words flex-1">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username/Email Input */}
            <div>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-lg px-3.5 py-3 text-xs text-white placeholder-zinc-550 focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all font-semibold"
                  placeholder="Username"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-lg pl-3.5 pr-10 py-3 text-xs text-white placeholder-zinc-550 focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all font-semibold"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-[#C87830] cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sub-form Actions Row */}
            <div className="flex justify-end text-xs font-semibold py-1">
              <button 
                type="button"
                onClick={() => alert("Please contact support or register a new account if you have forgotten your password.")}
                className="text-zinc-550 hover:text-zinc-400 bg-transparent border-none cursor-pointer p-0"
              >
                Forget Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C87830] hover:bg-[#b06020] text-white py-3 rounded-lg font-bold shadow transition-all flex items-center justify-center text-xs cursor-pointer active:scale-[0.98] select-none disabled:opacity-70 disabled:cursor-not-allowed border-none mt-2"
            >
              {isLoading ? "Signing in..." : "Log In"}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-8 text-center text-xs font-semibold">
            <span className="text-zinc-500">Don't have an account?</span>
            <Link to="/signup" className="text-[#C87830] hover:underline ml-1 font-bold">
              Create an account
            </Link>
          </div>
        </div>

        {/* Bottom Language & Footer for Mobile */}
        <div className="w-full flex flex-col items-center gap-4 text-xs font-semibold text-zinc-500">
          <span className="text-zinc-650 cursor-pointer hover:underline">English</span>
          <span className="lg:hidden text-zinc-650 text-[10px] select-none">
            Powered by expensio v1.0.0
          </span>
        </div>
      </div>

    </div>
  );
};

export default Login;
