import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkAuth } = useAuth();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const handleCallback = async () => {
      const success = searchParams.get('success');
      const error = searchParams.get('error');

      if (error) {
        // Redirect to login with error
        navigate('/login?error=' + error, { replace: true });
        return;
      }

      if (success === 'true') {
        // Google OAuth was successful, refresh auth state
        await checkAuth();
        navigate('/', { replace: true });
      } else {
        // No success parameter, redirect to login
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate, checkAuth]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Completing sign in...
        </p>
      </div>
    </div>
  );
}
