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

  // Reset hovered path when location changes
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
          ? 'py-4 backdrop-blur-xl bg-white/60 dark:bg-dark/60 border-b border-white/20 dark:border-white/5 supports-[backdrop-filter]:bg-white/40'
          : 'py-6 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex-shrink-0 relative z-50">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-blue-600 rounded-xl blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative w-full h-full bg-gradient-to-br from-white to-primary-50 dark:from-dark-card dark:to-slate-800 rounded-xl flex items-center justify-center border border-white/50 dark:border-white/10 shadow-xl overflow-hidden">
                  <span className="text-xl transform group-hover:scale-110 transition-transform duration-300">🩺</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-slate-900 dark:text-white leading-none tracking-tight">
                  HealNet
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                  AI Medical
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl px-2 py-1.5 rounded-full border border-white/20 dark:border-white/5 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(location.pathname)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${location.pathname === link.path
                    ? 'text-primary-700 dark:text-primary-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
              >
                {hoveredPath === link.path && (
                  <motion.div
                    layoutId="navbar-highlight"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm"
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
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all border border-white/20 dark:border-white/5 backdrop-blur-sm"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode='wait' initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
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
                  className="flex items-center gap-2 p-1 pl-2 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/5 hover:bg-white dark:hover:bg-slate-700 transition-all backdrop-blur-sm group"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden sm:block max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white dark:ring-slate-900 group-hover:ring-primary-400 transition-all">
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
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-800 rounded-2xl shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl" onClick={() => setShowUserMenu(false)}>
                          👤 Profile
                        </Link>
                        <Link to="/history" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl" onClick={() => setShowUserMenu(false)}>
                          📋 History
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        >
                          🚪 Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-slate-900/20"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button - visible on small screens */}
            <div className="md:hidden">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Expandable */}
        <AnimatePresence>
          {showUserMenu && !isAuthenticated && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-slate-800 rounded-2xl mt-2 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="p-4 space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium"
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
