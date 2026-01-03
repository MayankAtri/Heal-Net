import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';

export default function History() {
  const { user, isAuthenticated } = useAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'prescription', 'report', 'otc'
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

      const response = await fetch(`${API_URL}/history?${params}`, {
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
      const response = await fetch(`${API_URL}/history/stats`, {
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
      const response = await fetch(`${API_URL}/history/${itemType}/${itemId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setHistory(history.filter(item => item.id !== itemId));
        fetchStats(); // Refresh stats
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
      case 'prescription': return 'bg-blue-100 text-blue-800';
      case 'report': return 'bg-green-100 text-green-800';
      case 'otc': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950"></div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 dark:from-indigo-600/10 dark:to-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 dark:from-cyan-600/10 dark:to-teal-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Your Analysis History
            </span>
          </h1>

          {/* Stats Cards */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            >
              <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ duration: 0.3 }}>
                <GlassCard padding="md" className="bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/10 dark:to-blue-900/10">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Analyses</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                    {stats.totalAnalyses}
                  </p>
                </GlassCard>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ duration: 0.3 }}>
                <GlassCard padding="md" className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Prescriptions</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    {stats.prescriptions}
                  </p>
                </GlassCard>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ duration: 0.3 }}>
                <GlassCard padding="md" className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Reports</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                    {stats.reports}
                  </p>
                </GlassCard>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ duration: 0.3 }}>
                <GlassCard padding="md" className="bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-900/10 dark:to-cyan-900/10">
                  <p className="text-sm text-gray-600 dark:text-gray-400">OTC Consultations</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    {stats.otcConsultations}
                  </p>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard padding="lg" className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      filter === 'all'
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
                    }`}
                  >
                    All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter('prescription')}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      filter === 'prescription'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
                    }`}
                  >
                    Prescriptions
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter('report')}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      filter === 'report'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                        : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
                    }`}
                  >
                    Reports
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter('otc')}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      filter === 'otc'
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
                    }`}
                  >
                    OTC
                  </motion.button>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search history..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-cyan-900/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white w-full md:w-64 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 shadow-lg transition-all duration-300"
                  >
                    Search
                  </motion.button>
                </form>
              </div>
            </GlassCard>
          </motion.div>

          {/* History Items */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mx-auto w-12 h-12 border-4 border-indigo-600 border-t-cyan-600 rounded-full"
                />
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading history...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard padding="lg" className="bg-gradient-to-br from-red-50/50 to-rose-50/50 dark:from-red-900/10 dark:to-rose-900/10 border-red-200/50 dark:border-red-700/50">
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </GlassCard>
              </motion.div>
            ) : history.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard padding="xl" className="text-center">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 dark:text-gray-400"
                  >
                    No analysis history yet. Start using HealNet to build your medical history!
                  </motion.p>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <GlassCard padding="lg" className="hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <motion.span
                              whileHover={{ scale: 1.1 }}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}
                            >
                              {getTypeLabel(item.type)}
                            </motion.span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <div className="flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => navigate(`/${item.type === 'prescription' ? 'prescription' : item.type === 'report' ? 'reports' : 'otc'}/${item.id}`)}
                              className="text-indigo-600 dark:text-cyan-400 hover:text-indigo-700 dark:hover:text-cyan-300 font-medium text-sm"
                            >
                              View Details →
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(item.id, item.type)}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm"
                            >
                              Delete
                            </motion.button>
                          </div>
                        </div>
                        {item.imageUrl && (
                          <motion.img
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-xl ml-4 shadow-md"
                          />
                        )}
                      </div>
                    </GlassCard>
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
