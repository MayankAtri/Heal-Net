import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import AnimatedBackground from '../components/common/AnimatedBackground';

export default function History() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchHistory();
    fetchStats();
  }, [isAuthenticated, filter]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('type', filter);
      if (searchQuery) params.append('search', searchQuery);

      const token = localStorage.getItem('accessToken');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/history?${params}`, {
        headers,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const data = await response.json();
      setHistory(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/history/stats`, {
        headers,
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleDelete = async (itemId, itemType) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/history/${itemType}/${itemId}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
      });

      if (response.ok) {
        setHistory(history.filter(item => item.id !== itemId));
        fetchStats();
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHistory();
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'prescription': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30';
      case 'report': return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/30';
      case 'otc': return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/30';
      default: return 'bg-stone-50 dark:bg-stone-900/20 text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-800/30';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'prescription': return 'Prescription';
      case 'report': return 'Medical Report';
      case 'otc': return 'OTC Consultation';
      default: return type;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'prescription', label: 'Prescriptions' },
    { value: 'report', label: 'Reports' },
    { value: 'otc', label: 'OTC' },
  ];

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3 block">Dashboard</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white">
              Analysis History
            </h1>
          </div>

          {/* Stats Cards */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
            >
              {[
                { label: 'Total', value: stats.totalAnalyses, color: 'text-stone-900 dark:text-white' },
                { label: 'Prescriptions', value: stats.prescriptions, color: 'text-blue-600 dark:text-blue-400' },
                { label: 'Reports', value: stats.reports, color: 'text-emerald-600 dark:text-emerald-400' },
                { label: 'OTC', value: stats.otcConsultations, color: 'text-amber-600 dark:text-amber-400' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 dark:border-stone-800/60 p-5 shadow-sm"
                >
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-6"
          >
            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 dark:border-stone-800/60 p-4 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {filters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilter(f.value)}
                      className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        filter === f.value
                          ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search history..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50/50 dark:bg-dark-surface/50 text-stone-900 dark:text-white text-sm w-full md:w-56 transition-all duration-200 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* History Items */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="mx-auto w-10 h-10 border-2 border-stone-200 dark:border-stone-700 border-t-emerald-500 rounded-full animate-spin" />
                <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">Loading history...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-red-50/80 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30 rounded-2xl p-6">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </motion.div>
            ) : history.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 dark:border-stone-800/60 p-12 shadow-sm text-center">
                  <svg className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    No analysis history yet. Start using HealNet to build your medical history.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 dark:border-stone-800/60 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-medium ${getTypeColor(item.type)}`}>
                              {getTypeLabel(item.type)}
                            </span>
                            <span className="text-xs text-stone-400 dark:text-stone-500">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-3">
                            {item.title}
                          </h3>
                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                const routeMap = {
                                  'prescription': `/prescription/${item.id}`,
                                  'report': `/reports/${item.id}`,
                                  'otc': `/otc/${item.id}`
                                };
                                navigate(routeMap[item.type] || '/');
                              }}
                              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium text-xs"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, item.type)}
                              className="text-red-500 dark:text-red-400 hover:underline font-medium text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-xl ml-4 border border-stone-200/60 dark:border-stone-800/60"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
