import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setHoveredPath(location.pathname);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/prescription', label: 'Prescription' },
    { path: '/reports', label: 'Reports' },
    { path: '/otc', label: 'Consultation' },
    { path: '/disposal', label: 'Disposal' },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled
          ? 'py-3 backdrop-blur-xl bg-white/70 dark:bg-[#0a0a0f]/70 border-b border-emerald-200/30 dark:border-stone-800/50 shadow-sm shadow-emerald-900/[0.02]'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex-shrink-0 relative z-50">
            <div className="flex items-center gap-2.5">
              <div style={{ width: '36px', height: '36px' }} className="relative w-9 h-9">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div style={{ width: '36px', height: '36px', overflow: 'hidden' }} className="relative w-full h-full bg-stone-900 dark:bg-white rounded-xl flex items-center justify-center overflow-hidden">
                  <svg width="20" height="20" className="w-5 h-5 text-white dark:text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-stone-900 dark:text-white leading-none tracking-tight">
                  HealNet
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  AI Medical
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-white/70 dark:bg-dark-card/60 backdrop-blur-2xl px-1.5 py-1 rounded-full border border-emerald-200/25 dark:border-stone-800/40 shadow-sm shadow-emerald-900/[0.02]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(location.pathname)}
                className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 ${location.pathname === link.path
                    ? 'text-emerald-700 dark:text-white'
                    : 'text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-stone-200'
                  }`}
              >
                {hoveredPath === link.path && (
                  <motion.div
                    layoutId="navbar-highlight"
                    className="absolute inset-0 bg-emerald-50 dark:bg-stone-800 rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30
                    }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode='wait' initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {darkMode ? (
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Auth Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 pl-3 rounded-full bg-white/60 dark:bg-dark-card/60 border border-stone-200/40 dark:border-stone-800/40 hover:bg-stone-100 dark:hover:bg-dark-surface transition-all backdrop-blur-sm group"
                >
                  <span className="text-[13px] font-medium text-stone-600 dark:text-stone-300 hidden sm:block max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-xs">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user?.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 origin-top-right bg-white dark:bg-dark-card rounded-xl shadow-xl shadow-stone-900/10 dark:shadow-black/30 ring-1 ring-stone-200/50 dark:ring-stone-800/50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
                        <p className="text-[11px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-medium">Signed in as</p>
                        <p className="text-sm font-medium text-stone-900 dark:text-white truncate mt-0.5">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-dark-surface rounded-lg transition-colors" onClick={() => setShowUserMenu(false)}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>
                          Profile
                        </Link>
                        <Link to="/history" className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-dark-surface rounded-lg transition-colors" onClick={() => setShowUserMenu(false)}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          History
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link to="/login" className="px-4 py-1.5 text-[13px] font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors rounded-full">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-[13px] font-medium text-white bg-emerald-600 dark:bg-white dark:text-stone-900 rounded-full hover:bg-emerald-700 dark:hover:bg-stone-100 transition-colors shadow-sm shadow-emerald-600/20 dark:shadow-none"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {showUserMenu && !isAuthenticated && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-dark-card rounded-xl mt-2 shadow-lg border border-stone-200/50 dark:border-stone-800/50"
            >
              <div className="p-3 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-dark-surface font-medium text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
