import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkAuth } = useAuth();
  const { darkMode } = useDarkMode();
  const [isProcessing, setIsProcessing] = React.useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent multiple executions
      if (isProcessing) {
        console.log('Already processing, skipping...');
        return;
      }

      setIsProcessing(true);
      console.log('=== Auth Callback Debug ===');

      // Check for tokens in URL hash (for Google OAuth)
      const hash = window.location.hash.substring(1); // Remove the '#'
      const hashParams = new URLSearchParams(hash);
      const accessToken = hashParams.get('accessToken');
      const refreshToken = hashParams.get('refreshToken');

      // Check for error in query params
      const error = searchParams.get('error');

      console.log('Hash params:', { hasAccessToken: !!accessToken, hasRefreshToken: !!refreshToken });
      console.log('Query params:', { error });

      if (error) {
        console.error('Auth callback error:', error);
        navigate('/login?error=' + error, { replace: true });
        return;
      }

      // If we have tokens in the hash (Google OAuth)
      if (accessToken && refreshToken) {
        try {
          console.log('Google OAuth tokens received, storing in localStorage...');

          // Store tokens in localStorage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // Check auth to update context
          await checkAuth();

          console.log('Auth successful, redirecting to home...');

          // Small delay before redirect to ensure state is updated
          await new Promise(resolve => setTimeout(resolve, 200));
          navigate('/', { replace: true });
        } catch (err) {
          console.error('Failed to verify authentication:', err);
          navigate('/login?error=auth_failed', { replace: true });
        }
      } else {
        console.warn('No tokens found in URL, redirecting to login');
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
