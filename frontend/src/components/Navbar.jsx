import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Sun, Moon, Home, ArrowUp, ArrowDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarStyles as styles } from "../assets/dummyStyles";

const MENU_ITEMS = [
  { text: "Dashboard", path: "/", icon: <Home size={15} /> },
  { text: "Income", path: "/income", icon: <ArrowUp size={15} /> },
  { text: "Expenses", path: "/expense", icon: <ArrowDown size={15} /> },
  { text: "Profile", path: "/profile", icon: <User size={15} /> },
];

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileUser = user || { name: "", email: "" };

  // Persistent Dark Mode State Management
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const handleLogout = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    if (typeof onLogout === "function") {
      onLogout();
    }
    navigate("/welcome");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name[0].toUpperCase();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Side: Brand Logo and Wordmark */}
        <div className="flex items-center flex-1 justify-start">
          <div className={styles.logoContainer} onClick={() => navigate("/")}>
            <div className="flex items-center gap-2 select-none">
              <div className="w-8 h-8 rounded-[9px] bg-[#C87830] flex items-center justify-center shadow-md shrink-0 border border-[#c87830]/30">
                <svg className="w-5 h-5 text-neutral-950" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M12 4 C16.42 4 20 7.58 20 12 L12 12 Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800 dark:text-zinc-100">
                expensio
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Menu Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 justify-center">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.text}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none
                  ${isActive 
                    ? "text-[#C87830] dark:text-[#d08038] bg-[#C87830]/10 border-b-2 border-[#C87830] rounded-b-none" 
                    : "text-zinc-650 dark:text-zinc-400 hover:text-[#C87830] dark:hover:text-[#D08038] hover:bg-zinc-150/40 dark:hover:bg-zinc-800/40"}`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Right Side Controls */}
        <div className="flex items-center flex-1 justify-end gap-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer shadow-sm ${
              darkMode
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                : "bg-white text-slate-700 hover:bg-zinc-100 border border-zinc-200 shadow-md"
            }`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-650" />
            )}
          </button>

          {/* User Section (Desktop Dropdown) */}
          {profileUser && profileUser.email && (
            <div className={`${styles.userContainer} hidden md:block`} ref={menuRef}>
              <button onClick={toggleMenu} className={styles.userButton}>
                <div className="relative">
                  <div className={styles.userAvatar + " overflow-hidden flex items-center justify-center p-0 bg-[#C87830] text-white border border-[#C87830]/35 shadow-sm"}>
                    {profileUser.profilePicture ? (
                      <img src={profileUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      getInitials(profileUser.name)
                    )}
                  </div>
                  <div className={styles.statusIndicator}></div>
                </div>
                <div className={styles.userTextContainer}>
                  <p className={styles.userName}>{profileUser.name || "User"}</p>
                  <p className={styles.userEmail}>{profileUser.email || "user@expensio.com"}</p>
                </div>
                <ChevronDown className={styles.chevronIcon(menuOpen)} />
              </button>
              
              {menuOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <div className="flex items-center gap-3">
                      <div className={styles.dropdownAvatar + " overflow-hidden flex items-center justify-center p-0 bg-[#C87830] text-white"}>
                        {profileUser.profilePicture ? (
                          <img src={profileUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          getInitials(profileUser.name)
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className={styles.dropdownName + " truncate"}>{profileUser.name || "User"}</div>
                        <div className={styles.dropdownEmail + " truncate"}>{profileUser.email || "user@expensio.com"}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.menuItemContainer}>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/profile");
                      }}
                      className={styles.menuItem}
                    >
                      <User className="w-4 h-4 text-zinc-500" />
                      <span>My Profile</span>
                    </button>
                  </div>
                  <div className={styles.menuItemBorder}>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-150/40 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.08 }}
            className="md:hidden absolute top-[57px] left-0 right-0 bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/60 shadow-lg py-4 px-5 space-y-4 z-40"
          >
            <ul className="space-y-1.5">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.text}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer
                        ${isActive 
                          ? "text-[#C87830] dark:text-[#d08038] bg-[#C87830]/10 border-l-4 border-[#C87830] pl-3" 
                          : "text-zinc-650 dark:text-zinc-400 hover:text-[#C87830] dark:hover:text-[#D08038] hover:bg-zinc-150/40 dark:hover:bg-zinc-800/40"}`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span>{item.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            {profileUser && profileUser.email && (
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-850 space-y-3">
                <div className="flex items-center gap-3 px-4">
                  <div className="w-9 h-9 rounded bg-[#C87830] flex items-center justify-center text-white font-bold overflow-hidden border border-[#C87830]/35 shadow-sm">
                    {profileUser.profilePicture ? (
                      <img src={profileUser.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      getInitials(profileUser.name)
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-zinc-850 dark:text-zinc-200 truncate">{profileUser.name || "User"}</p>
                    <p className="text-[10px] text-zinc-450 dark:text-zinc-500 truncate">{profileUser.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold bg-[#C87830]/10 text-[#C87830] dark:text-[#d08038] rounded-lg cursor-pointer"
                  >
                    <User size={15} /> Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-450 rounded-lg hover:bg-rose-500/20 transition-all cursor-pointer"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;