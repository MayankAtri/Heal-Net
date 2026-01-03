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
      console.log('All search params:', Object.fromEntries(searchParams.entries()));

      const success = searchParams.get('success');
      const error = searchParams.get('error');

      console.log('Parsed values:', { success, error });

      if (error) {
        console.error('Auth callback error:', error);
        navigate('/login?error=' + error, { replace: true });
        return;
      }

      if (success === 'true') {
        try {
          console.log('Google auth successful, checking authentication...');

          // Wait a moment for cookies to be properly set
          await new Promise(resolve => setTimeout(resolve, 100));

          // Cookies are already set by the backend, just check auth
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
        console.warn('No success parameter, redirecting to login');
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
