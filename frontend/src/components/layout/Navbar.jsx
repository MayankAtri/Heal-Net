import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = React.useRef(null);

  // Click outside to close user menu
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showUserMenu]);

  // Detect scroll to collapse navbar
  React.useEffect(() => {
    let lastScrollTop = 0;
    let scrollTimer;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isScrollingDown = scrollTop > lastScrollTop;

      // Clear any pending timer
      clearTimeout(scrollTimer);

      if (scrollTop < 50) {
        // At the top of the page - always expand
        setIsScrolled(false);
        setIsNavExpanded(true);
      } else {
        // Scrolled down
        setIsScrolled(true);

        if (isScrollingDown) {
          // Scrolling down - collapse immediately
          if (!showUserMenu) {
            setIsNavExpanded(false);
          }
        } else {
          // Scrolling up - wait a bit before collapsing again
          scrollTimer = setTimeout(() => {
            if (!showUserMenu && scrollTop > 50) {
              setIsNavExpanded(false);
            }
          }, 1000);
        }
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [showUserMenu]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    if (isScrolled) {
      setIsNavExpanded(false);
    }
    navigate('/');
  };

  const handleUserMenuToggle = (e) => {
    e.stopPropagation();
    console.log('Toggle clicked, current state:', showUserMenu);
    setShowUserMenu(!showUserMenu);
    if (!showUserMenu) {
      // Opening menu - make sure nav stays expanded
      setIsNavExpanded(true);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/prescription', label: 'Prescription' },
    { path: '/reports', label: 'Medical Reports' },
    { path: '/otc', label: 'OTC Consultation' },
    { path: '/disposal', label: 'Disposal Info' },
  ];

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Extreme Left with Glass Background */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-full shadow-lg border border-white/20 dark:border-gray-800/20 hover:shadow-xl transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-[#007AFF] to-[#0051D5] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">HealNet</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Medical Assistant</p>
              </div>
            </div>
          </Link>

          {/* Navigation Links - Extreme Right with Glass Background - Collapsible */}
          <div
            className="hidden md:flex items-center ml-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-full shadow-lg border border-white/20 dark:border-gray-800/20 px-2 py-2"
            style={{
              maxWidth: isNavExpanded ? '950px' : '60px',
              transition: 'max-width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: isNavExpanded ? 'visible' : 'hidden'
            }}
            onMouseEnter={() => setIsNavExpanded(true)}
            onMouseLeave={() => {
              if (isScrolled && !showUserMenu) {
                setIsNavExpanded(false);
              }
            }}
          >
            {/* Menu Icon - Visible when collapsed */}
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                opacity: isNavExpanded ? 0 : 1,
                width: isNavExpanded ? '0px' : 'auto',
                transition: 'opacity 0.3s ease-in-out, width 0.3s ease-in-out'
              }}
            >
              <button className="p-2 rounded-full text-gray-700 dark:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Expanded Content */}
            <div
              className="flex items-center gap-2"
              style={{
                opacity: isNavExpanded ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out 0.1s',
                pointerEvents: isNavExpanded ? 'auto' : 'none'
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive(link.path)
                      ? 'bg-[#007AFF] text-white shadow-md shadow-blue-500/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Dark Mode Toggle */}
              <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-600/50 mx-1"></div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>

              {/* Auth UI */}
              <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-600/50 mx-1"></div>
              {isAuthenticated ? (
                <div ref={userMenuRef} className="relative flex-shrink-0 z-50">
                  <button
                    type="button"
                    onClick={handleUserMenuToggle}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                  >
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <svg className={`w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2"
                      style={{ zIndex: 9999 }}
                    >
                      <div className="px-3 py-2 border-b border-gray-200/50 dark:border-gray-700/50 mb-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                      </div>
                      <div className="px-2 space-y-1">
                        <Link
                          to="/profile"
                          onClick={() => {
                            setShowUserMenu(false);
                            if (isScrolled) setIsNavExpanded(false);
                          }}
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-all duration-200 rounded-xl"
                        >
                          👤 Profile
                        </Link>
                        <Link
                          to="/history"
                          onClick={() => {
                            setShowUserMenu(false);
                            if (isScrolled) setIsNavExpanded(false);
                          }}
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-all duration-200 rounded-xl"
                        >
                          📋 History
                        </Link>
                        <div className="my-2 border-t border-gray-200/50 dark:border-gray-700/50"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/70 dark:hover:bg-red-900/30 transition-all duration-200 rounded-xl font-medium"
                        >
                          🚪 Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-[#007AFF] text-white rounded-full hover:bg-[#0051D5] shadow-md shadow-blue-500/30 transition-all duration-300 whitespace-nowrap flex-shrink-0"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 ml-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-full shadow-lg border border-white/20 dark:border-gray-800/20 px-2 py-2">
            {/* Dark Mode Toggle for Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>

            <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-600/50"></div>

            <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
