import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const { darkMode } = useDarkMode();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);

      if (result.success) {
        navigate('/', { replace: true });
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    loginWithGoogle();
  };

  return (
    <div className={`min-h-[calc(100vh-200px)] flex items-center justify-center py-12 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    } -mx-4 sm:-mx-6 lg:-mx-8 -my-8 px-4 sm:px-6 lg:px-8`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 -mt-18"
      >
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Create your account
          </h2>
          <p className={`mt-2 text-center text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } py-8 px-4 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-lg sm:px-10 ${
          darkMode
            ? 'shadow-blue-500/20 hover:shadow-blue-500/40 ring-1 ring-blue-500/10 hover:ring-blue-500/20'
            : 'shadow-blue-200/30 hover:shadow-blue-300/60 ring-1 ring-blue-200/20 hover:ring-blue-300/40'
        }`}>
          {error && (
            <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:bg-gray-700'
                      : 'border-gray-300 text-gray-900 hover:border-gray-400 focus:border-blue-500 hover:bg-blue-50/30'
                  } rounded-md shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                    darkMode
                      ? 'focus:ring-blue-400 focus:shadow-blue-400/30'
                      : 'focus:ring-blue-500 focus:shadow-blue-300/50 focus:bg-blue-50/50'
                  }`}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:bg-gray-700'
                      : 'border-gray-300 text-gray-900 hover:border-gray-400 focus:border-blue-500 hover:bg-blue-50/30'
                  } rounded-md shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                    darkMode
                      ? 'focus:ring-blue-400 focus:shadow-blue-400/30'
                      : 'focus:ring-blue-500 focus:shadow-blue-300/50 focus:bg-blue-50/50'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:bg-gray-700'
                      : 'border-gray-300 text-gray-900 hover:border-gray-400 focus:border-blue-500 hover:bg-blue-50/30'
                  } rounded-md shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                    darkMode
                      ? 'focus:ring-blue-400 focus:shadow-blue-400/30'
                      : 'focus:ring-blue-500 focus:shadow-blue-300/50 focus:bg-blue-50/50'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Must be at least 6 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:bg-gray-700'
                      : 'border-gray-300 text-gray-900 hover:border-gray-400 focus:border-blue-500 hover:bg-blue-50/30'
                  } rounded-md shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                    darkMode
                      ? 'focus:ring-blue-400 focus:shadow-blue-400/30'
                      : 'focus:ring-blue-500 focus:shadow-blue-300/50 focus:bg-blue-50/50'
                  }`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md hover:shadow-xl hover:shadow-blue-400/50 active:shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${
                  darkMode ? 'border-gray-600' : 'border-gray-300'
                }`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${
                  darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
                }`}>
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignup}
                type="button"
                className={`w-full inline-flex justify-center py-2 px-4 border ${
                  darkMode
                    ? 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                } rounded-md shadow-md active:shadow-sm text-sm font-medium ${
                  darkMode ? 'text-gray-300 hover:shadow-lg' : 'text-gray-700 hover:shadow-xl hover:shadow-gray-300/50'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className={`text-sm font-medium ${
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Continue as guest
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
