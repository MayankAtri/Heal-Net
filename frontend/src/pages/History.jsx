import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useNavigate } from 'react-router-dom';

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
      case 'otc': return 'bg-purple-100 text-purple-800';
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
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Analysis History
          </h1>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Analyses</p>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalAnalyses}
                </p>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Prescriptions</p>
                <p className="text-3xl font-bold text-blue-600">{stats.prescriptions}</p>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Reports</p>
                <p className="text-3xl font-bold text-green-600">{stats.reports}</p>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>OTC Consultations</p>
                <p className="text-3xl font-bold text-purple-600">{stats.otcConsultations}</p>
              </div>
            </div>
          )}

          {/* Filters and Search */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow mb-6`}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('prescription')}
                  className={`px-4 py-2 rounded-md ${
                    filter === 'prescription'
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Prescriptions
                </button>
                <button
                  onClick={() => setFilter('report')}
                  className={`px-4 py-2 rounded-md ${
                    filter === 'report'
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Reports
                </button>
                <button
                  onClick={() => setFilter('otc')}
                  className={`px-4 py-2 rounded-md ${
                    filter === 'otc'
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  OTC
                </button>
              </div>

              <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`px-4 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-300 text-gray-900'
                  } w-full md:w-64`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* History Items */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading history...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
              {error}
            </div>
          ) : history.length === 0 ? (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-12 rounded-lg shadow text-center`}>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No analysis history yet. Start using HealNet to build your medical history!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                          {getTypeLabel(item.type)}
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/${item.type === 'prescription' ? 'prescription' : item.type === 'report' ? 'reports' : 'otc'}/${item.id}`)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.type)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md ml-4"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
