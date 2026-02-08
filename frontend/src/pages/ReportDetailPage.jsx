import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReportResult from '../components/reports/ReportResult';
import Button from '../components/common/Button';
import AnimatedBackground from '../components/common/AnimatedBackground';

export default function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/reports/${id}`, {
        headers,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch medical report');
      }

      const data = await response.json();
      console.log('Report data:', data);
      setReport(data.data || data.report);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError(err.message || 'Failed to load medical report');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeAnother = () => {
    navigate('/reports');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-stone-200 dark:border-stone-700 border-t-emerald-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
            Loading medical report...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-10 h-10 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <h2 className="text-xl font-display font-bold text-stone-900 dark:text-white mb-2">
            Error Loading Report
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
            {error}
          </p>
          <Button onClick={() => navigate('/history')}>
            Back to History
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate('/history')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to History
          </button>
        </motion.div>

        {report && (
          <ReportResult
            result={report}
            onAnalyzeAnother={handleAnalyzeAnother}
          />
        )}
      </div>
    </div>
  );
}
